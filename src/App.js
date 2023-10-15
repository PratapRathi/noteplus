import './App.css';
import Alert from './components/Alert';
import ContentPage from './components/ContentPage';
import Loader from './components/Loader';
import Sidemenu from './components/Sidemenu';
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Loader />
          <Alert />
          <Sidemenu />
          <ContentPage />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
