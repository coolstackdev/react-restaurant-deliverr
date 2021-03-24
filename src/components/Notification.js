import React, { useEffect } from "react";
import { useAppState } from "../providers/AppStateProvider";
import "../styles.css";

export const Notification = () => {
  const {
    appState: { error },
    setError
  } = useAppState();

  /* eslint-disable */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  return (
    <>
      {error !== null && (
        <div>
          <div
            className={
              error.status === "warning"
                ? "alert-warning alert"
                : error.status === "error"
                ? "alert-error alert"
                : "alert"
            }
          >
            {error.msg}
          </div>
        </div>
      )}
    </>
  );
};
