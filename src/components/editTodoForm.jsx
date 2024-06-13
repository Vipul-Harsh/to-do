import  React,{ useState } from "react"

export const EditTodoForm = ({editTodo , task}) => {
   const [value , setValue] = useState("");

   const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value , task.id);

    setValue(" ");


   }

    return (
      <div>

            <form className="TodoForm" onSubmit={handleSubmit}>
                    <input type="text" className="todo-input" placeholder="update task" value={value}
                    onChange={(e) => setValue(e.target.value)}/>
                    <button type="submit" className="todo-btn">Update Task</button>
            </form>

      </div>
      
    )
  }
  
  
  