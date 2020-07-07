const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const imgCarousel = document.getElementById("carousel_img")
const indicators = document.querySelectorAll('.indicators > span');
const images = ['./img/pic1.jpg', './img/pic2.jpg', './img/pic3.jpg'];

const setAttr = (el, attr, value) => el.setAttribute(attr, value);
const getAttr = (el, attr) => el.getAttribute(attr);

const getImageIndex = (image) => images.indexOf(image)

const getCurrentImageIndex = () => {
    const currentImage = getAttr(imgCarousel, 'src');
    return getImageIndex(currentImage);
};

const getArrowLeftImageIndex = (currentIndex) => {
    return currentIndex === 0 ? 2 : currentIndex - 1;
};

const getArrowRightImageIndex = (currentIndex) => {
    return currentIndex === 2 ? 0 : currentIndex + 1;
};

const activateIndicator = (index) => {
    indicators.forEach((el, i) => {
        if (el.classList.contains('active')) {
            el.classList.remove('active')
        };
        if (index === i) el.classList.add('active');
    })
};

const intervalSlider = (direction, delay = 2500) => {
    let callback = null,
        getNewIndexFunc = null;

    if (direction === 'left') {
        getNewIndexFunc = () => getArrowLeftImageIndex(getCurrentImageIndex());

    } else if (direction === 'right') {
        getNewIndexFunc = () => getArrowRightImageIndex(getCurrentImageIndex());
    } else if (direction === '') {
        getNewIndexFunc = () => getArrowRightImageIndex(getCurrentImageIndex());
    }

    callback = () => {
        let newIndex = getNewIndexFunc();
        activateIndicator(newIndex);
        setAttr(imgCarousel, 'src', images[newIndex]);
    }

    return () => setInterval(callback, delay);
}
const leftInterval = intervalSlider('left');
const rightInterval = intervalSlider('right');

let left = null,
    right = null;

arrowLeft.addEventListener('click', (e) => {
    const newIndex = getArrowLeftImageIndex(getCurrentImageIndex());
    activateIndicator(newIndex);
    right && clearInterval(right);
    if (!left) {
        left = leftInterval()
    }
    setAttr(imgCarousel, 'src', images[newIndex]);
});
arrowRight.addEventListener('click', (e) => {
    const newIndex = getArrowRightImageIndex(getCurrentImageIndex());
    activateIndicator(newIndex);
    left && clearInterval(left);
    if (!right) {
        right = rightInterval();
    }
    setAttr(imgCarousel, 'src', images[newIndex]);
});
$(function() {
    $('.arrow-right').trigger("click");
});