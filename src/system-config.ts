// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
};

/** User packages configuration. */
const packages: any = {

};

const materialPkgs: string[] = [
  'core',
  'button',
  'card',
  'grid-list',
  'icon',
  'input',
  'list',
  'menu',
  'radio',
  'sidenav',
  'slide-toggle',
  'tabs',
  'toolbar',
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/account',
  'app/login',
  'app/songs',
  'app/song-edit',
  'app/setlist',
  'app/setlist-songs',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {
  app: {
    format: 'register',
    defaultExtension: 'js'
  },
  angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  },
  'ng2-material': {//this needs to be nested in packages
    defaultExtension: 'js'
  },
  'ng2-dragula': {
    main: 'ng2-dragula.js',
    defaultExtension: 'js'
  },
  'Dragula': {
  main: 'dragula.min.js',
    defaultExtension: 'js'
}

};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
    'firebase': 'vendor/firebase/firebase.js',
    'angularfire2': 'vendor/angularfire2',
    '@angular2-material': 'vendor/@angular2-material',
    'ng2-material': 'vendor/ng2-material',
    'lodash': 'vendor/lodash/lodash.js',
    'dragula': 'vendor/dragula/dist/dragula.min.js',
    'ng2-dragula/ng2-dragula': 'vendor/ng2-dragula/ng2-dragula.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
