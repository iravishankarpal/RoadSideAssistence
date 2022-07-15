import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
// import Header from "./component/Header";
// import Footer from "./component/Footer";
import Chat from "./component/Chat";
import MainMap from "./Pages/MainMap";
import SingUp from "./component/SingUp";
import Login from "./component/Login";
import NoMatch from "./Pages/NoMatch";
import Problem from "./component/UserQuery";
import MechanicLogin from "./component/MechanicLogin";
import Admin from "./Pages/Admin";
import AllClients from "./component/AllClients";
import AllMechanics from "./component/AllMechanics";
import AllQuery from "./component/AllQuery";
import MechanicPage from "./Pages/MechanicPage";
// import MechReg from "./Pages/MechReg";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<Navigate to="Login" replace />} />
            <Route path="Login" element={<Login />} />
            <Route path="Singup" element={<SingUp />} />
            <Route path="Mechanic" element={<MechanicLogin />} />
            {/* <Route path="Admin" element={<Admin />} /> */}
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="/MainMap" element={<MainMap />}>
            <Route index element={<Navigate to="Problem" replace />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="Problem" element={<Problem />} />
          </Route>
          <Route path="/Admin" element={<Admin />}>
            <Route index element={<Navigate to="Querys" replace />} />
            <Route path="Clients" element={<AllClients />} />
            <Route path="Mechanics" element={<AllMechanics />} />
            <Route path="Querys" element={<AllQuery />} />
            {/* <Route path="regMech" element={<MechReg />} /> */}
          </Route>
          <Route path="/MechanicPage" element={<MechanicPage />}>
            {/* <Route index element={<Navigate to="Querys" replace />} /> */}
            <Route path="Clients" element={<AllClients />} />
            <Route path="Mechanics" element={<AllMechanics />} />
            <Route path="Querys" element={<AllQuery />} />
            {/* <Route path="regMech" element={<MechReg />} /> */}
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
