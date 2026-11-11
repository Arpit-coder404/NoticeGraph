import React from 'react';
import { NoticeGraphCanvas } from '../components/graph/NoticeGraphCanvas';
import { Network, Sparkles, HelpCircle } from 'lucide-react';
import { useNoticeStore } from '../store/useNoticeStore';

export const GraphPage: React.FC = () => {
  const { announcements, departments, relationships } = useNoticeStore();

  return (
    <div className="w-full h-[calc(100vh-65px)] bg-paper flex flex-col overflow-hidden">
      {/* Sub-header Bar */}
      <div className="border-b border-divider bg-paper-card px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-ink">
            <Network className="w-4 h-4 text-cobalt" />
            <span className="font-serif text-base tracking-tight">The NoticeGraph Relationship Canvas</span>
          </div>
          <span className="text-divider hidden sm:inline">|</span>
          <span className="text-ink-muted hidden sm:inline">
            Interactive multi-node topology ({announcements.length} notices, {departments.length} departments, {relationships.length} active relationships)
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-olive font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Live Graph Engine
          </span>
          <span className="text-divider">•</span>
          <span className="text-ink-muted">Drag nodes to rearrange • Click to inspect</span>
        </div>
      </div>

      {/* Main Canvas Component */}
      <div className="flex-1 w-full relative">
        <NoticeGraphCanvas />
      </div>
    </div>
  );
};
