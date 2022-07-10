import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
// import Header from "./component/Header";
// import Footer from "./component/Footer";
import Chat from "./Pages/Chat";
import MainMap from "./Pages/MainMap";
import SingUp from "./component/SingUp";
import Login from "./component/Login";
import NoMatch from "./Pages/NoMatch";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<Navigate to="Login" replace />} />
            <Route path="Login" element={<Login />} />
            <Route path="Singup" element={<SingUp />} />
          </Route>

          <Route path="/Chat" element={<Chat />} />
          <Route path="/MainMap" element={<MainMap />} />
          <Route path="*" element={<NoMatch />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
