
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dna, 
  Home, 
  Upload, 
  Search, 
  Settings, 
  LogOut,
  Users,
  FileText,
  BarChart3,
  Menu,
  X
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
    { icon: Users, label: 'Patients', path: '/doctor/patients' },
    { icon: Upload, label: 'Upload Report', path: '/doctor/upload' },
    { icon: Search, label: 'Variant Explorer', path: '/doctor/variants' },
    { icon: BarChart3, label: 'Analytics', path: '/doctor/analytics' },
  ];

  const patientNavItems = [
    { icon: Home, label: 'Dashboard', path: '/user/dashboard' },
    { icon: Upload, label: 'Upload DNA', path: '/user/upload' },
    { icon: FileText, label: 'Results', path: '/user/results' },
    { icon: Dna, label: '3D DNA View', path: '/user/3d-dna' },
    { icon: Search, label: 'Chat Assistant', path: '/user/chat' },
  ];

  const navItems = user?.role === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="glass"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 glass transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-white/10">
            <div className="w-10 h-10 dna-gradient rounded-xl flex items-center justify-center animate-pulse-glow">
              <Dna className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GenomeAI
              </h2>
              <p className="text-xs text-muted-foreground capitalize">{user?.role} Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'dna-gradient text-white shadow-lg' 
                      : 'hover:bg-white/10 text-foreground/80 hover:text-foreground'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </Link>
              
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-white/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <main className="p-6">
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
