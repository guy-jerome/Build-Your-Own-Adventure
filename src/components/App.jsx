import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

import Game from "./Game/Game.jsx";
import AdventureBuilder from "./AdventureBuilder/AdventureBuilder.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import Account from "./Account/Account.jsx";
import Landing from "./Landing/Landing.jsx";

import {useState} from "react"

export default function App() {


  const [currentAdventure, setCurrentAdventure] = useState(null)

  function handleCurrentAdventure(adventure){
    setCurrentAdventure(adventure)
  }

  async function updateAdventure(locations){
    await setCurrentAdventure((prevCurrentAdventure) => ({
      ...prevCurrentAdventure,
      locations: locations,
    }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Landing currentAdventure={currentAdventure} handleCurrentAdventure={handleCurrentAdventure}/>}
        />
        <Route
          path="/builder"
          element={ <AdventureBuilder currentAdventure={currentAdventure} handleCurrentAdventure={handleCurrentAdventure} updateAdventure={updateAdventure}/>}
        />
        <Route
          path="/game"
          element={ <Game currentAdventure={currentAdventure} />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register/>}
        />
        <Route
          path="/account"
          element={ <Account handleCurrentAdventure={handleCurrentAdventure}/>}
        />
        <Route render={() => <div>Error: Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
