import "./Results.css";
import { useState, useEffect, useRef } from 'react';
import { getTrackAudioFeatures } from "../../services/api";
import { useParams } from 'react-router-dom';
import { catchErrors } from '../../services/util';

const Results = ({ opTracks }) => {;

  const { id, bpm } = useParams();
  const [resultTracks, setresultTracks] = useState([]);
  const effectExecuted = useRef(false);

  const fetchAudioFeatures = async (track) => {
    const trackAudioFeatures = await getTrackAudioFeatures(track.track.id);

    const category = trackAudioFeatures.data.tempo > bpm ? 'good' : 'bad';
    const categorizedTrack = { ...track, audioFeatures: trackAudioFeatures, category };
    setresultTracks((prevTracks) => [...prevTracks, categorizedTrack]);
  };

  // Occurs on mount
  useEffect(() => {

    if (effectExecuted.current) return;
    effectExecuted.current = true;

    for (const track of opTracks) {
      fetchAudioFeatures(track)
    }
  }, []);


  const showLogs = () => {
    for (const categorizedTrack of resultTracks){
      console.log(categorizedTrack);
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