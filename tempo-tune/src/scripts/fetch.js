// Fetching functions to interact with API

export async function fetchProfile() {
    const token = localStorage.getItem('access_token');
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
}