import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      );
    });
  };
  if (!tasks.length) {
    return <div>Well done! You have completed all tasks.</div>;
  } else {
    return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
  }
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
