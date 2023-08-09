import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({
  item,
  index,
  deleteTodoItem,
  updateTodoItem,
  updateTodoItemStatus,
}) => {
  return (
    <div className="card m-2">
      <footer class="card-footer">
        <li
          className="pt-5 pb-5 card-footer-item todo-item-content has-text-left"
          onClick={() => updateTodoItemStatus(index)}
          style={{ textDecoration: item.complete ? "line-through" : "" }}
        >
          <FontAwesomeIcon
            icon={faGripLines}
            className="mr-3"
            style={{ color: "gray" }}
          />
          {item.todo}
        </li>
        <li className="card-footer-item">
          <button
            className="p-4 button is-primary is-small"
            onClick={() => updateTodoItem(index)}
          >
            <FontAwesomeIcon icon={faPencil} style={{ color: "white" }} />
          </button>
        </li>
        <li className="card-footer-item">
          <button
            className="p-4 button is-danger is-small"
            onClick={() => deleteTodoItem(index)}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "white" }} />
          </button>
        </li>
      </footer>
    </div>
  );
};

export default TodoItem;
