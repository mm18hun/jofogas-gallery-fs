console.log('extension loaded');

var cover = document.getElementById('gallery-cover-container');

// if isset cover
if (cover) {
    cover.onclick = function() {
        console.log('cover clicked');
        // wait for gallery images to load
        setTimeout(getImages, 300);
    };
}

function getImages() {
    // get gallery images
    var images = document.querySelectorAll('[data-testid="adview-gallery-wrapper"] img.gallery-image');
    console.log(images.length," images found"); 

    // create a simple gallery
    var gallery = document.createElement('div');
    gallery.id = 'gallery';
    gallery.style.position = 'fixed';
    gallery.style.top = '0';
    gallery.style.left = '0';
    gallery.style.width = '100%';
    gallery.style.height = '100%';
    gallery.style.backgroundColor = 'black';
    gallery.style.zIndex = '999999';
    gallery.style.display = 'flex';
    gallery.style.justifyContent = 'start';
    gallery.style.alignItems = 'center';
    gallery.style.overflow = 'auto';
    gallery.style.cursor = 'pointer';
    gallery.style.padding = '10px';
    gallery.style.boxSizing = 'border-box';
    gallery.style.color = 'white';

    // add images from array
    for (var i = 0; i < images.length; i++) {
        var img = document.createElement('img');
        img.src = images[i].src;
        img.style.borderRadius = '10px';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        img.style.cursor = 'pointer';
        img.style.margin = '10px';
        img.onclick = function() {
            window.open(this.src, '_blank');
        };
        gallery.appendChild(img);
    }

    // add close button
    var closeButton = document.createElement('a');
    closeButton.href = '#';
    closeButton.style.position = 'fixed';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '30px';
    closeButton.style.textDecoration = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.innerHTML = '&times;';
    gallery.appendChild(closeButton);
    closeButton.onclick = function() {
        closeGallery(gallery);
    }

    // press esc close the gallery
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            closeGallery(gallery);
        }
    };  

    // add gallery to body
    document.body.appendChild(gallery);
    
}

function closeGallery(gallery) {
    gallery.remove();
    var galleryWrapper = document.querySelectorAll('[data-testid="adview-gallery-wrapper"]');
    // remove content of galleryWrapper
    galleryWrapper[0].style.display = 'none';
    // show cover
    var cover = document.getElementById('gallery-cover-container');
    cover.style.display = 'block';
    cover.style.overflow = 'hidden';
}