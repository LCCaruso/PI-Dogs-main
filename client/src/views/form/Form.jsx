import { useState } from "react";
import axios from "axios";

const Form = () => {

    const [form, setForm] = useState({
        nombre: "",
        alturaMin: "10",
        alturaMax: "18",
        pesoMin: "5",
        pesoMax: "8",
        años_de_vidaMin: "10",
        años_de_vidaMax: "14",
        temperamento: "",
        imagen: "",
    })

    // const [errors, setErrors] = useState({
    //     nombre: "",
    //     altura: "1",
    //     peso: "1",
    //     años_de_vida: "1",
    //     temperamento: "",
    //     imagen: "",
    // })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        // validate({...form,[property]:value})

        setForm({...form,[property]:value})
    }

    // const validate = (form) => {

    // }

    const submitHandler = (event) => {
        // event.preventDefault()
        console.log(form)
        axios.post("http://localhost:3001/dogs",form)
        .then(res=>alert("Dog creado con exito"))
        .catch(err=>alert("Error al crear el Dog"))
    }


    return (
        
    <form onSubmit={submitHandler}>
            <h1>Aca va el Formulario para crear un Dog</h1>
        <div>
            <label>Nombre: </label>
            <input type="text" value={form.nombre} onChange={changeHandler} name="nombre"></input>
        </div>
        <div>
            <label>Altura: (min y max)</label>
            <input type="range" value={form.alturaMin} onChange={changeHandler} name="alturaMin" min="1" max="80"></input>
            <input type="range" value={form.alturaMax} onChange={changeHandler} name="alturaMax" min="1" max="80"></input>
            <span>{form.alturaMin} - {form.alturaMax} cm</span>
        </div>
        <div>
        <label>Peso: (min y max)</label>
            <input type="range" value={form.pesoMin} onChange={changeHandler} name="pesoMin" min="1" max="65"></input>
            <input type="range" value={form.pesoMax} onChange={changeHandler} name="pesoMax" min="1" max="65"></input>
            <span>{form.pesoMin} - {form.pesoMax} kg</span>
        </div>
        <div>
        <label>Años de vida: (min y max)</label>
            <input type="range" value={form.años_de_vidaMin} onChange={changeHandler} name="años_de_vidaMin" min="1" max="25"></input>
            <input type="range" value={form.años_de_vidaMax} onChange={changeHandler} name="años_de_vidaMax" min="1" max="25"></input>
            <span>{form.años_de_vidaMin} - {form.años_de_vidaMax} años</span>
        </div>
        <div>
            <label>Temperamento:</label>
            <input type="checkbox" name="temperamento" value="Happy" onChange={changeHandler}/>
            <label>Happy</label>

            <input type="checkbox" name="temperamento" value="Intelligent" onChange={changeHandler}/>
            <label>Intelligent</label>

            <input type="checkbox" name="temperamento" value="Loving" onChange={changeHandler}/>
            <label>Loving</label>

            <input type="checkbox" name="temperamento" value="Energetic" onChange={changeHandler}/>
            <label>Energetic</label>

            <input type="checkbox" name="temperamento" value="Loyal" onChange={changeHandler}/>
            <label>Loyal</label>

            <input type="checkbox" name="temperamento" value="Independent" onChange={changeHandler}/>
            <label>Independent</label>
        </div>
        <div>
            <label>Imagen: (opcional) </label>
            <input type="url" value={form.imagen} onChange={changeHandler} name="imagen" placeholder="Ingrese URL terminada en .jpg"></input>
        </div>
        <button type="submit">CREAR DOG</button>
    </form>
                
    )
}

export default Form;