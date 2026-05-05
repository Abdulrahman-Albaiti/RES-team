// =============================================
// DASHBOARD JS - La Maison Restaurant
// =============================================

const stats = [
  { icon: '🧾', value: '124',    label: 'Orders Today',      cls: '' },
  { icon: '💰', value: '$3,840', label: 'Revenue Today',     cls: 'gold' },
  { icon: '⭐', value: '4.8',    label: 'Avg. Rating',       cls: 'green' },
  { icon: '🪑', value: '8',      label: 'Tables Reserved',   cls: 'red' },
];

const orders = [
  { id: '#1041', customer: 'Ahmed Hassan',   item: 'Grilled Ribeye',  amount: '$28', status: 'Served',  badge: 'badge-success' },
  { id: '#1042', customer: 'Sara Youssef',   item: 'Truffle Pasta',   amount: '$22', status: 'Pending', badge: 'badge-warning' },
  { id: '#1043', customer: 'Omar Khaled',    item: 'Shrimp Bisque',   amount: '$16', status: 'Served',  badge: 'badge-success' },
  { id: '#1044', customer: 'Nour El-Din',    item: 'Crème Brûlée',   amount: '$10', status: 'Pending', badge: 'badge-warning' },
  { id: '#1045', customer: 'Layla Mostafa',  item: 'Grilled Ribeye',  amount: '$28', status: 'Cancelled', badge: 'badge-danger' },
];

const popular = [
  { icon: '🥩', name: 'Grilled Ribeye',  count: '42 orders', pct: 85 },
  { icon: '🍝', name: 'Truffle Pasta',   count: '31 orders', pct: 63 },
  { icon: '🍤', name: 'Shrimp Bisque',   count: '27 orders', pct: 54 },
  { icon: '🍰', name: 'Crème Brûlée',   count: '24 orders', pct: 48 },
];

const recentFeedback = [
  { text: '"The ribeye was perfectly cooked — amazing experience!"', name: 'Ahmed H.', time: '2 hours ago' },
  { text: '"Lovely ambiance and very attentive staff."',              name: 'Sara Y.',  time: '5 hours ago' },
  { text: '"The pasta was divine. Will definitely return."',          name: 'Omar K.',  time: 'Yesterday'  },
];

const reservations = [
  { name: 'Hassan Family',  time: '1:00 PM', seats: '4 seats' },
  { name: 'Mona Ibrahim',   time: '2:30 PM', seats: '2 seats' },
  { name: 'Khaled & Party', time: '7:00 PM', seats: '6 seats' },
  { name: 'Rania Samir',    time: '8:30 PM', seats: '2 seats' },
];

// ---- Render Functions ----

function renderStats() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;
  grid.innerHTML = stats.map(s => `
    <div class="stat-card ${s.cls}">
      <div class="stat-icon">${s.icon}</div>
      <div class="stat-info">
        <h3>${s.value}</h3>
        <p>${s.label}</p>
      </div>
    </div>
  `).join('');
}

function renderOrders() {
  const tbody = document.getElementById('ordersBody');
  if (!tbody) return;
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td>${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.item}</td>
      <td>${o.amount}</td>
      <td><span class="badge ${o.badge}">${o.status}</span></td>
    </tr>
  `).join('');
}

function renderPopular() {
  const list = document.getElementById('popularList');
  if (!list) return;
  list.innerHTML = popular.map(item => `
    <div class="popular-item">
      <div class="popular-icon">${item.icon}</div>
      <div class="popular-info">
        <p>${item.name}</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${item.pct}%"></div>
        </div>
      </div>
      <span class="popular-count">${item.count}</span>
    </div>
  `).join('');
}

function renderFeedback() {
  const list = document.getElementById('feedbackList');
  if (!list) return;
  list.innerHTML = recentFeedback.map(f => `
    <div class="feedback-item">
      <p>${f.text}</p>
      <span class="feedback-meta">${f.name} · ${f.time}</span>
    </div>
  `).join('');
}

function renderReservations() {
  const list = document.getElementById('reservationList');
  if (!list) return;
  list.innerHTML = reservations.map(r => `
    <div class="reservation-item">
      <div>
        <div class="res-name">${r.name}</div>
        <div class="res-time">${r.time}</div>
      </div>
      <span class="res-seats">${r.seats}</span>
    </div>
  `).join('');
}

function setDashboardDate() {
  const el = document.getElementById('dashDate');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
  setDashboardDate();
  renderStats();
  renderOrders();
  renderPopular();
  renderFeedback();
  renderReservations();
});
