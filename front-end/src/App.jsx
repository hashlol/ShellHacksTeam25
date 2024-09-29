import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/home-page/HomePage";
import AboutPage from "./pages/about-page/AboutPage";
import ErrorPage from "./pages/error-page/ErrorPage";
import DummyPage from "./pages/dummy-page/DummyPage";
import QueryPage from "./pages/query-page/QueryPage";
import ContactPage from "./pages/contact-page/ContactPage";
import SpacedRepitionPage from "./pages/spaced-repetition-page/SpacedRepetitionPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/spaced-repetition" element={<SpacedRepitionPage />} />
          <Route path="/dummy" element={<DummyPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
