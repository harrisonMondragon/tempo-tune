import './App.css';
import { useState, useEffect } from 'react';

import { accessToken, logout } from './services/auth';
import { getCurrentUserProfile } from './services/api';
import { catchErrors } from './services/util';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    // // This is the best way to use async within useEffect
    // const fetchData = async () => {
    //   try {
    //     const { data } = await getCurrentUserProfile();
    //     setProfile(data);
    //   } catch(e) {
    //     console.error(e);
    //   }
    // };

    // fetchData();

    // This is the best way to use async within useEffect
    async function fetchData() {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    }

    // Higher order function to handle errors instead of try/catch
    catchErrors(fetchData());

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Ternary operator to determine auth state using the token existance */}
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Log in to Spotify
          </a>
        ) : (
          <>
            <button onClick={logout}>Log Out</button>

            {profile && (
              <div>
                <h1>{profile.display_name}</h1>
                <p>{profile.followers.total} Followers</p>
                {profile.images.length && profile.images[0].url && (
                  <img src={profile.images[0].url} alt="Avatar"/>
                )}
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
