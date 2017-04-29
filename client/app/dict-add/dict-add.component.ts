import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-dict-add',
  templateUrl: './dict-add.component.html',
  styleUrls: ['./dict-add.component.scss']
})
export class DictAddComponent implements OnInit {
  pageTitle = 'Add a Dictionary';
  dicts = [];
  isLoading = true;
  dict = {};
  addDictForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  dictSchema = new FormControl('', Validators.required);


  schemaCodingLang = [
    {
      'source': 'py',
      'target': 'Python'
    },
    {
      'source': 'htm',
      'target': 'HTML'
    },
    {
      'source': 'js',
      'target': 'javaScript'
    },
    {
      'source': '$',
      'target': 'jQuery'
    }
  ]

  dictNewSchema = [];

  constructor(
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
    private dataService: DataService,
    private titleService: Title

  ) { }

  ngOnInit() {
    this.addDictForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      dictSchema: this.dictSchema,
    });

    this.isLoading = false;

  }

  addDict(dictNew) {
    this.dataService.addDict(dictNew).subscribe(
      res => {
        const newDict = res.json();
        this.dicts.push(newDict);
        this.addDictForm.reset();
        this.toast.setMessage('Dictionary added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  reqSend(e) {
    e.preventDefault();
    let dictNew = this.addDictForm.value;
    let dataSource = dictNew.dictSchema;
    let proceeded = dataSource.trim().replace(/(\r\n|\n|\r)/gm, '').replace(/[\s,]+/g, ',').split('\,').filter((x) => x != '');
    // match

    proceeded.map((key) => {
      this.schemaCodingLang.filter((x, index) => {
        if (key == x.source) {
          this.dictNewSchema.push({ 'source': key, 'target': x.target });
        } else if (key == x.target) {
          this.dictNewSchema.push({ key, 'target': x.target });
        }
      });
    });
    dictNew.dictSchema = this.dictNewSchema;

    this.addDict(dictNew);
  }


  filterFn(key, schema) {
    return schema.filter((x, index) => {
      if (key == x.source) {
        return { 'source': key, 'target': x.target };
      } else if (key == x.target) {
        return { key, 'target': x.target };
      }
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
