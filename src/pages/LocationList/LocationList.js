import './LocationList.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LocationList() {
  const [locations, setLocations] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || {};
    setLocations(storedLocations);
  }, []);

  const handleLocationClick = (location) => {
    navigate(`/locations/${location}`);
  };

  return (
    <div className="Locations-Container">
      {Object.keys(locations).map((location) => (
        <div
          className="Location-Card"
          key={location}
          onClick={() => handleLocationClick(location)}
        >
          <h3>{location}</h3>
        </div>
      ))}
    </div>
  );
}

export default LocationList;