import "./App.css";
import { Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./context/themeContext";
import Layout from "./layouts/index";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import { useEffect, createContext, useState } from "react";
import { getMe } from "./utility/api";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" />
            <Route path="/profile/me" />
            <Route path="/donation/new" />
            <Route path="/event/new" />
            <Route path="/events/me" />
            <Route path="/donations/me" />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
