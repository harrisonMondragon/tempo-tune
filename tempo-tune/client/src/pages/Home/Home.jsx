import "./Home.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../../services/auth';
import { getCurrentUserProfile, getCurrentUserPlaylists } from '../../services/api';
import { catchErrors } from '../../services/util';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [nextPlaylistsUrl, setNextPlaylistsUrl] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  // Occurs on mount
  useEffect(() => {
    // Get profile and playlist data
    const fetchData = async () => {
      // Set the profile state variable
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      // Set the playlists and nextPlaylistsUrl state variables
      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data.items);
      setNextPlaylistsUrl(userPlaylists.data.next);
    }

    catchErrors(fetchData());
  }, []);

  // Occurs when nextPlaylistsUrl updates
  // getCurrentUserPlaylists only gets the first 20, need this useEffect to get them all
  useEffect(() => {
    // Fetch the next playlists then update state variables
    const fetchMoreData = async () => {
      // Update state variables with next playlist data
      const moreUserPlaylitsts = await axios.get(nextPlaylistsUrl);
      setPlaylists(playlists => ([...playlists, ...moreUserPlaylitsts.data.items]));
      setNextPlaylistsUrl(moreUserPlaylitsts.data.next)
    };

    // Stop when nextPlaylistsUrl is null
    if(!nextPlaylistsUrl){
      return;
    }

    catchErrors(fetchMoreData());
  }, [nextPlaylistsUrl]);

  return(
    <div className="home-container">
      <button onClick={logout}>Log Out</button>
      {profile && (
        <div className="profile-container">
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Avatar"/>
          )}
          <h1>{profile.display_name}</h1>
        </div>
      )}


      {playlists && (
        <div className="playlist-container">
          {playlists.map((playlist, index) => (
            <div className="playlist" key={index}>
              <img src={playlist.images[0].url} alt={playlist.name} />
              <p>{playlist.name}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;
