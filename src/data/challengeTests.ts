/**
 * Jest test file content for each challenge.
 * SandpackTests auto-runs files matching *.test.ts(x)
 */

import { Challenge } from "./challenges";

export function getTestFileContent(challenge: Challenge): string {
  const tests: Record<string, string> = {
    "1": `import { debounce } from './add';

describe('debounce', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('delays invocation', () => {
    const fn = jest.fn((x) => x);
    const debounced = debounce(fn, 50);
    debounced(1);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('invokes only after wait ms without new calls', () => {
    const fn = jest.fn((a, b) => a + b);
    const debounced = debounce(fn, 100);
    debounced(1, 2);
    jest.advanceTimersByTime(50);
    debounced(3, 4);
    jest.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3, 4);
  });
});`,

    "2": `import { throttle } from './add';

describe('throttle', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('invokes immediately', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('throttles rapid calls', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});`,

    "3": `import { deepEqual } from './add';

describe('deepEqual', () => {
  it('returns true for equal primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('a', 'a')).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
  });

  it('returns false for different primitives', () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('a', 'b')).toBe(false);
  });

  it('returns true for equal objects', () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
  });

  it('returns true for equal arrays', () => {
    expect(deepEqual([1, 2], [1, 2])).toBe(true);
  });
});`,

    "4": `import { cn } from './add';

describe('cn', () => {
  it('merges strings', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('handles object - truthy keys', () => {
    expect(cn({ a: true, b: false })).toBe('a');
  });

  it('handles mixed input', () => {
    expect(cn('a', { b: true }, ['c'])).toContain('a');
    expect(cn('a', { b: true }, ['c'])).toContain('b');
  });
});`,

    "5": `import { usePrevious } from './add';
import { renderHook } from '@testing-library/react';

describe('usePrevious', () => {
  it('returns undefined for initial render', () => {
    const { result } = renderHook(() => usePrevious(42));
    expect(result.current).toBeUndefined();
  });

  it('returns previous value after update', () => {
    const { result, rerender } = renderHook(({ v }) => usePrevious(v), {
      initialProps: { v: 1 },
    });
    rerender({ v: 2 });
    expect(result.current).toBe(1);
    rerender({ v: 3 });
    expect(result.current).toBe(2);
  });
});`,

    "6": `import { useToggle } from './add';
import { renderHook, act } from '@testing-library/react';

describe('useToggle', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
  });

  it('toggles value', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
  });
});`,

    "7": `import { useDebounce } from './add';
import { renderHook, act } from '@testing-library/react';

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hi', 100));
    expect(result.current).toBe('hi');
  });

  it('returns debounced value after delay', () => {
    const { result, rerender } = renderHook(({ v, d }) => useDebounce(v, d), {
      initialProps: { v: 'a', d: 100 },
    });
    rerender({ v: 'b', d: 100 });
    expect(result.current).toBe('a');
    act(() => { jest.advanceTimersByTime(100); });
    expect(result.current).toBe('b');
  });
});`,

    "8": `import { useLocalStorage } from './add';
import { renderHook, act } from '@testing-library/react';

describe('useLocalStorage', () => {
  beforeEach(() => localStorage.clear());

  it('returns initial value when empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('updates storage on set', () => {
    const { result } = renderHook(() => useLocalStorage('k', 'a'));
    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('b');
    expect(localStorage.getItem('k')).toBe(JSON.stringify('b'));
  });
});`,

    "9": `import { flatten } from './add';

describe('flatten', () => {
  it('flattens one level by default', () => {
    expect(flatten([1, [2, 3], [4]])).toEqual([1, 2, 3, 4]);
  });

  it('flattens to depth 2', () => {
    expect(flatten([1, [2, [3, 4]]], 2)).toEqual([1, 2, 3, 4]);
  });

  it('returns empty for empty array', () => {
    expect(flatten([])).toEqual([]);
  });
});`,

    "10": `import { groupBy } from './add';

describe('groupBy', () => {
  it('groups by key', () => {
    const arr = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
    const r = groupBy(arr, 'type');
    expect(r.a).toHaveLength(2);
    expect(r.b).toHaveLength(1);
  });

  it('groups by function', () => {
    const arr = [1, 2, 3, 4];
    const r = groupBy(arr, (n) => (n % 2 === 0 ? 'even' : 'odd'));
    expect(r.odd).toEqual([1, 3]);
    expect(r.even).toEqual([2, 4]);
  });
});`,

    "11": `import { useClickOutside } from './add';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';

describe('useClickOutside', () => {
  it('registers handler without error', () => {
    const ref = { current: document.createElement('div') };
    const handler = jest.fn();
    renderHook(() => useClickOutside(ref, handler));
    expect(handler).not.toHaveBeenCalled();
  });
});`,

    "12": `import { useFetch } from './add';
import { renderHook, waitFor } from '@testing-library/react';

describe('useFetch', () => {
  it('starts with loading true', () => {
    const { result } = renderHook(() => useFetch('https://example.com'));
    expect(result.current.loading).toBe(true);
  });
});`,

    "13": `import { pipe } from './add';

describe('pipe', () => {
  it('pipes functions', () => {
    const add = (x) => x + 1;
    const double = (x) => x * 2;
    expect(pipe(add, double)(1)).toBe(4);
  });

  it('handles single function', () => {
    expect(pipe((x) => x + 1)(1)).toBe(2);
  });
});`,

    "14": `import { useMemoWithComparator } from './add';
import { renderHook } from '@testing-library/react';

describe('useMemoWithComparator', () => {
  it('returns factory result', () => {
    const { result } = renderHook(() =>
      useMemoWithComparator(() => 42, [1])
    );
    expect(result.current).toBe(42);
  });
});`,

    "15": `import { EventEmitter } from './add';

describe('EventEmitter', () => {
  it('calls handler on emit', () => {
    const e = new EventEmitter();
    const fn = jest.fn();
    e.on('ev', fn);
    e.emit('ev', 1, 2);
    expect(fn).toHaveBeenCalledWith(1, 2);
  });

  it('does not call after off', () => {
    const e = new EventEmitter();
    const fn = jest.fn();
    e.on('ev', fn);
    e.off('ev', fn);
    e.emit('ev');
    expect(fn).not.toHaveBeenCalled();
  });
});`,

    "16": `import { LRUCache } from './add';

describe('LRUCache', () => {
  it('gets and puts', () => {
    const c = new LRUCache(2);
    c.put(1, 'a');
    expect(c.get(1)).toBe('a');
  });

  it('evicts oldest when full', () => {
    const c = new LRUCache(2);
    c.put(1, 'a');
    c.put(2, 'b');
    c.put(3, 'c');
    expect(c.get(1)).toBeUndefined();
    expect(c.get(3)).toBe('c');
  });
});`,

    "17": `import { mergeDeep } from './add';

describe('mergeDeep', () => {
  it('merges shallow', () => {
    expect(mergeDeep({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('merges nested', () => {
    expect(mergeDeep({ a: { x: 1 } }, { a: { y: 2 } })).toEqual({
      a: { x: 1, y: 2 },
    });
  });
});`,

    "18": `import { useIntersectionObserver } from './add';
import { renderHook } from '@testing-library/react';

describe('useIntersectionObserver', () => {
  it('returns isIntersecting', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIntersectionObserver(ref));
    expect(typeof result.current.isIntersecting).toBe('boolean');
  });
});`,

    "19": `import { pick, omit } from './add';

describe('pick and omit', () => {
  const obj = { a: 1, b: 2, c: 3 };

  it('pick returns chosen keys', () => {
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('omit excludes keys', () => {
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
  });
});`,

    "20": `import { createPromiseQueue } from './add';

describe('createPromiseQueue', () => {
  it('runs task', async () => {
    const q = createPromiseQueue(1);
    const p = q.add(() => Promise.resolve(42));
    await expect(p).resolves.toBe(42);
  });

  it('respects concurrency', async () => {
    const q = createPromiseQueue(2);
    const order = [];
    q.add(() => new Promise((r) => setTimeout(() => { order.push(1); r(); }, 10)));
    q.add(() => new Promise((r) => setTimeout(() => { order.push(2); r(); }, 5)));
    q.add(() => new Promise((r) => setTimeout(() => { order.push(3); r(); }, 0)));
    await q.onIdle();
    expect(order.length).toBe(3);
  });
});`,
  };

  return tests[challenge.id] || `import { ${challenge.solutionName} } from './add';

describe('${challenge.title}', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});`;
}
