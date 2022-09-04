import { useState } from "react";
export function useForceUpate() {
  const [count, setCount] = useState(0);
  return () => {
    setCount(count + 1);
  };
}

