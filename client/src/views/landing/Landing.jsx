import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Landing.module.css"

const Landing = () => {
    return (
    <div className={style.contenedor}>
        <h1 className={style.bien}>BIENVENIDOS</h1>
        <div className={style.boton}>
        <Link className={style.link} to="/home">GUAU!</Link>
        </div>
    </div>
    )
};

export default Landing;