import { useSelector } from "react-redux";
import Card from "../card/Card";
import style from "./CardsContainer.module.css"

const CardsContainer = () => {

const dogs = useSelector(state=>state.dogs)



    return (
        <div className={style.contenedorDeCards}>
            {dogs.map(dog=>{
            return <Card image={dog.reference_image_id} name={dog.name} temperament={dog.temperament} weight={dog.weight.metric}/>})};
        </div>
    )
};

export default CardsContainer;

//este componente debe tomar un array de dogs y 
//por cada dog, renderizar un componente Card