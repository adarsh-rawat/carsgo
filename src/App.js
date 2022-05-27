import { useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar.js';
import {BrowserRouter, Link, Route, Routes, useLocation} from 'react-router-dom';
import Home from './components/Home.js';
import Sales from './components/Sales.js';
import Custom from './components/Custom.js';
import Geosales from './components/Geosales.js';

function App() {


  const sidebarItems = [
    <Link to='/'>Home</Link>, 
    <Link to='sales'>Sales</Link>, 
    <Link to='geo-report'>Geo Report</Link>,
    <Link to='custom-report'>Custom Reports</Link>
  ]

  var sidebarStatus = window.innerWidth < 980;

  function handleClick(){
      if(sidebarStatus == true){
          document.getElementById('sidebar').style.width = '0'
          
      }
      else
          document.getElementById('sidebar').style.width = '300px'
      sidebarStatus = sidebarStatus ? false: true
  }

  return (
    <div className="App">
      
      <div className="header">
          <div className="inner">
          <div id='sidebarbtn' onClick={handleClick}><img width='28px' src='https://freesvg.org/img/menu-icon.png'></img></div>
            <div className="item">CarsGo</div>
          </div>
        </div>
      <div className="main">
      <BrowserRouter>
        <Sidebar items={sidebarItems} handleClick={handleClick}/>
        <div className="page">
            <Routes>
              <Route element={<Home />} path='/'/>
              <Route element={<Sales />} path='sales'/>
              <Route element={<Geosales />} path='geo-report'/>
              <Route element={<Custom />} path='custom-report'/>
            </Routes>
        </div>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
