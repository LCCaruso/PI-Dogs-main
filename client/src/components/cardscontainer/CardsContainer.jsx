import Card from "../card/Card";

const CardsContainer = () => {

    const dogs = [
        {
            "imagen": "https://mymodernmet.com/wp/wp-content/uploads/2021/04/goma-mickey-mouse-dog-1.jpeg",
            "nombre": "Perro Mickey Mouse",
            "temperamento": "Sweet-Tempered, Lovable, Charming, Happy, Fun-loving",
            "peso": "2 - 6",
          },
          
          {
            "imagen": "https://i.pinimg.com/236x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg",
            "nombre": "Ladronzuelo",
            "temperamento": "Alert, Adventurous, Intelligent, Brave",
            "peso": "4 - 8"
          },
          
          {
            "imagen": "https://static.emisorasunidas.com/uploads/2018/09/1509825_611040699027162_419543691804365799_n1.jpg",
            "nombre": "Perro Yoga",
            "temperamento": "Happy, Friendly, Faithful, Energetic, Devoted",
            "peso": "10 - 18"
          },

          {
            "imagen": "https://mymodernmet.com/wp/wp-content/uploads/2021/04/goma-mickey-mouse-dog-1.jpeg",
            "nombre": "Perro Mickey Mouse",
            "temperamento": "Sweet-Tempered, Lovable, Charming, Happy, Fun-loving",
            "peso": "2 - 6",
          },
          
          {
            "imagen": "https://i.pinimg.com/236x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg",
            "nombre": "Ladronzuelo",
            "temperamento": "Alert, Adventurous, Intelligent, Brave",
            "peso": "4 - 8"
          },
          
          {
            "imagen": "https://static.emisorasunidas.com/uploads/2018/09/1509825_611040699027162_419543691804365799_n1.jpg",
            "nombre": "Perro Yoga",
            "temperamento": "Happy, Friendly, Faithful, Energetic, Devoted",
            "peso": "10 - 18"
          },

          {
            "imagen": "https://mymodernmet.com/wp/wp-content/uploads/2021/04/goma-mickey-mouse-dog-1.jpeg",
            "nombre": "Perro Mickey Mouse",
            "temperamento": "Sweet-Tempered, Lovable, Charming, Happy, Fun-loving",
            "peso": "2 - 6",
          },
          
          {
            "imagen": "https://i.pinimg.com/236x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg",
            "nombre": "Ladronzuelo",
            "temperamento": "Alert, Adventurous, Intelligent, Brave",
            "peso": "4 - 8"
          },
          
          {
            "imagen": "https://static.emisorasunidas.com/uploads/2018/09/1509825_611040699027162_419543691804365799_n1.jpg",
            "nombre": "Perro Yoga",
            "temperamento": "Happy, Friendly, Faithful, Energetic, Devoted",
            "peso": "10 - 18"
          }
    ]

    return (
        <div>
            {dogs.map(dog=>{
            return <Card imagen={dog.imagen} nombre={dog.nombre} temperamento={dog.temperamento} peso={dog.peso}/>})};
        </div>
    )
};

export default CardsContainer;

//este componente debe tomar un array de dogs y 
//por cada dog, renderizar un componente Card