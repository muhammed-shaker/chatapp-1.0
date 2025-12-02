import {Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";


import "./index.css";

export default function App() {


  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/room" element={<Room />}/>
        </Routes>
      </main>
    </div>
  )
}

