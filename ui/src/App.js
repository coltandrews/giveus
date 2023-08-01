import "./App.css";
import { Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./context/themeContext";
import Layout from "./layouts/index";
import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home";
import NewDonation from "./views/new-donation";
import NewEvent from "./views/new-event";
import NonprofitEvents from "./views/nonprofit-events";
import MyEvents from "./views/my-events";
import MyDonations from "./views/my-donations";
import MyEvent from "./views/event";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/me" />
            <Route path="/donation/new" element={<NewDonation />} />
            <Route path="/event/new" element={<NewEvent />}/>
            <Route path="/my/events/:id" element={<MyEvents />}/>
            <Route path="/events/:id" element={<NonprofitEvents />}/>
            <Route path="/event/:id" element={<MyEvent />}/>
            <Route path="/my/donations/:id" element={<MyDonations />}/>
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
