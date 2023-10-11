import './App.css';
import Sidemenu from './components/Sidemenu';
import Loader from './components/Loader';

function App() {

  let loader = false // To be updated 
  
  return (
    <>
    {loader && <Loader/>}
    <div className='d-flex'>
      <Sidemenu/>
      <div className="main"></div>
    </div>
    </>
  );
}

export default App;
