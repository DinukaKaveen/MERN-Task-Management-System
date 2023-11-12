import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './pages/NavBar';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';

function App() {
  return (
      <BrowserRouter>
      <div>
        <NavBar/>
        <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/create_task' exact element={<CreateTask/>}></Route>
          <Route path='/update_task/:id' exact element={<UpdateTask/>}></Route>
        </Routes>
      </div>
      </BrowserRouter>

  );
}

export default App;
