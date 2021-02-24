import "./App.css";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Route path='/' component={Dashboard}/>
    </BrowserRouter>  
  );
}

export default App;
