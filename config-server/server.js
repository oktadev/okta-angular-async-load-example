const cors = require('cors');
const express = require('express');

const app = express();
const port = 3000;

app
.use(cors())
.listen(port, () => console.log(`API Magic happening on port ${port}`));

app.get('/config', (req, res) => {
    res.json({
        issuer: 'https://{yourOktaDomain}/oauth2/default',
        clientId: '{yourClientId}', 
    });
});


