function getAPIData(dataset) {
  return fetch(`http://localhost:3001/api/v1/${dataset}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    });
}

