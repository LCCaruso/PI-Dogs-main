import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./components/navBar/NavBar";
import { Home, Landing, Detail, Form } from "./views"
import { Route, useLocation } from "react-router-dom";


function App() {
  const location = useLocation();
  
  return (
    <BrowserRouter>
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" render={() => <Landing/>}/>
      <Route exact path="/home" render={() => <Home/>}/>
      <Route exact path="/detail/:id" render={() => <Detail/>}/>
      <Route exact path="/create" render={() => <Form/>}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
