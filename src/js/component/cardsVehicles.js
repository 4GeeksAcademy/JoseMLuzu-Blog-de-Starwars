import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

const CardsVehicles = () => {
    const [vehiclesData, setVehiclesData] = useState([]);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        fetch("https://www.swapi.tech/api/vehicles/")
            .then(res => res.json())
            .then(data => setVehiclesData(data.results))
            .catch(err => console.error(err));
    }, []);

    const placeholderImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 2
    };

    const isFavorite = (vehicleUid) => favorites.includes(vehicleUid);

    return (
        <div>
            <h2>Vehicles</h2>
            <Slider {...settings}>
                {vehiclesData.map((vehicle) => (
                    <div key={vehicle.uid} className="card bg-dark" style={{ width: "60%" }}>
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`} 
                            onError={(e) => { 
                                e.target.src = placeholderImage; 
                                e.target.style.width = "316px"; 
                                e.target.style.height = "210px"; 
                            }}
                            style={{ width: "316px", height: "auto" }}
                            className="card-img-top" 
                            alt={vehicle.name} 
                        />
                        <div className="card-body">
                            <h5 className="card-title">{vehicle.name}</h5>
                            <Link to={`/detailVehicles/${vehicle.uid}`}>
                                <button className="btn btn-outline-primary me-3">Learn more</button>
                            </Link>
                            <button 
                                className={`btn ${isFavorite(vehicle.name) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={() => {
                                    if (isFavorite(vehicle.name)) {
                                        removeFavorite(vehicle.name);
                                    } else {
                                        addFavorite(vehicle.name);
                                    }
                                }}
                            >
                                <i className="fa-solid fa-heart"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CardsVehicles;
