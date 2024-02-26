import "./Home.css";
import { useState, useEffect } from 'react';
import { logout } from '../../services/auth';
import { getCurrentUserProfile } from '../../services/api';
import { catchErrors } from '../../services/util';

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    }
    // Higher order function to handle errors instead of try/catch
    catchErrors(fetchData());
  }, []);

  return(
    <div className="home-container">
      <button onClick={logout}>Log Out</button>
      {profile && (
        //This is dumb but I just want it centered
        <div className="profile-container">
          <h1>{profile.display_name}</h1>
          <p>{profile.followers.total} Followers</p>
          <p>Country: {profile.country}</p>
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Avatar"/>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;