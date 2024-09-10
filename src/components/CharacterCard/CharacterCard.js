import './CharacterCard.css';
import { useNavigate } from 'react-router-dom';

function CharacterCard({ character }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/characters/${character.id}`);
  }

  return (
    <div className="Character-Card" id={character.id} onClick={handleClick}>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
    </div>
  );
}

export default CharacterCard;