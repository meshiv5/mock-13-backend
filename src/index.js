require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connect, disconnect } = require("./config/db.config");
const userRouter = require("./routes/user.routes");
let jobsRoutes = require("./routes/jobs.routes");
const corsOptions = {
  origin: "*",
};

if (!process.env.SECRET_KEY) {
  console.error("FATAL ERROR: SECRET_KEY is not defined.");
  process.exit(1);
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send({ status: true, message: "Masai Job App Api Home" });
});
app.use("/api/user", userRouter);
app.use("/api/jobs", jobsRoutes);

app.listen(process.env.PORT || 3001, async () => {
  await connect();
  console.log(`Server Started Listening On Port ${process.env.PORT}`);
});
