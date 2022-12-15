import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete }) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = complete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => props.onStrikethrough(props.id)}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onStrikethrough: PropTypes.func.isRequired,
};

export default Task;
