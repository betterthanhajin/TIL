"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// ✅ 트리의 한 노드 타입(폴더/항목)
type TreeNode = {
  id: string; // ✅ 고유 id(선택 상태를 Set으로 관리할 때 키로 사용)
  label: string; // ✅ 화면에 보여줄 텍스트
  children?: TreeNode[]; // ✅ 자식 노드(없으면 leaf)
};

// ✅ 예시 트리 데이터(실제론 서버/props에서 받아와도 됨)
const TREE: TreeNode[] = [
  {
    id: "all",
    label: "전체",
    children: [
      {
        id: "fruit",
        label: "과일",
        children: [
          { id: "apple", label: "사과" },
          { id: "banana", label: "바나나" },
          { id: "grape", label: "포도" },
        ],
      },
      {
        id: "veg",
        label: "채소",
        children: [
          { id: "carrot", label: "당근" },
          { id: "onion", label: "양파" },
        ],
      },
    ],
  },
];

// -------------------- helpers --------------------

// ✅ 현재 노드 포함해서 "자기 + 모든 자손"의 id를 모으는 함수(참고용)
//   - 이 예제에서는 leafMap을 쓰기 때문에 필수는 아니지만, 트리에서 자손 id 모을 때 자주 씀
function collectIds(node: TreeNode): string[] {
  const ids = [node.id]; // ✅ 일단 자기 id부터 넣고
  if (node.children) {
    // ✅ 자식이 있으면
    for (const c of node.children) ids.push(...collectIds(c)); // ✅ 재귀로 자손 id 모두 추가
  }
  return ids; // ✅ 최종 반환
}

// ✅ id -> node로 빠르게 찾기 위한 Map 만들기(선택된 leaf 라벨 출력용)
function buildNodeMap(nodes: TreeNode[]) {
  const map = new Map<string, TreeNode>(); // ✅ (id => node) 저장할 맵

  const dfs = (n: TreeNode) => {
    map.set(n.id, n); // ✅ 현재 노드 저장
    n.children?.forEach(dfs); // ✅ 자식들 재귀 저장
  };

  nodes.forEach(dfs); // ✅ 루트들부터 DFS 시작
  return map; // ✅ 완성된 맵 반환
}

// ✅ 핵심: nodeId -> "그 노드 아래의 모든 leaf(말단) id 목록"을 만들어둠
//   - 체크 상태는 leaf만 저장할거라, 부모를 클릭했을 때 leaf들을 한 번에 체크/해제해야 함
function buildDescendantLeafIds(nodes: TreeNode[]) {
  const leafMap = new Map<string, string[]>(); // ✅ (nodeId => descendantLeafIds)

  const dfs = (n: TreeNode): string[] => {
    // ✅ 자식이 없으면 이 노드는 leaf
    if (!n.children || n.children.length === 0) {
      leafMap.set(n.id, [n.id]); // ✅ leaf의 leafIds는 자기 자신
      return [n.id]; // ✅ 반환도 자기 자신
    }

    // ✅ 자식이 있으면 자식들의 leaf들을 모두 모음
    const leaves = n.children.flatMap(dfs); // ✅ 모든 자식 subtree의 leaf들을 펼쳐서 합침
    leafMap.set(n.id, leaves); // ✅ 현재 노드의 leafIds로 저장
    return leaves; // ✅ 위(부모)로 leaf 목록 반환
  };

  nodes.forEach(dfs); // ✅ 루트들부터 DFS 돌면서 leafMap 채움
  return leafMap; // ✅ 완성된 leafMap 반환
}

// ✅ ids 배열 중 checked(Set)에 들어있는 개수 세기
function countChecked(ids: string[], checked: Set<string>) {
  let cnt = 0; // ✅ 체크된 개수
  for (const id of ids) if (checked.has(id)) cnt++; // ✅ Set에 있으면 체크로 카운트
  return cnt; // ✅ 총 체크 수 반환
}

// -------------------- UI: indeterminate checkbox --------------------

// ✅ HTML checkbox의 "반쯤 체크(indeterminate)"는 checked 속성이 아니라 "DOM 속성"임
//   - 그래서 ref로 DOM을 잡고 useEffect로 ref.current.indeterminate를 직접 세팅해야 함
function IndeterminateCheckbox({
  checked, // ✅ 완전 체크 여부
  indeterminate, // ✅ 반쯤 체크 여부
  onChange, // ✅ 클릭 시 처리
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null); // ✅ 실제 input DOM을 참조할 ref

  useEffect(() => {
    // ✅ indeterminate 값이 바뀔 때마다 DOM에 반영
    if (ref.current) ref.current.indeterminate = indeterminate; // ✅ 핵심: 반쯤 체크 표시
  }, [indeterminate]); // ✅ indeterminate가 변경될 때만 실행

  return (
    <input
      ref={ref} // ✅ input DOM 연결
      type="checkbox" // ✅ 체크박스
      checked={checked} // ✅ 완전 체크는 React가 제어
      onChange={onChange} // ✅ 클릭하면 토글
      style={{ width: 16, height: 16 }} // ✅ 보기 좋게 크기만 지정(필수 아님)
    />
  );
}

// -------------------- Page component --------------------

export default function CheckboxTreePage() {
  // ✅ id -> node 맵(라벨 표시용). useMemo로 한 번만 생성(매 렌더마다 재생성 방지)
  const nodeMap = useMemo(() => buildNodeMap(TREE), []);

  // ✅ nodeId -> descendant leafIds 맵. 이것도 한 번만 생성
  const leafIdsMap = useMemo(() => buildDescendantLeafIds(TREE), []);

  // ✅ 핵심 설계: 체크 상태는 "leaf(말단) id들"만 저장
  //   - 부모/중간 노드는 저장하지 않고, 렌더링 시 leaf 상태로 계산(단순하고 버그 적음)
  const [checkedLeafIds, setCheckedLeafIds] = useState<Set<string>>(new Set());

  // ✅ 특정 노드의 체크 상태(checked / indeterminate)를 leaf 체크 개수로 계산
  const getNodeState = (nodeId: string) => {
    const leafIds = leafIdsMap.get(nodeId) ?? []; // ✅ 이 노드 아래 leaf들
    const checkedCount = countChecked(leafIds, checkedLeafIds); // ✅ leaf 중 체크된 수

    // ✅ 전부 체크면 checked
    const checked = checkedCount > 0 && checkedCount === leafIds.length;

    // ✅ 일부만 체크면 indeterminate(반쯤 체크)
    const indeterminate = checkedCount > 0 && checkedCount < leafIds.length;

    // ✅ UI에 (선택/전체) 표시하려고 개수도 같이 리턴
    return { checked, indeterminate, checkedCount, total: leafIds.length };
  };

  // ✅ 노드 클릭 시: 그 노드 아래 leaf들을 전부 체크하거나 전부 해제
  const toggleNode = (nodeId: string) => {
    const leafIds = leafIdsMap.get(nodeId) ?? []; // ✅ 이 노드 아래 leaf들
    if (leafIds.length === 0) return; // ✅ 방어(없으면 아무것도 안 함)

    const { checked } = getNodeState(nodeId); // ✅ 현재 이 노드가 "완전 체크"인지 확인

    setCheckedLeafIds((prev) => {
      const next = new Set(prev); // ✅ Set은 불변 업데이트 위해 복사본 생성

      if (checked) {
        // ✅ 이미 전부 체크라면 → 전부 해제
        leafIds.forEach((id) => next.delete(id)); // ✅ leaf들을 Set에서 제거
      } else {
        // ✅ 일부/미체크라면 → 전부 체크
        leafIds.forEach((id) => next.add(id)); // ✅ leaf들을 Set에 추가
      }

      return next; // ✅ 업데이트된 Set 반환
    });
  };

  // ✅ 트리 렌더 함수(재귀)
  const renderNode = (node: TreeNode, depth = 0) => {
    const state = getNodeState(node.id); // ✅ 이 노드의 checked/indeterminate 계산
    const isLeaf = !node.children || node.children.length === 0; // ✅ leaf인지 여부

    return (
      <div
        key={node.id} // ✅ React 리스트 key
        style={{ paddingLeft: depth * 16, margin: "6px 0" }} // ✅ depth만큼 들여쓰기(트리 느낌)
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IndeterminateCheckbox
            checked={state.checked} // ✅ 완전 체크 상태
            indeterminate={state.indeterminate} // ✅ 반쯤 체크 상태
            onChange={() => toggleNode(node.id)} // ✅ 클릭 시 이 노드 토글
          />

          <span style={{ fontSize: 14 }}>
            {node.label}
            {!isLeaf && (
              // ✅ 부모 노드면 (선택/전체) 카운트 표시
              <span style={{ marginLeft: 8, color: "#666", fontSize: 12 }}>
                ({state.checkedCount}/{state.total})
              </span>
            )}
          </span>
        </div>

        {/* ✅ 자식이 있으면 재귀로 자식들 렌더 */}
        {node.children?.map((c) => renderNode(c, depth + 1))}
      </div>
    );
  };

  // ✅ 선택된 leaf들의 label만 모아서 화면에 보여주기(디버깅/UX용)
  const selectedLeafLabels = useMemo(() => {
    const labels: string[] = []; // ✅ 라벨 목록
    for (const id of checkedLeafIds) {
      // ✅ 선택된 leaf id 순회
      const n = nodeMap.get(id); // ✅ id로 노드 찾기
      if (n) labels.push(n.label); // ✅ 라벨 추가
    }
    return labels.sort(); // ✅ 보기 좋게 정렬해서 반환
  }, [checkedLeafIds, nodeMap]); // ✅ 체크/맵이 바뀌면 다시 계산

  return (
    <div style={{ maxWidth: 560, padding: 24, lineHeight: 1.4 }}>
      <h1 style={{ fontSize: 20, marginBottom: 12 }}>
        체크박스 트리 (indeterminate)
      </h1>

      <p style={{ color: "#666", marginTop: 0 }}>
        부모 체크 → 자식 전체 체크 / 자식 일부 체크 → 부모는 반쯤 체크(➖)
      </p>

      <div
        style={{
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 16,
          marginTop: 12,
        }}
      >
        {/* ✅ 루트부터 렌더 */}
        {TREE.map((n) => renderNode(n))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>
          선택된(말단) 항목
        </div>

        {selectedLeafLabels.length === 0 ? (
          // ✅ 선택된 게 없으면
          <div style={{ color: "#666" }}>없음</div>
        ) : (
          // ✅ 선택된 게 있으면 리스트 출력
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {selectedLeafLabels.map((t) => (
              <li key={t}>{t}</li> // ✅ 라벨 하나씩 출력
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
