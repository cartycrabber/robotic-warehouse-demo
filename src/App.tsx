import { useState } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
import './App.css';
import { useGetTasksQuery } from './app/api';
import { MapViewer } from './features/map-viewer/MapViewer';
import { TaskForm } from './features/tasks/TaskForm';
import { TaskList } from './features/tasks/TaskList';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const getTasksResponse = useGetTasksQuery();

  return (
    <Container className="App p-0">
      <div className="position-absolute top-0 start-0" style={{ zIndex: 1 }}>
        <button
          type="button"
          className="btn btn-outline-primary m-2 px-2 py-0 border border-dark border-2 bg-light"
          onClick={() => setShowMenu(!showMenu)}>
          <i className="bi bi-list fs-1 fw-bolder"></i>
        </button>
      </div>

      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} backdrop={false} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Robotic Warehouse Demo</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-4">
            <TaskForm />
          </div>
          Current Tasks
          {getTasksResponse.data ? <TaskList tasks={getTasksResponse.data}/> : "No Tasks" }
        </Offcanvas.Body>
      </Offcanvas>

      <MapViewer />
    </Container>
  );
}

export default App;
