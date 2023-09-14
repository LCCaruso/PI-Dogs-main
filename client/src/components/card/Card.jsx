import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css"
import { useDispatch } from "react-redux";
import { getDetailPage } from "../../redux/actions";


const Card = (props) => {

const dispatch = useDispatch();

const detailPage = (event) => {
    dispatch(getDetailPage(event.target.name))
}

    return (
        <div className={style.contenedor}>
            <Link onClick={detailPage} to={`/detail/${props.id}`}>
            <img className={style.imagen} src={props.imagen} alt={props.nombre} />
            </Link>        
            <p className={style.nombre}>{props.nombre}</p>
            <p className={style.temps}>{props.temperamento}</p>
            <p className={style.peso}>Peso: {props.peso} kg</p>
        </div>
    )
};

export default Card;

//este componente debe mostrar la info de cada dog mapeado
//pero ademas darnos un link para ir al detalle del dog