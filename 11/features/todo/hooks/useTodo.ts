// features/todo/hooks/useTodo.ts
"use client";

import { useState } from "react";
import { Todo } from "../types";

export function useTodo(initialTodos: Todo[]) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const add = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const remove = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, add, toggle, remove };
}
