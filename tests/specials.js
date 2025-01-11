export function fetchSpecials() {
    return fetch('data/menu.json')
      .then(response => response.json())
      .then(data => data.specials)
      .catch(error => console.error('Error fetching specials:', error));
  }
  