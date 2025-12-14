import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DynamicCategoryPage from "./pages/DynamicCategoryPage";
import TopDestinations from "./pages/TopDestinations";
import { initializeAnalytics, trackPageView } from "@/lib/analytics";


const queryClient = new QueryClient();

/**
 * Analytics Tracker Component
 * Tracks page views on route changes
 */
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    // Initialize Google Analytics once when app starts
    initializeAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsTracker />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/top-destinations" element={<TopDestinations />} />


              {/* Dynamic Category Pages - Infrastructure for admin-controlled categories */}
              <Route path="/category/:category" element={<DynamicCategoryPage />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;