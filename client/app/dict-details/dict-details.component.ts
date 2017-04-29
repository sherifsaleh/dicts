import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { DataService } from '../services/data.service';
import { Title } from '@angular/platform-browser';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-dict-details',
  templateUrl: './dict-details.component.html',
  styleUrls: ['./dict-details.component.scss']
})
export class DictDetailsComponent implements OnInit {
  dict: any;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private titleService: Title
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
}
