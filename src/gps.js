
const filterOutPointFeatures = function(features){
    const filteredFeatures = features.filter((feature) => feature.geometry.type !== "Point")
    return filteredFeatures
}

const filterOnlyPointFeatures = function(features){
    const filteredFeatures = features.filter((feature) => feature.geometry.type === "Point")
    return filteredFeatures;
}

const lineWeight = 3;
const lineOpacity = 0.3;

function onEachFeature(feature, outlineLayer, embeddedLayer) {
    outlineLayer.on({
        mouseover: () => {
            embeddedLayer.setStyle({
                weight: lineWeight * 2,
                opacity: 1.0
            });
        },
        mouseout: () => {
            embeddedLayer.setStyle({
                weight: lineWeight,
                opacity: lineOpacity
            });
        },
        // click: zoomToFeature
    });
}


const dotColour = "#628395"
const lineColours = [ "#B49A67", "#8F91A9", "#96897B","#DBAD6A", "#E56B70", "#628395"]

const addGpsTrack = (() => {
    var lineIdx = 0;
    return function(map, gpsTrack) {
        var embeddedLayer = L.geoJSON({ ...gpsTrack.track, features: filterOutPointFeatures(gpsTrack.track.features) }, {
            style: ((feature) => ({
                "color": (lineColours[lineIdx++ % lineColours.length]),
                "weight": lineWeight,
                opacity: 1.0
            }))
        })

        embeddedLayer.addTo(map);

        var outlineLayer = L.geoJSON({ ...gpsTrack.track, features: filterOutPointFeatures(gpsTrack.track.features) }, {
            onEachFeature: (feature, outlineLayer) => onEachFeature(feature, outlineLayer, embeddedLayer),
            style: ((feature) => ({
                "color": "purple",
                "weight": lineWeight+45,
                opacity: 0
            }))
        })

        outlineLayer.addTo(map);

        outlineLayer.bindPopup("Popup content");
        outlineLayer.on('mouseover', function (e) {
            this.openPopup();
        });
        outlineLayer.on('mouseout', function (e) {
            this.closePopup();
        });

        const points = filterOnlyPointFeatures(gpsTrack.track.features);
        const lastPoint = points[points.length -1]

        L.marker(L.latLng(lastPoint.properties.latitude, lastPoint.properties.longitude), { color: dotColour})
            .bindPopup(gpsTrack.desc)
            .addTo(map);
    }
})();


export default {
    filterOutPointFeatures,
    filterOnlyPointFeatures,
    addGpsTrack 
}