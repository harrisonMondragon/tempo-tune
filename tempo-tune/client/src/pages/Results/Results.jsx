import "./Results.css";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getTrackAudioFeatures } from "../../services/api";
import { catchErrors } from '../../services/util';
import ResultTrackInfo from "../../components/ResultTrackInfo/ResultTrackInfo";
import BpmSelector from "../../components/BpmSelector/BpmSelector";

const Results = ({ opTracks }) => {;

  const [inputPlaylist, setInputPlaylist] = useState(null);
  const [inputTracks, setInputTracks] = useState([]);
  const [resultTracks, setResultTracks] = useState([]);
  const effectExecuted = useRef(false);
  const [bpm, setBpm] = useState(80);

  const fetchAudioFeatures = async (track) => {
    const trackAudioFeatures = await getTrackAudioFeatures(track.track.id);
    const resultTrack = { ...track, audioFeatures: trackAudioFeatures };
    setResultTracks((prevTracks) => [...prevTracks, resultTrack]);
  };

  // Occurs on mount
  useEffect(() => {

    if (effectExecuted.current) return;
    effectExecuted.current = true;

    // Retrieve data from local storage
    const storedPlaylist = localStorage.getItem('playlist');
    const storedTracks = localStorage.getItem('tracks');
    setInputPlaylist(JSON.parse(storedPlaylist));
    setInputTracks(JSON.parse(storedTracks));
  }, []);

  // Occurs when inputTracks changes
  useEffect(() => {

    for (const track of inputTracks) {
      catchErrors(fetchAudioFeatures(track))
    }
  }, [inputTracks]);

  const handleBpmChange = (newBpm) => {
    setBpm(newBpm);
  };

  const handleFilterTracksClick = () => {
    console.log(inputTracks);
  };

  return (
    <div className="results-page-container">

    <div className="result-state-container">
        {/* Display input playlist data when we get it */}
        {inputPlaylist && (
          <div>
            <h1>{inputPlaylist.name}</h1>
            <img src={inputPlaylist.images[0].url} alt="Playlist Cover" className="input-playlist-photo"/>
            <h2>Gimme a BPM you want:</h2>
            <BpmSelector bpm={bpm} onChange={handleBpmChange} />
            <button className="filter-tracks-button" onClick = {handleFilterTracksClick}>Filter Tracks!</button>
          </div>
        )}
      </div>

      <div className="playlist-tracks-container">
        {resultTracks && (
          <div className="tracks-container">
            <ul>
              {resultTracks.map((track, index) => (
                <li key={index}>
                  <ResultTrackInfo resultTrack={track} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Results;