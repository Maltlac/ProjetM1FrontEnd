// src/utils/validation.js
export const isValidName = (name) => /^[a-zA-ZÀ-ÿ '-]+$/.test(name);
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPostalCode = (postalCode) => /^\d{5}$/.test(postalCode);
export const isAdult = (birthDate) => {
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
  return age >= 18;
};
