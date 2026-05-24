import React from 'react';
import { 
  Sparkles, 
  PanelLeftClose, 
  SquarePen, 
  Search, 
  X, 
  MessageSquare, 
  Trash2 
} from 'lucide-react';

const ConversationsSidebar = ({
  isHistoryOpen,
  setIsHistoryOpen,
  createNewSession,
  searchSessionQuery,
  setSearchSessionQuery,
  filteredSessions,
  activeSessionId,
  selectSession,
  deleteSession
}) => {
  return (
    <div 
      className={`absolute md:static inset-y-0 left-0 z-30 bg-white flex flex-col transition-all duration-300 ${
        isHistoryOpen 
          ? 'w-72 md:w-64 border-r border-slate-200/80 translate-x-0 opacity-100' 
          : 'w-0 border-none -translate-x-full overflow-hidden opacity-0 pointer-events-none'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5 text-slate-800">
          <Sparkles className="w-5.5 h-5.5 text-primary shrink-0 animate-pulse" />
          <span className="font-bold text-body-sm tracking-tight text-slate-800">AI Assistant</span>
        </div>
        <button 
          type="button"
          onClick={() => setIsHistoryOpen(false)}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          title="Sembunyikan Riwayat"
        >
          <PanelLeftClose className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* New Chat Button (Pill Shape) */}
      <div className="px-3.5 pb-2">
        <button
          onClick={createNewSession}
          className="w-full flex items-center justify-start gap-3 py-3 px-5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 font-bold text-body-sm transition-all duration-200 cursor-pointer active:scale-[0.97]"
        >
          <SquarePen className="w-4.5 h-4.5 text-slate-500" />
          <span>Percakapan baru</span>
        </button>
      </div>

      {/* Search Session Bar (Borderless) */}
      <div className="px-3.5 mb-2.5">
        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100/60 rounded-full transition-all duration-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Telusuri percakapan" 
            value={searchSessionQuery}
            onChange={(e) => setSearchSessionQuery(e.target.value)}
            className="w-full bg-transparent border-none text-body-sm font-semibold text-slate-700 placeholder-slate-400 outline-none"
          />
          {searchSessionQuery && (
            <button onClick={() => setSearchSessionQuery('')} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Section Header: Riwayat */}
      <div className="px-5 py-1 mb-1 text-caption font-semibold text-slate-400 tracking-wider select-none">
        Riwayat
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 scrollbar-hide">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-6 text-body-sm font-medium text-slate-400">
            Tidak ada obrolan ditemukan
          </div>
        ) : (
          filteredSessions.map((session) => {
            const isActive = session.id === activeSessionId;
            return (
              <div
                key={session.id}
                onClick={() => selectSession(session.id)}
                className={`group relative flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
                  isActive 
                    ? 'bg-primary-light/45 text-primary font-bold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-6">
                  <MessageSquare className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                  <span className="text-body-sm font-semibold truncate leading-tight">
                    {session.title}
                  </span>
                </div>

                {/* Delete Session Button (Visible on hover) */}
                <button
                  onClick={(e) => deleteSession(session.id, e)}
                  className="absolute right-2 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0 cursor-pointer"
                  title="Hapus Obrolan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationsSidebar;
