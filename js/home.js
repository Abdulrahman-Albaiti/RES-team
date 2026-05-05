// =============================================
// HOME PAGE JS - La Maison Restaurant
// =============================================

const menuData = [
  { icon: '🥩', name: 'Grilled Ribeye',    desc: 'Prime cut with herb butter',      price: '$28' },
  { icon: '🍝', name: 'Truffle Pasta',     desc: 'House-made pasta, black truffle',  price: '$22' },
  { icon: '🍤', name: 'Shrimp Bisque',     desc: 'Creamy, rich seafood broth',       price: '$16' },
  { icon: '🍰', name: 'Crème Brûlée',      desc: 'Classic French dessert',           price: '$10' },
];

const hoursData = [
  { day: 'Monday – Thursday', time: '12:00 PM – 10:00 PM' },
  { day: 'Friday',            time: '12:00 PM – 11:00 PM' },
  { day: 'Saturday',          time: '11:00 AM – 11:00 PM' },
  { day: 'Sunday',            time: '11:00 AM – 9:00 PM'  },
];

function renderMenuCards() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  grid.innerHTML = menuData.map(item => `
    <div class="menu-card">
      <div class="menu-card-img">${item.icon}</div>
      <div class="menu-card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <span class="menu-card-price">${item.price}</span>
      </div>
    </div>
  `).join('');
}

function renderHours() {
  const tbody = document.getElementById('hoursBody');
  if (!tbody) return;

  tbody.innerHTML = hoursData.map(row => `
    <tr>
      <td>${row.day}</td>
      <td>${row.time}</td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenuCards();
  renderHours();
});
