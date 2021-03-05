const BASE_URL = 'https://rickandmortyapi.com/graphql';

function rangeGenerator (start = 1) {
  return Array.from({length:10}, (_,i) => start + i);
}

export async function fetchCharacters (startId) {
  const idRange = rangeGenerator(startId);
  try { 
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query {
          charactersByIds(ids:${JSON.stringify(idRange)}) {
            id
            name
          }
        }`
      })
    });
  
    if (response.status < 400) {
      const data = await response.json();
      console.log(data.data.charactersByIds);
      return data.data.charactersByIds;
    } else {
      Promise.reject(response);
    }

  } catch (e) {
    console.log(e);
  }
}