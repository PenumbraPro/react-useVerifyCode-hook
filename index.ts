import { useState, useEffect } from 'react';

let countInterval: any = null;

export interface Opts {
  interval?: number;
}

export type TUseVerifyCode = (
  start?: number,
  options?: Opts
) => {
  count: number;
  setTarget: (end?: number) => void;
  status: boolean;
};

const useVerifyCode: TUseVerifyCode = (start, options) => {
  const interval = options?.interval ?? 1000;
  const begin = start ?? 60;

  const [count, setCount] = useState<number>(begin);
  const [end, setEnd] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(false);

  const intervalCaller = () => {
    countInterval = setInterval(() => {
      if (count - 1 === end) {
        clearInterval(countInterval);
        return setStatus(false);
      }
      setCount(count - 1);
    }, interval);
  };

  const setTarget = (end: number = 0): void => {
    setStatus(true);
    setEnd(end);
  };

  useEffect(() => {
    status ? intervalCaller() : setCount(begin);
    return () => clearInterval(countInterval);
  }, [count, status]);

  return { count, setTarget, status };
};

export default useVerifyCode;
