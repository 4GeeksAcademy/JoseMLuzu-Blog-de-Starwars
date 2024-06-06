// src/component/CardsCharacters.js

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";
import { useFavorites } from './FavoritesContext';

const CardsCharacters = () => {
    const [charactersData, setCharactersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        fetch("https://www.swapi.tech/api/people/")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setCharactersData(data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err);
                setLoading(false);
            });
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        autoplay: true,
        slidesToScroll: 2,
    };

    const isFavorite = (characterName) => favorites.includes(characterName);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <img
                    src="https://usagif.com/wp-content/uploads/2021/06/2.gif"
                    alt="Loading..."
                    className="loading-image"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <p>Error loading data: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Characters</h2>
            <Slider {...settings}>
                {charactersData.map((character) => (
                    <div key={character.uid} className="card bg-dark" style={{ width: "60%" }}>
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`} className="card-img-top" alt="" />
                        <div className="card-body">
                            <h5 className="card-title1">{character.name}</h5>
                            <Link to={`/detailCharacters/${character.uid}`}>
                                <button className="btn btn-outline-primary me-3">Learn more</button>
                            </Link>
                            <button
                                className={`btn ${isFavorite(character.name) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={() => {
                                    if (isFavorite(character.name)) {
                                        removeFavorite(character.name);
                                    } else {
                                        addFavorite(character.name);
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

export default CardsCharacters;
