const BASE_API_URL = process.env.REACT_APP_BASE_API_URL
const TOKEN = process.env.REACT_APP_API_KEY

class ProductCatalogApi {

  /**getProducts:
   *  -params: category
   *  -returns: products
   */
  static async getProducts(category=null){
    let response

    if(category){

      response = await fetch(`${BASE_API_URL}/products/${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key': TOKEN
      },
      });
    }else{
      response = await fetch(`${BASE_API_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': TOKEN
        },
        });
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**getProduct:
   *  -params: productId
   *  -returns: product
   */
  static async getProduct(productId){


    const response = await fetch(`${BASE_API_URL}/product/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'api-key': TOKEN
    },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

}

export default ProductCatalogApi

