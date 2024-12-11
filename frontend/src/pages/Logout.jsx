import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Logout = () => {
  const { LogoutUser } = useAuth();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      LogoutUser();
      toast.success("Logout successful!");
    }
  }, [LogoutUser]);

  return (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default Logout;
