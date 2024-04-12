import './App.css'
import GetImg from './components/GetImg'
import NavBar from './components/NavBar'
import Footer from './components/Footer'


function App() {

  return (
    <>
      <NavBar/>
      <div className='px-10'>
        <GetImg/>
      </div>
      <Footer/>
    </>
  )
}

export default App
