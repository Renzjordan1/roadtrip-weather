import './App.css'
import 'leaflet/dist/leaflet.css';


import WeatherInfo from './components/WeatherInfo'
import MapCanvas from './components/MapCanvas'
import WeatherEnroute from './components/WeatherEnroute';


function App() {

  return (
    <> 
      <div className='child-left'>
        <MapCanvas />
      </div>
      <div className='child-right'>
        <WeatherInfo />
      </div>
      
      <WeatherEnroute />

    </>
  )
}

export default App
