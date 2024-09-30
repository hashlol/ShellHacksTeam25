import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/home-page/HomePage";
import AboutPage from "./pages/about-page/AboutPage";
import ErrorPage from "./pages/error-page/ErrorPage";
import QueryPage from "./pages/query-page/QueryPage";
import ContactPage from "./pages/contact-page/ContactPage";
import SpacedRepitionPage from "./pages/spaced-repetition-page/SpacedRepetitionPage";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

function AnimatedRoutes() {
  const location = useLocation(); // Get the current location for transitions

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        classNames="page"
        timeout={300}
        unmountOnExit
      >
        <div className="page">
          <Routes location={location}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/query" element={<QueryPage />} />
            <Route path="/spaced-repetition" element={<SpacedRepitionPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
