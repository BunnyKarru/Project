import logo from './logo.svg';
import './App.css';

import Sidebar from './components/Sidebar';
import Project from './components/Project';
import Calendar from './components/Calender';
import AddHours from './components/TaskSheet';

function App() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar/>
      </div>
      <div className='project mt-10 flex-grow'>
      <Project/>
      </div>
    </div>
    
   
  )
}

export default App;
