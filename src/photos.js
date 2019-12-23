import 'leaflet.markercluster'

L.Photo = L.FeatureGroup.extend({
	options: {
		icon: {						
			iconSize: [40, 40]
		}
	},

	initialize: function (photos, options) {
		L.setOptions(this, options);
		L.FeatureGroup.prototype.initialize.call(this, photos);
	},

	addLayers: function (photos) {
		if (photos) {
			for (var i = 0, len = photos.length; i < len; i++) {
				this.addLayer(photos[i]);
			}
		}
		return this;
	},

	addLayer: function (photo) {	
		L.FeatureGroup.prototype.addLayer.call(this, this.createMarker(photo));
	},

	createMarker: function (photo) {
		var marker = L.marker(photo, {
			icon: L.divIcon(L.extend({
				html: '<div style="background-image: url(' + photo.thumbnail + ');"></div>​',
				className: 'leaflet-marker-photo'
			}, photo, this.options.icon)),
			title: photo.caption || ''
		});		
		marker.photo = photo;
		return marker;
	}
});

L.photo = function (photos, options) {
	return new L.Photo(photos, options);
};

if (L.MarkerClusterGroup) {

	L.Photo.Cluster = L.MarkerClusterGroup.extend({
		options: {
			featureGroup: L.photo,		
			maxClusterRadius: 100,		
			showCoverageOnHover: false,
			iconCreateFunction: function(cluster) {
				return new L.DivIcon(L.extend({
					className: 'leaflet-marker-photo', 
					html: '<div style="background-image: url(' + cluster.getAllChildMarkers()[0].photo.thumbnail + ');"></div>​<b>' + cluster.getChildCount() + '</b>'
				}, this.icon));
		   	},	
			icon: {						
				iconSize: [40, 40]
			}		   		
		},

		initialize: function (options) {	
			options = L.Util.setOptions(this, options);
			L.MarkerClusterGroup.prototype.initialize.call(this);
			this._photos = options.featureGroup(null, options);
		},

		add: function (photos) {
			this.addLayer(this._photos.addLayers(photos));
			return this;
		},

		clear: function () {
			this._photos.clearLayers();
			this.clearLayers();
		}

	});

	L.photo.cluster = function (options) {
		return new L.Photo.Cluster(options);	
	};

}

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