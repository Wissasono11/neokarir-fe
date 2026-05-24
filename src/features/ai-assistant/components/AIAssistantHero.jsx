import React from 'react';
import { MessageSquareMore } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const AIAssistantHero = () => {
  const breadcrumbItems = [
    { label: 'AI Assistant', path: '/dashboard/ai-assistant', icon: MessageSquareMore }
  ];

  return (
    <div className="mb-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-4" />

      {/* Hero Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-heading md:text-heading font-bold text-primary-text mb-1 tracking-tight flex items-center gap-2">
            AI Career Assistant
          </h1>
          <p className="text-body-sm font-medium text-secondary-text">
            Dapatkan panduan karir personal yang didukung oleh kecerdasan buatan
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantHero;
