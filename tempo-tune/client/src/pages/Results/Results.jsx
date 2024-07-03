import "./Results.css";
import { useState, useEffect } from 'react';
import { getTrackAudioFeatures } from "../../services/api";
import { useParams } from 'react-router-dom';
import { catchErrors } from '../../services/util';

const Results = ({ opTracks }) => {;

  const { id, bpm } = useParams();
  const [goodTracks, setGoodTracks] = useState([]);
  const [badTracks, setBadTracks] = useState([]);
  const [audioFeatures, setAudioFeatures] = useState([]);

  const fetchAudioFeatures = async (trackId) => {
    const trackAudioFeatures = await getTrackAudioFeatures(trackId);
    setAudioFeatures((audioFeatures) => [...audioFeatures, trackAudioFeatures]);
  };

  // Occurs on mount
  useEffect(() => {
    for (const track of opTracks) {
      console.log(track.track.id);
      fetchAudioFeatures(track.track.id)
    }
  }, []);


  const showLogs = () => {
    for (const audioFeature of audioFeatures){
      console.log(audioFeature.data.tempo);
    }
  }

  return (
    <div className="results-page-container">
      <h1>HELLOOO</h1>
      {opTracks && (
        <div className="ahh">
          <ul>
            {opTracks.map((track, index) => (
              <li key={index}>
                <p>{track.track.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={showLogs}>Ahh show me logs</button>
    </div>
  )
}

export default Results;