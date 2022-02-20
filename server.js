const db = require('./db/connection');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// By using the /api prefix here we can remove it from the individual route expressions
app.use('/api', apiRoutes);



//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start serve after DB connection
db.connect(err =>{
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

