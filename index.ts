import { useState, useEffect, useRef, useCallback } from "react";

export interface IOpts {
  interval?: number;
}

export type TUseVerifyCode = (
  start?: number,
  options?: IOpts
) => {
  current: number;
  setTarget: (end?: number) => void;
  status: boolean;
};

const useVerifyCode: TUseVerifyCode = (start, options) => {
  const interval = options?.interval ?? 1000;
  const begin = start ?? 60;

  const [count, setCount] = useState<number>(begin);
  const [end, setEnd] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(false);

  const timerRef = useRef<any>();

  const intervalCaller = () => {
    timerRef.current = setInterval(() => {
      if (count - 1 === end) {
        clearInterval(timerRef.current);
        return setStatus(false);
      }
      setCount(count - 1);
    }, interval);
  };

  const setTarget = useCallback((end: number = 0): void => {
    setStatus(true);
    setEnd(end);
  }, []);

  useEffect(() => {
    status ? intervalCaller() : setCount(begin);
    return () => clearInterval(timerRef.current);
  }, [count, status]);

  return { current: count, setTarget, status };
};

export default useVerifyCode;
