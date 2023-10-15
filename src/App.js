import './App.css';
import ContentPage from './components/ContentPage';
import Loader from './components/Loader';
import Sidemenu from './components/Sidemenu';
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  let loader = false // To be updated 

  return (
    <>
      <NoteState>
        <Router>
          {loader && <Loader />}
          <Sidemenu />
          <ContentPage />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
