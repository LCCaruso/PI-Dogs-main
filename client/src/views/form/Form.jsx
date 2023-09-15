import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createDog } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./Form.module.css";


const Form = () => {
    const dispatch = useDispatch();
    
    const [form, setForm] = useState({    
      //setForm es la funcion que puede modificar el estado, en realidad agrega la info que ingresa el cliente en los inputs
        nombre: "",
        alturaMin: "3",
        alturaMax: "2",
        pesoMin: "3",
        pesoMax: "2",
        años_de_vidaMin: "3",
        años_de_vidaMax: "2",
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
        temperamento: "",
        imagen: "",
    });


    const [temperamentosDisponibles, setTemperamentosDisponibles] = useState([]);
    const [dogCreated, setDogCreated] = useState(false);


   

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
        validate(form);
        // // eslint-disable-next-line
    }, [form]);
        

     const changeHandler = (event) => { //esta funcion actualiza el estado del formulario conel nuevo valor ingresado en los campos inputs
        const property = event.target.name; //inputs
        const value = event.target.value; //valor ingresado
        setForm({ ...form, [property]: value });
        //llama a la funcion para validar los campos actualizados en tiempo real
        validate({ ...form, [property]: value }, property);
      }; 


      const agregarTemperamento = (nuevoTemperamento) => { //funcion para agregar el temperamento a la lista del formilario
        // Verificar si el temperamento ya está presente en la lista
        if (!form.temperamento.includes(nuevoTemperamento)) { //si no esta presente, se agrega
          const updatedTemperamentos = [...form.temperamento, nuevoTemperamento];
          setForm({ ...form, temperamento: updatedTemperamentos });
          //se utiliza la funcion para actualizar el formulario y se agrega el temp nuevo a la propiedad temperamento

          // Validación del temperamento
          if (updatedTemperamentos.length === 0) {
            setError({ ...error, temperamento: "Elija al menos un temperamento" });
          } else {
            setError({ ...error, temperamento: "" });
          }
        }
      };
    
      const removeTemperamento = (index) => { //funcion q se utiliza para eliminar un temperamento
        //index es la posicion del elemento q quiero eliminar
        const updatedTemperamentos = [...form.temperamento];
        updatedTemperamentos.splice(index, 1);
        setForm({ ...form, temperamento: updatedTemperamentos }); //se actualiza el estado del form con la lista de temp eliminado

        if (updatedTemperamentos.length === 0) {
          // alert("Elija al menos un temperamento");
          setError({ ...error, temperamento: "Elija al menos un temperamento" });
        } else {
          setError({ ...error, temperamento: "" });
        }
      };
    

      const validate = (form) => {

        const patternNombre = /^[A-Za-z\s]+$/;
        const patternNumeros = /^[0-9]+$/;
        // const patternUrl = /^([a-z0-9_-]+\.){1,2}[a-z]{2,6}(\.[a-z]{2,6})$/;
        const newError = { ...error }; // copia del estado de error existente
      
        if (!patternNombre.test(form.nombre) || !form.nombre) {
          newError.nombre = "Ingrese solo letras A-Z";
        } else {
          newError.nombre = "";
        }
      
        if (!patternNumeros.test(form.alturaMin) || !patternNumeros.test(form.alturaMax)){
          newError.alturaMin = "Debe ingresar solo Numeros";
        } else {
          newError.alturaMin = ""; //ver bien en cual de los dos pongo el error o en Min o en MAx"""""""!!!!
        }
  
        if (parseFloat(form.alturaMax) < parseFloat(form.alturaMin)) {
          newError.alturaMax = "La altura máxima no puede ser menor a la altura mínima";
        } else {
          newError.alturaMax = "";
        }
  
        if (!patternNumeros.test(form.pesoMin) || !patternNumeros.test(form.pesoMax)){
          newError.pesoMin = "Debe ingresar solo Numeros";
        } else {
          newError.pesoMin = "";
        }
  
        if (parseFloat(form.pesoMax) < parseFloat(form.pesoMin)) {
          newError.pesoMax = "El peso máximo no puede ser menor al peso mínimo";
        } else {
          newError.pesoMax = "";
        }
    
        if (!patternNumeros.test(form.años_de_vidaMin) || !patternNumeros.test(form.años_de_vidaMax)){
          newError.años_de_vidaMin = "Debe ingresar solo Numeros";
        } else {
          newError.años_de_vidaMin = "";
        }
  
        if (parseFloat(form.años_de_vidaMax) < parseFloat(form.años_de_vidaMin)) {
          newError.años_de_vidaMax = "Los años de vida maximo no pueden ser menores a los años de vida mínimo";
        } else {
          newError.años_de_vidaMax = "";
        }
        
        if (form.temperamento.length === 0 || !form.temperamento) {
          newError.temperamento = "Elija al menos un temperamento";
        } else {
          newError.temperamento = "";
        }
        // if (!patternUrl.test(form.imagen)) {
        //   newError.imagen = "Url incorrecta";
        // } else {
        //   newError.imagen = "";
        // }
        setError(newError); // Actualiza el estado de error
      };



    const disable = () => { //para verificar si se deshabilita el boton submit, iterando las props del objeto error
      let auxDisabled = true; //si la variable es true se deshabilita, si es false se habilita
      for (let err in error){
        if(error[err] === "") auxDisabled = false;
        else{ 
        auxDisabled = true //cualquier input q este con error, es true y se deshabilita
        break;
       }
      }
      return auxDisabled;
    }
    
      const submitHandler = async (event) => {
        try {
          const temperamentoString = form.temperamento.join(", "); 
          //la propiedad temperamento, de la variable de estado Form, junta los temperamentos del input en un string ""
          const formData = {
            ...form,
            temperamento: temperamentoString,
          };
          
          const response = await axios.post("http://localhost:3001/dogs", formData);
          //los datos del formulario los paso en formData (incluido los temperamentos en forma de cadena "hola, perro, paz")
          
          
          dispatch(createDog(response.data));
          //actualiza el estado global de la aplicación con el nuevo perro
          setDogCreated(true); 
          // actualiza el estado cuando se crea el perro con exito
          alert("Perro creado con éxito!!!");
        } catch (error) {
          alert(error.response.data.error);
          //con este alert muestro los errores del back
        } if(dogCreated === false){
          event.preventDefault()
        }
      };
      


    return (
    <div className={style.body}>
      <div className={style.back}>
       <Link className={style.textHome} to="/home">HOME</Link>
       </div>
    <form className={style.formContainer} onSubmit={submitHandler}>

        <div className={style.tituloNombre}>
            <label>NOMBRE</label>
        </div>
        <div className={style.nombreContainer}>
            <input className={style.inputNombre} type="text" value={form.nombre} onChange={changeHandler} name="nombre" placeholder="ej: Roco"></input>
        </div>
          <div className={style.spanErrors}>
            <span>{error.nombre}</span>
          </div>

        
        <div className={style.tituloAltura}>
              <label>ALTURA</label>
        </div>
        <div className={style.containerGrupos}>
        <div className={style.alturaMinmaxContainer}>
            <label className={style.subTitulos}>Mínima:</label>
            <input className={style.rangos} type="range" value={form.alturaMin} onChange={changeHandler} name="alturaMin" min="1" max="79"></input>
        </div>
        <div className={style.alturaMinmaxContainer}>
            <label className={style.subTitulos}>Máxima:</label>
            <input className={style.rangos} type="range" value={form.alturaMax} onChange={changeHandler} name="alturaMax" min="2" max="80"></input>
        </div>
        <div className={style.spanNumeros}>
            <span>{form.alturaMin} - {form.alturaMax} <br />
            cm</span>
        </div>
        </div>
        <div className={style.spanErrors}>
            <span>{error.alturaMin}</span>
            <span>{error.alturaMax}</span>
        </div>


            <div className={style.tituloPeso}>
              <label>PESO</label>
            </div>
        <div className={style.containerGrupos}>
        <div className={style.pesoMinmaxContainer}>
            <label className={style.subTitulos}>Mínimo:</label>
            <input className={style.rangos} type="range" value={form.pesoMin} onChange={changeHandler} name="pesoMin" min="1" max="90"></input>
        </div>
        <div className={style.pesoMinmaxContainer}>
            <label className={style.subTitulos}>Máximo:</label>
            <input className={style.rangos} type="range" value={form.pesoMax} onChange={changeHandler} name="pesoMax" min="2" max="91"></input>
        </div>
        <div className={style.spanNumeros}>
            <span>{form.pesoMin} - {form.pesoMax} <br />
            kg</span>
        </div>
        </div>
        <div className={style.spanErrors}>
            <span>{error.pesoMin}</span>
            <span>{error.pesoMax}</span>
          </div>


          <div className={style.tituloAñosDeVida}>
              <label>AÑOS DE VIDA</label>
        </div>
        <div className={style.containerGrupos}>
        <div className={style.años_de_vidaMinmaxContainer}>
            <label className={style.subTitulos}>Mínimo:</label>
            <input className={style.rangos} type="range" value={form.años_de_vidaMin} onChange={changeHandler} name="años_de_vidaMin" min="1" max="24"></input>
        </div>
        <div className={style.años_de_vidaMinmaxContainer}>
            <label className={style.subTitulos}>Máximo:</label>
            <input className={style.rangos} type="range" value={form.años_de_vidaMax} onChange={changeHandler} name="años_de_vidaMax" min="2" max="25"></input>
        </div>
        <div className={style.spanNumeros}>
            <span>{form.años_de_vidaMin} - {form.años_de_vidaMax} <br />
            años</span>
        </div>
        </div>
        <div className={style.spanErrors}>
            <span>{error.años_de_vidaMin}</span>
            <span>{error.años_de_vidaMax}</span>
        </div>


        <div className={style.tituloTemperamento}>
          <label>TEMPERAMENTO</label>
        </div>
        <div className={style.containerGruposTemp}>
          
          <select className={style.select} name="temperamentoSelect" onChange={(event) => agregarTemperamento(event.target.value)} value="">
            <option value="" disabled>Seleccione un temperamento</option>
            {temperamentosDisponibles.map((temp, index) => (
              <option key={index} value={temp.nombre}>
                {temp.nombre}
              </option>
            ))}
          </select>
         
        <div className={style.temperamentoSeleccionadoContainer}>
          {form.temperamento.map((temp, index) => (
            <div key={index} className={style.temperamentoSeleccionado}>
                <span className={style.temperamentoSpan}>{temp}
                <button className={style.botonRemove} type="button" onClick={() => removeTemperamento(index)}>x</button></span>
            </div>
          ))}
        </div>
        </div>
        <div className={style.spanErrors}>
          <span>{error.temperamento}</span>
        </div>

        <div className={style.tituloImagen}>
            <label>IMAGEN (opcional)</label>
        </div>
        <div className={style.imagenContainer}>
            <input className={style.inputImagen} type="text" value={form.imagen} onChange={changeHandler} name="imagen" placeholder="ingrese url"></input>
        </div>
        <div className={style.spanErrors}>
            <span>{error.imagen}</span>
        </div>

  
        <button disabled={disable() || dogCreated} className={style.submitButton} type="submit">CREAR DOG</button>

    </form>
    </div>
                
    )
}

export default Form;