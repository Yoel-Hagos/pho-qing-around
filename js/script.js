// specials.js
document.addEventListener('DOMContentLoaded', () => {
    const specialsContainer = document.querySelector('.specials-container');
  
    fetch('data/menu.json')
      .then(response => response.json())
      .then(data => {
        const specials = data.specials; // Anta att "specials" är en array i JSON-filen.
        specialsContainer.innerHTML = specials.map(special => `
          <div class="special-item">
            <h3>${special.name}</h3>
            <p>${special.description}</p>
          </div>
        `).join('');
      })
      .catch(error => {
        console.error('Error loading specials:', error);
        specialsContainer.innerHTML = '<p>Kunde inte ladda specialrätterna just nu. Försök igen senare!</p>';
      });
  });
  