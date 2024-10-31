const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//Connect to the server....
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err))

//Import and use user Routes...
const userRoutes = require('./routes/userRoute');
app.use('/users', userRoutes)

//Import and use note Routes...
const notesRoutes = require('./routes/noteRoute');
app.use('/notes', notesRoutes)

//Starting the server.....
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


