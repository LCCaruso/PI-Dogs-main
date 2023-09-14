import CardsContainer from "../../components/cardscontainer/CardsContainer";
import NavBar from "../../components/navBar/NavBar";
import style from "./Home.module.css"


const Home = () => {

     
    return (
    <div className={style.home}>
        <NavBar />
        <CardsContainer />
    </div>
    )
}

export default Home;