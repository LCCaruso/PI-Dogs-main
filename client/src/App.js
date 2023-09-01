import NavBar from "./components/navBar/NavBar";
import { Home, Landing, Detail, Form } from "./views"
import { Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" render={() => <Landing/>}/>
      <Route exact path="/home" render={() => <Home/>}/>
      <Route exact path="/detail" render={() => <Detail/>}/>
      <Route exact path="/create" render={() => <Form/>}/>
    </div>
  );
}

export default App;
