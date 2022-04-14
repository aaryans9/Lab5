
const mapBoxApiKey = 'pk.eyJ1IjoiYWFyeWFucyIsImEiOiJja3pwd2xkeGswZTlwMm9yeDF6NnRjMDlhIn0.WGKgidynUJvizPaVAnRG0w';

var map = L.map('map').setView([51.049999, -114.066666],10);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/navigation-night-v1',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapBoxApiKey
    }).addTo(map);

    var layer = L.geoJSON();

var coordinate = [];
var geoFtr;


function drawLine () {

  map.dragging.disable();
  map.addEventListener('mousedown',function(e){

    map.addEventListener('mousemove', function(ee) {

       var lat = ee.latlng.lat;
       var long = ee.latlng.lng;
       var coord = [long, lat];
       coordinate.push(coord);

       geoFtr = {
           "type": "Feature",
           "geometry": {
             "type": "LineString",
             "coordinates": coordinate
           }
       };

       layer.addData(geoFtr);
       layer.addTo(map);
    });
  });

  map.on('mouseup',function(e){

    map.removeEventListener('mousemove');
    map.removeEventListener('mousedown');

    map.dragging.enable();
  });
}


function simpl (){

  var geojson = turf.multiLineString([coordinate]);

  var clr ={"color": "#FF0000"}

  var simplified = turf.simplify(geojson);
 
 
  map.removeLayer(layer);
  layer.clearLayers();
  layer.addData(simplified);

  layer.addTo(map);
  coordinate=[];
}

function deleteLine(){

  map.removeLayer(layer);
  layer.clearLayers();
  coordinate=[];
  
}