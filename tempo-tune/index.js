require("dotenv").config(); // Handle the .env file that contains app-specific information
const express = require("express"); // Back-end framework for building RESTful APIs with Node.js
const querystring = require("querystring"); // Helps handle query params easier
const axios = require("axios"); // Help handle POST requests easier

const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/", (req, res) => {
    // res.send("Hello World!");
    const data = {
        name: "Harrison",
        isAwesome: true
    };

    res.json(data);
});

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

const stateKey = 'spotify_auth_state';

app.get("/login", (req, res) => {

    // Set a cookie to keep our randomly generated state
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email';

    // queryParams just helps handle query url parameters easier
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });

    // queryParams evaluates to something like client_id=abc123&response_type=code&redirect_uri=http://localhost:8888/callback
    // Without using queryParams, the code would be something like:
    // res.redirect(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`);

    // When this URL is hit, it will automatically redirect to Spotify account service URL
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) => {

    // Store the value of our authorization code which we got from the code query param
    const code = req.query.code || null;

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
            res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
        } else {
            res.send(response);
        }
    })
    .catch(error => {
        res.send(error);
    });
});

// Listens on port 8888
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
