import { act, renderHook } from "@testing-library/react-hooks";

import useVerifyCode, { IOpts } from "./index";

const init = (start?: number, options?: IOpts) =>
  renderHook(() => useVerifyCode(start, options));

describe("useVerifyCode Hook", () => {
  jest.useFakeTimers();
  it("should have correct value when initialized with no params", () => {
    const { result } = init();
    const { current, setTarget, status } = result.current;

    expect(current).toBe(60);
    expect(typeof setTarget).toBe("function");
    expect(status).toBeFalsy();
  });

  it("should have correct value when initialized with params", () => {
    const { result } = init(5, { interval: 500 });
    const { current, setTarget, status } = result.current;

    expect(current).toBe(5);
    expect(typeof setTarget).toBe("function");
    expect(status).toBeFalsy();
  });

  it("should work normal when invoke setTarget with no params", async () => {
    const { result } = init(5, { interval: 50 });

    act(() => {
      result.current.setTarget();
    });

    jest.advanceTimersByTime(200);
    const {
      current: currentBeforeEnd,
      status: statusBeforeEnd,
    } = result.current;
    expect(currentBeforeEnd).toBe(1);
    expect(statusBeforeEnd).toBeTruthy();

    jest.advanceTimersByTime(80);
    const { current: currentRestart, status: statusRestart } = result.current;
    expect(currentRestart).toBe(5);
    expect(statusRestart).toBeFalsy();
  });

  it("should work normal when invoke setTarget with no params", async () => {
    const { result } = init(5, { interval: 50 });

    act(() => {
      result.current.setTarget(1);
    });

    jest.advanceTimersByTime(150);
    const {
      current: currentBeforeEnd,
      status: statusBeforeEnd,
    } = result.current;
    expect(currentBeforeEnd).toBe(2);
    expect(statusBeforeEnd).toBeTruthy();

    jest.advanceTimersByTime(80);
    const { current: currentRestart, status: statusRestart } = result.current;
    expect(currentRestart).toBe(5);
    expect(statusRestart).toBeFalsy();
  });
});
