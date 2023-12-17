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


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Landing/>}
        />
        <Route
          path="/builder"
          element={ <AdventureBuilder />}
        />
        <Route
          path="/game"
          element={ <Game/>}
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
          element={ <Account />}
        />
        <Route render={() => <div>Error: Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
