import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {UserCreate, UserList, UserEdit} from "./pages";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/add" element= {<UserCreate/>}/>
          <Route path="/" element= {<UserList/>} />
          <Route path="/update/:id" element= {<UserEdit/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
