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

  schemas = ['New schema'];
  schemaCalled = [];
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
  // https://en.wikipedia.org/wiki/Web_colors#X11_color_names
  schemaX11 = [
    { 'source': 'pink', 'target': 'Pink' },
    { 'source': 'lightpink', 'target': 'Pink' },
    { 'source': 'hotpink', 'target': 'Pink' },
    { 'source': 'deeppink', 'target': 'Pink' },
    { 'source': 'palevioletred', 'target': 'Pink' },
    { 'source': 'mediumvioletred', 'target': 'Pink' },
    { 'source': 'lightsalmon', 'target': 'Red' },
    { 'source': 'salmon', 'target': 'Red' },
    { 'source': 'darksalmon', 'target': 'Red' },
    { 'source': 'lightcoral', 'target': 'Red' },
    { 'source': 'indianred', 'target': 'Red' },
    { 'source': 'crimson', 'target': 'Red' },
    { 'source': 'firebrick', 'target': 'Red' },
    { 'source': 'darkred', 'target': 'Red' },
    { 'source': 'red', 'target': 'Red' },
    { 'source': 'orangered', 'target': 'Orange' },
    { 'source': 'tomato', 'target': 'Orange' },
    { 'source': 'coral', 'target': 'Orange' },
    { 'source': 'darkorange', 'target': 'Orange' },
    { 'source': 'orange', 'target': 'Orange' },
    { 'source': 'yellow', 'target': 'Yellow' },
    { 'source': 'lightyellow', 'target': 'Yellow' },
    { 'source': 'lemonchiffon', 'target': 'Yellow' },
    { 'source': 'lightgoldenrodyellow', 'target': 'Yellow' },
    { 'source': 'papayawhip', 'target': 'Yellow' },
    { 'source': 'moccasin', 'target': 'Yellow' },
    { 'source': 'peachpuff', 'target': 'Yellow' },
    { 'source': 'palegoldenrod', 'target': 'Yellow' },
    { 'source': 'khaki', 'target': 'Yellow' },
    { 'source': 'darkkhaki', 'target': 'Yellow' },
    { 'source': 'gold', 'target': 'Yellow' },
    { 'source': 'cornsilk', 'target': 'Brown' },
    { 'source': 'blanchedalmond', 'target': 'Brown' },
    { 'source': 'bisque', 'target': 'Brown' },
    { 'source': 'navajowhite', 'target': 'Brown' },
    { 'source': 'wheat', 'target': 'Brown' },
    { 'source': 'burlywood', 'target': 'Brown' },
    { 'source': 'tan', 'target': 'Brown' },
    { 'source': 'rosybrown', 'target': 'Brown' },
    { 'source': 'sandybrown', 'target': 'Brown' },
    { 'source': 'goldenrod', 'target': 'Brown' },
    { 'source': 'darkgoldenrod', 'target': 'Brown' },
    { 'source': 'peru', 'target': 'Brown' },
    { 'source': 'chocolate', 'target': 'Brown' },
    { 'source': 'saddlebrown', 'target': 'Brown' },
    { 'source': 'sienna', 'target': 'Brown' },
    { 'source': 'brown', 'target': 'Brown' },
    { 'source': 'maroon', 'target': 'Brown' },
    { 'source': 'darkolivegreen', 'target': 'Green' },
    { 'source': 'olive', 'target': 'Green' },
    { 'source': 'olivedrab', 'target': 'Green' },
    { 'source': 'yellowgreen', 'target': 'Green' },
    { 'source': 'limegreen', 'target': 'Green' },
    { 'source': 'lime', 'target': 'Green' },
    { 'source': 'lawngreen', 'target': 'Green' },
    { 'source': 'chartreuse', 'target': 'Green' },
    { 'source': 'greenyellow', 'target': 'Green' },
    { 'source': 'springgreen', 'target': 'Green' },
    { 'source': 'mediumspringgreen', 'target': 'Green' },
    { 'source': 'lightgreen', 'target': 'Green' },
    { 'source': 'palegreen', 'target': 'Green' },
    { 'source': 'darkseagreen', 'target': 'Green' },
    { 'source': 'mediumaquamarine', 'target': 'Green' },
    { 'source': 'mediumseagreen', 'target': 'Green' },
    { 'source': 'seagreen', 'target': 'Green' },
    { 'source': 'forestgreen', 'target': 'Green' },
    { 'source': 'green', 'target': 'Green' },
    { 'source': 'darkgreen', 'target': 'Green' },
    { 'source': 'aqua', 'target': 'Cyan' },
    { 'source': 'cyan', 'target': 'Cyan' },
    { 'source': 'lightcyan', 'target': 'Cyan' },
    { 'source': 'paleturquoise', 'target': 'Cyan' },
    { 'source': 'aquamarine', 'target': 'Cyan' },
    { 'source': 'turquoise', 'target': 'Cyan' },
    { 'source': 'mediumturquoise', 'target': 'Cyan' },
    { 'source': 'darkturquoise', 'target': 'Cyan' },
    { 'source': 'lightseagreen', 'target': 'Cyan' },
    { 'source': 'cadetblue', 'target': 'Cyan' },
    { 'source': 'darkcyan', 'target': 'Cyan' },
    { 'source': 'teal', 'target': 'Cyan' },
    { 'source': 'lightsteelblue', 'target': 'Blue' },
    { 'source': 'powderblue', 'target': 'Blue' },
    { 'source': 'lightblue', 'target': 'Blue' },
    { 'source': 'skyblue', 'target': 'Blue' },
    { 'source': 'lightskyblue', 'target': 'Blue' },
    { 'source': 'deepskyblue', 'target': 'Blue' },
    { 'source': 'dodgerblue', 'target': 'Blue' },
    { 'source': 'cornflowerblue', 'target': 'Blue' },
    { 'source': 'steelblue', 'target': 'Blue' },
    { 'source': 'royalblue', 'target': 'Blue' },
    { 'source': 'blue', 'target': 'Blue' },
    { 'source': 'mediumblue', 'target': 'Blue' },
    { 'source': 'darkblue', 'target': 'Blue' },
    { 'source': 'navy', 'target': 'Blue' },
    { 'source': 'midnightblue', 'target': 'Blue' },
    { 'source': 'lavender', 'target': 'Purple' },
    { 'source': 'thistle', 'target': 'Purple' },
    { 'source': 'plum', 'target': 'Purple' },
    { 'source': 'violet', 'target': 'Purple' },
    { 'source': 'orchid', 'target': 'Purple' },
    { 'source': 'fuchsia', 'target': 'Purple' },
    { 'source': 'magenta', 'target': 'Purple' },
    { 'source': 'mediumorchid', 'target': 'Purple' },
    { 'source': 'mediumpurple', 'target': 'Purple' },
    { 'source': 'blueviolet', 'target': 'Purple' },
    { 'source': 'darkviolet', 'target': 'Purple' },
    { 'source': 'darkorchid', 'target': 'Purple' },
    { 'source': 'darkmagenta', 'target': 'Purple' },
    { 'source': 'purple', 'target': 'Purple' },
    { 'source': 'indigo', 'target': 'Purple' },
    { 'source': 'darkslateblue', 'target': 'Purple' },
    { 'source': 'slateblue', 'target': 'Purple' },
    { 'source': 'mediumslateblue', 'target': 'Purple' },
    { 'source': 'white', 'target': 'White' },
    { 'source': 'snow', 'target': 'White' },
    { 'source': 'honeydew', 'target': 'White' },
    { 'source': 'mintcream', 'target': 'White' },
    { 'source': 'azure', 'target': 'White' },
    { 'source': 'aliceblue', 'target': 'White' },
    { 'source': 'ghostwhite', 'target': 'White' },
    { 'source': 'whitesmoke', 'target': 'White' },
    { 'source': 'seashell', 'target': 'White' },
    { 'source': 'beige', 'target': 'White' },
    { 'source': 'oldlace', 'target': 'White' },
    { 'source': 'floralwhite', 'target': 'White' },
    { 'source': 'ivory', 'target': 'White' },
    { 'source': 'antiquewhite', 'target': 'White' },
    { 'source': 'linen', 'target': 'White' },
    { 'source': 'lavenderblush', 'target': 'White' },
    { 'source': 'mistyrose', 'target': 'White' },
    { 'source': 'gainsboro', 'target': 'Gray' },
    { 'source': 'lightgray', 'target': 'Gray' },
    { 'source': 'silver', 'target': 'Gray' },
    { 'source': 'darkgray', 'target': 'Gray' },
    { 'source': 'gray', 'target': 'Gray' },
    { 'source': 'dimgray', 'target': 'Gray' },
    { 'source': 'lightslategray', 'target': 'Gray' },
    { 'source': 'slategray', 'target': 'Gray' },
    { 'source': 'darkslategray', 'target': 'Gray' },
    { 'source': 'black', 'target': 'black' }
  ]

  //https://en.wikipedia.org/wiki/List_of_RAL_colors
  schemaRal = [
    { 'source': 'beige', 'target': 'Yellow' },
    { 'source': 'broomyellow', 'target': 'Yellow' },
    { 'source': 'brownbeige', 'target': 'Yellow' },
    { 'source': 'curry', 'target': 'Yellow' },
    { 'source': 'daffodilyellow', 'target': 'Yellow' },
    { 'source': 'dahliayellow', 'target': 'Yellow' },
    { 'source': 'goldenyellow', 'target': 'Yellow' },
    { 'source': 'greenbeige', 'target': 'Yellow' },
    { 'source': 'greybeige', 'target': 'Yellow' },
    { 'source': 'honeyyellow', 'target': 'Yellow' },
    { 'source': 'ivory', 'target': 'Yellow' },
    { 'source': 'lemonyellow', 'target': 'Yellow' },
    { 'source': 'lightivory', 'target': 'Yellow' },
    { 'source': 'gazsbeige', 'target': 'Yellow' },
    { 'source': 'luminousyellow', 'target': 'Yellow' },
    { 'source': 'maizeyellow', 'target': 'Yellow' },
    { 'source': 'melonyellow', 'target': 'Yellow' },
    { 'source': 'ochreyellow', 'target': 'Yellow' },
    { 'source': 'oliveyellow', 'target': 'Yellow' },
    { 'source': 'oysterwhite', 'target': 'Yellow' },
    { 'source': 'pastelyellow', 'target': 'Yellow' },
    { 'source': 'pearlbeige', 'target': 'Yellow' },
    { 'source': 'pearlgold', 'target': 'Yellow' },
    { 'source': 'rapeyellow', 'target': 'Yellow' },
    { 'source': 'saffronyellow', 'target': 'Yellow' },
    { 'source': 'sandyellow', 'target': 'Yellow' },
    { 'source': 'signalyellow', 'target': 'Yellow' },
    { 'source': 'sulfuryellow', 'target': 'Yellow' },
    { 'source': 'sunyellow', 'target': 'Yellow' },
    { 'source': 'trafficyellow', 'target': 'Yellow' },
    { 'source': 'zincyellow', 'target': 'Yellow' },
    { 'source': 'yelloworange', 'target': 'Orange' },
    { 'source': 'redorange', 'target': 'Orange' },
    { 'source': 'vermillion', 'target': 'Orange' },
    { 'source': 'pastelorange', 'target': 'Orange' },
    { 'source': 'pureorange', 'target': 'Orange' },
    { 'source': 'luminousorange', 'target': 'Orange' },
    { 'source': 'luminousbright orange', 'target': 'Orange' },
    { 'source': 'brightred orange', 'target': 'Orange' },
    { 'source': 'trafficorange ', 'target': 'Orange' },
    { 'source': 'signalorange', 'target': 'Orange' },
    { 'source': 'deeporange', 'target': 'Orange' },
    { 'source': 'salmonorange', 'target': 'Orange' },
    { 'source': 'pearlorange', 'target': 'Orange' },
    { 'source': 'flamered', 'target': 'Red' },
    { 'source': 'signalred  ', 'target': 'Red' },
    { 'source': 'carminered', 'target': 'Red' },
    { 'source': 'rubyred', 'target': 'Red' },
    { 'source': 'purplered', 'target': 'Red' },
    { 'source': 'winered', 'target': 'Red' },
    { 'source': 'blackred', 'target': 'Red' },
    { 'source': 'oxidered', 'target': 'Red' },
    { 'source': 'brownred', 'target': 'Red' },
    { 'source': 'beigered', 'target': 'Red' },
    { 'source': 'tomatored', 'target': 'Red' },
    { 'source': 'antiquepink', 'target': 'Red' },
    { 'source': 'lightpink', 'target': 'Red' },
    { 'source': 'coralred', 'target': 'Red' },
    { 'source': 'rose', 'target': 'Red' },
    { 'source': 'strawberryred', 'target': 'Red' },
    { 'source': 'traffic', 'target': 'Red' },
    { 'source': 'salmonpink', 'target': 'Red' },
    { 'source': 'luminousred', 'target': 'Red' },
    { 'source': 'luminousbrightred', 'target': 'Red' },
    { 'source': 'raspberryred', 'target': 'Red' },
    { 'source': 'purered', 'target': 'Red' },
    { 'source': 'orientred', 'target': 'Red' },
    { 'source': 'pearlrubyred', 'target': 'Red' },
    { 'source': 'pearlpink', 'target': 'Red' },
    { 'source': 'redlilac', 'target': 'Violet' },
    { 'source': 'redviolet', 'target': 'Violet' },
    { 'source': 'heatherviolet', 'target': 'Violet' },
    { 'source': 'claretviolet', 'target': 'Violet' },
    { 'source': 'bluelilac', 'target': 'Violet' },
    { 'source': 'trafficpurple', 'target': 'Violet' },
    { 'source': 'purpleviolet', 'target': 'Violet' },
    { 'source': 'signalviolet', 'target': 'Violet' },
    { 'source': 'pastelviolet', 'target': 'Violet' },
    { 'source': 'telemagenta', 'target': 'Violet' },
    { 'source': 'pearlviolet', 'target': 'Violet' },
    { 'source': 'pearlblackberry', 'target': 'Violet' },
    { 'source': 'violetblue', 'target': 'Blue' },
    { 'source': 'greenblue', 'target': 'Blue' },
    { 'source': 'ultramarineblue', 'target': 'Blue' },
    { 'source': 'sapphireblue', 'target': 'Blue' },
    { 'source': 'blackblue', 'target': 'Blue' },
    { 'source': 'signalblue', 'target': 'Blue' },
    { 'source': 'brilliantblue', 'target': 'Blue' },
    { 'source': 'greyblue', 'target': 'Blue' },
    { 'source': 'azureblue', 'target': 'Blue' },
    { 'source': 'gentianblue', 'target': 'Blue' },
    { 'source': 'steelblue', 'target': 'Blue' },
    { 'source': 'lightblue', 'target': 'Blue' },
    { 'source': 'cobaltblue', 'target': 'Blue' },
    { 'source': 'pigeonblue', 'target': 'Blue' },
    { 'source': 'skyblue', 'target': 'Blue' },
    { 'source': 'trafficblue', 'target': 'Blue' },
    { 'source': 'turquoiseblue', 'target': 'Blue' },
    { 'source': 'capriblue', 'target': 'Blue' },
    { 'source': 'oceanblue', 'target': 'Blue' },
    { 'source': 'waterblue', 'target': 'Blue' },
    { 'source': 'nightblue', 'target': 'Blue' },
    { 'source': 'distantblue', 'target': 'Blue' },
    { 'source': 'pastelblue', 'target': 'Blue' },
    { 'source': 'pearlgentianblue', 'target': 'Blue' },
    { 'source': 'pearlnightblue', 'target': 'Blue' },
    { 'source': 'browngrey', 'target': 'Grey' },
    { 'source': 'natoolive', 'target': 'Grey' },
    { 'source': 'stonegreyolive', 'target': 'Grey' },
    { 'source': 'austrianbundesheer', 'target': 'Grey' },
    { 'source': 'squirrelgrey', 'target': 'Grey' },
    { 'source': 'silvergrey', 'target': 'Grey' },
    { 'source': 'olivegrey', 'target': 'Grey' },
    { 'source': 'mossgrey', 'target': 'Grey' },
    { 'source': 'signalgrey', 'target': 'Grey' },
    { 'source': 'mousegrey', 'target': 'Grey' },
    { 'source': 'beigegrey', 'target': 'Grey' },
    { 'source': 'khakigrey', 'target': 'Grey' },
    { 'source': 'greengrey', 'target': 'Grey' },
    { 'source': 'tarpaulingrey', 'target': 'Grey' },
    { 'source': 'irongrey', 'target': 'Grey' },
    { 'source': 'basaltgrey', 'target': 'Grey' },
    { 'source': 'slategrey', 'target': 'Grey' },
    { 'source': 'anthracitegrey', 'target': 'Grey' },
    { 'source': 'blackgrey', 'target': 'Grey' },
    { 'source': 'umbragrey', 'target': 'Grey' },
    { 'source': 'concretegrey', 'target': 'Grey' },
    { 'source': 'graphitegrey', 'target': 'Grey' },
    { 'source': 'granitegrey', 'target': 'Grey' },
    { 'source': 'stonegrey', 'target': 'Grey' },
    { 'source': 'bluegrey', 'target': 'Grey' },
    { 'source': 'pebblegrey', 'target': 'Grey' },
    { 'source': 'cementgrey', 'target': 'Grey' },
    { 'source': 'yellowgrey', 'target': 'Grey' },
    { 'source': 'lightgrey', 'target': 'Grey' },
    { 'source': 'platinumgrey', 'target': 'Grey' },
    { 'source': 'dustygrey', 'target': 'Grey' },
    { 'source': 'agategrey', 'target': 'Grey' },
    { 'source': 'quartzgrey', 'target': 'Grey' },
    { 'source': 'windowgrey', 'target': 'Grey' },
    { 'source': 'trafficgreya', 'target': 'Grey' },
    { 'source': 'trafficgreyb', 'target': 'Grey' },
    { 'source': 'silkgrey', 'target': 'Grey' },
    { 'source': 'telegrey1', 'target': 'Grey' },
    { 'source': 'telegrey2', 'target': 'Grey' },
    { 'source': 'telegrey4', 'target': 'Grey' },
    { 'source': 'pearlmousegrey', 'target': 'Grey' },
    { 'source': 'greenbrown', 'target': 'Brown' },
    { 'source': 'ochrebrown', 'target': 'Brown' },
    { 'source': 'signalbrown', 'target': 'Brown' },
    { 'source': 'claybrown', 'target': 'Brown' },
    { 'source': 'copperbrown', 'target': 'Brown' },
    { 'source': 'fawnbrown', 'target': 'Brown' },
    { 'source': 'olivebrown', 'target': 'Brown' },
    { 'source': 'nutbrown', 'target': 'Brown' },
    { 'source': 'redbrown', 'target': 'Brown' },
    { 'source': 'sepiabrown', 'target': 'Brown' },
    { 'source': 'chestnutbrown', 'target': 'Brown' },
    { 'source': 'mahoganybrown', 'target': 'Brown' },
    { 'source': 'chocolatebrown', 'target': 'Brown' },
    { 'source': 'greybrown', 'target': 'Brown' },
    { 'source': 'blackbrown', 'target': 'Brown' },
    { 'source': 'orangebrown', 'target': 'Brown' },
    { 'source': 'beigebrown', 'target': 'Brown' },
    { 'source': 'palebrown', 'target': 'Brown' },
    { 'source': 'terrabrown', 'target': 'Brown' },
    { 'source': 'pearlcopper', 'target': 'Brown' },
    { 'source': 'jetblack', 'target': 'Black' },
    { 'source': 'graphiteblack', 'target': 'Black' },
    { 'source': 'trafficblack', 'target': 'Black' },
    { 'source': 'signalblack', 'target': 'Black' },
    { 'source': 'pearldarkgrey', 'target': 'Black' },
    { 'source': 'greyaluminium', 'target': 'Black' },
    { 'source': 'pearllightgrey', 'target': 'Black' },
    { 'source': 'whitealuminium ', 'target': 'White' },
    { 'source': 'papyruswhite', 'target': 'White' },
    { 'source': 'greywhite', 'target': 'White' },
    { 'source': 'cream', 'target': 'White' },
    { 'source': 'signalwhite', 'target': 'White' },
    { 'source': 'purewhite', 'target': 'White' },
    { 'source': 'trafficwhite', 'target': 'White' }
  ];

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

    this.getSchemasNames();
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
        const response = res;
        this.schemaCalled = response.map((x) => {
          return { 'schemaMatching': x.schemaMatching, 'schema': x.dictSchema };
        });
      },
      error => console.log(error)
    );
  };

  getSchemasNames() {
    this.dataService.getSchemasNames().subscribe(
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
    // if no schema defined assigne the dictionary name as new schema
    if (dictNew.schemaMatching === 'New schema') { dictNew.schemaMatching = dictNew.name }
    else {
      // match to schema
      let schemaTomatchTo = this.schemaCalled.filter((x) => {
        if (dictNew.schemaMatching === x.schemaMatching) { return x.schema; }
      });
      // change name of schemaMatching name
      dictNew.schemaMatching = dictNew.name + ' → ' + dictNew.schemaMatching;

      this.filterFn(proceeded, schemaTomatchTo);
    }
    dictNew.dictSchema = this.dictNewSchema;
    // set validation status
    dictNew.validation = false;
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
    let schemaTomatchTo = schema[0].schema;
    let keys = [];
    let build = data.map((key) => {
      schemaTomatchTo.filter((x, index) => {
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
