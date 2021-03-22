const BASE_URL = 'https://rickandmortyapi.com';

export async function fetchCharactersByPage (page, characterName='') {
  try { 
    const response = await fetch(`${BASE_URL}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query {
          characters(page:${page}, filter: {name: "${characterName}"}) {
            info {
              count
              pages
              next
            }
            results {
              id
              name
              status
              species
              type
              image
            }
          }
        }`
      })
    });
  
    if (response.status < 400) {
      const result = await response.json();
      if (result.data.characters) return result.data.characters.results;
    } else {
      Promise.reject(response);
    }

  } catch (e) {
    console.log(e);
  }
}
