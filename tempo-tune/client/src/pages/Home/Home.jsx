import "./Home.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../../services/auth';
import { getCurrentUserProfile, getCurrentUserPlaylists } from '../../services/api';
import { catchErrors } from '../../services/util';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  // Get profile and playlist data
  useEffect(() => {
    async function fetchData() {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);
    }
    catchErrors(fetchData());
  }, []);

  return(
    <div className="home-container">
      <button onClick={logout}>Log Out</button>
      {profile && (
        <div className="profile-container">
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Avatar"/>
          )}
          <span>{profile.display_name}</span>

          {playlists && (
            <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
          )}
          <span>
            {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};

export default Home;
