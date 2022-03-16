const { config } = require("dotenv");
config();

const database = require("./utills/database");
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/user");
const Interview = require("./models/interview");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    await User.create({
      name: "Dhruv Garg",
      email: "dhruv-garg@outlook.com",
    });
    res.send("User Added Successfully");
  } catch (error) {
    res.send(error);
  }
});

app.get("/allUsers", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

app.get("/allInterviews", async (req, res) => {
  try {
    const interviews = await Interview.findAll();
    res.send(interviews);
  } catch (error) {
    res.send(error);
  }
});

app.post("/scheduleInterview", async (req, res) => {
  try {
    await Interview.create({
      start: req.body.startTime,
      end: req.body.endTime,
      participants: req.body.selectedUsers,
    });
    res.send("Interview Scheduled Successfully");
  } catch (error) {
    res.send(error);
  }
});

app.delete("/deleteInterview/:id", async (req, res) => {
  try {
    await Interview.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Interview Deleted Successfully");
  } catch (error) {
    res.send(error);
  }
});

app.put("/updateInterview/:id", async (req, res) => {
  try {
    await Interview.update(
      {
        start: req.body.startTime,
        end: req.body.endTime,
        participants: req.body.selectedUsers,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("Interview Updated Successfully");
  } catch (error) {
    res.send(error);
  }
});

database
  .sync()
  .then(() => {
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => {
    console.log(err);
  });
