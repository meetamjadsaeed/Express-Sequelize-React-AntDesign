import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";


const ProtectedRoute = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QgdXNlciIsIm1vYmlsZU51bWJlciI6IjIxMjEyMTIiLCJpYXQiOjE2ODg5MTEzNzAsImV4cCI6MTY4ODkxNDk3MH0.-GvkHXF9BcEQMlHVFESjex3IS5kWht0GciI1DN9msIU";
  return <>{token ? <Outlet /> : <Navigate to="/" />}</>;
};
export default ProtectedRoute;
