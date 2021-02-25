import imgArray from '../gallery-items.js';
const galleryModal = document.querySelector('.js-lightbox');
const galleryModalImageEl = document.querySelector('.lightbox__content .lightbox__image');
const modalCloseButton = document.querySelector('button[data-action="close-lightbox"]')
const imageListEl = document.querySelector('ul.js-gallery');
const galleryModalOverlay = document.querySelector('.lightbox .lightbox__overlay')
const htmlStringGalleryImages = renderGalleryImages(imgArray);
let currentImageIndex = 0;
const allOriginalImagesSources = imgArray.map(({original}) => {
    return original
});

function renderGalleryImages (array) {
    return array
    .map (({description, original, preview}) => {
        return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="#"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    })
    .join('');
}
function onImageClick (evt) {
    if (evt.target.classList.contains('gallery__image')) {
        galleryModal.classList.add('is-open');
        galleryModalImageEl.src = evt.target.dataset.source;
        currentImageIndex = allOriginalImagesSources.indexOf(evt.target.dataset.source);
    };
};
function onModalCloseButtonClick () {
    galleryModal.classList.remove('is-open');
    galleryModalImageEl.src = '';
};
function onEscButtonPress (e) {
    if (e.code === 'Escape') {
        onModalCloseButtonClick();
    }
};
function onArrowsButtonPressed (e) {
    if (!galleryModal.classList.contains('is-open')) {
        return
    }
    else if (e.code === 'ArrowLeft') {
        if (currentImageIndex > 0) {
            const nextImageIndex = currentImageIndex - 1;
            galleryModalImageEl.src = allOriginalImagesSources[nextImageIndex];
            currentImageIndex = nextImageIndex;
        }
    }
    else if (e.code === 'ArrowRight') {
        if (currentImageIndex < allOriginalImagesSources.length - 1) {
            const nextImageIndex = currentImageIndex + 1;
            galleryModalImageEl.src = allOriginalImagesSources[nextImageIndex];
            currentImageIndex = nextImageIndex;
        }
    }
};
function onModalOverlayClick (e) {
    if (e.target.classList.contains('lightbox__overlay')) {
        onModalCloseButtonClick();
    }
};

imageListEl.innerHTML = htmlStringGalleryImages;
window.addEventListener('keydown', onEscButtonPress);
window.addEventListener('keydown', onArrowsButtonPressed);
imageListEl.addEventListener('click', onImageClick);
galleryModalOverlay.addEventListener('click', onModalOverlayClick);
modalCloseButton.addEventListener('click', onModalCloseButtonClick);