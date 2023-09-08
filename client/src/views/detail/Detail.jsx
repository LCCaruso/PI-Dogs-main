import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Detail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDog(id));
    },[dispatch,id]);

    const dog = useSelector((state)=>state.dog)

    if (!dog) {
        return <p>Cargando...</p>;
    }

    return (
    <div>
        <Link to="/home">BACK</Link>
        <h2>Detail</h2>
        <p>Id: {dog.id}</p>
        <p>Nombre: {dog.nombre}</p>
        <img src={dog.imagen} alt={dog.nombre}/>
        <p>Altura: {dog.altura} cm</p>
        <p>Peso: {dog.peso} kg</p>
        <p>Temperamento: {dog.temperamento}</p>
        <p>Años de vida: {dog.años_de_vida} años</p>
    </div>
    );
};

export default Detail;