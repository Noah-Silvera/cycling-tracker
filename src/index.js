import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapModule from 'map.js';
import gpsModule from 'gps.js'
import photoModule from 'photos.js'



function loadGpsTracks(map){
  const dayDescriptions = [
    "Day 2 - First Driving Day - Peggy's Cove.",
    "Day 3 - Halifax to Englishtown",
    "Day 4 - Englishtown to Cheticamp",
    "Day 5 - Cape Breton Park Adventures",
    "Day 6 - PEI National Park",   
    "Day 7 - PEI Summerside",   
    "Day 8 - PEI Kayaking and Exploring the South Coast",   
    "Day 9 - PEI Charlottetown",   
    "Day 10 - PEI to St. Johns",   
    "Day 11 - St. Johns to Moncton",   
    "Day 11 - Hopewell Rocks",   
    "Day 11 - Slacks Cove",   
  ]

  const day2 = require('./gps/day-2-peggys-cove.geojson');
  const day3 = require('./gps/day-3-englishtown.geojson');
  const day4 = require('./gps/day-4-englishtown-to-cheticamp.geojson');
  const day5 = require('./gps/day-5-cape-breton-park.geojson');
  const day6 = require('./gps/day-6-onto-pei.geojson');
  const day7 = require('./gps/day-7-summerside.geojson');
  const day8 = require('./gps/day-8-kayaking.geojson');
  const day9 = require('./gps/day-9-charlottetown.geojson');
  const day10 = require('./gps/day-10-pei-to-st-john.geojson')
  const day11 = require('./gps/day-11-st-john-to-moncton.geojson');
  const day12 = require('./gps/day-12-hopewell-rocks.geojson');
  const day13 = require('./gps/day-13-slacks-cove.geojson');
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

