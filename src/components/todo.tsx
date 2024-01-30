import { useState, ChangeEvent } from "react";

type TodoItem = {
  text: string;
  checked: boolean;
}

export const Todo = () => {
  const [todo, setTodo] = useState<TodoItem>({ text: "", checked: false });
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (!todo.text) return;
    setTodos([...todos, { ...todo, checked: false }]);
    setTodo({ text: "", checked: false });
  }

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const handleCheck = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, text: e.target.value });
  }

  return (
    <div className="space-y-4">
      <h1>Todo</h1>
      <div className="space-x-4">
        <input
          className="rounded-lg"
          type="text"
          value={todo.text}
          onChange={handleInputChange}
        />
        <button
          className="border-2 border-white rounded-lg px-2"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todoItem, index) => (
          <li className="flex justify-between items-center" key={`${index}-${todoItem.text}`}>
            <div className="space-x-4">
              <input
                type="checkbox"
                checked={todoItem.checked}
                onChange={() => handleCheck(index)}
              />
              {todoItem.checked ? (
                <span className="line-through">{todoItem.text}</span>
              ) : (
                <span>{todoItem.text}</span>
              )}
            </div>
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
