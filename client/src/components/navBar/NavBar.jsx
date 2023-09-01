import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


const NavBar = () => {
    return (
        <div className={style.mainContainer}>

            <Link to="/home">HOME</Link>
            <Link to="/create">CREAR DOG</Link>

        </div>
    )
};

export default NavBar;