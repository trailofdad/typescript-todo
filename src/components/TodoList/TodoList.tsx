import React, { useState } from "react";
import styles from "./TodoList.module.scss";
import TodoItem from "../TodoItem/TodoItem";

interface TodoItem {
  id: number;
  text: string;
  complete: boolean;
}

const Todo: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState<TodoItem>({
    text: "",
    complete: false,
    id: 1
  });

  const addNewItem = (newItem: TodoItem) => {
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }

    addNewItem(newItem);
    setNewItem({id: items.length + 1, text: "", complete: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, text: e.target.value });
  };

  const handleCheckbox = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const replacementItem = {
      complete: e.target.checked,
      text: items[idx].text
    };
    const newItems = Object.assign([], items, { [idx]: replacementItem });

    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((item, idx) => {
      return idx !== index;
    });

    setItems(newItems);
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.title}>
        <input type="text" placeholder="List Title" />
      </div>

      <div>
        <input
          className={styles.newItemInput}
          type="text"
          placeholder="Add new item"
          value={newItem.text}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>

      {items.sort((a, b) => {
        if (!a.complete && b.complete) {
          return -1;
        }

        if (a.complete && !b.complete) {
          return 1;
        }

        return 0;
      }).map((item, idx) => {
        return (
          <div className={styles.todoItem} key={`${idx}-${item.text}`}>
            <input onChange={e => handleCheckbox(idx, e)} type="checkbox" checked={items[idx].complete} />
            <TodoItem complete={item.complete} text={item.text} />
            <i
              className="fas fa-trash"
              onClick={() => {
                removeItem(idx);
              }}
            ></i>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
