import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containters/Home/Home";
// import Kalendar from "./containers/Kalendar/Kalendar";
import Kalendar from "./containters/Kalendar/Kalendar";
import Calendar from "./components/Calendar/Calendar";
import Bars from "./components/Bars/Bars";
import { LocationProvider } from "./shared/LocationContext";
import { IdProvider } from "./shared/IdProvider";
import { withIdProvider } from "./shared/HOC";
import ScrollToTop from "./UI/ScrollToTop/ScrollToTop";
import HeadHelmet from "./components/HeadHelmet/HeadHelmet";
import KalendarGodina from "./containters/KalendarGodina/KalendarGodina";
import SinglePost from "./containters/SinglePost/SinglePost";
import Footer from "./components/Footer/Footer";
import NoMatch from "./containters/NoMatch/NoMatch";
import SinglePost2 from "./containters/SinglePost/SinglePost2";
import SimplePage from "./containters/SimplePage/SimplePage";
import PreFooter from "./components/Footer/PreFooter";
import TodayPage from "./containters/TodayPage/TodayPage";

export default function App() {
  return (
    <Router>
      <LocationProvider>
        <HeadHelmet />
        <ScrollToTop />
        <Bars />
        <Routes>
          <Route path="/" element={React.createElement(withIdProvider(Home))} />
          {/* <Route
            path="/o-nama/"
            element={React.createElement(withIdProvider(SimplePage))}
          /> */}
          <Route
            path="/:slug/"
            exact="true"
            element={React.createElement(withIdProvider(KalendarGodina))}
          />
          <Route
            path="/:slug/:id/"
            exact="true"
            element={React.createElement(withIdProvider(Kalendar))}
          />
          <Route
            path="/meseceve-mene/"
            exact="true"
            element={React.createElement(withIdProvider(SinglePost))}
          />
          <Route
            path="/zadusnice/"
            exact="true"
            element={React.createElement(withIdProvider(SinglePost))}
          />
          <Route
            path="/slave/"
            exact="true"
            element={React.createElement(withIdProvider(SinglePost))}
          />
          {/* <Route
            path="/slave/:test"
            exact="true"
            element={React.createElement(withIdProvider(SinglePost))}
          /> */}
          {/* <Route
            path="/danas-je/"
            exact="true"
            element={React.createElement(withIdProvider(TodayPage))}
          /> */}
          <Route
            path="/imenoslov/"
            exact="true"
            element={React.createElement(withIdProvider(SinglePost))}
          />
          <Route
            path="/hriscanski-post/"
            exact="true"
            element={React.createElement(withIdProvider(SinglePost))}
          />
          <Route
            path="/molitvenik/"
            exact="true"
            element={React.createElement(withIdProvider(SinglePost))}
          />
          <Route
            path="/molitvenik/:test"
            exact="true"
            element={React.createElement(withIdProvider(SinglePost2))}
          />
          <Route
            path="/widget/"
            exact="true"
            element={React.createElement(withIdProvider(Calendar))}
          />

          {/* <Route
          path="/:slug"
          element={React.createElement(withIdProvider(SimplePage))}
          /> */}

          <Route
            path="/info/:slug/"
            element={React.createElement(withIdProvider(SimplePage))}
          />
          <Route
            path="*"
            element={React.createElement(withIdProvider(NoMatch))}
          />
        </Routes>
        <PreFooter />
        <IdProvider>
          <Footer />
        </IdProvider>
      </LocationProvider>
    </Router>
  );
}
