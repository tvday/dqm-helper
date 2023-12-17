import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Monsters from "./pages/Monsters"
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Monster from "./pages/Monster";
import Talents from "./pages/Talents";
import Talent from "./pages/Talent";
import SynthTree from "./components/synthTree/SynthTree";
import {MonsterSimpleData} from "./interfaces/monster";

const monster: MonsterSimpleData = {
    name: "Lieutenant Goreham-Hogg",
    id: 420,
    slug: "lieutenant-goreham-hogg",
    monsterNo: 420,
    family: "Demon",
    familyImageSlug: "demon.png",
    rank: "A",
    imgURL: ''
}

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
                      <Route path="talents" element={<Talents/>}/>
                      <Route path="talents/:slug" element={<Talent/>}/>
                      <Route path="contact" element={<Contact/>}/>
                      <Route path="tree" element={<SynthTree rootMonster={monster}/>}/>
                      <Route path="*" element={<NoPage/>}/>
                  </Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
