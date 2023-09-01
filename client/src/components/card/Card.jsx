const Card = (props) => {
    return (
        <div>
            <p>Imagen:{props.imagen}</p>
            <p>Nombre:{props.nombre}</p>
            <p>Temperamento:{props.temperamento}</p>
            <p>Peso:{props.peso}</p>
        </div>
    )
};

export default Card;

//este componente debe mostrar la info de cada dog mapeado
//pero ademas darnos un link para ir al detalle del dog