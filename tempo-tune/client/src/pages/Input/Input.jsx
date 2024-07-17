import "./Input.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getPlaylistById } from "../../services/api";
import { catchErrors } from '../../services/util';
import TrackInfo from "../../components/TrackInfo/TrackInfo";

const Input = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [tracks, setTracks] = useState(null)
  const [inputPlaylist, setInputPlaylist] = useState(null);
  const [nextTracksUrl, setNextTracksUrl] = useState(null);

  // Occurs when id changes
  useEffect(() => {
    // Get data of playlist with the url id
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setInputPlaylist(data);
      setTracks(data.tracks.items);
      setNextTracksUrl(data.tracks.next)
    };

    catchErrors(fetchData());
  }, [id]);

  // Occurs when nextPlaylistUrl changes
  useEffect(() => {
    // Fetch the next playlists then update state variables
    const fetchMoreData = async () => {
      // Update state variables with next tracks data
      const morePlaylistTracks = await axios.get(nextTracksUrl);
      setTracks(tracks => ([...tracks, ...morePlaylistTracks.data.items]));
      setNextTracksUrl(morePlaylistTracks.data.next)
    };

    // Stop when nextTracksUrl is null
    if(!nextTracksUrl){
      return;
    }

    catchErrors(fetchMoreData());
  }, [nextTracksUrl]);

  const handleGetAllBPMsClick = () => {
    // Collect only the relevant parts of inputPlaylist to save
    const localStoragePlaylist = {
      name: inputPlaylist.name,
      id: inputPlaylist.id,
      images: inputPlaylist.images
    };

    // Save tracks and playlist to local storage
    localStorage.setItem('tracks', JSON.stringify(tracks));
    localStorage.setItem('playlist', JSON.stringify(localStoragePlaylist));

    navigate(`/results/${id}`);
  };

  return (
    <div className="input-page-container">

      <div className="input-state-container">
        {/* Display input playlist data when we get it */}
        {inputPlaylist && (
          <div>
            <h1>{inputPlaylist.name}</h1>
            <img src={inputPlaylist.images[0].url} alt="Playlist Cover" className="input-playlist-photo"/>
            <h2>Click on a song:</h2>
            <h2>or</h2>
            <button className="filter-tracks-button" onClick = {handleGetAllBPMsClick}>Get All BPMs!</button>
          </div>
        )}
      </div>

      <div className="playlist-tracks-container">
        {/* Display track data when we get it */}
        {tracks && (
          <div className="tracks-container">
            <ul>
              {tracks.map((track, index) => (
                <li key={index}>
                  <TrackInfo track={track.track} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input;