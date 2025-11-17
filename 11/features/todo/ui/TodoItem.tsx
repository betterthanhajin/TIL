// features/todo/ui/TodoItem.tsx
"use client";

import { Todo } from "../types";

export function TodoItem({
  todo,
  onToggle,
  onRemove
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  console.log("👀 TodoItem render:", todo.id);

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginLeft: 8
        }}
      >
        {todo.title}
      </span>
      <button style={{ marginLeft: 8 }} onClick={() => onRemove(todo.id)}>
        삭제
      </button>
    </li>
  );
}
