import { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import ProductCatalogApi from '../services/api.js';
import styles from '../css/Product.module.css';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { categoryLinks } from '../services/categoryReferences.js';
import {logos , manufacturerUrls}from '../services/logourls.js';


const TOKEN = process.env.API_KEY

function Product() {
  const [productState, setProductState] = useState(null);
  const [imagesState, setImagesState] = useState({
    images:[],
    colorActive:false
  })

  const location = useLocation();

  const {id} = location.state;

  let accentColors =[]
  let nonAccentColors =[];

  console.log(productState, imagesState)


  useEffect(() => {
    // Fetch product on component mount
    async function fetchProduct() {
      if (id) {
        try {
          const product = await ProductCatalogApi.getProduct(id);
          product['nonAccentColors'] = product.colors.filter(color => !color.accent_color);
          product['accentColors'] = product.colors.filter(color => color.accent_color);
          setProductState(product);
          setImagesState({
            images: product.images || [], // Initialize with product images
            colorActive: false
          });
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    }

    fetchProduct();
  }, [id]);

  function updateImageState(event) {
    const clickedElement = event.currentTarget;
    const dataUrl = clickedElement.dataset.url;
    const dataId = clickedElement.dataset.id;

    setImagesState(prevState => {
      const filteredImages = productState.images.filter(
        image => image.color_id == dataId
      );

      // Add the clicked image (dataUrl) as the first image
      return {
        images: [{ image_url: dataUrl }, ...filteredImages],
        colorActive: dataId
      };
    });
  }

  function returnToAllImages(){
    setImagesState(
      {
        images:productState.images,
        colorActive:false
      }
    )
  }
  console.log(productState)



  return (
    <div>
      {productState ?
        <div className={styles.productContainer}>
          <div className={styles.productImages}>
            <div className={styles.breadcrumbs}>
            <Link className={styles.breadcrumbsLink}  to={`/products/`}>
              <i>Products</i>
            </Link>
            <i>/</i>
            <Link className={styles.breadcrumbsLink}  to={`${categoryLinks[productState.normalized_category_name]}`}>
              <i>{productState.normalized_category_name}</i>
            </Link>
            </div>
            <ImageCarousel imagesProp={imagesState} returnToAllImages={returnToAllImages}/>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.mainProductInfo}>
              <div>
                <h1>{productState.name}</h1>
              </div>
              <div className={styles.logoContainer}>
                <a className={styles.logoLink} href={manufacturerUrls[productState.manufacturer.name]} target='blank'>
                  <img className={styles.logo}src={logos[productState.manufacturer.name]} />
                </a>
              </div>
            </div>
                <a href={`${categoryLinks[productState.normalized_category_name]}`} className={styles.productCategory}><i>{productState.normalized_category_name}</i></a>
          <div className={styles.descriptionContainer}>
            <h4 className={styles.headerContainer}>Description</h4>
            <p>{productState.description}</p>
          </div>
          <div className={styles.details}>
              <h4 className={styles.headerContainer}>Colors</h4>
            <div className={styles.typeContainer}>
              {productState.nonAccentColors.map(color =>
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
                {productState.accentColors.map(color =>
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
            <div className={styles.typeContainer}>
              {productState.sizes.map(size =>
                <div key={uuidv4()} className={styles.sizeItem}>
                <b key={uuidv4()}>{size.name}</b>
                {size.image_url? <img src={size.image_url} className={styles.sizeImage}/>: null}
                {size.dimensions.map(d => <p key={uuidv4()}>{d}</p>)}
                </div>
              )}
            </div>
            <div className={styles.textureContainer}>
              <h4 className={styles.headerContainer}>Textures</h4>
              <div className={styles.typeContainer}>
                {productState.textures.map(texture=>
                  <div key={uuidv4()} className={styles.textureContainer}>
                    <p key={uuidv4()}>{texture.name}</p>
                    <img key={uuidv4()} src={texture.image_url} />
                  </div>)}
                </div>
            </div>
          </div>
          <div className='specContainer'>
            <h4 className={styles.headerContainer}>Additional Information</h4>
            <a className={styles.pdfContainer} target='blank' href={`${productState.spec_sheet}`}>
              <div className='specSheetContainer'>Spec Sheet</div>
              <i className='bi bi-file-pdf'></i>
            </a>
            </div>
          </div>
      </div>
      : null

      }




    </div>

  );
}

export default Product;