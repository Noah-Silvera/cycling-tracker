import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const map = L.map('map');
const defaultCenter = [45.3658, -63.2869]
const defaultZoom = 7.5;
const basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

map.setView(defaultCenter, defaultZoom);

basemap.addTo(map);


const day2 = require('./gps/day-2-peggys-cove.geojson');
const day3 = require('./gps/day-3-englishtown.geojson');
const day4 = require('./gps/day-4-englishtown-to-cheticamp.geojson');
const day5 = require('./gps/day-5-cape-breton-park.geojson');
const day6 = require('./gps/day-6-onto-pei.geojson');
const day7 = require('./gps/day-7-summerside.geojson');
const day8 = require('./gps/day-8-kayaking.geojson');
const day9 = require('./gps/day-9-charlottetown.geojson');
const day10 = require('./gps/day-10-pei-to-st-john.geojson');
const day11 = require('./gps/day-11-st-john-to-moncton.geojson');
const day12 = require('./gps/day-12-hopewell-rocks.geojson');
const day13 = require('./gps/day-13-slacks-cove.geojson');
const gpsTracks = [
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  day11,
  day12,
  day13,
]

const colours = [
  "#3F33FF",
  "#FF3333",
  "#33FF55",
  "#D433FF",
  "#FFAB22"
]

gpsTracks.forEach((track, i) => {
  L.geoJSON(filterGeojsonFeatures(track), {
    style: ((feature) => ({
      "color": (colours[i % colours.length]),
      "weight": 3,
    }))
  }).addTo(map);
})

function filterGeojsonFeatures(geoJSON){
  geoJSON.features = geoJSON.features.filter((feature) => feature.geometry.type !== "Point")
  return geoJSON
}