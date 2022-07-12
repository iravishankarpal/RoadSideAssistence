import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
// import Header from "./component/Header";
// import Footer from "./component/Footer";
import Chat from "./component/Chat";
import MainMap from "./Pages/MainMap";
import SingUp from "./component/SingUp";
import Login from "./component/Login";
import NoMatch from "./Pages/NoMatch";
import Problem from "./component/Problem";
import MechanicLogin from "./component/MechanicLogin";

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
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
