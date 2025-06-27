
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAnalytics from "./pages/DoctorAnalytics";
import UserDashboard from "./pages/UserDashboard";
import UserResults from "./pages/UserResults";
import User3DDNA from "./pages/User3DDNA";
import UserChat from "./pages/UserChat";
import DoctorPatientDetail from "./pages/DoctorPatientDetail";
import DoctorVariantExplorer from "./pages/DoctorVariantExplorer";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/results" element={<Results />} />
          <Route path="/demo" element={<Results />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/doctor/patient/:id" element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorPatientDetail />
            </ProtectedRoute>
          } />
          <Route path="/doctor/variant-explorer" element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorVariantExplorer />
            </ProtectedRoute>
          } />
          <Route path="/doctor/upload" element={
            <ProtectedRoute requiredRole="doctor">
              <Upload />
            </ProtectedRoute>
          } />
          <Route path="/doctor/analytics" element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorAnalytics />
            </ProtectedRoute>
          } />
          
          {/* Patient Routes */}
          <Route path="/user/dashboard" element={
            <ProtectedRoute requiredRole="patient">
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user/upload" element={
            <ProtectedRoute requiredRole="patient">
              <Upload />
            </ProtectedRoute>
          } />
          <Route path="/user/results" element={
            <ProtectedRoute requiredRole="patient">
              <UserResults />
            </ProtectedRoute>
          } />
          <Route path="/user/3d-dna" element={
            <ProtectedRoute requiredRole="patient">
              <User3DDNA />
            </ProtectedRoute>
          } />
          <Route path="/user/chat" element={
            <ProtectedRoute requiredRole="patient">
              <UserChat />
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
