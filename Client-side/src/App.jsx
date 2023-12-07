import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RoomPage from './pages/RoomPage'
import { SocketProvider } from "./provider/Socket";
import {PeerProvider} from './provider/Peers'

function App() {
  return (
    <>
      <div className="app">
        <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<RoomPage/>} />
          </Routes>
          </PeerProvider>
        </SocketProvider>
      </div>
    </>
  );
}

export default App;
