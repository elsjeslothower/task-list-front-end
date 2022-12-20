import PropTypes from 'prop-types';
import React from 'react';
import './Task.css';

const Task = (props) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  const handleTaskClicked = () => {
    props.onToggleComplete(props.id);
  };

  const handleDetetedTask = () => {
    props.onDeleteTask(props.id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={handleTaskClicked}
      >
        {props.title}
      </button>
      <button 
      className="tasks__item__remove button"
      onClick={handleDetetedTask}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
