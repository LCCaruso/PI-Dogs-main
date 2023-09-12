import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import style from "./CardsContainer.module.css"
import { dogOrdenAz, page, dogOrdenPeso, dogFilterPeso, resetDogs, dogFilterApiDb } from "../../redux/actions";


const CardsContainer = () => {

const dogs = useSelector(state=>state.dogs);
// console.log("info", dogs);

const dispatch = useDispatch();

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

    return (
        
            <div>
            <div className={style.contenedorFiltros}>
                <button onClick={reset}>RESET</button>
                <button name="A-Z" onClick={ordenAz}>Orden A-Z</button>
                <button name="Z-A" onClick={ordenAz}>Orden Z-A</button>
                <button name="pesoMayor" onClick={ordenPeso}>Orden mayor a menor peso</button>
                <div className={style.paginado}>
                <button name="prev" onClick={pagination}>Prev</button>
                <button name="next" onClick={pagination}>Next</button>
                </div>
                <button name="pesoMenor" onClick={ordenPeso}>Orden menor a mayor peso</button>
                <button name="menor" onClick={filterPeso}>{"Filtro Peso < 10"}</button>
                <button name="api" onClick={filterApiDb}>Api</button>
                <button name="db" onClick={filterApiDb}>Base de Datos</button>
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