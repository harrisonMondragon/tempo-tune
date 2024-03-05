import "./TrackCard.css";
import { msToMinAndSec } from '../../services/util';

const TrackCard = ({track}) => {

  const handleTrackClick = () => {
    console.log(`Clicked Track: ${track.name}`);
  };

  return (
    <div className="track-container" onClick={handleTrackClick}>
      <div className="track-info">
        <h2>{track.name} - {track.artists[0].name} - {msToMinAndSec(track.duration_ms)}</h2>
      </div>
      {/* <img src={track.images[0].url} alt={track.name} className="track-photo" /> */}
    </div>
  )
}

export default TrackCard;