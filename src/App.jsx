import './App.css'
import GetImg from './components/GetImg'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SharePopup from './components/SharePopup'

function App() {

  return (
    <>
      <NavBar/>
      <div className='px-20'>
        <GetImg/>
      </div>
      <Footer/>
    </>

  )
}

export default App
