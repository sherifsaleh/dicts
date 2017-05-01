# Colors dictionaries
This is a proto-project for dictionaries for a demo it only handle colors submited in html form and comma seperated.

The front-end of this project was generated with [Angular CLI](https://github.com/angular/angular-cli).

This project uses the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 4](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment
* [Angular CLI](https://cli.angular.io): project scaffolding
* [Bootstrap](http://www.getbootstrap.com): layout and styles
* [Font Awesome](http://fontawesome.io): icons

## Prerequisites
1. Install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI: `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm i` or `yarn install`

## Run
### Development mode
`npm run dev` or `yarn run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Production mode
`npm run prod` or `yarn run prod` : run the project with a production bundle and AOT compilation

## Deploy (Heroku)
1. Go to Heroku and create a new app
2. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
3. `heroku login`
4. `cd my-project/`
5. `git init`
6. `heroku git:remote -a your-app-name`
7. Download this repo and copy all files into `my-project` folder
8. Edit `.gitignore` and remove line with `/dist`
9. Edit in `db.ts` the url of MongoDB server to a real server. You can create a MongoDB server with Heroku or mLab.
10. `npm i`
11. `ng build -prod` or `ng build -aot -prod`
12. `tsc -p server`
13. `git add .`
14. `git commit -m "Going to Heroku"`
15. `git push heroku master`
16. `heroku open`
17. A window will open with your app online


## To do
* More tests
* Managing state
* Code refactoring

### Starter rep
* [Davide Violante](https://github.com/DavideViolante/Angular-Full-Stack/)

### List of Colors used :
* [X11](https://en.wikipedia.org/wiki/Web_colors#X11_color_names)
* [RAL](https://en.wikipedia.org/wiki/List_of_RAL_colors)

### hosted on heroku :
* [heroku](https://colors-dicts.herokuapp.com/)

