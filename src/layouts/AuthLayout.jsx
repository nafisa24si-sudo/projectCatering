import { Outlet } from "react-router-dom";

// AuthLayout hanya sebagai pass-through.
// Login dan Register sudah memiliki layout full-screen masing-masing.
export default function AuthLayout() {
  return <Outlet />;
}
