const BASE_URL = "https://rickandmortyapi.com/graphql";

const GET_CHARACTERS_QUERY = `
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

async function fetchCharacters() {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_CHARACTERS_QUERY,
    }),
  });

  const data = await response.json();
  return data.data.characters.results;
}

const GET_CHARACTER_BY_ID_QUERY = `
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
    }
  }
`;

async function fetchCharacterById(id) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_CHARACTER_BY_ID_QUERY,
      variables: { id },
    }),
  });

  const data = await response.json();
  return data.data.character;
}
  
export { fetchCharacters, fetchCharacterById };