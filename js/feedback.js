// =============================================
// FEEDBACK PAGE JS - La Maison Restaurant
// =============================================

const sampleReviews = [
  { name: 'Ahmed Hassan',  stars: 5, text: 'Absolutely incredible dining experience. The ribeye was perfection!', date: 'April 22, 2026' },
  { name: 'Sara Youssef',  stars: 4, text: 'Lovely atmosphere and very warm staff. The pasta was delicious.',     date: 'April 20, 2026' },
  { name: 'Omar Khaled',   stars: 5, text: 'Best restaurant in Cairo, hands down. We will be back!',              date: 'April 18, 2026' },
];

let selectedRating = 0;

// ---- Star Rating ----
function initStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, i) => {
    star.addEventListener('mouseenter', () => highlightStars(i + 1));
    star.addEventListener('mouseleave', () => highlightStars(selectedRating));
    star.addEventListener('click', () => {
      selectedRating = i + 1;
      highlightStars(selectedRating);
      document.getElementById('ratingValue').value = selectedRating;
    });
  });
}

function highlightStars(count) {
  document.querySelectorAll('.star').forEach((star, i) => {
    star.classList.toggle('active', i < count);
  });
}

// ---- Form Validation ----
function validateField(id, errorId, check) {
  const el  = document.getElementById(id);
  const err = document.getElementById(errorId);
  const valid = check(el.value.trim());
  el.classList.toggle('invalid', !valid);
  err.classList.toggle('visible', !valid);
  return valid;
}

function validateForm() {
  const nameOk    = validateField('guestName', 'nameError',    v => v.length >= 2);
  const emailOk   = validateField('guestEmail', 'emailError',  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const visitOk   = validateField('visitType', 'visitError',   v => v !== '');
  const commentOk = validateField('comment', 'commentError',   v => v.length >= 10);

  const ratingErr = document.getElementById('ratingError');
  const ratingOk  = selectedRating > 0;
  ratingErr.classList.toggle('visible', !ratingOk);

  return nameOk && emailOk && visitOk && commentOk && ratingOk;
}

// ---- Submit ----
function handleSubmit() {
  if (!validateForm()) return;

  const newReview = {
    name:  document.getElementById('guestName').value.trim(),
    stars: selectedRating,
    text:  '"' + document.getElementById('comment').value.trim() + '"',
    date:  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  };

  sampleReviews.unshift(newReview);
  renderReviews();

  document.getElementById('feedbackForm').style.display = 'none';
  document.getElementById('successMsg').classList.add('visible');
}

// ---- Render Reviews ----
function renderReviews() {
  const list = document.getElementById('reviewList');
  if (!list) return;
  list.innerHTML = sampleReviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="review-name">${r.name}</span>
        <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
      </div>
      <p class="review-text">${r.text}</p>
      <span class="review-date">${r.date}</span>
    </div>
  `).join('');
}

// ---- Reset & New Review ----
function resetForm() {
  document.getElementById('feedbackForm').reset();
  selectedRating = 0;
  highlightStars(0);
  document.getElementById('ratingValue').value = '';
  document.getElementById('feedbackForm').style.display = 'block';
  document.getElementById('successMsg').classList.remove('visible');
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  document.querySelectorAll('.visible').forEach(el => el.classList.remove('visible'));
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  renderReviews();

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.addEventListener('click', handleSubmit);

  const newBtn = document.getElementById('newReviewBtn');
  if (newBtn) newBtn.addEventListener('click', resetForm);
});
