/* ============================================================
   login.js  –  Strong client-side validation
   ============================================================ */

// ── Helpers ──────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

function showError(inputId, errorId, msg) {
    const input = $(inputId);
    const err = $(errorId);
    if (!input || !err) return;
    input.classList.add('error');
    input.classList.remove('valid');
    err.textContent = msg;
    err.classList.add('visible');
}

function clearError(inputId, errorId) {
    const input = $(inputId);
    const err = $(errorId);
    if (!input || !err) return;
    input.classList.remove('error');
    input.classList.add('valid');
    err.textContent = '';
    err.classList.remove('visible');
}

function showToast(msg, type = 'success') {
    const toast = $('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `toast ${type} show`;
    setTimeout(() => { toast.classList.remove('show'); }, 3500);
}

// ── Validators ────────────────────────────────────────────────

const RULES = {
    email: {
        validate(val) {
            if (!val.trim()) return 'Email address is required.';
            if (val.trim().length > 254) return 'Email address is too long.';
            // RFC-5321 compliant regex
            const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
            if (!re.test(val.trim())) return 'Please enter a valid email address.';
            return null;
        }
    },
    password: {
        validate(val) {
            if (!val) return 'Password is required.';
            if (val.length < 8) return 'Password must be at least 8 characters.';
            if (val.length > 128) return 'Password is too long (max 128 characters).';
            return null;
        }
    }
};

function validateField(inputId, errorId, ruleKey) {
    const val = $(inputId) ? $(inputId).value : '';
    const msg = RULES[ruleKey].validate(val);
    if (msg) { showError(inputId, errorId, msg); return false; }
    clearError(inputId, errorId);
    return true;
}

// ── Toggle Password ───────────────────────────────────────────

const togglePass = $('togglePass');
const passwordInput = $('password');

if (togglePass && passwordInput) {
    togglePass.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        togglePass.textContent = isHidden ? '🙈' : '👁';
    });
}

// ── Live Validation (on blur) ─────────────────────────────────

$('email')?.addEventListener('blur', () => validateField('email', 'email-error', 'email'));
$('password')?.addEventListener('blur', () => validateField('password', 'password-error', 'password'));

// Clear errors while typing so user gets immediate feedback
$('email')?.addEventListener('input', () => {
    if ($('email').classList.contains('error')) validateField('email', 'email-error', 'email');
});
$('password')?.addEventListener('input', () => {
    if ($('password').classList.contains('error')) validateField('password', 'password-error', 'password');
});

// ── Submit ────────────────────────────────────────────────────

$('loginBtn')?.addEventListener('click', () => {
    const emailOk = validateField('email', 'email-error', 'email');
    const passwordOk = validateField('password', 'password-error', 'password');

    if (!emailOk || !passwordOk) {
        showToast('Please fix the errors before continuing.', 'error');
        // Focus first invalid field
        if (!emailOk) { $('email').focus(); return; }
        if (!passwordOk) { $('password').focus(); return; }
        return;
    }

    // ✅ Validation passed — add your real auth logic here
    showToast('Logging in… welcome back!', 'success');
});

// ── Enter key submits form ────────────────────────────────────

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') $('loginBtn')?.click();
});
