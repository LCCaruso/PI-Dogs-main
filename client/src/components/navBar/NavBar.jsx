import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


const NavBar = ({handleChange, handleSubmit}) => {
    
    return (
        <div className={style.mainContainer}>
            <Link className={style.link1} to="/">LANDING</Link>
            <Link className={style.link2} to="/home">HOME</Link>
            <Link className={style.link3} to="/create">CREAR DOG</Link>
            <form className={style.search} onChange={handleChange}>
                <input className={style.busqueda} placeholder="Busqueda por Nombre" type="search"/>
                <button className={style.button} type="submit" onClick={handleSubmit}>Buscar</button>
            </form>

        </div>
    )
};

export default NavBar;