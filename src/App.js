import './App.css';
import { BrowserRouter, Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NotesState from './contexts/Notes/NotesState';

function App() {
  return (
    <>
    <NotesState>

    <BrowserRouter>
    <Navbar/> 
    <div className="container">

    <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/about" element={<About/>} />
  </Routes>
    </div>
    </BrowserRouter>
    </NotesState>
      </>
  );
}

export default App;
