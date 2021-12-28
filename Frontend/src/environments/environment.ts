const baseUrl = "http://localhost:3001/api/";

export const environment = {
  production: false,
  productsUrl: baseUrl + "products/",
  categoriesUrl: baseUrl + "categories/",
  registerUrl: baseUrl + "auth/register",
  loginUrl: baseUrl + "auth/login",
  productImagesUrl: baseUrl + "products/images/",
  cartsUrl: baseUrl + "carts/",
  itemsUrl: baseUrl + "items/",
  ordersUrl: baseUrl + "orders/",
};
