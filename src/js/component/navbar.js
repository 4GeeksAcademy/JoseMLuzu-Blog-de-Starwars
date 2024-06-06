import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext'; 

function getStarWarsLogoUrl() {
    return 'https://cdn.worldvectorlogo.com/logos/star-wars-2.svg';
}

export const Navbar = () => {
    const { favorites, removeFavorite } = useFavorites();

    return (
        <nav className="navbar navbar-light bg-black mb-3 border border-white border-top-0 border-end-0 border-start-0">
            <Link to="/">
                <img src={getStarWarsLogoUrl()} alt="Star Wars Logo" className="navbar-logo px-3" />
            </Link>
            <div className="ml-auto pe-5 me-3 ">
                <div className="dropdown ">
                    <button className="btn btn-secondary dropdown-toggle btn-warning" type="button" id="dropdownMenuButton " data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites ({favorites.length})
                    </button>
                    <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton ">
                        {favorites.length === 0 ? (
                            <li><span className="dropdown-item ">No favorites yet</span></li>
                        ) : (
                            favorites.map((favorite) => (
                                <li key={favorite} className="d-flex justify-content-between align-items-center">
                                    <span className="dropdown-item">{favorite}</span>
                                    <button 
                                        className="btn btn-link text-danger p-0" 
                                        onClick={() => removeFavorite(favorite)}
                                        aria-label={`Remove ${favorite} from favorites`}>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
