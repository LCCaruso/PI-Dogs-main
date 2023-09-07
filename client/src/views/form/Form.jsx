import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createDog } from "../../redux/actions";
import { Link } from "react-router-dom";


const Form = () => {
    const dispatch = useDispatch();
    
    const [form, setForm] = useState({
        nombre: "",
        alturaMin: 0,
        alturaMax: 0,
        pesoMin: 0,
        pesoMax: 0,
        años_de_vidaMin: 0,
        años_de_vidaMax: 0,
        temperamento: [],
        imagen: "",
    });

        const [error, setError] = useState({
        nombre: "",
        alturaMin: "",
        alturaMax: "",
        pesoMin: "",
        pesoMax: "",
        años_de_vidaMin: "",
        años_de_vidaMax: "",
        temperamento: [],
        imagen: "",
    });

    const validate = (form) => {

      const pattern = /^[A-Za-z\s]+$/;
      const newError = { ...error }; // Copia el estado de error existente
    
      if (!pattern.test(form.nombre) || !form.nombre) {
        newError.nombre = "Ingrese solo letras A-Z";
      } else {
        newError.nombre = "✓";
      }
    
      if (form.alturaMax < form.alturaMin) {
        newError.altura = "La altura máxima no puede ser menor a la altura mínima";
      } else {
        newError.altura = "✓";
      }
    
      if (form.pesoMax < form.pesoMin) {
        newError.peso = "El peso máximo no puede ser menor al peso mínimo";
      } else {
        newError.peso = "✓";
      }
    
      if (form.años_de_vidaMax < form.años_de_vidaMin) {
        newError.años_de_vida = "Los años de vida maximo no pueden ser menores a los años de vida mínimo";
      } else {
        newError.años_de_vida = "✓";
      }
    
      if (form.temperamento.length === 0) {
        newError.temperamento = "Elija al menos un temperamento";
      } else {
        newError.temperamento = "✓";
      }
    
        
      setError(newError); // Actualiza el estado de error
    
  
    };
   

    const [temperamentosDisponibles, setTemperamentosDisponibles] = useState([]);

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

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });
        validate({ ...form, [property]: value });
      }; 

    const addRandomTemperamento = () => {
        if (temperamentosDisponibles.length > 0) {
          const randomIndex = Math.floor(Math.random() * temperamentosDisponibles.length);
          const randomTemperamento = temperamentosDisponibles[randomIndex].nombre;
      
          setForm({ ...form, temperamento: [...form.temperamento, randomTemperamento] });
        }
      };

      const addTemperamento = () => {
        if (form.temperamento && !form.temperamento.includes("")) {
          setForm({ ...form, temperamento: [...form.temperamento, ""] });
        }
      };
    
      const removeTemperamento = (index) => {
        const updatedTemperamentos = [...form.temperamento];
        updatedTemperamentos.splice(index, 1);
        setForm({ ...form, temperamento: updatedTemperamentos });
      };
    
      const selectTemperamento = (value, index) => {
        const updatedTemperamentos = [...form.temperamento];
        updatedTemperamentos[index] = value;
        setForm({ ...form, temperamento: updatedTemperamentos });
      };

     const submitHandler = (event) => {
        // event.preventDefault();

        // Convierte el arreglo de temperamentos en una cadena de texto separada por comas
        const temperamentoString = form.temperamento.join(", ");

        // Crea un nuevo objeto con la cadena de temperamentos
         const formData = {
            ...form,
            temperamento: temperamentoString,
        };

        axios.post("http://localhost:3001/dogs", formData)
        .then((res) => {
            dispatch(createDog(res.data));
            alert("Dog creado con éxito");
        })
        .catch((err) => alert("Error al crear el Dog"));
    }


    return (
        
    <form onSubmit={submitHandler}>
       <Link to="/home">BACK</Link>
            <h1>Crea Tu Propia Mascota</h1>
        <div>
            <label>Nombre: </label>
            <input type="text" value={form.nombre} onChange={changeHandler} name="nombre" placeholder="ingrese nombre del perro"></input>
            <span> {error.nombre}</span>
        </div>
        <div>
            <label>Altura: (min y max)</label>
            <input type="range" value={form.alturaMin} onChange={changeHandler} name="alturaMin" min="0" max="80"></input>
            <input type="range" value={form.alturaMax} onChange={changeHandler} name="alturaMax" min="0" max="80"></input>
            <span>{form.alturaMin} - {form.alturaMax} cm {error.altura}</span>
        </div>
        <div>
        <label>Peso: (min y max)</label>
            <input type="range" value={form.pesoMin} onChange={changeHandler} name="pesoMin" min="0" max="65"></input>
            <input type="range" value={form.pesoMax} onChange={changeHandler} name="pesoMax" min="0" max="65"></input>
            <span>{form.pesoMin} - {form.pesoMax} kg {error.peso}</span>
        </div>
        <div>
        <label>Años de vida: (min y max)</label>
            <input type="range" value={form.años_de_vidaMin} onChange={changeHandler} name="años_de_vidaMin" min="0" max="25"></input>
            <input type="range" value={form.años_de_vidaMax} onChange={changeHandler} name="años_de_vidaMax" min="0" max="25"></input>
            <span>{form.años_de_vidaMin} - {form.años_de_vidaMax} años {error.años_de_vida}</span>
        </div>
        <div>
        <label>Temperamento: </label>
        <span> {error.temperamento}</span>
        {form.temperamento.map((temp, index) => (
          <div key={index}>
            <select
              name="temperamento"
              onChange={(event) => selectTemperamento(event.target.value, index)}
              value={temp}
              >
              <option value="">Seleccione un temperamento</option>
              {temperamentosDisponibles.map((temp) => (
                <option key={temp.id} value={temp.nombre}>
                  {temp.nombre} 
                </option>
              ))}
            </select>
            <button type="button" onClick={() => removeTemperamento(index)}>
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={addTemperamento}>
          Agregar Temperamento
        </button>
        <button type="button" onClick={addRandomTemperamento}>
          Agregar Temperamento Aleatorio
        </button>
      </div>
        <div>
            <label>Imagen: (opcional) </label>
            <input type="text" value={form.imagen} onChange={changeHandler} name="imagen" placeholder="Ingrese URL terminada en .jpg"></input>
        </div>
        <button type="submit">CREAR DOG</button>
    </form>
                
    )
}

export default Form;