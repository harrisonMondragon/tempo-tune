# TempoTune

## How to run:
This project is currently in development. To run, a Spotify developer application is needed.
- Follow [Spotify's Walkthrough](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) to create an app.
- Once the app has been created, a redirect uri is needed in the settings of the app. See .env.example for refrence.
- A .env file is required to hold sensitive data, create one similar to .env.example where the variables correspond to the newly created app
- Navigate to project folder `tempo-tune/tempo-tune`
- Run `npm install`
- Run `npm start`
- A browser should open on `http://localhost:3000` for the client, the server should already be running

## References:
- [Newline tutorial](https://www.newline.co/courses/build-a-spotify-connected-app)
- [Spotify Documentation](https://developer.spotify.com/documentation/web-api)
