import "./PlaylistCard.css";

const PlaylistCard = ({playlist}) => {

  const handlePlaylistClick = () => {
    console.log(`Clicked playlist ${playlist.name}`);
  };

  return (
    <div className="playlist-container" onClick={handlePlaylistClick}>
      <div className="playlist_info">
        <h2>{playlist.name}</h2>
        <p>{playlist.tracks.total} Songs</p>
      </div>
      <img src={playlist.images[0].url} alt={playlist.name} className="playlist-photo" />
    </div>
  )
}

export default PlaylistCard;