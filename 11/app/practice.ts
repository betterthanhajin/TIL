function assertEqual<T>(actual: T, expected: T, name: string): void {
  if (!Object.is(actual, expected)) throw new Error("FAIL: " + name);
  console.log("PASS:", name);
}

function assertDeepEqual(actual: any, expected: any, name: string): void {
  const a = JSON.stringify(actual, Object.keys(actual).sort());
  const e = JSON.stringify(expected, Object.keys(expected).sort());
  if (a !== e) throw new Error("FAIL: " + name + " " + a + " != " + e);
  console.log("PASS:", name);
}

// (A1) 문자 빈도수 세기
function countChars(s: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const ch of s) {
    // TODO: 여기 1줄
    freq[ch] = (freq[ch] ?? 0) + 1;
  }
  return freq;
}

// (A2) 가장 많이 나온 문자 찾기
function maxChar(freq: Record<string, number>): { char: string; count: number } {
  let bestChar = "";
  let bestCount = 0;

  for (const key in freq) {
    const count = freq[key];
    // TODO: 여기 if
    if (count > bestCount) {
      bestCount = count;
      bestChar = key;
    }
  }

  return { char: bestChar, count: bestCount };
}

// 테스트 5개 (이건 건드리지마)
assertDeepEqual(countChars("banana"), { b: 1, a: 3, n: 2 }, "T1 countChars banana");
assertDeepEqual(maxChar(countChars("banana")), { char: "a", count: 3 }, "T2 maxChar banana");
assertDeepEqual(maxChar(countChars("aabb")), { char: "a", count: 2 }, "T3 tie");
assertDeepEqual(maxChar(countChars("")), { char: "", count: 0 }, "T4 empty");
assertDeepEqual(maxChar(countChars("zzZ")), { char: "z", count: 2 }, "T5 case sensitive");

console.log("✅ DONE");
