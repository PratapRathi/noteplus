import './App.css';
import ContentPage from './components/ContentPage';
import Loader from './components/Loader';
import Sidemenu from './components/Sidemenu';

function App() {

  let loader = false // To be updated 

  return (
    <>
      {loader && <Loader />}
      <div className='wrapper'>
        <Sidemenu />
        <ContentPage/>
      </div>
    </>
  );
}

export default App;
