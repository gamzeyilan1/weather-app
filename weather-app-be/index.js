const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');


const app = express();
const PORT = 5000;



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

/* Navigates the request to router.js if the url has "/forcasts/" in it. */
app.use("/forcasts/", router);
app.use(express.static('public'))


/* Used to test if the app works */
app.get('/', (req,res) => {
    const d = new Date();
    res.json({currentTime: d.toTimeString() });
    console.log('Received a GET request');
})


/* Starts the app on PORT */
app.listen(process.env.PORT || PORT, null, () => {
    console.log('Server is listening on port ' + PORT)
})