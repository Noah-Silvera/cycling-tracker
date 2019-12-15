
const filterOutPointFeatures = function(features){
    const filteredFeatures = features.filter((feature) => feature.geometry.type !== "Point")
    return filteredFeatures
}

const filterOnlyPointFeatures = function(features){
    const filteredFeatures = features.filter((feature) => feature.geometry.type === "Point")
    return filteredFeatures
}

const dotColour = "#628395"
const lineColours = [ "#DBAD6A", "#96897B", "#628395"]

const addGpsTrack = (() => {
    var lineIdx = 0;
    return function(map, gpsTrack) {
        L.geoJSON({ ...gpsTrack.track, features: filterOutPointFeatures(gpsTrack.track.features) }, {
            style: ((feature) => ({
            "color": (lineColours[lineIdx++ % lineColours.length]),
            "weight": 3,
            }))
        }).addTo(map);

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