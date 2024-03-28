import "./Results.css";
import { useState, useEffect } from 'react';
import { getTrackAudioFeatures } from "../../services/api";
import { catchErrors } from '../../services/util';

const Results = ({ opTracks }) => {;

  const [goodTracks, setGoodTracks] = useState([]);
  // const [badTracks, setBadTracks] = useState(null);

  const showLogs = () => {
    for (const track of opTracks) {
      console.log(track);
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