# react-useVerifyCode-hook
> 适用于验证码场景的React Hooks

## Usage 

> **Unplublished!**

```bash
npm install use-verify-code -S
// or
yarn add use-verify-code
```





```tsx
import React from "react";
import useVerifyCode from "use-verify-code";

export default function App() {
  const [current, setTarget, status] = useVerifyCode(5);

  return (
    <>
      {!status ? (
        <button
          onClick={() => {
            setTarget();
          }}
        >
          send verify code
        </button>
      ) : (
        <button>send again ({current})</button>
      )}
    </>
  );
}

```

- use `status` to toggle component status(`verify code button usually`).
- use `setTarget` to begin interval.
- use `current` to track current count.



### Interface

```typescript
export interface Opts {
  interval?: number; // interval time gap
}

type TUseVerifyCode = (
  start?: number, // time that [disable status] persist, default to be 60
  options?: Opts
) => {
  count: number; // current count status
  setTarget: (end?: number) => void; // invoke interval and set target, defalut to 0
  status: boolean; // interval status
};
```







Plz use [CodeSandBox Demo](https://codesandbox.io/s/useverifycode-hook-9pb2x?file=/src/App.tsx:0-449) for praticing.


