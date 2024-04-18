import logo from './logo.svg';
import './App.css';

import Sidebar from './components/Sidebar';

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar/>
      </div>
      <div className='project mt-10 flex-grow'>
      <Outlet/>
      </div>
    </div>
    
   
  )
}

export default App;
