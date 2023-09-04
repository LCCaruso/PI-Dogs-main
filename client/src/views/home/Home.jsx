import CardsContainer from "../../components/cardscontainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import style from "./Home.module.css"


const Home = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogs());
    },[dispatch])

    return (
    <div className={style.home}>

        <CardsContainer/>

    </div>
    )
}

export default Home;