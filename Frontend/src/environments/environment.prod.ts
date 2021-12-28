const baseUrl = "http://localhost:3001/api/";

export const environment = {
  production: true,
  productsUrl: baseUrl + "products/",
  productImagesUrl: baseUrl + "products/images/",
  registerUrl: baseUrl + "auth/register",
  loginUrl: baseUrl + "auth/login"
};
