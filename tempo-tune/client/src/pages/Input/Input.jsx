import "./Input.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from "../../services/api";
import { catchErrors } from '../../services/util';
import TrackInfo from "../../components/TrackInfo/TrackInfo";
import BpmSelector from "../../components/BpmSelector/BpmSelector";

const Input = () => {

  const { id } = useParams();
  const [inputPlaylist, setInputPlaylist] = useState(null);;
  const [tracks, setTracks] = useState(null);
  const [bpm, setBpm] = useState(80);

  const handleBpmChange = (newBpm) => {
    setBpm(newBpm);
  };

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

  const handleFindTracksClick = () => {
    console.log(`Clicked find tracks for playlist: ${id} and BPM: ${bpm}`)
  };

  return (
    <div className="input-page-container">

      <div className="input-state-container">
        {/* Display input playlist data when we get it */}
        {inputPlaylist && (
          <div className="input-playlist-container">
            <h1>{inputPlaylist.name}</h1>
            <img src={inputPlaylist.images[0].url} alt="Playlist Cover" className="input-playlist-photo"/>
            <h2>Gimme a BPM you want:</h2>
            <BpmSelector bpm={bpm} onChange={handleBpmChange} />
            <button className="find-tracks-button" onClick = {handleFindTracksClick}>Find Tracks!</button>
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
                <TrackInfo track={track.track} />
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