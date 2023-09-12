import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Home, Landing, Detail, Form } from "./views"
import { Route } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/create" component={Form} />
      </div>
    </BrowserRouter>
  );
}

export default App;


// import { useLocation } from "react-router-dom";
// const location = useLocation();
//{location.pathname !== "/" && <NavBar/>}