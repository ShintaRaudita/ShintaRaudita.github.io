document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

    fetch("point.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

    fetch("gon.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("line2.json") 
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener('DOMContentLoaded', () => {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([107.5416799275933, -6.87445390263882]),
            zoom: 15
        })
    });

    //download data point, polygon, dan polyline
    const pointSource = new ol.source.Vector({
        url: 'point.json',
        format: new ol.format.GeoJSON()
    });

    const gonSource = new ol.source.Vector({
        url: 'gon.json',
        format: new ol.format.GeoJSON()
    });

    const lineSource = new ol.source.Vector({
        url: 'line2.json',
        format: new ol.format.GeoJSON()
    });

    //buat layer untuk point, polygon, dan polyline
    const pointLayer = new ol.layer.Vector({
        source: pointSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'blue'
                })
            })
        })
    });

    const gonLayer = new ol.layer.Vector({
        source: gonSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 2
            })
        })
    });

    const lineLayer = new ol.layer.Vector({
        source: lineSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 5
                
            })
        })
    });

    //tambahkan layer ke peta
    map.addLayer(pointLayer);
    map.addLayer(gonLayer);
    map.addLayer(lineLayer);

    //dapatkan koordinat dari GeoJSON
    const getCoordinates = (source) => {
        const features = source.getFeatures();
        const coordinates = features[0].getGeometry().getCoordinates();
        return coordinates;
    };

    //tampilkan koordinat di dalam tabel
    pointSource.once('change', () => {
        const pointCoords = getCoordinates(pointSource);
        document.getElementById('featureName').textContent = 'Point';
        document.getElementById('featureType').textContent = 'Point';
        document.getElementById('featureCoords').textContent = pointCoords.toString();
    });

    gonSource.once('change', () => {
        const gonCoords = getCoordinates(lineStringSource);
        document.getElementById('featureName').textContent = 'Polygon';
        document.getElementById('featureType').textContent = 'Polygon';
        document.getElementById('featureCoords').textContent = gonCoords.toString();
    });

    ineSource.once('change', () => {
        const lineCoords = getCoordinates(polylineSource);
        document.getElementById('featureName').textContent = 'Polyline';
        document.getElementById('featureType').textContent = 'Polyline';
        document.getElementById('featureCoords').textContent = lineCoords.toString();
    });
});


    //tambahkan layer ke peta
    map.addLayer(pointLayer);
    map.addLayer(gonLayer);
    map.addLayer(lineLayer);

    //dapatkan koordinat dari GeoJSON
    function getCoordinates(source) {
        var features = source.getFeatures();
        var coordinates = features[0].getGeometry().getCoordinates();
        return coordinates;
    }

    //tampilkan koordinat di dalam tabel
    pointSource.once('change', function() {
        var pointCoords = getCoordinates(pointSource);
        document.getElementById('featurename').textContent = 'Point';
        document.getElementById('featureType').textContent = 'Point';
        document.getElementById('featureCoords').textContent = pointCoords.toString();
    });

    gonSource.once('change', function() {
        var gonCoords = getCoordinates(gonSource);
        document.getElementById('featurename').textContent = 'Polygon';
        document.getElementById('featureType').textContent = 'Polygon';
        document.getElementById('featureCoords').textContent = gonCoords.toString();
    });

    lineSource.once('change', function() {
        var lineCoords = getCoordinates(lineSource);
        document.getElementById('featurename').textContent = 'Polyline';
        document.getElementById('featureType').textContent = 'Polyline';
        document.getElementById('featureCoords').textContent = lineCoords.toString();
    });

    