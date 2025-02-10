import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containters/Home/Home";
// import Kalendar from "./containers/Kalendar/Kalendar";
import Kalendar from "./containters/Kalendar/Kalendar";
import Bars from "./components/Bars/Bars";
import { LocationProvider } from "./shared/LocationContext";
import withIdProvider from "./shared/HOC";
import ScrollToTop from "./UI/ScrollToTop/ScrollToTop";
import HeadHelmet from "./components/HeadHelmet/HeadHelmet";
import KalendarGodina from "./containters/KalendarGodina/KalendarGodina";
import SinglePost from "./containters/SinglPost/SinglePost";
import Footer from "./components/Footer/Footer";

export default function App() {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetch("http://localhost:3000/data.json")
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.log("Error fetching data:", error));
  // }, []);
  return (
    <Router>
      <LocationProvider>
        <HeadHelmet />
        <ScrollToTop />
        <Bars />
        <Routes>
          <Route path="/" element={React.createElement(withIdProvider(Home))} />
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
        </Routes>
        <Footer />
      </LocationProvider>
    </Router>
  );
}
