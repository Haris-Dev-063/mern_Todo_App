const express = require("express");

const List = require("../models/List_Models");
const users_Models = require("../models/users_Models");

const router = express.Router();

router.post("/addTask", async (req, res) => {
  try {
    const { title, description, email } = req.body;

    const existingUser = await users_Models.findOne({ email });

    if (existingUser) {
      const list = new List({ title, description, user: existingUser });

      await list.save().then(() => res.status(200).json(list));

      existingUser.list.push(list);

      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, description, email } = req.body;

    const existingUser = await users_Models.findOne({ email });

    if (existingUser) {
      const list = await List.findByIdAndUpdate(req.params.id, {
        title,
        description,
      });

      list
        .save()
        .then(() => res.status(200).json({ message: "task Updated!" }));
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await users_Models.findByIdAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() => {
        return res.status(200).json({ message: "Task was Deleted!" });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getTask/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
  if (list.length !== 0) {
    res.status(200).json({ list });
  } else {
    res.status(200).json({ message: "no Task" });
  }
});

module.exports = router;
