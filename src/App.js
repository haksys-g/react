import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import Nospoon from './components/Nospoon';
import TableAjax from './components/TableAjax';
import NospoonExam from './components/NospoonExam';
import Nospoon1 from './components/Nospoon1';
import NospoonBack from './components/Nospoon1back';
import Flow from './components/flow/Flow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/nospoon" element={<Nospoon />} />
        <Route path="/tableajax" element={<TableAjax />} />
        <Route path="/nospoon1" element={<Nospoon1 />} />
        <Route path="/nospoonexam" element={<NospoonExam />} />
        <Route path="/nospoon1back" element={<NospoonBack />} />
        <Route path="/flow" element={<Flow />} />
      </Routes>
  </Router> 
  );
}

export default App;
