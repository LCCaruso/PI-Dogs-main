import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getDetailPage, addFav, removeFav } from "../../redux/actions";
import { useEffect, useState } from "react";


const Card = (props) => {

const dispatch = useDispatch();
const myFavorites = useSelector((state)=> state.myFavorites);
const [isFav, setIsFav] = useState(false);

useEffect(()=>{ //chequea si el perro actual esta en la lista de favoritos
                //useEffect mantiene actualizado el estado de isFav si el perro esta o no en la lista
    const isDogFav = myFavorites.some((fav) => fav.id === props.id);
    setIsFav(isDogFav)
},[myFavorites, props.id]);


const handleFav = (id) => { //se encarga de agregar y eliminar perros de la lista de favoritos
    if(isFav){
        setIsFav(false)
        dispatch(removeFav(id));
    } else{
        setIsFav(true)
        dispatch(addFav(props))
    }
};

const detailPage = (event) => {
    dispatch(getDetailPage(event.target.name))
}

    return (
        <div className={style.contenedor}>
            <div className={style.imagenContenedor}>
            <button className={style.corazon} onClick={() => handleFav(props.id)}>{isFav ? "❤️" : "🤍"}</button>
            <Link onClick={detailPage} to={`/detail/${props.id}`}>
            <img className={style.imagen} src={props.imagen} alt={props.nombre} />
            </Link>   
            </div>
            <p className={style.nombre}>{props.nombre}</p>
            <p className={style.temps}>{props.temperamento}</p>
            <p className={style.peso}>Peso: {props.peso} kg</p>
        </div>
    )
};

export default Card;

//este componente debe mostrar la info de cada dog mapeado
//pero ademas darnos un link para ir al detalle del dog