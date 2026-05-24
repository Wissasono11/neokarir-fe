import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import AIAssistantHero from '../features/ai-assistant/components/AIAssistantHero';
import ChatWindow from '../features/ai-assistant/components/ChatWindow';

const AIAssistantPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AIAssistantHero />

        <div className="w-full pb-16">
          <ChatWindow />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
