import { Routes, Route } from "react-router-dom";
import Home from "./pages/Browse"; // ✅ Confirm path
import Auth from "./pages/Auth";
import OAuthSuccess from "./pages/OAuthSuccess";
import Profile from "./pages/Profile";


function App() {
  return (
    <Routes>
      <Route  path="/profile" element={< Profile/>}/>
      <Route path="/" element={<Home />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/browse" element={<Home />} />
    </Routes>
  );
}

export default App;
