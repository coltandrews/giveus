import "./App.css";
import { Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./context/themeContext";
import Layout from "./layouts/index";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Register></Register>
      </ThemeContextProvider>
      {/* <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Route>
        </Routes>
      </ThemeContextProvider> */}
    </div>
  );
}

export default App;
