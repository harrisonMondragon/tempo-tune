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

  // Get profile and playlist data
  useEffect(() => {
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

  // When nextPlaylistsUrl updates, fetch the next playlists then update playlists state variable
  useEffect(() => {
    // Playlist endpoint only returns 20 playlists at a time, so we need to
    // make sure we get ALL playlists by fetching the next set of playlists
    const fetchMoreData = async () => {
      const { data, next } = await axios.get(nextPlaylistsUrl);
      // Use functional update to update playlists state variable
      // to avoid including playlists as a dependency for this hook
      // and creating an infinite loop
      setPlaylists(playlists => ([
        ...playlists ? playlists : [],
        ...data.items
      ]));

      setNextPlaylistsUrl(next)
    };

    // When nextPlaylistsUrl is null, stop
    if(!nextPlaylistsUrl){
      return;
    }

    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData());

  }, [nextPlaylistsUrl]);

  const logPlaylists = () => {
    console.log(playlists);
  };

  return(
    <div className="home-container">
      <button onClick={logout}>Log Out</button>
      {profile && (
        <div className="profile-container">
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Avatar"/>
          )}
          <span>{profile.display_name}</span>
          <span>
            {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      <button onClick={logPlaylists}>Log Playlists</button>
    </div>
  );
};

export default Home;
