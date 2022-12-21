import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';
import './App.css';
import axios from 'axios';

const localHost = 'http://localhost:5000';

// taskApiToJson here
const taskApiToJson = task => {
  const { description, id, is_complete: isComplete, title } = task;
  return { description, id, isComplete, title };
};

// getAllTasks here
const getAllTasks = async () => {
  try {
    const response = await axios.get(`${localHost}/tasks`);
    return response.data.map(taskApiToJson);
  } catch (error) {
    console.log(`there was an error in getAllTasks (11): ${error.error}`);
    throw new Error('could not fetch tasks correctly');
  }
};

// updateTaskAsync here
const updateTaskAsync = async (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';
  
  try {
    const response = await axios.patch(`${localHost}/tasks/${id}/${endpoint}`);
    return taskApiToJson(response.data.task);
  } catch (error) {
    console.log(`there was an error in updateTaskAsync (22): ${error.error}`);
    throw new Error(`could not update task ${id} correctly`);
  }
};

// deleteTask here
const deleteTaskAsync = async (id) => {
  try {
    await axios.delete(`${localHost}/tasks/${id}`);
  } catch (error) {
    console.log(`there was an error in deleteTaskAsync (35): ${error.error}`);
    throw new Error(`could not delete task ${id} correctly`);
  }
};

// addTaskAsync here
const addTaskAsync = async (taskData) => {
  const { title, isComplete } = taskData;

  const description = 'From Front End';
  const completedAt = isComplete ? new Date() : null;

  const body = { title, description, 'completed_at': completedAt };
  
  try {
    const response = await axios.post(`${localHost}/tasks`, body);
    return taskApiToJson(response.data.task);
  } catch (error) {
    console.log(`there was an error in addTaskAsync (50): ${error.error}`);
    throw new Error(`could not add/compile task ${taskData} correctly`);
  }
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    refreshTasks();
  }, []);

  // refreshTasks here
  const refreshTasks = async () => {
    try {
      const tasks = await getAllTasks();
      setTasks(tasks);
    } catch (error) {
      console.log(`there was an error in refreshTasks (53): ${error.error}`);
    }
  };

  const updateTask = async (id) => {
    const task = tasks.find(task => task.id === id);

    if (!task) {
      return;
    }

    try {
      const newTask = await updateTaskAsync(id, !task.isComplete);

      setTasks(previousTasks => {
        return previousTasks.map(task => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        });
      });
    } catch (error) {
      console.log(`there was an error in updateTask (62): ${error.error}`);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskAsync(id);

      setTasks(previousTasks => {
        return previousTasks.filter(task => task.id !== id);
      });
    } catch (error) {
      console.log(`there was an error in deleteTask (86): ${error.error}`);
    }
  };

  const addTask = async (taskData) => {
    try {
      const task = await addTaskAsync(taskData);
      setTasks(previousTasks => [...previousTasks, task]);
    } catch (error) {
      console.log(`there was an error in addTask (120): ${error.error}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onToggleComplete={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
        <div>
          <NewTaskForm onAddTask={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
