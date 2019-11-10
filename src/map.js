export default {
    initMap: () => {
        const map = L.map('map');
        const defaultCenter = [45.3658, -63.2869]
        const defaultZoom = 7.5;
        const basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        });
        
        map.setView(defaultCenter, defaultZoom);
        
        basemap.addTo(map);

        return map
    }
}