const isPointFeature = function(feature){
    return feature.geometry.type == "Point"
}

// show the highlight line
const onMouseover = (embeddedLayer) => {
    embeddedLayer.bringToFront()
    embeddedLayer.setStyle({
        weight: lineWeight * 2,
        opacity: 1.0
    });
}

// hide the highlight line s
const onMouseout = (embeddedLayer) => {
    embeddedLayer.setStyle({
        weight: lineWeight,
        opacity: lineOpacity
    });
}

function onEachFeature(feature, outlineLayer, embeddedLayer) {
    outlineLayer.on({
        mouseover: () => onMouseover(embeddedLayer),
        mouseout: () => onMouseout(embeddedLayer)
    });
}

const lineWeight = 3;
const lineOpacity = 0.7;
const dotColour = "#628395"

const getNextLineColour = (() => {
    const lineColours = [ "#B49A67", "#8F91A9", "#96897B","#DBAD6A", "#E56B70", "#628395"]
    var lineIdx = 0;
    return () => lineColours[lineIdx++ % lineColours.length]
})();

const addGpsTrack = function(map, gpsTrack) {
    // Visible line representing the GPS track
    var mainTrack = L.geoJSON({ ...gpsTrack.track, features: gpsTrack.track.features.filter((feature) => !isPointFeature(feature)) }, {
        style: ((feature) => ({
            "color": getNextLineColour(),
            "weight": lineWeight,
            opacity: 1.0
        }))
    })

    mainTrack.addTo(map);

    // Highlight line that appears on mouseover
    var trackHighlight = L.geoJSON({ ...gpsTrack.track, features: gpsTrack.track.features.filter((feature) => !isPointFeature(feature)) }, {
        onEachFeature: (feature, trackHighlight) => onEachFeature(feature, trackHighlight, mainTrack),
        style: ((feature) => ({
            "color": "purple",
            "weight": lineWeight + 45,
            opacity: 0
        }))
    })

    trackHighlight.addTo(map);

    // Popup the description on mouseover
    trackHighlight.bindPopup(gpsTrack.desc, { autoPan: false });

    trackHighlight.on('mouseover', function (e) {
        this.openPopup();
    });
    
    trackHighlight.on('mouseout', function (e) {
        this.closePopup();
    });

    const points = gpsTrack.track.features.filter(isPointFeature);
    const lastPoint = points[points.length -1]

    // Add the marker at the endpoint point of the GPS track, and show the track highlight on mouseover
    L.marker(L.latLng(lastPoint.properties.latitude, lastPoint.properties.longitude), { color: dotColour})
        .on('popupopen', () => onMouseover(mainTrack))
        .on('popupclose', () => onMouseout(mainTrack))
        .bindPopup(gpsTrack.desc, { autoPan: false })
        .addTo(map);
}


export default {
    addGpsTrack 
}