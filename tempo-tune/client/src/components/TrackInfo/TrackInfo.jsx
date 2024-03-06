import "./TrackInfo.css";
import { msToMinAndSec } from '../../services/util';

const TrackInfo = ({track}) => {

  return (
    <div className="track-info-container">
      <h3>{track.name} - {track.artists[0].name} - {msToMinAndSec(track.duration_ms)}</h3>
      <img src={track.album.images[0].url} alt={track.name} className="track-photo" />
    </div>
  )
}

export default TrackInfo;