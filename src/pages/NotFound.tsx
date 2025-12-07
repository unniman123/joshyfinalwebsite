import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SeoMeta from "@/components/SeoMeta";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SeoMeta
        title="404 - Page Not Found | KeralaToursGlobal - Kerala Travels | Discover India | Panchakarma Treatment Holidays | Global Holidays"
        description="The page you're looking for could not be found. Return to KeralaToursGlobal homepage."
        url={location.pathname}
        noIndex
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
