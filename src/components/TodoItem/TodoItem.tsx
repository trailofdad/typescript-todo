import React from "react";
import cx from "classnames";
import styles from "./TodoItem.module.scss";

type TodoItemProps = {
  complete: boolean;
  text: string;
};

const TodoItem: React.FC<TodoItemProps> = ({ complete, text }) => {
  return (
    <div
      className={cx(styles.todoItem, {
        [styles.complete]: complete
      })}
    >
      {text}
    </div>
  );
};

export default TodoItem;
