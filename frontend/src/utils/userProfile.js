// Utility functions for user profile in localStorage

export function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

export function getUserProfile() {
  const data = localStorage.getItem("userProfile");
  return data ? JSON.parse(data) : null;
}

export function clearUserProfile() {
  localStorage.removeItem("userProfile");
}