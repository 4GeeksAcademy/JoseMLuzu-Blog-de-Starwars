import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const DetailVehicles = () => {
    const { theid: id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://www.swapi.tech/api/vehicles/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch vehicle data");
                }
                return res.json();
            })
            .then(data => {
                if (data.result) {
                    setVehicle(data.result);
                } else {
                    throw new Error("Vehicle data not found");
                }
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="bg-danger text-white p-3">{error}</div>;
    }

    return (
        <div className="cuerpo card mb-3 bg-body-tertiary bottom-0 start-50 translate-middle-x bg-dark" style={{ maxWidth: "1540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
                        className="img-fluid rounded-start mb-5 pb-5"
                        alt={vehicle.properties.name}
                    />
                </div>
                <div className="col-md-8">
                    <div className="d-flex flex-column">
                        <div>
                            <h3 className="card-text px-3"><strong>{vehicle.properties.name}</strong></h3>
                            <br />
                            <p className="card-text px-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet sagittis. Aliquam risus odio, egestas quis auctor sit amet, finibus eget augue. Etiam eu dolor aliquam, dictum nisl nec, semper sem. Vestibulum sollicitudin risus leo, eu auctor neque euismod ac. Phasellus euismod nisl vitae metus placerat rhoncus. Aliquam erat volutpat. Sed volutpat pellentesque sem vel hendrerit.
                            </p>
                        </div>
                        <div className="bg-danger-subtle d-flex mt-3 position-absolute bottom-0 start-0">
                            <br></br>
                            <p className="card-text ms-3 border-start ps-3 me-5"><strong>Model:</strong> <br /> {vehicle.properties.model}</p>
                            <p className="card-text border-start ps-3 me-5"><strong>Manufacturer:</strong> <br /> {vehicle.properties.manufacturer}</p>
                            <p className="card-text border-start ps-3 me-5"><strong>Cost in Credits:</strong> <br /> {vehicle.properties.cost_in_credits}</p>
                            <div>
                                <p className="card-text border-start ps-3 me-5"><strong>Max Speed:</strong> <br /> {vehicle.properties.max_atmosphering_speed}</p>
                            </div>
                            <div>
                                <p className="card-text border-start ps-3 me-5"><strong>Crew:</strong> <br /> {vehicle.properties.crew}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DetailVehicles.propTypes = {
    theid: PropTypes.string.isRequired,
};

export default DetailVehicles;
