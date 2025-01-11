document.addEventListener('DOMContentLoaded', () => {
  const specialsContainer = document.querySelector('.specials-container');

  fetch('data/menu.json')
    .then(response => response.json())
    .then(data => {
      const specials = data.specials;
      specialsContainer.innerHTML = specials.map(special => `
        <div class="special-item">
          <h3>${special.name}</h3>
          <p>${special.description}</p>
          <img src="img/${special.image}" alt="${special.name}" />
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error loading specials:', error);
      specialsContainer.innerHTML = '<p>Kunde inte ladda specialrätterna just nu. Försök igen senare!</p>';
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.querySelector('.menu-container');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  fetch('data/menu.json')
    .then(response => response.json())
    .then(data => {
      const menuItems = data.items;
      const menuHTML = menuItems.map(item => {
        const isFavorite = favorites.includes(item.name);
        return `
          <div class="menu-item">
            <img src="img/${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>${item.price}</strong></p>
            <button class="favorite-btn" data-name="${item.name}">
              ${isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
          </div>
        `;
      }).join('');
      menuContainer.innerHTML = menuHTML;

      
      document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (event) => {
          const itemName = event.target.dataset.name;
          toggleFavorite(itemName);
        });
      });
    })
    .catch(error => {
      menuContainer.innerHTML = '<p>Could not load menu.</p>';
      console.error(error);
    });

  function toggleFavorite(itemName) {
    if (favorites.includes(itemName)) {
      const index = favorites.indexOf(itemName);
      favorites.splice(index, 1);
    } else {
      favorites.push(itemName);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    document.querySelectorAll('.favorite-btn').forEach(button => {
      if (button.dataset.name === itemName) {
        button.textContent = favorites.includes(itemName) ? 'Unfavorite' : 'Favorite';
      }
    });
  }
});
