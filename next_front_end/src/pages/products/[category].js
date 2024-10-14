import ProductCatalogApi from '../../services/api';
import Products from '../../components/Products';

const CategoryPage = ({ products, category }) => {
  return <Products products={products} category={category} />;
};

export async function getServerSideProps({ params }) {
  const { category } = params;

  try {
    const products = await ProductCatalogApi.getProducts(category);
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

export default CategoryPage;