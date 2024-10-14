import ProductCatalogApi from '../../services/api';
import Products from '../../components/Products';
import { filterCategories } from '../../services/categoryRefs';

const ProductsPage = ({ products, category }) => {
  return <Products products={products} category={category} />;
};

export async function getServerSideProps() {
  const category = 'All Products'
  try {
    const products = await ProductCatalogApi.getProducts();
    return {
      props: {
        products,
        category,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
        category,
      },
    };
  }
}

export default ProductsPage;