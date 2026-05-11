import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import ProfileDetail from "./pages/ProfileDetail";
import Sexworkers from "./pages/Sexworkers";
import CreatorDashboard from "./pages/CreatorDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import MarketplaceLanding from "./pages/MarketplaceLanding";
import Marketplace from "./pages/Marketplace";
import ListingDetail from "./pages/ListingDetail";
import NotificationSettings from "./pages/NotificationSettings";
import InvitePage from "./pages/InvitePage";
import AdminVerification from "./pages/AdminVerification";
import AdminClientVerification from "./pages/AdminClientVerification";
import ClientDashboard from "./pages/ClientDashboard";
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
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/sexworkers" element={<Sexworkers />} />
          <Route path="/dashboard" element={<CreatorDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/marketplace" element={<MarketplaceLanding />} />
          <Route path="/marketplace/browse" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<ListingDetail />} />
          <Route path="/notifications" element={<NotificationSettings />} />
          <Route path="/invite" element={<InvitePage />} />
          <Route path="/admin/verification" element={<AdminVerification />} />
          <Route path="/admin/client-verification" element={<AdminClientVerification />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
