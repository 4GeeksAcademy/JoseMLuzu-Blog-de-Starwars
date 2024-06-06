import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

const CardsPlanets = () => {
    const [planetsData, setPlanetsData] = useState([]);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        fetch("https://www.swapi.tech/api/planets/")
            .then(res => res.json())
            .then(data => setPlanetsData(data.results))
            .catch(err => console.error(err));
    }, []);

    const placeholderImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2
    };

    const isFavorite = (planetUid) => favorites.includes(planetUid);

    return (
        <div>
            <h2>Planets</h2>
            <Slider {...settings}>
                {planetsData.map((planet) => (
                    <div key={planet.uid} className="card bg-dark" style={{ width: "200px", height: "200px" }}>
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} 
                            onError={(e) => { 
                                e.target.src = placeholderImage; 
                                e.target.style.width = "316px"; 
                                e.target.style.height = "316px"; 
                            }} 
                            className="card-img-top" 
                            alt={planet.name} 
                            style={{ width: "316px", height: "auto" }}
                        />
                        <div className="card-body">
                            <h5 className="card-title1">{planet.name}</h5>
                            <Link to={`/detailPlanets/${planet.uid}`}>
                                <button className="btn btn-outline-primary me-3">Learn more</button>
                            </Link>
                            <button 
                                className={`btn ${isFavorite(planet.name) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={() => {
                                    if (isFavorite(planet.name)) {
                                        removeFavorite(planet.name);
                                    } else {
                                        addFavorite(planet.name);
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

export default CardsPlanets;
