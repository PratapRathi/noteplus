import './App.css';
import Alert from './components/Alert';
import ContentPage from './components/ContentPage';
import Loader from './components/Loader';
import Sidemenu from './components/Sidemenu';
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router } from "react-router-dom";
import { useRef } from 'react';

function App() {
  const showSidemenu = useRef(null);

  return (
    <>
      <NoteState>
        <Router>
          <Loader />
          <Alert />
          <Navbar showSidemenu={showSidemenu}/>
          <Sidemenu showSidemenu={showSidemenu}/>
          <ContentPage />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
