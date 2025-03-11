import './App.css'
import 'leaflet/dist/leaflet.css';



import WeatherInfo from './components/WeatherInfo'
import MapDirections from './components/MapDirections'


function App() {

  return (
    <>
      <MapDirections />
      <WeatherInfo />
    </>
  )
}

export default App
