import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import avatar from '../../../assets/images/avatar.png';

const DashboardNavbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="h-[80px] bg-white border-b border-border/60 shrink-0 relative z-10">
      <div className="h-full px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <button 
              onClick={onMenuClick}
              className="p-2 -ml-2 text-secondary-text hover:text-primary lg:hidden transition-colors"
            >
              <Menu size={24} />
            </button>
            
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-primary-text tracking-tight">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-secondary-text leading-tight">Hello👋</p>
              <p className="text-[15px] font-bold text-primary-text leading-tight mt-0.5">{user?.name || 'Franz Hermann'}</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-yellow-400 border-white shadow-sm cursor-pointer shrink-0">
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
