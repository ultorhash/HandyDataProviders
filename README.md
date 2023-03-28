# HandyDataProviders
HandyDataProviders is a collection of programs designed to provide users with useful data in specific types of applications. Consists of main applications and additional libraries that maintain established standards to maintain consistency in UX.

## Specification:
- `Angular`: 15.2.1
- `Angular Material`: 15.2.1

## Technologies:
<img align="left" width="30px" height="30px" src="https://www.svgrepo.com/show/354478/typescript-icon.svg" title="Typescript" />
<img align="left" width="30px" height="30px" src="https://www.svgrepo.com/show/349502/sass.svg" title="Sass"/>
<img align="left" width="30px" height="30px" src="https://www.svgrepo.com/show/353396/angular-icon.svg" title="Angular"/>
<img align="left" width="30px" height="30px" src="https://github.com/ReactiveX/rxjs/blob/master/resources/CI-CD/logo/svg/RxJs_Logo_Basic.svg" title="RxJs"/>
<br />

## Applications
#### [`Smart Exchange`]
The purpose of the project is to present cryptocurrencies data and prices in real time. It uses a free API provided by Coingecko company. Users can easily customize dashboards according to your their preferences by sorting, rearranging and modifing provided data.

Main additional libraries:
- [Highcharts](https://www.highcharts.com) [site]
- [NGXS](https://www.ngxs.io/) [site]
- [Angular Gridster](https://github.com/tiberiuzuld/angular-gridster2) [git]
- [Ngx-Translate](https://github.com/ngx-translate/core) [git]

## Libraries
#### [`UI-Core`]
An UI Library that contains additional components and rules for all of HandyDataProviders applications in order to maintain UX guideline. Changes to common UI components will be applied to all applications using them.

## Development
#### Applications
To run selected application, type `npm start` or `yarn start` after you switch to its directory.

#### Libraries
In order to compile and apply latest changes in libary, use `ng build --configuration production` command with optional `--watch` flag at the end to save and run automatically every applied changes.
