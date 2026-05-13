export const validateEmail = (email) => {
    if (!email || typeof email !== "string") return false;
    const trimmedEmail = email.trim();
    if (trimmedEmail.length < 5 || trimmedEmail.length > 254) {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(trimmedEmail);
}

export const validatePassword = (password) => {
        if (!password || typeof password !== "string") return false;
        const length = password.length;
        if (length < 8 || length > 72) {
            return false;
        }
        return true;
}