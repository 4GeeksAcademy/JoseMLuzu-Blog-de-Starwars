import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

const CardsSpecies = () => {
    const [speciesData, setSpeciesData] = useState([]);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        fetch("https://www.swapi.tech/api/species/")
            .then(res => res.json())
            .then(data => setSpeciesData(data.results))
            .catch(err => console.error(err));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 2
    };

    const isFavorite = (specieUid) => favorites.includes(specieUid);

    return (
        <div>
            <h2>Species</h2>
            <Slider {...settings}>
                {speciesData.map((specie) => (
                    <div key={specie.uid} className="card bg-dark" style={{ width: "60%" }}>
                        <img src={`https://starwars-visualguide.com/assets/img/species/${specie.uid}.jpg`} className="card-img-top" alt="" />
                        <div className="card-body">
                            <h5 className="card-title1">{specie.name}</h5>
                            <Link to={`/detailSpecies/${specie.uid}`}>
                                <button className="btn btn-outline-primary me-3">Learn more</button>
                            </Link>
                            <button 
                                className={`btn ${isFavorite(specie.name) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={() => {
                                    if (isFavorite(specie.name)) {
                                        removeFavorite(specie.name);
                                    } else {
                                        addFavorite(specie.name);
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

export default CardsSpecies;
