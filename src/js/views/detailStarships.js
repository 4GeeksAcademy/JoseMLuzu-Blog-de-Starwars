import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailStarships = () => {
    const { theid: id } = useParams();
    const [starship, setStarship] = useState(null);

    useEffect(() => {
        // Fetch starship details based on the ID
        fetch(`https://www.swapi.tech/api/starships/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    console.log(data.result);
                    setStarship(data.result);
                } else {
                    console.error("No data found");
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    const placeholderImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";


    return (
        <div className="cuerpo card mb-3 bg-body-tertiary bottom-0 start-50 translate-middle-x bg-dark" style={{ width: "100%", height: "100%" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={starship ? `https://starwars-visualguide.com/assets/img/starships/${id}.jpg` : ''}
                        onError={(e) => { e.target.src = placeholderImage }}
                        className="img-fluid rounded-start mb-5 pb-5"
                        alt={starship ? starship.properties.name : "Loading..."}
                    />
                </div>
                <div className="col-md-8">
                    <div className="d-flex container">
                        {starship ? (
                            <>
                                <div>

                                    <h3 className="card-text px-3"> <strong>{starship.properties.name} </strong></h3>
                                    <br />
                                    <p className="card-text px-3">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet sagittis. Aliquam risus odio, egestas quis auctor sit amet, finibus eget augue. Etiam eu dolor aliquam, dictum nisl nec, semper sem. Vestibulum sollicitudin risus leo, eu auctor neque euismod ac. Phasellus euismod nisl vitae metus placerat rhoncus. Aliquam erat volutpat. Sed volutpat pellentesque sem vel hendrerit.
                                    </p>
                                </div>
                                <div className="bg-danger-subtle d-flex mt-3 position-absolute bottom-0 start-0 ">
                                    <p className="card-text ms-3 border-start ps-3 me-5"><strong>Model:</strong> <br /> {starship.properties.model}</p>
                                    <p className="card-text border-start ps-3 me-5"><strong>Manufacturer:</strong> <br /> {starship.properties.manufacturer}</p>
                                    <p className="card-text border-start ps-3 me-5"><strong>Cost in Credits:</strong> <br /> {starship.properties.cost_in_credits}</p>
                                    <p className="card-text border-start ps-3 me-5"><strong>Length:</strong> <br /> {starship.properties.length}</p>
                                    <p className="card-text border-start ps-3 me-5"><strong>Crew:</strong> <br /> {starship.properties.crew}</p>
                                    <p className="card-text border-start ps-3 me-5"><strong>Passengers:</strong> <br /> {starship.properties.passengers}</p>
                                <div>
                                    <p className="card-text border-start ps-3 me-5"><strong>Starship Class:</strong> <br /> {starship.properties.starship_class}</p>
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

export default DetailStarships;
