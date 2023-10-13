import './App.css';
import ContentPage from './components/ContentPage';
import Loader from './components/Loader';
import Sidemenu from './components/Sidemenu';
import NoteState from './context/notes/NoteState';

function App() {

  let loader = false // To be updated 

  return (
    <>
      <NoteState>
        {loader && <Loader />}
        <Sidemenu />
        <ContentPage />
      </NoteState>
    </>
  );
}

export default App;
