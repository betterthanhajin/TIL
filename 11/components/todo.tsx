
"use client";

interface todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  createdAt: string;
}

// todoData.ts
export const initialTodos:todo[] = [
  {
    id: 1,
    title: "React Hooks 공부하기",
    description: "useState, useEffect, useCallback 정리",
    completed: false,
    priority: "high",
    createdAt: "2025-11-13T09:00:00",
  },
  {
    id: 2,
    title: "Zustand 상태관리 실습",
    description: "Counter store 만들어보고 persist 기능 추가",
    completed: true,
    priority: "medium",
    createdAt: "2025-11-12T18:00:00",
  },
  {
    id: 3,
    title: "Next.js App Router 구조 복습",
    description: "서버컴포넌트, 클라이언트컴포넌트 구분 연습",
    completed: false,
    priority: "high",
    createdAt: "2025-11-10T15:00:00",
  },
  {
    id: 4,
    title: "UI 개선 작업",
    description: "할 일 완료 시 체크 애니메이션 추가하기",
    completed: false,
    priority: "low",
    createdAt: "2025-11-09T12:00:00",
  },
  {
    id: 5,
    title: "리팩터링: 컴포넌트 분리",
    description: "ToDoItem / ToDoList / InputForm 컴포넌트 나누기",
    completed: true,
    priority: "medium",
    createdAt: "2025-11-08T20:00:00",
  },
];



export default function Todo() {
  return (
    <div>
      {initialTodos.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span>Priority: {item.priority}</span>
        </div>
      ))}
    </div>
  )
} 