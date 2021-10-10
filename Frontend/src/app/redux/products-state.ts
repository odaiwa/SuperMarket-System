// import { ProductModel } from 'src/app/models/product-model';

// // Products App State: 
// export class ProductsState {
//     public products: ProductModel[] = [];
// }

// // Products Action Type: 
// export enum ProductsActionType {
//     ProductsDownloaded = "ProductsDownloaded",
//     ProductAdded = "ProductAdded",
//     ProductUpdated = "ProductUpdated",
//     ProductDeleted = "ProductDeleted"
// }

// // Products Action: 
// export interface ProductsAction {
//     type: ProductsActionType; // Which action are we doing.
//     payload: any;             // Which data are we sending to the AppState.
// }

// // Products Reducer (the new ProductsState() is for the first time only - we create a new AppState):
// export function productsReducer(currentState: ProductsState = new ProductsState(), action: ProductsAction): ProductsState {

//     // Create a copy of the currentState:
//     const newState = { ...currentState }; // ... is JS Spread Operator

//     // Perform the action: 
//     switch (action.type) {
//         case ProductsActionType.ProductsDownloaded:
//             newState.products = action.payload; // Here action.payload MUST be the downloaded products array!
//             break;
//         case ProductsActionType.ProductAdded:
//             newState.products.push(action.payload); // Here action.payload MUST be the added product!
//             break;
//         case ProductsActionType.ProductUpdated:
//             const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id); // id to be updated
//             newState.products[indexToUpdate] = action.payload;
//             // Here action.payload MUST be the updated product!
//             break;
//         case ProductsActionType.ProductDeleted:
//             const indexToDeleted = newState.products.findIndex(p => p.id === action.payload); // id to be deleted
//             newState.products.splice(indexToDeleted,1);
//              // Here action.payload MUST be the product id to delete!
//             break;
//     }

//     // Return the new state: 
//     return newState;
// }
