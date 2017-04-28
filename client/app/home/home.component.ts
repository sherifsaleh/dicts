import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle = 'Colors dictionaries';
  dicts = [];
  isLoading = true;

  dict = {};
  isEditing = false;

  addDictForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);



  constructor(private http: Http,
    private dataService: DataService,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getDicts();

    this.addDictForm = this.formBuilder.group({
      name: this.name,
      description: this.description
    });

    this.setTitle(this.pageTitle);
  }

  getDicts() {
    this.dataService.getDicts().subscribe(
      data => this.dicts = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addDict() {
    this.dataService.addDict(this.addDictForm.value).subscribe(
      res => {
        const newDict = res.json();
        this.dicts.push(newDict);
        this.addDictForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
        // reload the dicts to reset the editing
        this.getDicts();

      },
      error => console.log(error)
    );
  }

  enableEditing(dict) {
    this.isEditing = true;
    this.dict = dict;
  }

  cancelEditing() {
    this.isEditing = false;
    this.dict = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the dicts to reset the editing
    this.getDicts();
  }

  editDict(dict) {
    this.dataService.editDict(dict).subscribe(
      res => {
        this.isEditing = false;
        this.dict = dict;
        this.toast.setMessage('item edited successfully.', 'success');
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

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
