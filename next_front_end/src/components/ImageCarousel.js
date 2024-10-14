import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from '../css/ImageCarousel.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageCarousel({ imagesProp, returnToAllImages }) {
    const [imagesState, setImageState] = useState({
        images: imagesProp.images,
        index: Math.min(2, imagesProp.images.length - 1), // Start with the third image active
        colorActive: imagesProp.colorActive,
    });

    useEffect(()=>{
        setImageState({
          images:imagesProp.images,
          index: Math.min(2, imagesProp.images.length - 1),
          colorActive: imagesProp.colorActive
        }
        )

    },[imagesProp])

    const updateImageIndex = (event) => {
        const newIndex = Number(event.target.dataset.id);
        setImageState(prevState => ({
            ...prevState,
            index: newIndex,
        }));
    };

    const handlePrev = () => {
        setImageState(prevState => ({
            ...prevState,
            index: (prevState.index - 1 + prevState.images.length) % prevState.images.length,
        }));
    };

    const handleNext = () => {
        setImageState(prevState => ({
            ...prevState,
            index: (prevState.index + 1) % prevState.images.length,
        }));
    };

    const totalVisible = Math.min(5, imagesState.images.length);
    const halfVisible = Math.floor(totalVisible / 2);

    // Calculate the start index based on the current active index
    const startIndex = (imagesState.index - halfVisible + imagesState.images.length) % imagesState.images.length;

    // Create an array to hold the displayed images
    const displayedImages = [];
    for (let i = 0; i < totalVisible; i++) {
        const index = (startIndex + i) % imagesState.images.length;
        displayedImages.push(imagesState.images[index]);
    }



    return (
        <div className={styles.imageCarousel}>
            <div className={styles.mainImageContainer}>
                <img className={styles.mainImage} src={imagesState.images[imagesState.index].image_url} alt="Main" />
                {imagesState.colorActive && (
                <div className={styles.showAllBtn} onClick={returnToAllImages}>
                    <p>All Images</p>
                </div>
            )}
            </div>
            <div className={styles.thumbnailImages}>
              <div className={styles.arrowContainer} onClick={handlePrev}>
                <i className={`bi bi-arrow-left`}></i>
              </div>
                {displayedImages.map((image, index) => {
                    const thumbnailIndex = (startIndex + index) % imagesState.images.length;
                    return (
                        <div
                            className={thumbnailIndex === imagesState.index ? styles.thumbnailImageActive : styles.thumbnailImage}
                            key={uuidv4()}
                            data-id={thumbnailIndex}
                            onClick={updateImageIndex}
                        >
                            <img
                                data-id={thumbnailIndex}
                                src={image.image_url}
                                alt={`Thumbnail ${thumbnailIndex}`}
                            />
                        </div>
                    );
                })}
              <div className={styles.arrowContainer} onClick={handleNext}>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
        </div>
    );
}

export default ImageCarousel;