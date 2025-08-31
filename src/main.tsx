import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { Toaster } from './components/ui/toaster'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="devnovate-ui-theme">
    <App />
    <Toaster />
  </ThemeProvider>
);
