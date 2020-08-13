import { act, renderHook } from '@testing-library/react-hooks';

import useVerifyCode, { Opts } from '../../src/hooks/useVerifyCode';

const init = (start?: number, options?: Opts) =>
  renderHook(() => useVerifyCode(start, options));

describe('useVerifyCode Hook', () => {
  jest.useFakeTimers();
  it('should have correct value when initialized with no params', () => {
    const { result } = init();
    const { count, setTarget, status } = result.current;

    expect(count).toBe(60);
    expect(typeof setTarget).toBe('function');
    expect(status).toBeFalsy();
  });

  it('should have correct value when initialized with params', () => {
    const { result } = init(5, { interval: 500 });
    const { count, setTarget, status } = result.current;

    expect(count).toBe(5);
    expect(typeof setTarget).toBe('function');
    expect(status).toBeFalsy();
  });

  it('should work normal when invoke setTarget with no params', async () => {
    const { result } = init(5, { interval: 50 });

    act(() => {
      result.current.setTarget();
    });

    jest.advanceTimersByTime(200);
    const { count: countBeforeEnd, status: statusBeforeEnd } = result.current;
    expect(countBeforeEnd).toBe(1);
    expect(statusBeforeEnd).toBeTruthy();

    jest.advanceTimersByTime(80);
    const { count: countRestart, status: statusRestart } = result.current;
    expect(countRestart).toBe(5);
    expect(statusRestart).toBeFalsy();
  });

  it('should work normal when invoke setTarget with no params', async () => {
    const { result } = init(5, { interval: 50 });

    act(() => {
      result.current.setTarget(1);
    });

    jest.advanceTimersByTime(150);
    const { count: countBeforeEnd, status: statusBeforeEnd } = result.current;
    expect(countBeforeEnd).toBe(2);
    expect(statusBeforeEnd).toBeTruthy();

    jest.advanceTimersByTime(80);
    const { count: countRestart, status: statusRestart } = result.current;
    expect(countRestart).toBe(5);
    expect(statusRestart).toBeFalsy();
  });
});
