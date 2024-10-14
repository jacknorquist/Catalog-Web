
import Link from 'next/link';
import styles from '../css/ProductPreviewItem.module.css';
import { v4 as uuidv4 } from 'uuid';
import { categoryLinks } from '../services/categoryReferences.js';

function ProductPreviewItem({product}) {

  const cleanedProductName = product.name.replace(/ /g, '-');

  return (
    <div className={styles.productPreviewItem}data-id={product.id}>
        <Link className={styles.link} id={styles.productNameLink} to={`/product/${cleanedProductName}`} state={{id : product.id}}>
        <img src={product.images[0].image_url} className={styles.mainImage}/>
        </Link>
        <div className={styles.descriptionContainer}>
          <a href={`${categoryLinks[product.normalized_category_name]}`} className={styles.productCategory}><i>{product.normalized_category_name}</i></a>
          <Link className={styles.link} id={styles.productNameLink} to={`/product/${cleanedProductName}`} state={{id : product.id}}>
            <b className={styles.productName}>{product.name}</b>
          </Link>
        </div>

        <ul className={styles.colorsPreview}>
          {product.colors.map(color =>
                               <li key={uuidv4()} className={styles.colorPreview}>
                                <img className={styles.colorPreviewImg}src={color.image_url} />
                               </li>)}
        </ul>
    </div>
  );
}

export default ProductPreviewItem;