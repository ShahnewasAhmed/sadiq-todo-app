import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Home
        searchTerm={searchTerm}
      />
    </>
  );
}

export default App;