import React, { useEffect } from "react";

const useLifecycleStatus = () => {
  const isMounted = React.useRef(false);

  // This will trigger at component first render (only once)
  useEffect(() => {
    isMounted.current = true;

    return function cleanup() {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useLifecycleStatus;
