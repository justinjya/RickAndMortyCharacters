import './CharactersByLocation.css';
import { CharacterCard } from 'components';
import { useParams } from 'react-router-dom';

function CharactersByLocation() {
  const { location } = useParams();
  const storedLocations = JSON.parse(localStorage.getItem('locations')) || {};
  const characters = storedLocations[location] || [];

  return (
    <>
      <h2>Characters in {location}</h2>
      <div className="Characters-List-Container">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  );
}

export default CharactersByLocation;