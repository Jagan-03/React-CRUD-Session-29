import { BrowserRouter as Router } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes />
    </Router>
  );
}

export default App;
