import CardsContainer from "../../components/cardscontainer/CardsContainer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";
import style from "./Home.module.css"
import NavBar from "../../components/navBar/NavBar";


const Home = () => {
    const dispatch = useDispatch();
    
    const [searchString, setSearchString] = useState("");
    
      
    const handleChange = (event) => {
        event.preventDefault();
        setSearchString(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getByName(searchString))
    }
    

    return (
    <div className={style.home}>
        <NavBar handleChange={handleChange} handleSubmit={handleSubmit}/>
        <CardsContainer />
    </div>
    )
}

export default Home;