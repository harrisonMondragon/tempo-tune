const express = require("express");
const app = express();

// Start the server with [node index.js]

// Demonstrate the using the res parameter
// Try starting the server
// Then visiting [http://localhost:8888/]
// To see the json response with name and isAwesome
app.get("/", (req, res) => {
    // res.send("Hello World!");
    const data = {
        name: "Harrison",
        isAwesome: true
    };

    res.json(data);
});

// Demonstrate the using the req parameter
// Try starting the server
// Then visiting [http://localhost:8888/awesome-generator?name=Harra&isAwesome=false]
// To see "Harra is not awesome"
// Or [http://localhost:8888/awesome-generator?name=Bits&isAwesome=true]
// To see "Bits is really awesome"
app.get('/awesome-generator', (req, res) => {
    const { name, isAwesome } = req.query;
    res.send(`${name} is ${JSON.parse(isAwesome) ? 'really' : 'not'} awesome`);
});

// Listen on port 8888
const port = 8888;
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
