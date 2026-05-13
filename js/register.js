/* ============================================================
   register.js  –  Strong client-side validation
   ============================================================ */

// ── Helpers ──────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

function showError(inputId, errorId, msg) {
    const input = $(inputId);
    const err = $(errorId);
    if (err) { err.textContent = msg; err.classList.add('visible'); }
    if (input) { input.classList.add('error'); input.classList.remove('valid'); }
}

function clearError(inputId, errorId) {
    const input = $(inputId);
    const err = $(errorId);
    if (err) { err.textContent = ''; err.classList.remove('visible'); }
    if (input) { input.classList.remove('error'); input.classList.add('valid'); }
}

function showToast(msg, type = 'success') {
    const toast = $('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Validators ────────────────────────────────────────────────

const RULES = {
    fname: {
        validate(val) {
            const v = val.trim();
            if (!v) return 'First name is required.';
            if (v.length < 2) return 'First name must be at least 2 characters.';
            if (v.length > 50) return 'First name is too long (max 50 characters).';
            if (!/^[a-zA-Z\u00C0-\u024F\s'-]+$/.test(v)) return 'First name contains invalid characters.';
            return null;
        }
    },
    lname: {
        validate(val) {
            const v = val.trim();
            if (!v) return 'Last name is required.';
            if (v.length < 2) return 'Last name must be at least 2 characters.';
            if (v.length > 50) return 'Last name is too long (max 50 characters).';
            if (!/^[a-zA-Z\u00C0-\u024F\s'-]+$/.test(v)) return 'Last name contains invalid characters.';
            return null;
        }
    },
    email: {
        validate(val) {
            const v = val.trim();
            if (!v) return 'Email address is required.';
            if (v.length > 254) return 'Email address is too long.';
            const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
            if (!re.test(v)) return 'Please enter a valid email address.';
            return null;
        }
    },
    phone: {
        validate(val) {
            const v = val.trim();
            if (!v) return 'Phone number is required.';
            // Allow international format, Egyptian numbers, etc.
            const cleaned = v.replace(/[\s\-().]/g, '');
            if (!/^\+?[0-9]{7,15}$/.test(cleaned)) return 'Please enter a valid phone number (7–15 digits).';
            return null;
        }
    },
    password: {
        validate(val) {
            if (!val) return 'Password is required.';
            if (val.length < 8) return 'Password must be at least 8 characters.';
            if (val.length > 128) return 'Password is too long (max 128 characters).';
            if (!/[A-Z]/.test(val)) return 'Password must contain at least one uppercase letter.';
            if (!/[a-z]/.test(val)) return 'Password must contain at least one lowercase letter.';
            if (!/[0-9]/.test(val)) return 'Password must contain at least one number.';
            if (!/[^A-Za-z0-9]/.test(val)) return 'Password must contain at least one special character (!@#$%…).';
            return null;
        }
    },
    confirm: {
        validate(val) {
            const pw = $('password') ? $('password').value : '';
            if (!val) return 'Please confirm your password.';
            if (val !== pw) return 'Passwords do not match.';
            return null;
        }
    },
    terms: {
        validate() {
            if (!$('terms') || !$('terms').checked) return 'You must accept the Terms of Service to continue.';
            return null;
        }
    }
};

function validateField(inputId, errorId, ruleKey) {
    const el = $(inputId);
    const val = el ? el.value : '';
    const msg = RULES[ruleKey].validate(val);
    if (msg) { showError(inputId, errorId, msg); return false; }
    clearError(inputId, errorId);
    return true;
}

function validateTerms() {
    const msg = RULES.terms.validate();
    const err = $('terms-error');
    if (msg) {
        if (err) { err.textContent = msg; err.classList.add('visible'); }
        return false;
    }
    if (err) { err.textContent = ''; err.classList.remove('visible'); }
    return true;
}

// ── Password Strength Meter ───────────────────────────────────

function getPasswordStrength(pw) {
    if (!pw) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (pw.length >= 16) score++;

    if (score <= 2) return { score, pct: 25, label: 'Weak', color: '#cc0000' };
    if (score <= 4) return { score, pct: 50, label: 'Fair', color: '#e07b00' };
    if (score <= 5) return { score, pct: 75, label: 'Good', color: '#2e7d32' };
    return { score, pct: 100, label: 'Strong', color: '#1b5e20' };
}

function updateStrengthMeter(pw) {
    const bar = $('strength-bar');
    const text = $('strength-text');
    if (!bar || !text) return;
    const { pct, label, color } = getPasswordStrength(pw);
    bar.style.width = pw ? pct + '%' : '0%';
    bar.style.backgroundColor = color;
    text.textContent = pw ? label : '';
    text.style.color = color;
}

// ── Toggle Password Buttons ───────────────────────────────────

function setupToggle(btnId, inputId) {
    const btn = $(btnId);
    const input = $(inputId);
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
        const hidden = input.type === 'password';
        input.type = hidden ? 'text' : 'password';
        btn.textContent = hidden ? '🙈' : '👁';
    });
}

setupToggle('togglePass', 'password');
setupToggle('toggleConfirm', 'confirm');

// ── Live Validation ───────────────────────────────────────────

const liveFields = [
    ['fname', 'fname-error', 'fname'],
    ['lname', 'lname-error', 'lname'],
    ['email', 'email-error', 'email'],
    ['phone', 'phone-error', 'phone'],
    ['confirm', 'confirm-error', 'confirm'],
];

liveFields.forEach(([inputId, errorId, rule]) => {
    $(`${inputId}`)?.addEventListener('blur', () => validateField(inputId, errorId, rule));
    $(`${inputId}`)?.addEventListener('input', () => {
        if ($(`${inputId}`)?.classList.contains('error')) validateField(inputId, errorId, rule);
    });
});

// Password: validate + strength meter on every keystroke
$('password')?.addEventListener('input', () => {
    const val = $('password').value;
    updateStrengthMeter(val);
    if ($('password').classList.contains('error')) validateField('password', 'password-error', 'password');
    // Re-validate confirm if already touched
    if ($('confirm')?.classList.contains('error') || $('confirm')?.classList.contains('valid')) {
        validateField('confirm', 'confirm-error', 'confirm');
    }
});
$('password')?.addEventListener('blur', () => validateField('password', 'password-error', 'password'));

// ── Submit ────────────────────────────────────────────────────

$('registerBtn')?.addEventListener('click', () => {
    const results = [
        validateField('fname', 'fname-error', 'fname'),
        validateField('lname', 'lname-error', 'lname'),
        validateField('email', 'email-error', 'email'),
        validateField('phone', 'phone-error', 'phone'),
        validateField('password', 'password-error', 'password'),
        validateField('confirm', 'confirm-error', 'confirm'),
        validateTerms(),
    ];

    if (results.some(r => r === false)) {
        showToast('Please fix all errors before continuing.', 'error');
        // Scroll to first error
        const firstError = document.querySelector('.error-msg.visible');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // ✅ All valid — add your real registration logic here
    showToast('Account created successfully! Welcome 🎉', 'success');
});

// ── Enter key submits ─────────────────────────────────────────

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') $('registerBtn')?.click();
});
