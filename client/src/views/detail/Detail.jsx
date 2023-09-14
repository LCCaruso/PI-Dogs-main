import { useDispatch, useSelector } from "react-redux";
import { getDog, resetSelectedDog, getBackPreviousPage } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Detail.module.css"

const Detail = () => {

    const dog = useSelector((state)=>state.dog)
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDog(id));
        return () => {
            dispatch(resetSelectedDog());
          };
    },[dispatch,id]);


    const backPreviousPage = (event) => {
        dispatch(getBackPreviousPage(event.target.name))
    }

    return (
    <div className={style.detail}>
        {(!dog) ? (
            <div className={style.carga}>
                <img className={style.imagenCarga} src="https://media.tenor.com/bN2IkZ5vzxIAAAAM/byuntear-meme.gif" alt="Cargando..."/>
            </div>
        ) : (
        <div className={style.contenedorGeneral}>
        <div className={style.contenedorImagen}>
            <img className={style.imagen} src={dog.imagen} alt={dog.nombre}/>
        </div>
        <div className={style.contenedorTitulos}>
        <Link className={style.link} to="/home" onClick={backPreviousPage}>HOME</Link>
            <label className={style.id}>ID: {dog.id}</label>
            <label className={style.nombre}>Nombre: {dog.nombre}</label>
            <label className={style.altura}>Altura: {dog.altura} cm</label>
            <label className={style.peso}>Peso: {dog.peso} kg</label>
            <label className={style.temperamento}>Temperamento: {dog.temperamento}</label>
            <label className={style.años}>Años de vida: {dog.años_de_vida} años</label>
        </div>
        </div>
        )};
    </div>
    );
};

export default Detail;