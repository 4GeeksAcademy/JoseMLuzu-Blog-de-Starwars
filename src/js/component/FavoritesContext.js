// src/FavoritesContext.js

import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (characterName) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.includes(characterName)) {
                return [...prevFavorites, characterName];
            }
            return prevFavorites;
        });
    };

    const removeFavorite = (characterName) => {
        setFavorites((prevFavorites) => prevFavorites.filter(name => name !== characterName));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useFavorites = () => useContext(FavoritesContext);
