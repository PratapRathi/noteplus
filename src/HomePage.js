import React, {useRef} from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar';
import Sidemenu from './components/Sidemenu';
import ContentPage from './components/ContentPage';

const HomePage = () => {
const showSidemenu = useRef(null);
  return (
    <>
        <Loader/>
        <Navbar showSidemenu={showSidemenu} />
        <Sidemenu showSidemenu={showSidemenu} />
        <ContentPage />
    </>
  )
}

export default HomePage
