import './App.css';
import NoteState from './context/notes/NoteState';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './components/Login';
import Alert from './components/Alert'
import HomePage from './HomePage';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Alert />
          <Routes>
            <Route path='*' element={<HomePage />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
