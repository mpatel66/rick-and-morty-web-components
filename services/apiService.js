const BASE_URL = 'https://rickandmortyapi.com/graphql';

export async function fetchCharacters () {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query {
          charactersByIds(ids:[1]) {
            id
            name
          }
        }`
      })
    });
  
    if (response.status < 400) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      Promise.reject(response);
    }

  } catch (e) {
    console.log(e);
  }
}