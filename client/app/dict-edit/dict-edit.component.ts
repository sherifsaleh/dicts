import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { DataService } from '../services/data.service';
import { Title } from '@angular/platform-browser';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-dict-edit',
  templateUrl: './dict-edit.component.html',
  styleUrls: ['./dict-edit.component.scss']
})
export class DictEditComponent implements OnInit {

  dict: any;
  isEditing = true;
  isLoading = true;
  dicts = [];

  schemas = [];


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private titleService: Title,
    public toast: ToastComponent,
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.dataService.getDict(params['id']);
      })
      .subscribe((dict) => {
        let dictParse = JSON.parse(dict._body);
        let pageTitle = dictParse.name;
        this.setTitle(pageTitle);
        return this.dict = dictParse;
      });

    this.getSchemas();
    this.isLoading = false;

  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  goBack(): void {
    this.location.back();
  }

  enableEditing(dict) {
    this.isEditing = true;
    this.dict = dict;
  }

  cancelEditing() {
    this.isEditing = false;
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the dict to reset the editing
    this.router.navigate(['/']);
  }

  editDict(dict, editState) {

    let dictState = this.dictState(dict.dictSchema);
    dict.dictSchema = dictState;

    this.dataService.editDict(dict).subscribe(
      res => {
        this.isEditing = editState;
        this.dict = dict;

        this.toast.setMessage('Dictionary edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteDict(dict) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteDict(dict).subscribe(
        res => {
          const pos = this.dicts.map(elem => { return elem._id; }).indexOf(dict._id);
          this.dicts.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }

    this.router.navigate(['/']);
  }

  deleteRow(e, row) {
    // to add cofirmation once done testing
    if (window.confirm('Are you sure you want to permanently delete this row?')) {
      e.preventDefault();
      this.dict.dictSchema.splice(row);
      this.editDict(this.dict, true);
    }
  }

  addDomainRow(e) {
    e.preventDefault();
    this.dict.dictSchema.push({ 'source': 'new domaine', 'target': 'new new range', 'state': 'added', 'count': 1 });
    this.editDict(this.dict, true);
  }

  getSchemas() {
    this.dataService.getSchemas().subscribe(
      res => {
        const loadedSchemas = res;

        loadedSchemas.map((x) => this.schemas.push(x));

      },
      error => console.log(error)
    );
  }


  dictState(data) {
    let keys = data.map((key) => {
      // rest count to 1
      return {
        "target": key.target,
        "source": key.source,
        "state": key.state,
        "count": 1
      }
    });



    //console.log(keys);
    // detect duplicates changes
    let countedKeys = keys
      .reduce((a, b) => {
        a[b.target] = (a[b.target] || 0) + b.count;
        return a
      }, []);



    //map the detected duplicates
    let duplicatesValues = Object.keys(countedKeys).map((a) => {
      if (countedKeys[a] > 1) {
        return { 'target': a, 'count': countedKeys[a] }
      }
      return false;
    });

    // assign duplicats count to final array added to db
    let readyKeys = keys.map((x) => {
      duplicatesValues.filter((repatedName) => {
        if (repatedName != false) {
          if (x.target === repatedName.target) {
            x.count = repatedName.count
            return x
          }
        }
      });
      return x
    });

    return readyKeys;
  }
}
