const express = require('express');
const app = express();
require("dotenv").config();
require("./src/db/dbCollection");
const port = process.env.PORT || 5001;

// Middlewares
// app.use(express.json());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb",extended: true,parameterLimit: 50000}));

const router = require("./src/routers"); //index.js dosyasını çağırdık // ./src/routers/index.js

app.use("/api", router); //api ile başlayan tüm istekleri router'a yönlendirdik


app.get('/', (req, res) => {
    res.json({
        message: "Homepage of the API"
    })
});


app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı`);
})