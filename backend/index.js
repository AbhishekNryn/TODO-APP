const express = require("express");
const cors = require("cors");
const pool = require("./db.js");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todo", async (req, res) => {
  try {
    const getAllTodo = await pool.query("SELECT * FROM todo");
    res.json(getAllTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query("SELECT * FROM todo WHERE tid =$1", [id]);
    res.json(getTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const updatedTodo = await pool.query(
    "UPDATE todo SET description = $1 WHERE tid = $2",
    [description, id]
  );

  res.json("updated successfully");
});

app.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const deletedTodo = await pool.query("DELETE FROM todo WHERE tid = $1", [id]);

    res.json("deleted successfully");
})

app.listen(3000, () => {
  console.log("listening to port 3000");
});
