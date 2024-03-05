import "./Input.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from "../../services/api";
import { catchErrors } from '../../services/util';
import TrackCard from "../../components/TrackCard/TrackCard";

const Input = () => {

  const { id } = useParams();
  const [inputPlaylist, setInputPlaylist] = useState(null);;
  const [tracks, setTracks] = useState(null);

  // Occurs when id changes
  useEffect(() => {
    // Get data of playlist with the url id
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setInputPlaylist(data);
      setTracks(data.tracks.items);
    };

    catchErrors(fetchData());
  }, [id]);

  return (
    <div className="input-page-container">

      <div classname="input-state-container">
        {/* Display input playlist data when we get it */}
        {inputPlaylist && (
          <div className="input-playlist-container">
            <h1>Playlist name: {inputPlaylist.name}</h1>
          </div>
        )}
      </div>

      <div className="playlist-tracks-container">
      {/* Display track data when we get it */}
      {tracks && (
        <div className="tracks-container">
          <ul>
            {tracks.map((track, index) => (
              <li key={index}>
                <TrackCard track={track.track} />
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  )
}

export default Input;