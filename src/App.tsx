
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Index";
import DocumentationPage from "./pages/Documentation";
import ExamplesPage from "./pages/Examples";
import ExampleDetailPage from "./pages/ExampleDetail";
import ShowcasePage from "./pages/Showcase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/docs/*" element={<Layout><DocumentationPage /></Layout>} />
          <Route path="/examples" element={<Layout><ExamplesPage /></Layout>} />
          <Route path="/examples/:id" element={<Layout><ExampleDetailPage /></Layout>} />
          <Route path="/showcase" element={<Layout><ShowcasePage /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
