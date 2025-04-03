import React, { useState, useEffect, useCallback } from 'react';
import '../css/article.css';
import files from '../Shared/Ressources/files';
import { motion, useAnimation } from 'framer-motion';
import { faClose, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Article({
  page,
  id = 0,
  isBig,
  onOpen,
  onClose,
  isExpert,
  ...props
}) {
  const jsonData = files.filesMap[page].default.data;
  const imgData = files.filesMap[page].default.images;
  const controls = useAnimation();
  const [isImageBig, setIsImageBig] = useState(false);
  const [bigImageSrc, setBigImageSrc] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [articleImages, setArticleImages] = useState([]);
  const animationVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      margin: 0,
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.2 },
      margin: '0 0 0.5rem',
    },
  };

  // Get all images from the article
  useEffect(() => {
    const images = jsonData
      .filter(item => item.type === 'image')
      .map(item => imgData[item.data]);
    setArticleImages(images);
  }, [jsonData, imgData]);

  const reducedData = [];
  for (let i = 0; i < jsonData.length; i++) {
    const data = jsonData[i];
    if (data.type === 'title' && (data.data === 'Repair' || data.data === 'Solution')) {
      break;
    } else {
      reducedData.push(data);
    }
  }

  const smallData = jsonData.filter((elem, id) => id === 0 || id === 2);

  useEffect(() => {
    if (isBig) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  });

  const handleClose = () => {
    controls.start('hidden').then(() => {
      onClose();
    });
  };

  const handleImageClick = (src) => {
    const index = articleImages.indexOf(src);
    setCurrentImageIndex(index);
    setBigImageSrc(src);
    setIsImageBig(true);
  };

  const handleBigImageClose = () => {
    setIsImageBig(false);
    setBigImageSrc('');
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex - 1 + articleImages.length) % articleImages.length;
    setCurrentImageIndex(newIndex);
    setBigImageSrc(articleImages[newIndex]);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex + 1) % articleImages.length;
    setCurrentImageIndex(newIndex);
    setBigImageSrc(articleImages[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isImageBig) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevImage(e);
      } else if (e.key === 'ArrowRight') {
        handleNextImage(e);
      } else if (e.key === 'Escape') {
        handleBigImageClose();
      }
    };

    if (isImageBig) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isImageBig, currentImageIndex, articleImages]);

  // Handle clicking outside the image
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isImageBig && !e.target.closest('.big-image-container')) {
        handleBigImageClose();
      }
    };

    if (isImageBig) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isImageBig]);

  const AnimatedElement = ({
    Component,
    children,
    className,
    id,
    animate = true,
    style,
    ...props
  }) => {
    const Comp = motion[Component];
    return (
      <Comp
        className={className}
        key={id}
        style={{
          width: '100%',
          ...style,
        }}
        {...(animate && {
          initial: isBig ? 'hidden' : 'hidden',
          animate: controls,
          exit: 'exit',
          variants: animationVariants,
        })}
        {...props}
      >
        {children}
      </Comp>
    );
  };

  const parseImg = (data, id) => {
    return (
      <motion.div
        key={id}
        className="image"
        initial="hidden"
        animate={controls}
        exit="exit"
        variants={animationVariants}
        onClick={() => handleImageClick(imgData[data.data])}
      >
        <img key={id} src={imgData[data.data]} alt="Article visual" />
      </motion.div>
    );
  };

  const parseSwitch = (data, id, isDemo) => {
    const type = data.type;
    const innerData = data.data;
    switch (type) {
      case 'title':
        return (
          <AnimatedElement
            Component="h2"
            className="title"
            animate={isDemo ? false : id !== 0}
          >
            {innerData.split('_').join(' ')}
          </AnimatedElement>
        );
      case 'text':
        return (
          <AnimatedElement
            Component="p"
            className="text"
            animate={isDemo ? false : id !== 2}
          >
            {data.data}
          </AnimatedElement>
        );
      case 'list':
        return (
          <AnimatedElement
            Component="p"
            className="list"
            style={{
              paddingLeft: data.indentation / 3,
            }}
          >
            {data.data}
          </AnimatedElement>
        );
      case 'image':
        return parseImg(data, id);
      default:
        break;
    }
  };

  const parseAll = () => {
    if (isBig) {
      let dataToUse = reducedData;
      if (isExpert) {
        dataToUse = jsonData;
      }
      return dataToUse.map((elem, id) => parseSwitch(elem, id, false));
    }
    return smallData.map((elem, id) => parseSwitch(elem, id, true));
  };

  const handleOutsideClick = useCallback((event) => {
    // Only close if clicking outside the article and not on another article
    if (isBig && !event.target.closest('.article')) {
      handleClose();
    }
  }, [isBig, handleClose]);

  useEffect(() => {
    if (isBig) {
      // Add the event listener when the article is open
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [isBig, handleOutsideClick]);

  return jsonData ? (
    <>
      <button
        className={`article ${isBig ? 'big' : 'small'}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Prevent multiple rapid clicks
          const now = Date.now();
          if (!window._lastClick || now - window._lastClick > 300) {
            window._lastClick = now;
            if (!isBig) {
              onOpen(id);
            } else {
              onClose();
            }
          }
        }}
      >
        {parseAll()}
      </button>
      {isImageBig && (
        <div className="big-image-overlay" onClick={handleBigImageClose}>
          <div className="big-image-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleBigImageClose}>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <img src={bigImageSrc} alt="Big visual" className="big-image" />
            <div className="navigation-controls">
              <button className="nav-button prev" onClick={handlePrevImage}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div className="image-counter">
                {currentImageIndex + 1} / {articleImages.length}
              </div>
              <button className="nav-button next" onClick={handleNextImage}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div />
  );
}

export default React.memo(Article, (prevProps, nextProps) => {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  if (prevKeys.length !== nextKeys.length) {
    console.log('Props length changed:', { prevProps, nextProps });
    return false;
  }
  for (let key of prevKeys) {
    if (key === 'onClose' || key === 'onOpen') {
      continue;
    } else if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
});
