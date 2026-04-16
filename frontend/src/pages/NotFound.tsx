import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f6f1e8_0%,#f8fbf8_100%)] px-6">
      <div className="max-w-lg rounded-[32px] border border-white/70 bg-white/90 p-10 text-center shadow-xl shadow-slate-900/10">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">404</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The page at `{location.pathname}` does not exist in the current Kochi Brief flow.</p>
        <Link to="/" className="mt-6 inline-flex text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
