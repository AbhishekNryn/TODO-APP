import React, { Fragment, useEffect, useState } from "react";
import Edit from "./Edit.js";

function List() {
    const [todos, setTodo] = useState([]);
    
    const deleteTodo = async (id) => {
        try {
            const delTodo= await fetch(`http://localhost:5000/todo/${id}`, {
                method: "DELETE"
            })

            setTodo(todos.filter(todo => todo.tid!==id))  //instantly delete the todo from the page without the need to refresh
        } catch (error) {
            console.error(error.message);
        }
    }

  const getTodo = async () => {
    try {
      const response = await fetch("http://localhost:5000/todo");
      const jsonData = await response.json();

      setTodo(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  // console.log(todos)

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.tid}>
              <td>{todo.description}</td>
                  <td><Edit todo={todo} /></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.tid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default List;
