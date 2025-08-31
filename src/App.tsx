import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import Auth from "./pages/Auth";
import WriteArticle from "./pages/WriteArticle";
import MyArticles from "./pages/MyArticles";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/write" element={
          <ProtectedRoute>
            <WriteArticle />
          </ProtectedRoute>
        } />
        <Route path="/my-articles" element={
          <ProtectedRoute>
            <MyArticles />
          </ProtectedRoute>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
