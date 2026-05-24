import React from 'react';
import { Sparkles, Briefcase, FileText, Compass } from 'lucide-react';

const SUGGESTIONS = [
  {
    id: 's-1',
    label: 'Roadmap belajar Node.js',
    query: 'Bagaimana roadmap belajar Node.js?',
    icon: Compass,
  },
  {
    id: 's-2',
    label: 'Cari loker Frontend',
    query: 'Tampilkan lowongan Frontend Developer',
    icon: Briefcase,
  },
  {
    id: 's-3',
    label: 'Cara buat CV ATS Friendly',
    query: 'Bagaimana cara membuat CV ATS Friendly?',
    icon: FileText,
  },
  {
    id: 's-4',
    label: 'Kecocokan CV saya',
    query: 'Berapa persen kecocokan CV saya untuk Backend?',
    icon: Sparkles,
  }
];

const ChatSuggestions = ({ onSelectSuggestion }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3.5 w-full justify-start">
      {SUGGESTIONS.map((suggestion) => {
        const Icon = suggestion.icon;
        return (
          <button
            key={suggestion.id}
            onClick={() => onSelectSuggestion(suggestion.query)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200/60 bg-slate-50/50 text-body-sm font-semibold text-slate-600 hover:text-primary hover:border-primary/30 hover:bg-primary-light/20 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
          >
            <Icon className="w-3.5 h-3.5 text-secondary-text" />
            <span>{suggestion.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ChatSuggestions;
