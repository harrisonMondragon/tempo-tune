import "./Results.css";

const Results = ({ opTracks }) => {;

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
    </div>
  )
}

export default Results;