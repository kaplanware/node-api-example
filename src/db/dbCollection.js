const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Mongolojiye Bağlandınız")
}).catch((err) => {
    console.log("Can yücelden selamlar", err);
})