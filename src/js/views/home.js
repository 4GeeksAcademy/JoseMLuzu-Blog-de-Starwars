import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import CardsCharacters from "../component/cardsCharacters";
import CardsPlanet from "../component/cardsPlantes";
import CardsSpecies from "../component/cardsSpecies";
import CardsStarships from "../component/cardsStarships";
import CardsVehicles from "../component/cardsVehicles";


export const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setLoading(false); // Cambiar el estado de carga a falso después de un tiempo simulado
    }, 2000); // Simula una carga de 2 segundos
  }, []);

  return (
    <div className="App">
      {loading ? ( // Mostrar la imagen mientras se está cargando
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <img
            src="https://usagif.com/wp-content/uploads/2021/06/2.gif"
            alt="Loading..."
            className="loading-image"
          />
        </div>
      ) : ( // Una vez que la carga ha terminado, mostrar el contenido
        <div className="text-center mt-5">
          <CardsCharacters />
          <br />
          <br />
          <br />
          <CardsPlanet />
          <br />
          <br />
          <br />
          <CardsSpecies />
          <br />
          <br />
          <br />
          <CardsStarships />
          <br />
          <br />
          <br />
          <CardsVehicles />
        </div>
      )}
    </div>
  );
};
