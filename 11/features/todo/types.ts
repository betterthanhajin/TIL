// features/todo/types.ts
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority?: "low" | "medium" | "high";
};
