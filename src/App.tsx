import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogList from "./pages/BlogList";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Create Blog Post</h1>
                <p className="text-muted-foreground">Blog creation feature coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">User Profile</h1>
                <p className="text-muted-foreground">Profile management coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground">Admin features coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
