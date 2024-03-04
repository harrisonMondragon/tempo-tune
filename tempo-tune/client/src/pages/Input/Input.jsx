import "./Input.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from "../../services/api";
import { catchErrors } from '../../services/util';
import TrackCard from "../../components/TrackCard/TrackCard";

const Input = () => {

  const { id } = useParams();
  const [inputPlaylist, setInputPlaylist] = useState(null);
  const [nextTracksUrl, setNextTracksUrl] = useState(null);
  const [tracks, setTracks] = useState(null);

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

  // Occurs when nextTracksUrl updates
  // getPlaylistById only gets the first XXX, need this useEffect to get them all
  useEffect(() => {
    // Fetch the next tracks then update state variables
    const fetchMoreData = async () => {
      // Update state variables with next track data
      const morePlaylitstTracks = await axios.get(nextTracksUrl);
      setTracks(tracks => ([...tracks, ...morePlaylitstTracks.data.items]));
      setNextTracksUrl(morePlaylitstTracks.data.next)
    };

    // Stop when nextPlaylistsUrl is null
    if(!setNextTracksUrl){
      return;
    }

    catchErrors(fetchMoreData());
  }, [nextTracksUrl]);

  const logTracks = () =>{
    console.log(tracks);
    console.log(tracks.length);
  }

  return (
    <div className="input-container">

      {/* Display input playlist data when we get it */}
      {inputPlaylist && (
        <div className="input-playlist-container">
          <h1>Input page for playlist: {id}</h1>
          <p>Playlist name: {inputPlaylist.name}</p>
          {/* <p>Next tracks url: {nextTracksUrl}</p> */}
        </div>
      )}

      {/* Display track data when we get it */}
      {/* {tracks && (
        <div className="tracks-container">
          <ul>
            {tracks.map((track, index) => (
              <li key={index}>
                <TrackCard track={track} />
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <button onClick={logTracks}>Log tracks!</button>
    </div>
  )
}

export default Input;