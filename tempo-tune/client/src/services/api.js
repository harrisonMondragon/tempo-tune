import axios from 'axios';
import { accessToken } from './auth';

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = () => axios.get('/me');

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
 * @returns {Promise}
 */
export const getCurrentUserPlaylists = (limit = 20) => {
  return axios.get(`/me/playlists?limit=${limit}`);
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist
 * @param {string} playlist_id - The Spotify ID for the playlist.
 * @returns {Promise}
 */
export const getPlaylistById = playlist_id => {
  return axios.get(`/playlists/${playlist_id}`);
}

/**
 * Get audio features of a track
 * https://developer.spotify.com/documentation/web-api/reference/get-audio-features
 * @param {string} track_id - The Spotify ID for the track.
 * @returns {Promise}
 */
export const getTrackAudioFeatures = track_id => {
  return axios.get(`/audio-features/${track_id}`);
}
