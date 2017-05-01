import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  schemaMatching = new FormControl('', Validators.required);

  schemas = ['Other'];
  schemaCodingLang = [
    {
      'source': 'py',
      'target': 'Python'
    },
    {
      'source': 'xhtml',
      'target': 'HTML'

    },
    {
      'source': 'html5',
      'target': 'HTML'

    },
    {
      'source': 'htm',
      'target': 'HTML'

    },
    {
      'source': 'html',
      'target': 'HTML'

    },
    {
      'source': 'js',
      'target': 'javaScript'

    },
    {
      'source': 'javaScript',
      'target': 'javaScript'

    },
    {
      'source': '$',
      'target': 'jQuery'

    },
    {
      'source': 'jquery',
      'target': 'jQuery'
    }
  ]

  dictNewSchema = [];

  constructor(
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
    private dataService: DataService,
    private titleService: Title,
    private router: Router

  ) { }

  ngOnInit() {

    this.addDictForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      dictSchema: this.dictSchema,
      schemaMatching: this.schemaMatching,
    });

    this.getSchemas();

    this.isLoading = false;

  }

  addDict(dictNew) {
    this.dataService.addDict(dictNew).subscribe(
      res => {
        const newDict = res.json();
        this.dicts.push(newDict);
        this.addDictForm.reset();
        this.toast.setMessage('Dictionary added successfully. Please complete the following...', 'success');
        this.router.navigate(['/dict', newDict._id], { queryParams: { edit: true } });
      },
      error => console.log(error)
    );
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

  reqSend(e) {
    e.preventDefault();
    let dictNew = this.addDictForm.value;
    let dataSource = dictNew.dictSchema;
    let proceeded = this.dataClean(dataSource);
    // match to schema
    this.filterFn(proceeded, 'test');

    // if no schema defined assigne the dictionary name as new schema
    if (dictNew.schemaMatching === 'Other') { dictNew.schemaMatching = dictNew.name };

    dictNew.dictSchema = this.dictNewSchema;

    this.addDict(dictNew);
  }

  dataClean(data) {
    // trim remove all space, dashes, convert to lowercases, spilt with comma
    let trimed = data.trim().replace(/(\r\n|\n|\r|\s|-)/gm, '').toLowerCase().split('\,').filter((x) => x != '');
    // remove duplicates
    let uniqueArray = trimed.filter(function (item, pos) {
      return trimed.indexOf(item) == pos;
    });

    return uniqueArray;
  }


  filterFn(data, schema) {
    let keys = [];
    let build = data.map((key) => {
      this.schemaCodingLang.filter((x, index) => {
        if (key == x.source) {
          keys.push({ 'count': 1, 'state': 'match', 'source': key, 'sourceCount': 1, 'target': x.target });
        }
      })
    });
    // detect duplicates
    let countedKeys = keys
      .reduce((a, b) => {
        a[b.target] = (a[b.target] || 0) + b.count;
        return a
      }, []);

    // map the detected duplicates
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



    this.dictNewSchema = readyKeys;
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
