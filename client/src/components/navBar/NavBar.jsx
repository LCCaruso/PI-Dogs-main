import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


const NavBar = ({handleChange, handleSubmit}) => {
    
    return (
        <div className={style.mainContainer}>

            <Link to="/home">HOME</Link>
            <Link to="/create">CREAR DOG</Link>
            <form onChange={handleChange}>
                <input placeholder="Busqueda" type="search"/>
                <button type="submit" onClick={handleSubmit}>Buscar</button>
            </form>

        </div>
    )
};

export default NavBar;