import * as L from 'leaflet';

import { useMapEvents } from 'react-leaflet'

import useLatLngStore from '../stores/SelectedLatLng'



// Draws Directions on Map
const MapEvents = () => {

  // Global Stores
  const latLngStore = useLatLngStore()

  // Map Interations
  const map = useMapEvents({
    click: (e) => {
      // Set and indicate Lat/Lng of selected spot
      console.log('clicked at:', e.latlng)
      latLngStore.setLatLng(e.latlng.lat, e.latlng.lng)
      map.openPopup(L.popup()
        .setLatLng([e.latlng.lat, e.latlng.lng])
        .setContent(`${e.latlng.lat}, ${e.latlng.lng}`)
      )
    },

  })
  return null



}


export default MapEvents
