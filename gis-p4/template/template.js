export let URLGeoJson = "https://us-central1-bustling-walker-340203.cloudfunctions.net/function-shinta";
export let URLPostPoint = "https://asia-southeast2-northern-eon-401500.cloudfunctions.net/func-geojson";
export let tableTag="tr";
export let tableRowClass="content is-medium";
export let tableTemplate=`
<td>#NAME#</td>
<td >#KORDINAT#</td>
<td>#TYPE#</td>
`
export const clickpopup = `
Long : #LONG#<br>
Lat  : #LAT#<br>
`