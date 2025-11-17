// features/todo/api/getTodos.ts
export async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  return res.json();
}
