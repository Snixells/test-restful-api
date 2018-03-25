const app = require('./app.js');

// Use Environment variable if set, else 3000
const port = process.env.port || 3000;

// Settin up express Server, listening on defined port
app.listen(port, () => {
    console.log('Listening on Port ' + port);   
});