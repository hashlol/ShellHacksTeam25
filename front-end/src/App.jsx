import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/home-page/HomePage";
import AboutPage from "./pages/about-page/AboutPage";
import ErrorPage from "./pages/error-page/ErrorPage";
import DummyPage from "./pages/dummy-page/DummyPage";
import QueryPage from "./pages/query-page/QueryPage";
import ContactPage from "./pages/contact-page/ContactPage";
import SpacedRepitionPage from "./pages/spaced-repetition-page/SpacedRepetitionPage";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function AnimatedRoutes() {
  const location = useLocation(); // Get the current location for transitions

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname} // Transition key based on route path
        classNames="page" // Use the classNames "page" to match your CSS
        timeout={300} // Timeout matching your CSS transition
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
            <Route path="/dummy" element={<DummyPage />} />
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
      <NavBar /> {/* Keep the NavBar outside of animations */}
      <AnimatedRoutes /> {/* Routes with animation */}
    </BrowserRouter>
  );
}

export default App;
