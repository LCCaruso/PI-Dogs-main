import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Detail.module.css"

const Detail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDog(id));
        return()=>{
            console.log("se desmonto el componente")
        }
    },[dispatch,id]);



    const dog = useSelector((state)=>state.dog)

    if (!dog) {
        return <p>Cargando...</p>;
    }

    
    // const imperialAkilo = (pesoString) => {
    //     // Dividir los números por ' - ' y convertirlos a números
    //     const [numero1, numero2] = pesoString.split(/ - | – /).map(Number);
      
    //     // Convertir los números a kilogramos (dividiendo por 2.2046) y redondear al entero más cercano
    //     const kg1 = Math.round(numero1 / 2.2046);
    //     const kg2 = Math.round(numero2 / 2.2046);
      
    //     // Crear un string con los valores en kilogramos
    //     const resultado = `${kg1} - ${kg2}`;
      
    //     return resultado;
    //   };

    //   – o -
        // console.log(imperialAkilo(dog.peso))

      
    return (
    <div className={style.detail}>
        <div className={style.contenedorGeneral}>
        <div className={style.contenedorImagen}>
            <img className={style.imagen} src={dog.imagen} alt={dog.nombre}/>
        </div>
        <div className={style.contenedorTitulos}>
        <Link className={style.link} to="/home">HOME</Link>
            <label className={style.id}>ID: {dog.id}</label>
            <label className={style.nombre}>Nombre: {dog.nombre}</label>
            <label className={style.altura}>Altura: {dog.altura} cm</label>
            <label className={style.peso}>Peso: {dog.peso} kg</label>
            <label className={style.temperamento}>Temperamento: {dog.temperamento}</label>
            <label className={style.años}>Años de vida: {dog.años_de_vida} años</label>
        </div>
        </div>
    </div>
    );
};

export default Detail;