import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailCharacters = () => {
    const { theid: id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        // Fetch character details based on the ID
        fetch(`https://www.swapi.tech/api/people/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    console.log(data.result);
                    setCharacter(data.result);
                } else {
                    console.error("No data found");
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div className="cuerpo card mb-3 bg-body-tertiary bottom-0 start-50 translate-middle-x bg-dark" style={{ maxWidth: "850px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={character ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg` : ''}
                        className="img-fluid rounded-start mb-5 pb-5"
                        alt={character ? character.properties.name : "Loading..."}
                    />
                </div>
                <div className="col-md-8">
                    <div className="d-flex container">
                        {character ? (
                            <>
                                <div>
                                    <h3 className="card-text px-3"> <strong>{character.properties.name} </strong></h3>
                                    <br />
                                    <p className="card-text px-3">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet sagittis. Aliquam risus odio, egestas quis auctor sit amet, finibus eget augue. Etiam eu dolor aliquam, dictum nisl nec, semper sem. Vestibulum sollicitudin risus leo, eu auctor neque euismod ac. Phasellus euismod nisl vitae metus placerat rhoncus. Aliquam erat volutpat. Sed volutpat pellentesque sem vel hendrerit.
                                    </p>
                                </div>
                                <div className="bg-danger-subtle d-flex mt-3 position-absolute bottom-0 start-0 ">
                                    <p className="card-text ms-3 border-start ps-3 me-5"><strong>Gender:</strong> <br /> {character.properties.gender}</p>
                                    <p className="card-text border-start ps-3 me-5"><strong>Birth Year:</strong> <br /> {character.properties.birth_year}</p>
                                    <p className="card-text border-start ps-3 me-5"><strong>Eye Color:</strong> <br /> {character.properties.eye_color}</p>
                                    <p className="card-text border-start ps-3 me-5"><strong>Height:</strong> <br /> {character.properties.height}</p>
                                    <div>
                                        <p className="card-text border-start ps-3 me-5"><strong>Mass:</strong> <br /> {character.properties.mass}</p>
                                    </div>

                                </div>
                            </>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCharacters;
