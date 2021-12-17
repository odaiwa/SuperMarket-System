// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseUrl = "http://localhost:3001/api";

export const environment = {
    production: false,
    itemsUrl : baseUrl+"/items/",
    userUrl : baseUrl + "/users/",
    loginUrl: baseUrl+"/auth/login/",
    registerUrl : baseUrl+"/auth/register/",
    productsUrl: baseUrl + "products/",
    categoriesUrl: baseUrl + "categories/",
    productImagesUrl: baseUrl + "products/images/",
    cartsUrl: baseUrl + "carts/",
    ordersUrl: baseUrl + "orders/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
