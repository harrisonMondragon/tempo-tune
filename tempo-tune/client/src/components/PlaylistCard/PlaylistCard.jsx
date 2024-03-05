import "./PlaylistCard.css";
import { useNavigate } from 'react-router-dom';

const PlaylistCard = ({playlist}) => {
  const navigate = useNavigate();

  const handlePlaylistClick = () => {
    navigate(`/input/${playlist.id}`);
  };

  return (
    <div className="playlist-container" onClick={handlePlaylistClick}>
      <div className="playlist-info">
        <h2>{playlist.name}</h2>
        <p>{playlist.tracks.total} Songs</p>
      </div>
      <img src={playlist.images[0].url} alt={playlist.name} className="playlist-photo" />
    </div>
  )
}

export default PlaylistCard;