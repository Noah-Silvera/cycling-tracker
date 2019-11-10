import 'leaflet.markercluster'
import '../libraries/Leaflet.Photo/Leaflet.Photo.js'
import '../libraries/Leaflet.Photo/Leaflet.Photo.css'

var photoLayer = null; 


const addPhotoToMap = (map, url, location) => {
    // TODO - videos
    photoLayer.add([{
        ...location,
        url: url,
        thumbnail: url,
        video: null
    }]);
}

const initPhotoLayer = (map) => {
    photoLayer = L.photo.cluster().on('click', function (evt) {
        var photo = evt.layer.photo,
			template = `<img src="${photo.url}"/></a><p>{caption}</p>`;
		if (photo.video && (!!document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2'))) {
			template = `<video autoplay controls poster="{url}"><source src="${photo.video}" type="video/mp4"/></video>`;
		}; 
		evt.layer.bindPopup(L.Util.template(template, photo), {
			className: 'leaflet-popup-photo',
			minWidth: 400
		}).openPopup();
    });

    photoLayer.addTo(map);
}

export default {
    initPhotoLayer,
    addPhotoToMap
}