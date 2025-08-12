import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // could render a skeleton
  if (!user) return <Navigate to="/" replace state={{ from: location }} />;
  return <>{children}</>;
}
