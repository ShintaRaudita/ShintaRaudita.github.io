import {toLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import {toStringHDMS} from 'https://cdn.skypack.dev/ol/coordinate.js';
import {overlay,map,popupinfo,idmarker} from '../config/configpeta.js';
import {clickpopup} from '../template/template.js';
import {insertMarker,deleteMarker} from './marker.js';
import {setInner,textBlur, getValue,setValue} from '../element.js';
import { postBiasa } from "../api.js";
import {URLPostPoint} from '../template/template.js'


export function onClosePopupClick() {
    overlay.setPosition(undefined);
    textBlur('popup-closer');
}

export function onDeleteMarkerClick() {
    let idmarker = getValue('idmarker');
    popupinfo.setPosition(undefined);
    deleteMarker(idmarker);
}

export function onSubmitMarkerClick() {
  let long = getValue('long');
  let lat = getValue('lat');
  let name = getValue('name');
  let type = getValue('type');
    let data = {
      "type": "Feature",
      "properties": {
        "name": name
      },
      "geometry": {
        "type": type,
        "coordinates": [
          parseFloat(long),parseFloat(lat)
        ]
      }
    };
    postBiasa(URLPostPoint,data,afterSubmitCOG);
  overlay.setPosition(undefined);
  textBlur('popup-closer');
    insertMarker(name,long,lat,volume);
    idmarker.id=idmarker.id+1;
  console.log(name)
}

function afterSubmitCOG(result){
    alert("Refresh page untuk mengetahui apakah data sudah masuk atau belum");
}

function popupInputMarker(evt) {
    let tile = evt.coordinate;
    let coordinate = toLonLat(tile);
    let msg = clickpopup.replace("#LONG#",coordinate[0]).replace("#LAT#",coordinate[1]);
    msg = 'ID : '+idmarker.id+'<br>'+msg
    setInner('popup-content',msg);
    setValue('long',coordinate[0]);
    setValue('lat',coordinate[1]);
    overlay.setPosition(tile);
}

function popupGetMarker(evt,features) {
    let title = features.get('name');
    setInner('popupinfo-title',title);
    setValue('idmarker',features.get('id'));
    let ctnt = "type : "+features.getGeometry().getType()+"<br>XY : "+toLonLat(evt.coordinate);
    setInner('popupinfo-content',ctnt);
    popupinfo.setPosition(evt.coordinate);
}

export function onMapPointerMove(evt) {
  const pixel = map.getEventPixel(evt.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
}

let popover;
export function disposePopover() {
  if (overlay || popupinfo) {
    overlay.setPosition(undefined);
    popupinfo.setPosition(undefined);
  }
}

export function onMapClick(evt) {
    let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });
    overlay.setPosition(undefined);
    popupinfo.setPosition(undefined);
    if (!feature) {
        popupInputMarker(evt);
        return;
    }else{
        popupGetMarker(evt,feature);
    }
  }