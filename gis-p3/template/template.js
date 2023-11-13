export let URLGeoJson = "https://us-central1-bustling-walker-340203.cloudfunctions.net/function-shinta";
export let URLPostPoint = "https://asia-southeast2-befous.cloudfunctions.net/Befous-MembuatGeojsonPoint";
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