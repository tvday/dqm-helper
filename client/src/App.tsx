import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Monsters from "./pages/Monsters"
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Monster from "./pages/Monster";
// import Table from "./components/Table";

function App() {
  return (
      <div className="App">
        <header className="App-header">
        </header>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout/>}>
                      <Route index element={<Home/>}/>
                      <Route path="monsters" element={<Monsters/>}/>
                      <Route path="monsters/:slug" element={<Monster/>}/>
                      <Route path="contact" element={<Contact/>}/>
                      <Route path="*" element={<NoPage/>}/>
                  </Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
