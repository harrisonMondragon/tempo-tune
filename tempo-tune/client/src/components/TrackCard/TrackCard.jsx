import "./TrackCard.css";

const TrackCard = ({track}) => {

  const handleTrackClick = () => {
    console.log(`Clicked Track ${track.name}`);
  };

  return (
    <div className="track-container" onClick={handleTrackClick}>
      <div className="track-info">
        <h2>{track.name}</h2>
      </div>
      {/* <img src={track.images[0].url} alt={track.name} className="track-photo" /> */}
    </div>
  )
}

export default TrackCard;