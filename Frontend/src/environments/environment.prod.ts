const baseUrl = "http://localhost:3001/api";

export const environment = {
    production: true,
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
