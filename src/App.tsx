import React, { ChangeEvent, useEffect, useState } from "react";
import { ITask } from "./Interfaces";
import TodoTask from "./components/TodoTask";

const App: React.FC = () => {
  /*useState to pass the task input  */

  const [task, setTask] = useState<string>("");

  /* useState to pass the deadline for the given task or task*/

  const [deadline, setDeadline] = useState<number>(0);

  /*useState for save the added to do and also to check if theres actual data stored stored in the localStorage  */

  const [todo, setTodo] = useState<ITask[]>(() => {
    const savedTodo = localStorage.getItem("todo");
    if (savedTodo) {
      return JSON.parse(savedTodo);
    } else {
      return [];
    }
  });

  /* Handle input for both the deadline and also the task */

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  /* Add function to pass the data to the todo so we can save it and pass it to useEffect */

  const addTask = (): void => {
    const newTask = {
      taskName: task,
      deadLine: deadline,
    };
    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
  };

  /* UseEffect function to save the data to localStorage to make it persistent*/

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  /*Remove complete task  */

  const completeTask = (taskNameToDelete: string): void => {
    setTodo(
      todo.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };
  const validateForm = () => {
    if(task.length == 0){
      alert("Task Cannot be left blank ");
      return
    }else if(task.length <= 5 ){
      alert("Needs to be more than 5 characters at least");
      return 
    }
    if(deadline == 0 ){
      alert("Deadline Cannot be Zero please select No of Days")
      return
    }else if(deadline == -1){
      alert('Deadline no of days can only be negative after the selected no is passed, Select a proper number');
      return 
    }else if(deadline == null){
      alert('Number of days to deadline cannot be null or Empty')
      return 
    }
    addTask();
  }

  return (
    <>
      <div className="App">
        <div className="header">
          <div className="inputContainer">
            <input
              type="text"
              name="task"
              value={task}
              placeholder="Add a task"
              onChange={handleChange}
            />
            <input
              type="number"
              name="deadline"
              value={deadline}
              placeholder="Set a deadline (in no. of days"
              onChange={handleChange}
            />
          </div>
          <button onClick={validateForm}>Add</button>
        </div>
        <div className="todoList">
          
          {/*Map to loop through the saved task/todo and deadline and display it */
          todo.map((task: ITask, key: number) => {
            return (
              <TodoTask key={key} task={task} completeTask={completeTask} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
