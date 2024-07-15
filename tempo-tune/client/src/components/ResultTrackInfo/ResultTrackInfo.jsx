import "./ResultTrackInfo.css";
import { msToMinAndSec } from '../../services/util';

const ResultTrackInfo = ({resultTrack}) => {

  return (
    <div className="track-info-container">
      <img src={resultTrack.track.album.images[0].url} alt={resultTrack.track.name} className="track-photo" />
      <h3>{resultTrack.track.name} - {resultTrack.track.artists[0].name} - {msToMinAndSec(resultTrack.track.duration_ms)} - {resultTrack.audioFeatures.data.tempo}</h3>
    </div>
  )
}

export default ResultTrackInfo;