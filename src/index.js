import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapModule from 'map.js';
import gpsModule from 'gps.js'
import photoModule from 'photos.js'



function loadGpsTracks(map){
  const dayDescriptions = [
    "Day 2 First Driving Day - Peggy's Cove [249 km]",
    "Day 3 Halifax to Englishtown [438 km]",
    "Day 4 Englishtown to Cheticamp [168 km]",
    "Day 5 Cape Breton Park Adventures [31 km]",
    "Day 6 Getting to PEI [365 km]",  
    "Day 7 PEI National Parks [200 km]",   
    "Day 8 PEI Lighthouse Museum [239 km]",   
    "Day 9 PEI Kayaking and Exploring the South Coast [124 km]",   
    "Day 10 PEI Charlottetown [84 km]",   
    "Day 11 PEI to St. Johns [421 km]",   
    "Day 12 St. Johns to Moncton [231 km]",   
    "Day 13 Hopewell Rocks [153 km]",   
    "Day 14 Slacks Cove [117 km]",   
  ]

  const day2 = require('./gps/day-2-peggys-cove.geojson');
  const day3 = require('./gps/day-3-englishtown.geojson');
  const day4 = require('./gps/day-4-englishtown-to-cheticamp.geojson');
  const day5 = require('./gps/day-5-cape-breton-park.geojson');
  const day6 = require('./gps/day-6-onto-pei.geojson');
  const day7 = require('./gps/day-7-pei-national-park.geojson');
  const day8 = require('./gps/day-8-summerside.geojson');
  const day9 = require('./gps/day-9-kayaking.geojson');
  const day10 = require('./gps/day-10-charlottetown.geojson');
  const day11 = require('./gps/day-11-pei-to-st-john.geojson')
  const day12 = require('./gps/day-12-st-john-to-moncton.geojson');
  const day13 = require('./gps/day-13-hopewell-rocks.geojson');
  const day14 = require('./gps/day-14-slacks-cove.geojson');
  const gpsTracks = [
    {track: day2, desc: dayDescriptions[0]},
    {track: day3, desc: dayDescriptions[1]},
    {track: day4, desc: dayDescriptions[2]},
    {track: day5, desc: dayDescriptions[3]},
    {track: day6, desc: dayDescriptions[4]},
    {track: day7, desc: dayDescriptions[5]},
    {track: day8, desc: dayDescriptions[6]},
    {track: day9, desc: dayDescriptions[7]},
    {track: day10, desc: dayDescriptions[8]},
    {track: day11, desc: dayDescriptions[9]},
    {track: day12, desc: dayDescriptions[10]},
    {track: day13, desc: dayDescriptions[11]},
    {track: day14, desc: dayDescriptions[12]},
  ]

  gpsTracks.forEach((gpsTrack) => gpsModule.addGpsTrack(map, gpsTrack))
}

function loadPhotos(map){
  
  var req = require.context("./photos/", true, /\.(jpg)$/);

  var fileReader = new FileReader();
  req.keys().forEach(function(key){
    var photoData = req(key); 
    if(!!photoData.exif.GPS){
      photoModule.addPhotoToMap(map, photoData.src, photoData.exif.GPS )
    }
  });
}

// TODO - distances on the tracks

/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const map = mapModule.initMap();
photoModule.initPhotoLayer(map)
loadGpsTracks(map);
loadPhotos(map);

