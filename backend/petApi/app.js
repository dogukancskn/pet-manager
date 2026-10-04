const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const sequelize = require("./src/data/db");

require('./src/models/index');

const authRoutes = require("./src/routes/auth.routes");
const petRoutes = require("./src/routes/pet.routes");
const vaccinationRoutes = require("./src/routes/vaccination.routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Api Çalışıyor");
});

app.use("/auth", authRoutes);
app.use("/pets", petRoutes);
app.use("/vaccinations", vaccinationRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB bağlandı");

        await sequelize.sync();
        console.log("DB sync edildi");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server ${PORT} portunda çalışıyor`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();