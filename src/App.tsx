import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route } from "react-router-dom";
import CookieBanner from "react-cookie-banner";

import RootContainer from "./containers/RootContainer/RootContainer";

import store, { persistor } from "./config/store";

const styles = {
  banner: {
    fontFamily: "Lato",
    background: "rgba(0,49,137, 0.88)",
    backgroundSize: "30px 30px",
    fontWeight: 600,
    position: "fixed",
    bottom: 0,
    height: "auto",
    padding: "10px"
  },
  button: {
    border: "1px solid white",
    borderRadius: 4,
    width: 129,
    lineHeight: "32px",
    background: "transparent",
    color: "white",
    fontSize: "14px",
    fontWeight: 600,
    opacity: 1,
    right: 20,
    marginTop: -18
  },
  message: {
    display: "block",
    padding: "9px 18px",
    lineHeight: 1.3,
    textAlign: "left",
    marginRight: 127,
    color: "white"
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold"
  }
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <CookieBanner
          styles={styles}
          message="En naviguant sur ce site, vous acceptez l’utilisation de cookies qui nous permettront de vous aider en cas de problème et réaliser des statistiques de visite."
          buttonMessage="J'ai compris"
          dismissOnScroll={false}
        />
        <Route path="/" component={RootContainer} />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
