import { useEffect, useState } from 'react'
import './App.css'

interface TaskItem { 
  task: string;
  completed: boolean;
}

type FilterType = "All" | "Active" | "Complited"

function App() {

  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<FilterType>("All")

  const saveTask = () => {

    const newTask: TaskItem = {
      task,
      completed: false,
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask("");
  }

  const toggleComleted = (index: number) => {
    const updatedList = [...tasks]
    updatedList[index].completed = !updatedList[index].completed;
    setTasks(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList))
  }

  const filteredTasks = tasks.filter((taskItem)=> {
    if (filter === "Active") return !taskItem.completed;
    if (filter === "Complited") return taskItem.completed;
    return true;
  })

  const deleteCompleted = () => {
    const activeTasks = tasks.filter(task => !task.completed);
    setTasks(activeTasks);
    localStorage.setItem("tasks", JSON.stringify(activeTasks))
  }

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks){ 
      setTasks(JSON.parse(savedTasks));
    }
  }, [])

  return (
    <>
      
      <section className='main'>
        <h1 className='title'>ToDos</h1>
        <div className="filters">
          <button onClick={() => setFilter('All')} disabled={filter === 'All'} className='button'>
            All
          </button>
          <button onClick={() => setFilter('Active')} disabled={filter === 'Active'} className='button'>
            Active
          </button>
          <button onClick={() => setFilter('Complited')} disabled={filter === 'Complited'} className='button'>
            Completed
          </button>
        </div>
        <div className="task-counter">
          <p>Tasks left: {tasks.filter(t => !t.completed).length}</p>
        </div>
        <button onClick={deleteCompleted} className='button delete__button'>Delete completed tasks</button>
        <form className='todo__form'>
          <input type="text" placeholder='Add Task' value={task} onChange={(e) => setTask(e.target.value)}/>
          <button onClick={saveTask} className='button'>Add</button>
        </form >
        <div className="task__container">
          <ul className='task__list'>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((item, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleComleted(index)}
                    />
                    {" "}
                    {item.task}
                  </label>
                </li>
              ))
            ) : (
              <li>
                <p>Нет задач для отображения</p>
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  )
}

export default App
