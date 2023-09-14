// el reducer es el unico q modifica el estado global

import { DOG_FAVS, ADD_FAV, REMOVE_FAV, BACK_TO_PREVIOUS_PAGE, DETAIL_PAGE, RESET_DETAIL, FILTER_API_DB, RESET, GET_DOGS, GET_BY_NAME, GET_DOG, GET_TEMPERAMENTS, CREATE_DOG, FILTER_BY_TEMPERAMENT, PAGINATE, ORDEN_AZ, ORDEN_PESO, FILTER_PESO } from "./actions";

const initialState = {
    dogs: [],
    dogsBackUp: [], //siempre tiene la info de todos los dogs, nunca se modifica, solo filtra
    temperamento: [],
    dog: null,
    dogsFiltered: [],
    filters: false, //si hay un filtro aplicado, paginar sobre ese filtro, si no hay filtro aplicado, paginas sobre todos los perros
    currentPage: 0,
    previousPage: 0,
    myFavorites: []
};

const pesoPromedio = (pesoString) => {
    const numeros = pesoString.split(/ - | – /).map(Number);
      if (numeros.length === 1) {
      // si solo hay un numero, retorna ese numero porque es el peso unico
      return numeros[0];
    } else if (numeros.length === 2) {
      // si hay dos numeros ,calcula el promedio
      return (numeros[0] + numeros[1]) / 2;
    }
  };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
                if (state.filters || state.dogsBackUp.length > 0) {
                    return {
                        ...state,
                        // no cambiamos los perros si hay filtros aplicados
                    };
                } else {
                return {
                    ...state,
                    dogs: [...action.payload].splice(0, 8),
                    dogsBackUp: action.payload,
                }};
        case GET_DOG:
            return { ...state, dog: action.payload };
        case GET_TEMPERAMENTS:
            return { ...state, temperamento: action.payload };
        case CREATE_DOG:
            return { 
                ...state, 
                dog: action.payload 
            };
        case GET_BY_NAME:
                return { 
                ...state, 
                dogs: [...action.payload].splice(0, 8) ,
                dogsFiltered: action.payload,
                currentPage: 0,
                filters: true
            };
        case ADD_FAV:
                return {
                    ...state,
                    myFavorites: [...state.myFavorites, action.payload]
                }
        case REMOVE_FAV:
                return {
                    ...state,
                    myFavorites: state.myFavorites.filter((fav) => fav.id !== action.payload),
                }
        case DOG_FAVS:
            if (action.payload === "favorites") {
                // filtra los perros que estan en la lista de favoritos, pasada por payload en la action
                const favs = state.dogsBackUp.filter((dog) =>
                    state.myFavorites.some((fav) => fav.id === dog.id)
                );
                    return {
                    ...state,
                    dogs: [...favs].splice(0, 8),
                    dogsFiltered: favs,
                    currentPage: 0,
                    filters: true,
                };
            } else {
                // restablece el filtro para mostrar todos los perros
                return {
                    ...state,
                    dogs: [...state.dogsBackUp].splice(0, 8),
                    dogsFiltered: [],
                    currentPage: 0,
                    filters: false,
                };
            }
        case FILTER_BY_TEMPERAMENT:
            let temp = []
            if (state.filters) {
               temp = [...state.dogsFiltered].filter(dog => dog.temperamento && action.payload && dog.temperamento.includes(action.payload))
            return { 
                ...state, 
                dogs: [...temp].splice(0, 8),
                dogsFiltered: temp,
                currentPage: 0,
                filters: true
            };
            } else {
                temp = [...state.dogsBackUp].filter(dog => dog.temperamento && action.payload && dog.temperamento.includes(action.payload))
            return { 
                ...state, 
                dogs: [...temp].splice(0, 8),
                dogsFiltered: temp,
                currentPage: 0,
                filters: true
            };
        }
        case PAGINATE:
                const next_page = state.currentPage + 1;
                const prev_page = state.currentPage - 1;
                const first_index = action.payload === "next" ? next_page * 8 : prev_page * 8;

                if (state.filters) {
                    if (action.payload === "next" && first_index >= state.dogsFiltered.length) return state;
                    else if (action.payload === "prev" && prev_page < 0) return state;
                    state.currentPage = action.payload === "next" ? next_page : prev_page;
                } else {
                    state.currentPage = action.payload === "next" ? next_page : prev_page;
                }

                return {
                    ...state,
                    dogs: (state.filters ? [...state.dogsFiltered] : [...state.dogsBackUp]).splice(first_index, 8),
                    currentPage: state.currentPage,
                    previousPage: state.currentPage, //actualiza la ultima página visitada
                };
        case DETAIL_PAGE: 
            return {
                ...state,
                previousPage: state.currentPage, 
                // esta uuarda la pagina actual antes de cambiar al componente detalle
            };

        case BACK_TO_PREVIOUS_PAGE: 
        if (!state.filters) {   //si no hay filtros se actualiza el estado de la pagina actual
            return {
                ...state,
                dogs: [...state.dogsBackUp].splice(state.previousPage * 8, 8), // carga los perros de la ultima pagina visitada
                currentPage: state.previousPage, // vuelvea la ultima pagina visitada
            };
        }
        return state;
        case RESET_DETAIL:
                return {
                  ...state,
                  dog: null,
                };
          
        case ORDEN_AZ:
            switch (action.payload) {
                case "A-Z":
                    let asc = []
                    if (state.filters) {
                        asc = [...state.dogsFiltered].sort((prev, next) => {
                            if (prev.nombre.toLowerCase() > next.nombre.toLowerCase()) return 1;
                            if (prev.nombre.toLowerCase() < next.nombre.toLowerCase()) return -1;
                            return 0;
                        });
                        return {
                            ...state,
                            dogs: [...asc].splice(0, 8),
                            dogsFiltered: asc,
                            currentPage: 0,
                            filters: true
                            
                        };
                    } else {
                        asc = [...state.dogsBackUp].sort((prev, next) => {
                            if (prev.nombre.toLowerCase() > next.nombre.toLowerCase()) return 1;
                            if (prev.nombre.toLowerCase() < next.nombre.toLowerCase()) return -1;
                            return 0;
                        });
                        return {
                            ...state,
                            dogs: [...asc].splice(0, 8),
                            dogsFiltered: asc,
                            currentPage: 0,
                            filters: true
                
                        };
                    }
                case "Z-A":
                    let des = []
                    if (state.filters) {
                        des = [...state.dogsFiltered].sort((prev, next) => {
                            if (prev.nombre.toLowerCase() > next.nombre.toLowerCase()) return -1;
                            if (prev.nombre.toLowerCase() < next.nombre.toLowerCase()) return 1;
                            return 0;
                        });
                        return {
                            ...state,
                            dogs: [...des].splice(0, 8),
                            dogsFiltered: des,
                            currentPage: 0,
                            filters: true
                        };
                    } else {
                        des = [...state.dogsBackUp].sort((prev, next) => {
                            if (prev.nombre.toLowerCase() > next.nombre.toLowerCase()) return -1;
                            if (prev.nombre.toLowerCase() < next.nombre.toLowerCase()) return 1;
                            return 0;
                        });
                        return {
                            ...state,
                            dogs: [...des].splice(0, 8),
                            dogsFiltered: des,
                            currentPage: 0,
                            filters: true
                        };
                    }
                default:
                    return state;
            }
            case FILTER_API_DB:
                switch (action.payload) {
                    case "api":
                        let ap = [];
                        if (state.filters) {
                            ap = state.dogsFiltered.filter((dog) => !isNaN(dog.id));
                        } else {
                            ap = state.dogsBackUp.filter((dog) => !isNaN(dog.id));
                        }
                        return {
                            ...state,
                            dogs: [...ap].splice(0, 8),
                            dogsFiltered: ap,
                            currentPage: 0,
                            filters: true
                        };
                    case "db":
                        let dat = [];
                        if (state.filters) {
                            dat = state.dogsFiltered.filter((dog) => isNaN(dog.id));
                        } else {
                            dat = state.dogsBackUp.filter((dog) => isNaN(dog.id));
                        }
                        return {
                            ...state,
                            dogs: [...dat].splice(0, 8),
                            dogsFiltered: dat,
                            currentPage: 0,
                            filters: true
                        };
                    default:
                        return state;
                }
        case ORDEN_PESO:
            switch (action.payload) {
                case "pesoMayor":
                    let may = [];
                    if (state.filters) {
                        may = [...state.dogsFiltered].sort((prev, next) => {
                            if (pesoPromedio(prev.peso) > pesoPromedio(next.peso)) return -1;
                            if (pesoPromedio(prev.peso) < pesoPromedio(next.peso)) return 1;
                            return 0;
                        });
                        return {
                            ...state,
                            dogs: [...may].splice(0, 8),
                            dogsFiltered: may,
                            currentPage: 0,
                            filters: true
                        };
                    } else {
                        may = [...state.dogsBackUp].sort((prev, next) => {
                            if (pesoPromedio(prev.peso) > pesoPromedio(next.peso)) return -1;
                            if (pesoPromedio(prev.peso) < pesoPromedio(next.peso)) return 1;
                            return 0;
                        });
                        return {
                            ...state,
                            dogs: [...may].splice(0, 8),
                            dogsFiltered: may,
                            currentPage: 0,
                            filters: true
                        };
                    }
                case "pesoMenor":
                    let men = [];
                    if (state.filters) {
                        men = [...state.dogsFiltered].sort((prev, next) => {
                            if (pesoPromedio(prev.peso) > pesoPromedio(next.peso)) return 1;
                            if (pesoPromedio(prev.peso) < pesoPromedio(next.peso)) return -1;
                            return 0;
                        });
                        return {
                            ...state,
                            dogs: [...men].splice(0, 8),
                            dogsFiltered: men,
                            currentPage: 0,
                            filters: true
                        };
                    } else {
                        men = [...state.dogsBackUp].sort((prev, next) => {
                            if (pesoPromedio(prev.peso) > pesoPromedio(next.peso)) return 1;
                            if (pesoPromedio(prev.peso) < pesoPromedio(next.peso)) return -1;
                            return 0;
                        });
                        return {
                            ...state,
                            dogs: [...men].splice(0, 8),
                            dogsFiltered: men,
                            currentPage: 0,
                            filters: true
                        };
                    }
                default:
                    return state;
            }
        
        case FILTER_PESO:
                let menor = []
                    if(state.filters){
                        menor = [...state.dogsFiltered].filter((dog) => pesoPromedio(dog.peso) < 10);
                        return {
                        ...state,
                        dogs: [...menor].splice(0, 8),
                        dogsFiltered: menor,
                        currentPage: 0,
                        filters: true

                        }} else{
                            
                        menor = [...state.dogsBackUp].filter((dog) => pesoPromedio(dog.peso) < 10);
                        return {
                        ...state,
                        dogs: [...menor].splice(0, 8),
                        dogsFiltered: menor,
                        currentPage: 0,
                        filters: true
                        }
                        };

        // case ULTIMO_ESTADO:
        //         if (state.filters) {
        //             return {
        //             ...state,
        //             dogs: [...state.dogsFiltered].splice(0, 8),
        //             currentPage: 0,
        //             // No cambiamos los detalles del perro en este caso
        //         };
        //         } else {
        //             return {
        //             ...state,
        //             // No cambiamos los detalles del perro en este caso
        //         };
        //     }
        case RESET:
            return {
                ...state,
                dogs: [...state.dogsBackUp].splice(0, 8),
                // temperamento: [],
                dogsFiltered: [],
                currentPage: 0,
                filters: false
            };   
            default:
                return state;
        }
    }
        
export default rootReducer;