import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "../src/Components/Menu.jsx"
import AppRouts from './router.jsx';
import Footer from './Components/footer.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Menu/>
    <AppRouts/>
    <Footer/>
  </>
)
