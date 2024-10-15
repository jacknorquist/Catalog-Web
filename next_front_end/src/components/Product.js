import { useState, useEffect} from 'react';
import ImageCarousel from './ImageCarousel';
import ProductCatalogApi from '../services/api.js';
import styles from '../styles/Product.module.css';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { categoryLinks } from '../services/categoryRefs.js';
import {logos , manufacturerUrls}from '../services/logourls.js';


const TOKEN = process.env.API_KEY

function Product({product}) {
  const [imagesState, setImagesState] = useState({
    images:product.images,
    colorActive:false
  })

  // const location = useLocation();

  // const {id} = location.state;

  let accentColors =[]
  let nonAccentColors =[];



  // useEffect(() => {
  //   // Fetch product on component mount
  //   async function fetchProduct() {
  //     if (id) {
  //       try {
  //         product['nonAccentColors'] = product.colors.filter(color => !color.accent_color);
  //         product['accentColors'] = product.colors.filter(color => color.accent_color);
  //         setImagesState({
  //           images: product.images || [], // Initialize with product images
  //           colorActive: false
  //         });
  //       } catch (error) {
  //         console.error('Error fetching product:', error);
  //       }
  //     }
  //   }

  //   fetchProduct();
  // }, []);

  function updateImageState(event) {
    const clickedElement = event.currentTarget;
    const dataUrl = clickedElement.dataset.url;
    const dataId = clickedElement.dataset.id;

    setImagesState(prevState => {
      const filteredImages = product.images.filter(
        image => image.color_id == dataId
      );

      if (product.manufacturer.name != 'Techo Bloc'){
      return {
        images: [{ image_url: dataUrl }, ...filteredImages],
        colorActive: dataId
      };
    }
    return {
      images: [...filteredImages],
      colorActive: dataId
    };
    });
  }

  function returnToAllImages(){
    setImagesState(
      {
        images:product.images,
        colorActive:false
      }
    )
  }


console.log(product)

  return (
    <div>
      {product ?
        <div className={styles.productContainer}>
          <div className={styles.productImages}>
            <div className={styles.breadcrumbs}>
            <Link className={styles.breadcrumbsLink}  href={`/products/`}>
              <i>Products</i>
            </Link>
            <i>/</i>
            <Link className={styles.breadcrumbsLink}  href={`${categoryLinks[product.normalized_category_name]}`}>
              <i>{product.normalized_category_name}</i>
            </Link>
            </div>
            <ImageCarousel imagesProp={imagesState} returnToAllImages={returnToAllImages}/>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.mainProductInfo}>
              <div>
                <h1>{product.name}</h1>
              </div>
              <div className={styles.logoContainer}>
                <a className={styles.logoLink} href={manufacturerUrls[product.manufacturer.name]} target='blank'>
                  <img className={styles.logo}src={logos[product.manufacturer.name]} />
                </a>
              </div>
            </div>
                <a href={`${categoryLinks[product.normalized_category_name]}`} className={styles.productCategory}><i>{product.normalized_category_name}</i></a>
          <div className={styles.descriptionContainer}>
            <h4 className={styles.headerContainer}>Description</h4>
            <p>{product.description}</p>
          </div>
          <div className={styles.details}>
              <h4 className={styles.headerContainer}>Colors</h4>
            <div className={styles.typeContainer}>
              {product.nonAccentColors.map(color =>
              <div className={styles.colorItem} key={uuidv4()}>
                {color.accent_color? <i>Accent Color</i>: null}
                <img className={Number(imagesState.colorActive) === color.id ? styles.colorImageActive: styles.colorImage}
                      src={color.image_url}
                      data-id={color.id}
                      data-url={color.image_url}
                      onClick={updateImageState}
                      />
                <p className={styles.attrTitle}>{color.name}</p>
                </div>)}
              </div>
              <div className={styles.typeContainer}>
                {product.accentColors.map(color =>
              <div className={styles.colorItem} key={uuidv4()}>
                {color.accent_color? <i>Accent Color</i>: null}
                <img className={Number(imagesState.colorActive) === color.id ? styles.colorImageActive: styles.colorImage}
                      src={color.image_url}
                      data-id={color.id}
                      data-url={color.image_url}
                      onClick={updateImageState}
                      />
                <p>{color.name}</p>
                </div>)}
              </div>
          </div>
          <div className={styles.details}>
            <h4 className={styles.headerContainer}>Sizes</h4>
            {product.sizes.length>0 ?

            <div className={product.sizes[0].image_url ? styles.typeContainerSizesWImage : styles.typeContainerSizes}>

              {product.sizes.map(size =>
                <div key={uuidv4()} className={size.image_url ? styles.sizeItemWImage :styles.sizeItem }>
                {product.manufacturer.name === 'County Materials' ? null :
                <b key={uuidv4()}>{size.name}</b>
                }
                {size.image_url? <img src={size.image_url} className={product.manufacturer.name === 'Techo Bloc' ? styles.sizeImageTecho : styles.sizeImage}/>: null}
                <div className={size.image_url? styles.dimensionsWImage : styles.dimensions}>
                {size.dimensions.map(d => <p key={uuidv4()}>{d}</p>)}
                </div>
                </div>
              )}
            </div>
            :
            null}
            <div className={styles.textureContainer}>
              <h4 className={styles.headerContainer}>Textures</h4>
              <div className={styles.typeContainer}>
                {product.textures.map(texture=>
                  <div key={uuidv4()} className={styles.textureContainer}>
                    <p key={uuidv4()}>{texture.name}</p>
                    <img key={uuidv4()} src={texture.image_url} />
                  </div>)}
                </div>
            </div>
          </div>
          <div className='specContainer'>
            <h4 className={styles.headerContainer}>Additional Information</h4>
            {product.spec_sheet ?
            <a className={styles.pdfContainer} target='blank' href={`${product.spec_sheet}`}>
              <div className={styles.specSheetContainer}>Spec Sheet</div>
              <i className='bi bi-file-pdf'></i>
            </a>
            : null
            }
            </div>
          </div>
      </div>
      : null

      }




    </div>

  );
}

export default Product;