// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyBDrYMD3TpCp_aS9v0YP-IkotdBPIxZ1EE",
    authDomain: "my-ionic-firebase.firebaseapp.com",
    databaseURL: "https://my-ionic-firebase.firebaseio.com/",
    projectId: "my-ionic-firebase",
    storageBucket: "gs://my-ionic-firebase.appspot.com",
    messagingSenderId: "779335284451"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
