import { useEffect, useState } from "react";
import Loader from "./Loader";

function HomeApp({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
    setLoading(false);
    }, 0);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-111111 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {children}
    </>
  );
}

export default HomeApp;
