import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import style from "./CardsContainer.module.css"
import { dogFavs, filterByTemperament, getDogs, dogOrdenAz, page, dogOrdenPeso, dogFilterPeso, resetDogs, dogFilterApiDb } from "../../redux/actions";
import axios from "axios";

const CardsContainer = () => {

const dispatch = useDispatch();

const dogsBackUp = useSelector((state) => state.dogsBackUp);
const dogsFiltered = useSelector((state) => state.dogsFiltered);
const filters = useSelector((state) => state.filters);
const currentPage = useSelector((state) => state.currentPage);
console.log("current page:", currentPage)

const [temperamentosDisponibles, setTemperamentosDisponibles] = useState([]);

const [selectedTemperamento, setSelectedTemperamento ] = useState("");



useEffect(() => {
    if (selectedTemperamento === "") {
      dispatch(getDogs());
    }
  }, [dispatch, selectedTemperamento]);


useEffect(() => {
  // Realiza una solicitud GET para obtener la lista de temperamentos desde el servidor
  axios
    .get("http://localhost:3001/temperaments")
    .then((response) => {
      // Actualiza el estado con los temperamentos disponibles
      setTemperamentosDisponibles(response.data);
    
    })
    .catch((error) => {
      console.error("Error al obtener los temperamentos:", error);
    });
}, []);


const handleFilters = (event) => {
    setSelectedTemperamento(event.target.value);
    dispatch(filterByTemperament(event.target.value));
}

const dogs = useSelector(state=>state.dogs);


const pagination = (event) =>{
    dispatch(page(event.target.name))
}

const ordenAz = (event) => {
    dispatch(dogOrdenAz(event.target.name))
}

const ordenPeso = (event) => {
    dispatch(dogOrdenPeso(event.target.name))
}

const filterPeso = (event) => {
    dispatch(dogFilterPeso(event.target.name))
}

const reset = (event) => {
    dispatch(resetDogs(event.target.name))
}

const filterApiDb = (event) => {
    dispatch(dogFilterApiDb(event.target.name))
}

const soloFav = () => {
    dispatch(dogFavs())
}

const totalPages = filters
? Math.ceil(dogsFiltered.length / 8)
: Math.ceil(dogsBackUp.length / 8);

const pageTotal = () => {
    if (currentPage < 0) {
        return 0;
    } else if (currentPage >= totalPages) {
        return totalPages - 1; 
    } else {
        return currentPage;
    }
}

    return (
        
            <div>
            <div className={style.contenedorFiltros}>
                <button name="A-Z" onClick={ordenAz}>Orden A-Z</button>
                <button name="Z-A" onClick={ordenAz}>Orden Z-A</button>
                <button name="pesoMayor" onClick={ordenPeso}>Orden mayor/menor peso</button>
                <button name="pesoMenor" onClick={ordenPeso}>Orden menor/mayor peso</button>
                <div className={style.paginado}>
                <button disabled={currentPage === 0} name="prev" onClick={pagination}>Prev</button>
                <button disabled={currentPage === totalPages -1} name="next" onClick={pagination}>Next</button>
                </div>
                <div >
                <select className={style.select} onChange={handleFilters} name="filter" id="" value={selectedTemperamento}>
                    <option value="" >Temperamentos</option>
                    {temperamentosDisponibles.map((temp) => (<option key={temp.id} value={temp.nombre}>{temp.nombre}</option>
                    ))}
                </select>
                </div>
                <button name="favs" onClick={soloFav}>Favoritos</button>
                <button name="menor" onClick={filterPeso}>{"Peso < 10"}</button>
                <button name="api" onClick={filterApiDb}>Api</button>
                <button name="db" onClick={filterApiDb}>Base de Datos</button>
                <button className={style.reset} onClick={reset}>RESET</button>
            </div>
            <div className={style.paginadoContainer}>
                <span className={style.paginacion}>Página {pageTotal() +1} de {totalPages}</span>
            </div>
        <div className={style.contenedorDeCards}>
            {dogs.map(dog=>{
            return <Card key={dog.id} id={dog.id} imagen={dog.imagen} nombre={dog.nombre} temperamento={dog.temperamento} peso={dog.peso}/>})};
        </div>
        </div>
    )
};

export default CardsContainer;

//este componente debe tomar un array de dogs y 
//por cada dog, renderizar un componente Card