import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Main from "./pages/Main/main";

const App = () =>
  <Router>
    <div>
      <Route path="/" component={Main} />
    </div>
  </Router>;

export default App;