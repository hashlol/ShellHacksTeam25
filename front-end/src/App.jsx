import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/home-page/HomePage";
import AboutPage from "./pages/about-page/AboutPage";
import ErrorPage from "./pages/error-page/ErrorPage";
import DummyPage from "./pages/dummy-page/DummyPage";
import ContactPage from "./pages/contact-page/ContactPage";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <>
      <Auth0Provider
        domain="{YOUR_DOMAIN}"
        clientId="{YOUR_CLIENT_ID}"
        redirectUri={window.location.origin}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </>
  );
}

export default App;
