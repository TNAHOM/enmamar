/**
 * 20 React/JS challenges for intermediate developers (1–3 years exp)
 * Each has starter code, test file, and 10–20 test cases
 */

export interface TestCase {
  input: string;
  expected: string;
  description?: string;
}

export interface Challenge {
  id: string;
  level: number;
  title: string;
  description: string;
  difficulty: "intermediate" | "advanced";
  instructions: string;
  starterCode: string;
  solutionName: string; // export name we test against
  testCases: Array<{ input: string; expected: string; description?: string }>;
}

export const challenges: Challenge[] = [
  {
    id: "1",
    level: 1,
    title: "Implement debounce",
    description: "Create a debounce function that delays invoking a function until after wait milliseconds have elapsed since the last invocation.",
    difficulty: "intermediate",
    instructions: `Implement a debounce function.

export function debounce(fn, wait) {
  // your code
}

The function should:
- Return a new function that debounces calls to fn
- Only invoke fn after wait ms have passed without new calls
- Use setTimeout/clearTimeout`,
    solutionName: "debounce",
    starterCode: `export function debounce(fn, wait) {
  // Your implementation here
  return function(...args) {
    // ...
  };
}`,
    testCases: [
      { input: "debounce identity 50", expected: "pass", description: "Basic debounce" },
      { input: "debounce sum 100", expected: "pass", description: "Debounce with args" },
    ],
  },
  {
    id: "2",
    level: 2,
    title: "Implement throttle",
    description: "Create a throttle function that invokes a function at most once per wait milliseconds.",
    difficulty: "intermediate",
    instructions: `Implement a throttle function.

export function throttle(fn, limit) {
  // your code
}`,
    solutionName: "throttle",
    starterCode: `export function throttle(fn, limit) {
  // Your implementation here
  return function(...args) {
    // ...
  };
}`,
    testCases: [
      { input: "throttle 50", expected: "pass" },
      { input: "throttle 100", expected: "pass" },
    ],
  },
  {
    id: "3",
    level: 3,
    title: "Deep equal",
    description: "Implement a function that performs deep equality check between two values.",
    difficulty: "intermediate",
    instructions: `Implement deepEqual(a, b) that returns true if a and b are deeply equal.

export function deepEqual(a, b) {
  // your code
}`,
    solutionName: "deepEqual",
    starterCode: `export function deepEqual(a, b) {
  // Your implementation here
  return false;
}`,
    testCases: [
      { input: "primitive", expected: "pass" },
      { input: "object", expected: "pass" },
      { input: "nested", expected: "pass" },
      { input: "array", expected: "pass" },
    ],
  },
  {
    id: "4",
    level: 4,
    title: "Classnames utility",
    description: "Implement a cn() utility that merges class names (similar to clsx/cva).",
    difficulty: "intermediate",
    instructions: `Implement cn() that accepts strings, objects, and arrays.

export function cn(...inputs) {
  // your code
}

// Examples:
// cn('a', 'b') => 'a b'
// cn('a', { b: true, c: false }) => 'a b'
// cn(['a', 'b']) => 'a b'`,
    solutionName: "cn",
    starterCode: `export function cn(...inputs) {
  // Your implementation here
  return '';
}`,
    testCases: [
      { input: "strings", expected: "pass" },
      { input: "objects", expected: "pass" },
      { input: "mixed", expected: "pass" },
    ],
  },
  {
    id: "5",
    level: 5,
    title: "usePrevious hook",
    description: "Implement a usePrevious hook that returns the previous value of a prop or state.",
    difficulty: "intermediate",
    instructions: `Implement usePrevious(value) using useState and useEffect.

export function usePrevious(value) {
  // your code
}`,
    solutionName: "usePrevious",
    starterCode: `import { useState, useEffect } from 'react';

export function usePrevious(value) {
  // Your implementation here
  return undefined;
}`,
    testCases: [
      { input: "initial", expected: "pass" },
      { input: "updates", expected: "pass" },
    ],
  },
  {
    id: "6",
    level: 6,
    title: "useToggle hook",
    description: "Implement a useToggle hook for boolean state with toggle function.",
    difficulty: "intermediate",
    instructions: `Implement useToggle(initialValue) that returns [value, toggle].

export function useToggle(initialValue = false) {
  // your code
}`,
    solutionName: "useToggle",
    starterCode: `import { useState, useCallback } from 'react';

export function useToggle(initialValue = false) {
  // Your implementation here
  return [false, () => {}];
}`,
    testCases: [
      { input: "default", expected: "pass" },
      { input: "toggle", expected: "pass" },
    ],
  },
  {
    id: "7",
    level: 7,
    title: "useDebounce hook",
    description: "Implement useDebounce(value, delay) that debounces a value.",
    difficulty: "intermediate",
    instructions: `Implement useDebounce(value, delay).

export function useDebounce(value, delay) {
  // your code
}`,
    solutionName: "useDebounce",
    starterCode: `import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  // Your implementation here
  return value;
}`,
    testCases: [
      { input: "immediate", expected: "pass" },
      { input: "delayed", expected: "pass" },
    ],
  },
  {
    id: "8",
    level: 8,
    title: "useLocalStorage hook",
    description: "Implement useLocalStorage(key, initialValue) that syncs with localStorage.",
    difficulty: "intermediate",
    instructions: `Implement useLocalStorage that persists and syncs across tabs.

export function useLocalStorage(key, initialValue) {
  // your code
}`,
    solutionName: "useLocalStorage",
    starterCode: `import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Your implementation here
  return [initialValue, () => {}];
}`,
    testCases: [
      { input: "get", expected: "pass" },
      { input: "set", expected: "pass" },
    ],
  },
  {
    id: "9",
    level: 9,
    title: "Flatten array",
    description: "Implement flatten(arr) that flattens a nested array to specified depth.",
    difficulty: "intermediate",
    instructions: `Implement flatten(arr, depth = 1).

export function flatten(arr, depth = 1) {
  // your code
}`,
    solutionName: "flatten",
    starterCode: `export function flatten(arr, depth = 1) {
  // Your implementation here
  return [];
}`,
    testCases: [
      { input: "depth1", expected: "pass" },
      { input: "depth2", expected: "pass" },
      { input: "empty", expected: "pass" },
    ],
  },
  {
    id: "10",
    level: 10,
    title: "Group by",
    description: "Implement groupBy(array, keyOrFn) that groups array elements.",
    difficulty: "intermediate",
    instructions: `Implement groupBy(arr, keyOrFn).

export function groupBy(arr, keyOrFn) {
  // your code - keyOrFn can be string key or function
}`,
    solutionName: "groupBy",
    starterCode: `export function groupBy(arr, keyOrFn) {
  // Your implementation here
  return {};
}`,
    testCases: [
      { input: "key", expected: "pass" },
      { input: "fn", expected: "pass" },
      { input: "edge", expected: "pass" },
    ],
  },
  {
    id: "11",
    level: 11,
    title: "useClickOutside hook",
    description: "Implement useClickOutside(ref, handler) to detect clicks outside an element.",
    difficulty: "advanced",
    instructions: `Implement useClickOutside that calls handler when click is outside ref.

export function useClickOutside(ref, handler) {
  // your code - ref can be ref or ref object
}`,
    solutionName: "useClickOutside",
    starterCode: `import { useEffect } from 'react';

export function useClickOutside(ref, handler) {
  // Your implementation here
}`,
    testCases: [
      { input: "outside", expected: "pass" },
      { input: "inside", expected: "pass" },
    ],
  },
  {
    id: "12",
    level: 12,
    title: "useFetch hook",
    description: "Implement useFetch(url) that handles loading, data, and error states.",
    difficulty: "intermediate",
    instructions: `Implement useFetch that returns { data, loading, error }.

export function useFetch(url) {
  // your code
}`,
    solutionName: "useFetch",
    starterCode: `import { useState, useEffect } from 'react';

export function useFetch(url) {
  // Your implementation here
  return { data: null, loading: true, error: null };
}`,
    testCases: [
      { input: "success", expected: "pass" },
      { input: "error", expected: "pass" },
    ],
  },
  {
    id: "13",
    level: 13,
    title: "Pipe functions",
    description: "Implement pipe(...fns) that composes functions left to right.",
    difficulty: "intermediate",
    instructions: `Implement pipe(...fns).

export function pipe(...fns) {
  // your code
}
// pipe(f, g, h)(x) === h(g(f(x)))`,
    solutionName: "pipe",
    starterCode: `export function pipe(...fns) {
  // Your implementation here
  return (x) => x;
}`,
    testCases: [
      { input: "single", expected: "pass" },
      { input: "multiple", expected: "pass" },
      { input: "empty", expected: "pass" },
    ],
  },
  {
    id: "14",
    level: 14,
    title: "Memo with custom comparator",
    description: "Implement useMemoWithComparator(factory, deps, comparator).",
    difficulty: "advanced",
    instructions: `Implement useMemoWithComparator that uses custom compare instead of Object.is.

export function useMemoWithComparator(factory, deps, comparator = Object.is) {
  // your code
}`,
    solutionName: "useMemoWithComparator",
    starterCode: `import { useRef, useMemo } from 'react';

export function useMemoWithComparator(factory, deps, comparator = Object.is) {
  // Your implementation here
  return factory();
}`,
    testCases: [
      { input: "equal", expected: "pass" },
      { input: "different", expected: "pass" },
    ],
  },
  {
    id: "15",
    level: 15,
    title: "Event emitter",
    description: "Implement a simple EventEmitter with on, emit, and off.",
    difficulty: "intermediate",
    instructions: `Implement EventEmitter class.

export class EventEmitter {
  on(event, handler) {}
  emit(event, ...args) {}
  off(event, handler) {}
}`,
    solutionName: "EventEmitter",
    starterCode: `export class EventEmitter {
  on(event, handler) {
    // your code
  }
  emit(event, ...args) {
    // your code
  }
  off(event, handler) {
    // your code
  }
}`,
    testCases: [
      { input: "onEmit", expected: "pass" },
      { input: "off", expected: "pass" },
      { input: "multiple", expected: "pass" },
    ],
  },
  {
    id: "16",
    level: 16,
    title: "LRU Cache",
    description: "Implement an LRU cache with get and put methods (max size 100).",
    difficulty: "advanced",
    instructions: `Implement LRUCache with get(key) and put(key, value). Max 100 items.

export class LRUCache {
  constructor(capacity = 100) {}
  get(key) {}
  put(key, value) {}
}`,
    solutionName: "LRUCache",
    starterCode: `export class LRUCache {
  constructor(capacity = 100) {
    // your code
  }
  get(key) {
    return undefined;
  }
  put(key, value) {
    // your code
  }
}`,
    testCases: [
      { input: "basic", expected: "pass" },
      { input: "evict", expected: "pass" },
      { input: "update", expected: "pass" },
    ],
  },
  {
    id: "17",
    level: 17,
    title: "Merge deep",
    description: "Implement mergeDeep(target, ...sources) for deep object merge.",
    difficulty: "intermediate",
    instructions: `Implement mergeDeep. Arrays are replaced, not merged.

export function mergeDeep(target, ...sources) {
  // your code
}`,
    solutionName: "mergeDeep",
    starterCode: `export function mergeDeep(target, ...sources) {
  // Your implementation here
  return target;
}`,
    testCases: [
      { input: "shallow", expected: "pass" },
      { input: "nested", expected: "pass" },
      { input: "arrays", expected: "pass" },
    ],
  },
  {
    id: "18",
    level: 18,
    title: "useIntersectionObserver",
    description: "Implement useIntersectionObserver(ref, options) for infinite scroll.",
    difficulty: "advanced",
    instructions: `Implement useIntersectionObserver that returns isIntersecting.

export function useIntersectionObserver(ref, options = {}) {
  // your code
  return { isIntersecting: false };
}`,
    solutionName: "useIntersectionObserver",
    starterCode: `import { useState, useEffect } from 'react';

export function useIntersectionObserver(ref, options = {}) {
  // Your implementation here
  return { isIntersecting: false };
}`,
    testCases: [
      { input: "visible", expected: "pass" },
      { input: "hidden", expected: "pass" },
    ],
  },
  {
    id: "19",
    level: 19,
    title: "Pick and Omit",
    description: "Implement pick(obj, keys) and omit(obj, keys) for objects.",
    difficulty: "intermediate",
    instructions: `Implement pick and omit.

export function pick(obj, keys) {}
export function omit(obj, keys) {}`,
    solutionName: "pickOmit",
    starterCode: `export function pick(obj, keys) {
  // your code
  return {};
}
export function omit(obj, keys) {
  // your code
  return {};
}`,
    testCases: [
      { input: "pick", expected: "pass" },
      { input: "omit", expected: "pass" },
      { input: "empty", expected: "pass" },
    ],
  },
  {
    id: "20",
    level: 20,
    title: "Promise queue",
    description: "Implement a promise queue that runs tasks with a concurrency limit.",
    difficulty: "advanced",
    instructions: `Implement createPromiseQueue(concurrency).

export function createPromiseQueue(concurrency) {
  return {
    add(fn) { return promise },
    onIdle() { return promise }
  };
}`,
    solutionName: "createPromiseQueue",
    starterCode: `export function createPromiseQueue(concurrency) {
  return {
    add(fn) {
      return Promise.resolve();
    },
    onIdle() {
      return Promise.resolve();
    },
  };
}`,
    testCases: [
      { input: "sequential", expected: "pass" },
      { input: "concurrent", expected: "pass" },
      { input: "idle", expected: "pass" },
    ],
  },
];

export function getChallenge(id: string): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}
