import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapModule from 'map.js';
import gpsModule from 'gps.js'

const gpsTracks = [
  {track: require('./gps/day-2-peggys-cove.geojson'), desc: "Day 2 First Driving Day - Peggy's Cove [249 km]"},
  {track: require('./gps/day-3-englishtown.geojson'), desc: "Day 3 Halifax to Englishtown [438 km]"},
  {track: require('./gps/day-4-englishtown-to-cheticamp.geojson'), desc: "Day 4 Englishtown to Cheticamp [168 km]"},
  {track: require('./gps/day-5-cape-breton-park.geojson'), desc: "Day 5 Cape Breton Park Adventures [31 km]"},
  {track: require('./gps/day-6-onto-pei.geojson'), desc: "Day 6 Getting to PEI [365 km]"},
  {track: require('./gps/day-7-pei-national-park.geojson'), desc: "Day 7 PEI National Parks [200 km]"},
  {track: require('./gps/day-8-summerside.geojson'), desc: "Day 8 PEI Lighthouse Museum [239 km]"},
  {track: require('./gps/day-9-kayaking.geojson'), desc: "Day 9 PEI Kayaking and Exploring the South Coast [124 km]"},
  {track: require('./gps/day-10-charlottetown.geojson'), desc: "Day 10 PEI Charlottetown [84 km]"},
  {track: require('./gps/day-11-pei-to-st-john.geojson'), desc: "Day 11 PEI to St. Johns [421 km]"},
  {track: require('./gps/day-12-st-john-to-moncton.geojson'), desc: "Day 12 St. Johns to Moncton [231 km]"},
  {track: require('./gps/day-13-hopewell-rocks.geojson'), desc: "Day 13 Hopewell Rocks [153 km]"},
  {track: require('./gps/day-14-slacks-cove.geojson'), desc: "Day 14 Slacks Cove [117 km]"},
]

/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const map = mapModule.initMap();
gpsTracks.forEach((gpsTrack) => gpsModule.addGpsTrack(map, gpsTrack))

