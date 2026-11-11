import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FileText, Building2, Calendar, Clock, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export interface GraphNodeData {
  id: string;
  label: string;
  type: 'announcement' | 'department' | 'event' | 'deadline' | 'opportunity';
  category?: string;
  departmentCode?: string;
  importance?: string;
  verificationStatus?: string;
  sourceId?: string;
  confidence?: number;
  isHighlighted?: boolean;
  onSelectNode?: (id: string, type: string) => void;
}

export const AnnouncementNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as GraphNodeData;
  const isUrgent = nodeData.importance === 'urgent';
  const isVerified = nodeData.verificationStatus === 'verified';

  return (
    <div
      className={`px-4 py-3 bg-paper-card border-2 shadow-sm transition-all duration-150 min-w-[220px] max-w-[280px] rounded-none ${
        selected
          ? 'border-cobalt ring-2 ring-cobalt/20 scale-105'
          : nodeData.isHighlighted
          ? 'border-signal-orange ring-2 ring-signal-orange/20'
          : 'border-ink hover:border-cobalt'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-cobalt !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-cobalt !w-2 !h-2" />
      
      <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-divider pb-1">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-cobalt" />
          <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-slate-deep">
            {nodeData.departmentCode || 'NOTICE'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isUrgent && (
            <span className="px-1.5 py-0.2 bg-signal-soft text-signal-orange text-[9px] font-mono font-bold tracking-tight">
              URGENT
            </span>
          )}
          {isVerified ? (
            <span title="Verified announcement">
              <CheckCircle2 className="w-3 h-3 text-olive" />
            </span>
          ) : (
            <span title="Unverified or partially verified">
              <AlertCircle className="w-3 h-3 text-signal-orange" />
            </span>
          )}
        </div>
      </div>

      <div className="font-display font-medium text-xs leading-snug text-ink line-clamp-2">
        {nodeData.label}
      </div>

      {nodeData.category && (
        <div className="mt-2 text-[10px] text-ink-muted font-mono flex items-center justify-between">
          <span className="truncate">{nodeData.category}</span>
          <span className="text-cobalt font-semibold">Inspect →</span>
        </div>
      )}
    </div>
  );
};

export const DepartmentNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as GraphNodeData;
  return (
    <div
      className={`px-4 py-3 bg-ink text-paper border-2 transition-all min-w-[180px] rounded-none ${
        selected ? 'border-cobalt ring-2 ring-cobalt/40 scale-105' : 'border-ink'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-paper !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-paper !w-2 !h-2" />
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-warm-grey" />
        <div>
          <span className="font-mono text-[9px] text-warm-grey uppercase tracking-widest block">DEPARTMENT</span>
          <div className="font-display font-semibold text-xs leading-tight text-paper">{nodeData.label}</div>
        </div>
      </div>
    </div>
  );
};

export const DeadlineNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as GraphNodeData;
  return (
    <div
      className={`px-3 py-2 bg-signal-soft text-ink border-2 border-signal-orange transition-all min-w-[170px] ${
        selected ? 'ring-2 ring-signal-orange scale-105' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-signal-orange !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-signal-orange !w-2 !h-2" />
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-signal-orange shrink-0" />
        <div>
          <span className="font-mono text-[9px] text-signal-orange font-bold uppercase tracking-wider block">DEADLINE</span>
          <div className="font-mono font-semibold text-xs leading-tight text-ink">{nodeData.label}</div>
        </div>
      </div>
    </div>
  );
};

export const EventNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as GraphNodeData;
  return (
    <div
      className={`px-3 py-2 bg-cobalt-soft text-ink border-2 border-cobalt transition-all min-w-[170px] ${
        selected ? 'ring-2 ring-cobalt scale-105' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-cobalt !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-cobalt !w-2 !h-2" />
      <div className="flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5 text-cobalt shrink-0" />
        <div>
          <span className="font-mono text-[9px] text-cobalt font-bold uppercase tracking-wider block">CAMPUS EVENT</span>
          <div className="font-display font-medium text-xs leading-tight text-ink">{nodeData.label}</div>
        </div>
      </div>
    </div>
  );
};

export const OpportunityNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as GraphNodeData;
  return (
    <div
      className={`px-3 py-2 bg-olive-soft text-ink border-2 border-olive transition-all min-w-[170px] ${
        selected ? 'ring-2 ring-olive scale-105' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-olive !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-olive !w-2 !h-2" />
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-olive shrink-0" />
        <div>
          <span className="font-mono text-[9px] text-olive font-bold uppercase tracking-wider block">OPPORTUNITY</span>
          <div className="font-display font-medium text-xs leading-tight text-ink">{nodeData.label}</div>
        </div>
      </div>
    </div>
  );
};
