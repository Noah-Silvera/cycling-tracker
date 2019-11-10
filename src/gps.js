
const filterGeojsonFeatures = function(geoJSON){
    geoJSON.features = geoJSON.features.filter((feature) => feature.geometry.type !== "Point")
    return geoJSON
}

const addGpsTrack = (() => {
        const colours = [
            "#3F33FF",
            "#FF3333",
            "#33FF55",
            "#D433FF",
            "#FFAB22"
        ]
        var i = 0;

        return function(map, track) {
            L.geoJSON(filterGeojsonFeatures(track), {
                style: ((feature) => ({
                "color": (colours[i % colours.length]),
                "weight": 3,
                }))
            }).addTo(map);

            i = (++i % colours.length)
        }
})();


export default {
    filterGeojsonFeatures,
    addGpsTrack 
}