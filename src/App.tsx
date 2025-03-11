import './App.css'
import 'leaflet/dist/leaflet.css';


import WeatherInfo from './components/WeatherInfo'
import MapCanvas from './components/MapCanvas'


function App() {

  return (
    <>
      <MapCanvas />
      <WeatherInfo />
    </>
  )
}

export default App
