import './App.css';
import Loader from './components/Loader';
import Sidemenu from './components/Sidemenu';

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
