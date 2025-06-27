
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dna, 
  Home, 
  Upload, 
  Search, 
  Settings, 
  LogOut,
  FileText,
  BarChart3,
  Menu,
  X,
  MessageCircle,
  Activity
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const doctorNavItems = [
    { icon: Home, label: 'Dashboard', path: '/doctor/dashboard' },
    { icon: Upload, label: 'Upload Report', path: '/doctor/upload' },
    { icon: BarChart3, label: 'Analytics', path: '/doctor/analytics' },
  ];

  const patientNavItems = [
    { icon: Home, label: 'Dashboard', path: '/user/dashboard' },
    { icon: Upload, label: 'Upload DNA', path: '/user/upload' },
    { icon: FileText, label: 'Results', path: '/user/results' },
    { icon: Activity, label: '3D DNA View', path: '/user/3d-dna' },
    { icon: MessageCircle, label: 'Health Assistant', path: '/user/chat' },
  ];

  const navItems = user?.role === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50/30 to-white">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="hospital-card shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 sm:w-72 hospital-card border-r border-blue-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-blue-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 medical-gradient rounded-xl flex items-center justify-center animate-pulse-medical">
              <Dna className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                MediGenome AI
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground capitalize">{user?.role} Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 sm:p-6 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 sm:py-4 rounded-xl transition-all duration-200 text-sm sm:text-base ${
                    isActive 
                      ? 'medical-gradient text-white shadow-lg transform scale-[1.02]' 
                      : 'hover:bg-blue-50 hover:border-blue-200 text-foreground/80 hover:text-foreground border border-transparent'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 sm:p-6 border-t border-blue-100 bg-blue-50/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm sm:text-base">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm sm:text-base">{user?.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2 sm:py-3 rounded-lg hover:bg-white/80 text-foreground/80 hover:text-foreground transition-colors text-sm sm:text-base"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
              
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-2 sm:py-3 text-foreground/80 hover:text-foreground hover:bg-white/80 text-sm sm:text-base"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 lg:ml-72">
        <main className="spacing-responsive min-h-screen">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
