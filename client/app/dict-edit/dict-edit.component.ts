import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  dicts = [];

  schemas = [
    { name: 'basic' },
    { name: 'x11' },
    { name: 'Ral' }
  ]


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private titleService: Title,
    public toast: ToastComponent
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
    //this.dict = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the dicts to reset the editing
  }

  editDict(dict, editState) {
    console.log('hello');
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
  }

  deleteRow(e, row) {
    e.preventDefault();
    this.dict.dictSchema.splice(row);
    this.editDict(this.dict, true);
  }

  addDomainRow(e) {
    e.preventDefault();
    this.dict.dictSchema.push({ 'source': 'new domaine', 'target': 'new new range' });
    this.editDict(this.dict, true);
  }
}
