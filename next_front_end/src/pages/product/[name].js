import ProductCatalogApi from '../../services/api';
import Product from '../../components/Product';

const ProductsPage = ({ product }) => {
  return <Product product={product} />;
};

export async function getServerSideProps(context) { // Make sure to include context here
  const { name } = context.params;
  const id = name.split('-').pop();

  try {
    console.log ('nameeee'); // This should now log the slug correctly
    // Replace 1 with the actual ID logic if needed
    const productId = 1; // Change this logic to get the correct ID if needed
    const product = await ProductCatalogApi.getProduct(id);

    // Process colors
    product['nonAccentColors'] = product.colors.filter(color => !color.accent_color);
    product['accentColors'] = product.colors.filter(color => color.accent_color);

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        product: [], // Return an empty array or handle the error as needed
      },
    };
  }
}

export default ProductsPage;