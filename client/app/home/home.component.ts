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

  constructor(private http: Http,
    private dataService: DataService,
    public toast: ToastComponent,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getDicts();


    this.setTitle(this.pageTitle);
  }

  getDicts() {
    this.dataService.getDicts().subscribe(
      data => this.dicts = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
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


}
