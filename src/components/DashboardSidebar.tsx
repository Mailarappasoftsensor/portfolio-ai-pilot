
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Home, FileText, Users, Target, BarChart3, Settings, 
  LogOut, User, Briefcase
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home, path: '/dashboard' },
    { id: 'portfolio', label: 'Portfolio Builder', icon: FileText, path: '/portfolio' },
    { id: 'resume', label: 'Resume Optimizer', icon: Briefcase, path: '/resume' },
    { id: 'interview', label: 'Interview Prep', icon: Users, path: '/interview' },
    { id: 'jobs', label: 'Job Matcher', icon: Target, path: '/jobs' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleMenuClick = (item: any) => {
    setActiveSection(item.id);
    navigate(item.path);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black/30 backdrop-blur-lg border-r border-white/10 p-6">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          PortfolioAI
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 left-6 right-6">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
