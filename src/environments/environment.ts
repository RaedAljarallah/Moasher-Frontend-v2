// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiBaseUrl: "https://localhost:7241/api/v1",
    oidc: {
        baseUrl: "http://localhost:4200",
        authorityUrl: "https://localhost:7036",
        client_id: "16e6bea1-b75e-4e6f-9b76-0c5dd11b2e2d",
        scope: "openid profile access_as_user",
        response_type: "code"
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
