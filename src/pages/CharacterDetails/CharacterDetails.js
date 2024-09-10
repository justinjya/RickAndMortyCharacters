import './CharacterDetails.css';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCharacterById } from "services/api";

function CharacterDetails() {
  const existingData = JSON.parse(localStorage.getItem('locations')) || {};
  
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [location, setLocation] = useState('');
  const [characterExists, setCharacterExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCharacterDetails = async () => {
      const characterDetails = await fetchCharacterById(id);
      setCharacter(characterDetails);
    }

    getCharacterDetails();

    for (const loc in existingData) {
      if (existingData[loc].some((char) => char.id === id)) {
        setCharacterExists(true);
        break;
      }
    }
  }, [id]);

  const handleAssignClick = () => {
    setIsAssigning(true);
  };

  const handleCancelClick = () => {
    setIsAssigning(false);
    setLocation('');
  };

  const handleSubmitClick = () => {
    const updatedData = {
      ...existingData,
      [location]: [
        ...(existingData[location] || []),
        {
          id: character.id,
          name: character.name,
          image: character.image,
        },
      ],
    };
  
    localStorage.setItem('locations', JSON.stringify(updatedData));
    setIsAssigning(false);
    setLocation('');
    setCharacterExists(true);
  };

  const handleUnassignClick = () => {
    const existingData = JSON.parse(localStorage.getItem('locations')) || {};

    for (const loc in existingData) {
      existingData[loc] = existingData[loc].filter((char) => char.id !== character.id);
      if (existingData[loc].length === 0) {
        delete existingData[loc];
      }
    }

    localStorage.setItem('locations', JSON.stringify(existingData));
    setCharacterExists(false);
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="Character-Container">
        <img src={character.image} alt={character.name} />
        <h2>{character.name}</h2>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <div className="Assign-Location-Container">
        {isAssigning ? (
          <>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location name"
            />
            <div className="Buttons-Container">
              <button className="Cancel-Button" onClick={handleCancelClick}>Cancel</button>
              <button onClick={handleSubmitClick}>Submit</button>
            </div>
          </>
        ) : (
          characterExists ? (
            <button className="Unassign-Button" onClick={handleUnassignClick}>Unassign Location</button>
          ) : (
            <button className="Assign-Button" onClick={handleAssignClick}>Assign a Location</button>
          )
        )}
        </div>
      </div>
      <h4 className="Back-Button" onClick={() => navigate(-1)}>Go Back</h4>
    </>
  );
}

export default CharacterDetails;