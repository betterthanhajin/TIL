// features/todo/ui/TodoList.tsx
"use client";

import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

export function TodoList({
  todos,
  onToggle,
  onRemove
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  console.log("🔄 TodoList render");

  return (
    <ul>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}
