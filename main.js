const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash Api
const per_page= 30;
const apiKey = 'D69F1bwk3qZqCBC9fiR2kIi24chuIb_yPIePVUyCXuM'; // don't use this.


// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const apiUrl = `https://api.unsplash.com/search/photos/?page=1&query=dogs&client_id=${apiKey}&per_page=${per_page}&order_by=relevant;` 

const apiUrl2 = `https://api.unsplash.com/search/photos/?page=2&query=dogs&client_id=${apiKey}&per_page=${per_page}&order_by=relevant;`

const apiUrl3 = `https://api.unsplash.com/search/photos/?page=3&query=dogs&client_id=${apiKey}&per_page=${per_page}&order_by=relevant;` 

// check if all the images are loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}


// Helper Function to Set Attributes on DOM Elements
function setAttributes(element , attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// create elements for links & photos , Add to Dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.results.length;
    console.log('total images', totalImages);
    // run function for each object in photosArray
    photosArray.results.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });

        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular, // src = key and photo.urls.regular is attributes[key]
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // check when each image is finished loading
        img.addEventListener('load',imageLoaded);
        // put <img> inside <a> , then put both inside imageContainer div
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




// Get photos
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    }catch(error){
        console.log(error);
    }
}

async function getPhotos2(){
    try{
        const response = await fetch(apiUrl2);
        photosArray = await response.json();
        displayPhotos();
        getPhotos3();
    }catch(error){
        console.log(error);
    }
}

async function getPhotos3(){
    try{
        const response = await fetch(apiUrl3);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        console.log(error);
    }
}

// check to see if scrolling near bottom of page , Load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ){
        ready = false;
        getPhotos2();
    }
})



// on load
getPhotos();