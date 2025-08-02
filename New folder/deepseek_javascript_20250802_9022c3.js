// In login/signup handlers:
function hashPassword(password) {
    // In real implementation, use Web Crypto API
    return btoa(password); // Placeholder - use proper hashing
}

// Store session timeout
let sessionTimer;
function resetSessionTimer() {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(logout, 30 * 60 * 1000); // 30 min
}

document.addEventListener('mousemove', resetSessionTimer);
document.addEventListener('keypress', resetSessionTimer);