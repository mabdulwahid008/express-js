const express = require('express');
const db = require('./db')
const cors = require('cors')
const userRoutes = require('./routes/users')
const serviceRoutes = require('./routes/Services')
const bookingRoutes = require('./routes/booking')
const reviewRoutes = require('./routes/review')


const port = 5000;


db.connect();
const app = express();

app.use(express.json()); // => req body
app.use(cors());

//ROUTES
app.use('/user', userRoutes);
app.use('/services', serviceRoutes);
app.use('/service-book', bookingRoutes);
app.use('/reviews', reviewRoutes);





app.listen(port,()=>{
    console.log("App Listening on port "+ port);
})