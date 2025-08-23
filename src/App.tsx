import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OmnitrixClassic from "./OmnitrixClassic";
import OmnitrixAF from "./OmnitrixAF";
import Ultimatrix from "./Ultimatrix";
import Nav from "./Nav";
import NotFound from "./NotFound";
import Test from "./Test";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<OmnitrixClassic />} />
        <Route path="/af" element={<OmnitrixAF />} />
        <Route path="/ultimatrix" element={<Ultimatrix />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
