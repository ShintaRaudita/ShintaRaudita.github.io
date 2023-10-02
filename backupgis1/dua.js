document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("gisTable").getElementsByTagName('tbody')[0];

    fetch("map.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});
