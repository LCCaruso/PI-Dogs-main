import CardsContainer from "../../components/cardscontainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName, getDogs, filterByTemperament } from "../../redux/actions";
import style from "./Home.module.css"
import NavBar from "../../components/navBar/NavBar";
import axios from "axios";



const Home = () => {
    const dispatch = useDispatch();
    
    const [searchString, setSearchString] = useState("");
    
    const [temperamentosDisponibles, setTemperamentosDisponibles] = useState([]);
    
    const [selectedTemperamento, setSelectedTemperamento ] = useState("");

       
    useEffect(()=>{
        if(selectedTemperamento.length===0){
            dispatch(getDogs());
        }
    },[dispatch, selectedTemperamento]);
    
    // console.log("info", selectedTemperamento);

    
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


    const handleChange = (event) => {
        event.preventDefault();
        setSearchString(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getByName(searchString))
    }
    
    const handleFilters = (event) => {
        setSelectedTemperamento(event.target.value);
        dispatch(filterByTemperament(event.target.value));
    }
    
   
   
    return (
    <div className={style.home}>
        <NavBar handleChange={handleChange} handleSubmit={handleSubmit}/>
         <div className={style.select}>
         <select onChange={handleFilters} name="filter" id="" value={selectedTemperamento}>
        <option value="" >Filtro por Temperamento</option>
            {temperamentosDisponibles.map((temp) => (<option key={temp.id} value={temp.nombre}>{temp.nombre}</option>
        ))}
        </select>
        </div>
        {/* <button onClick={handleRefresh}>RESET</button> */}
        <CardsContainer />
        
    </div>
    )
}

export default Home;