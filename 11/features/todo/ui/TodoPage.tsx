"use client";

import { Todo } from "../types";
import { TodoList } from "./TodoList";

export const initialTodos:Todo[] = [
  {
    id: "1",
    title: "React Hooks 공부하기",
    completed: false,
    priority: "high",
    createdAt: "2025-11-13T09:00:00",
  },
  {
    id: "2",
    title: "Zustand 상태관리 실습",
    completed: true,
    priority: "medium",
    createdAt: "2025-11-12T18:00:00",
  },
  {
    id: "3",
    title: "Next.js App Router 구조 복습",
    completed: false,
    priority: "high",
    createdAt: "2025-11-10T15:00:00",
  },
  {
    id: "4",
    title: "UI 개선 작업",
    completed: false,
    priority: "low",
    createdAt: "2025-11-09T12:00:00",
  },
  {
    id: "5",
    title: "리팩터링: 컴포넌트 분리",
    completed: true,
    priority: "medium",
    createdAt: "2025-11-08T20:00:00",
  },
];


export default function TodoPage() {
  return (
    <section>
        <TodoList todos={initialTodos} onToggle={(id:string)=>{console.log(id)}} onRemove={(id)=>{console.log(id)}}/>
    </section>
  )
} 