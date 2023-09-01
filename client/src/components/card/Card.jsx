import style from "./Card.module.css"

const Card = (props) => {
    return (
        <div className={style.contenedor}>
            <img className={style.imagen} src={`https://cdn2.thedogapi.com/images/${props.image}.jpg`} alt={props.name} />
                <div className={style.tipografias}>
                    <p>{props.name}</p>
                    <p>Temperamento: {props.temperament}</p>
                    <p>Peso: {props.weight} kg</p>
                </div>
        </div>
    )
};

export default Card;

//este componente debe mostrar la info de cada dog mapeado
//pero ademas darnos un link para ir al detalle del dog