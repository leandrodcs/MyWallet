import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";

import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import TransactionContext from "./contexts/TransactionContext";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [incomeOrOutcome, setIncomeOrOutcome] = useState(null);
  return (
    <UserContext.Provider value={user}>
      <Router>
        <GlobalReset />
        <Switch>
          <Route exact path="/" render={() => <SignIn setUser={setUser} user={user} />}/>
          <Route exact path="/sign-up" render={() => <SignUp />}/>
          <TransactionContext.Provider value={{incomeOrOutcome, setIncomeOrOutcome}}>
            <Route exact path="/home" render={() => <Home />}/>
            <Route exact path="/transactions" render={() => <Transactions />}/>
          </TransactionContext.Provider>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

const GlobalReset = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym,
  address, big, button, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var,
  b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead,
  tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav,
  output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    background-color: transparent;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a:link,
  a:hover,
  a:active {
  color: #ffffff;
  text-decoration: none;
  }
  body {
    background: #8C11BE;
    font-family: 'Raleway', sans-serif;
  }
`;