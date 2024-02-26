const dotenv = require("dotenv").config();  // Handle the .env file that contains app-specific information
const express = require("express");         // Back-end framework for building RESTful APIs with Node.js
const querystring = require("querystring"); // Helps handle query params easier
const axios = require("axios");             // Help handle HTTP requests easier

const app = express();
const port = 8888;
const stateKey = "spotify_auth_state";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


// ---------------------- Utility Functions ----------------------

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


// ---------------------- Route Handlers ----------------------

app.get("/", (req, res) => {
    // res.send("Hello World!");
    const data = {
        name: "Harrison",
        isAwesome: true
    };

    res.json(data);
});

// Redirects to Spotify auth, upon successful login the endpoint will return a code to the callback route
app.get("/login", (req, res) => {

    // Set a cookie to keep our randomly generated state
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email';

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Receives the callback from Spotify auth endpoint, gets a token, then redirects back to client with the tokens in the url
app.get('/callback', (req, res) => {

    // Callback code in the url needed to get the token
    const code = req.query.code || null;

    // Axios is promise based, thats why a then, and a catch callback is chained through
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        if (response.status === 200) {
            const { access_token, refresh_token, expires_in } = response.data;

            const queryParams = querystring.stringify({
                access_token,
                refresh_token,
                expires_in
            });

            // redirect to react app and pass along tokens in query params
            res.redirect(`http://localhost:3000/?${queryParams}`);
        } else {
            res.redirect(`/?${querystring.stringify({error: 'invalid token'})}`);
        }
    })
    .catch(error => {
        res.send(error);
    });
});

// Route for refreshing the token, it expires in 1 hour
app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
});


app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
