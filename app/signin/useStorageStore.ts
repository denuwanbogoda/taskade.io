import { useEffect } from 'react';

const useStorageStore = () => {
  useEffect(() => {
    // Ensure that 'user' is included as a dependency or is removed if not used
  }, [user]); // Add the 'user' dependency here if it’s being used within the effect.

  return <div>Canvas Component</div>;
};

export default useStorageStore;
