import './CharactersList.css';
import { useEffect, useState } from 'react';
import { CharacterCard } from 'components';
import { fetchCharacters } from 'services/api';

function CharactersList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const characters = await fetchCharacters();
      setCharacters(characters);
    }

    getCharacters();
  }, []);

  if (!characters.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="Characters-List-Container">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  );
}

export default CharactersList;