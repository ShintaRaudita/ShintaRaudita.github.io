export let URLGeoJson = "https://us-central1-t-decoder-401501.cloudfunctions.net/function-2";
export let URLPostPoint = "https://asia-southeast2-t-decoder-401501.cloudfunctions.net/geojsonpoint";
export let tableTag="tr";
export let tableRowClass="content is-small";
export let tableTemplate=`
<td>#NAME#</td>
<td >#KORDINAT#</td>
<td>#TYPE#</td>
`
export const clickpopup = `
Long : #LONG#<br>
Lat  : #LAT#<br>
`