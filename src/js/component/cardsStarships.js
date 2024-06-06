import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

const CardsStarships = () => {
    const [starshipsData, setStarshipsData] = useState([]);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        fetch("https://www.swapi.tech/api/starships/")
            .then(res => res.json())
            .then(data => setStarshipsData(data.results))
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

    const isFavorite = (starshipUid) => favorites.includes(starshipUid);

    return (
        <div>
            <h2>Starships</h2>
            <Slider {...settings}>
                {starshipsData.map((starship) => (
                    <div key={starship.uid} className="card bg-dark" style={{ width: "60%" }}>
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`} 
                            onError={(e) => { 
                                e.target.src = placeholderImage; 
                                e.target.style.width = "316px"; 
                                e.target.style.height = "210px"; 
                            }}
                            style={{ width: "316px", height: "auto" }}
                            className="card-img-top" 
                            alt={starship.name} 
                        />
                        <div className="card-body">
                            <h5 className="card-title">{starship.name}</h5>
                            <Link to={`/detailStarships/${starship.uid}`}>
                                <button className="btn btn-outline-primary me-3">Learn more</button>
                            </Link>
                            <button 
                                className={`btn ${isFavorite(starship.name) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={() => {
                                    if (isFavorite(starship.name)) {
                                        removeFavorite(starship.name);
                                    } else {
                                        addFavorite(starship.name);
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

export default CardsStarships;
