# react-useVerifyCode-hook

![Language](https://img.shields.io/github/languages/top/PenumbraPro/react-useVerifyCode-hook) ![David](https://img.shields.io/david/dev/PenumbraPro/react-useVerifyCode-hook) ![GitHub package.json version](https://img.shields.io/github/package-json/v/PenumbraPro/react-useVerifyCode-hook)



> 适用于验证码场景的 React Hooks.  
> React Hooks For Verify Code Sending & Status Controll

## Usage

```bash
npm install use-verify-code -S
// or
yarn add use-verify-code
```

Plz use [CodeSandBox Demo](https://codesandbox.io/s/useverifycode-hook-9pb2x?file=/src/App.tsx:0-449) for praticing.

```tsx
import React from 'react';
import useVerifyCode from './hooks/useVC';

export default function App() {
  const { current, setTarget, status } = useVerifyCode(3, { interval: 1000 });

  return (
    <>
      <button
        onClick={() => {
          setTarget();
        }}
        disabled={status}
      >
        {status ? `Send Again In ${current} s` : 'Send Verify Code'}
      </button>
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
