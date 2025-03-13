import './App.css'
import 'leaflet/dist/leaflet.css';


import WeatherInfo from './components/WeatherInfo'
import MapCanvas from './components/MapCanvas'
import WeatherEnroute from './components/WeatherEnroute';
import DepartInfo from './components/DepartInfo';


function App() {

  return (
    <> 
      <div className='child-left'>
        <MapCanvas />
      </div>
      {/* <div className='child-right'>
        <WeatherInfo />
      </div> */}
      <div className='child-right'>
        <DepartInfo />
      </div>
      <div className='child-right2'>
        <WeatherEnroute />
      </div>



    </>
  )
}

export default App
