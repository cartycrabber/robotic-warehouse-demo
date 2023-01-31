import './App.css';
import { MapViewer } from './features/map-viewer/MapViewer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: "100vw", height: "100vh" }}>
          <MapViewer /> 
        </div>
      </header>
    </div>
  );
}

export default App;
