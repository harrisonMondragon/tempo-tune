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
      setPlaylistsData(userPlaylists.data);
    }
    catchErrors(fetchData());
  }, []);

  // When playlistsData updates, check if there are more playlists to fetch
  // then update the state variable
  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    // Playlist endpoint only returns 20 playlists at a time, so we need to
    // make sure we get ALL playlists by fetching the next set of playlists
    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    // Use functional update to update playlists state variable
    // to avoid including playlists as a dependency for this hook
    // and creating an infinite loop
    setPlaylists(playlists => ([
      ...playlists ? playlists : [],
      ...playlistsData.items
    ]));

    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData());

  }, [playlistsData]);

  const logPlaylists = () => {
    console.log(playlists);
    console.log(playlists.length);
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

          {playlistsData && (
            <span>{playlistsData.total} Playlist{playlistsData.total !== 1 ? 's' : ''}</span>
          )}
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
