import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Router from "./components/Routing/Router";
import MainPage from './components/MainPage/MainPage';

const backgroundStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
}

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={MainPage} />
      </Router>
    </BrowserRouter>
  )
}

export default App;