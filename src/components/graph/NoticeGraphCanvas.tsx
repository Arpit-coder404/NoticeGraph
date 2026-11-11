import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  MarkerType,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNoticeStore } from '../../store/useNoticeStore';
import {
  AnnouncementNode,
  DepartmentNode,
  DeadlineNode,
  EventNode,
  OpportunityNode
} from './CustomNodes';
import {
  Search,
  Filter,
  Maximize2,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const nodeTypes = {
  announcement: AnnouncementNode,
  department: DepartmentNode,
  deadline: DeadlineNode,
  event: EventNode,
  opportunity: OpportunityNode
};

export const NoticeGraphCanvas: React.FC = () => {
  const navigate = useNavigate();
  const { announcements, departments, relationships, categories } = useNoticeStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('anc-001');

  // Convert state data into graph nodes and edges
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Department Nodes
    departments.slice(0, 5).forEach((dept, idx) => {
      nodes.push({
        id: dept.id,
        type: 'department',
        position: { x: 100 + (idx % 3) * 380, y: 50 + Math.floor(idx / 3) * 260 },
        data: {
          id: dept.id,
          label: dept.name,
          type: 'department',
          departmentCode: dept.code
        }
      });
    });

    // Announcement Nodes
    announcements.slice(0, 14).forEach((anc, idx) => {
      const dept = departments.find((d) => d.id === anc.departmentId);
      const cat = categories.find((c) => c.id === anc.categoryId);

      // Arrange announcements in an organic layout
      const angle = (idx / 14) * 2 * Math.PI;
      const radius = 340 + (idx % 3) * 80;
      const posX = 550 + radius * Math.cos(angle);
      const posY = 380 + radius * Math.sin(angle);

      nodes.push({
        id: anc.id,
        type: 'announcement',
        position: { x: posX, y: posY },
        data: {
          id: anc.id,
          label: anc.title,
          type: 'announcement',
          category: cat?.name,
          departmentCode: dept?.code || 'UNIV',
          importance: anc.importance,
          verificationStatus: anc.verificationStatus
        }
      });

      // Link Announcement to its issuing Department
      if (dept) {
        edges.push({
          id: `edge-dept-${anc.id}`,
          source: dept.id,
          target: anc.id,
          label: 'issued by',
          style: { stroke: '#41464D', strokeWidth: 1.5, strokeDasharray: '4 4' },
          labelStyle: { fill: '#41464D', fontSize: 10, fontFamily: 'IBM Plex Mono' },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#41464D' }
        });
      }

      // Add major deadlines as deadline nodes for top items
      if (anc.importantDates && anc.importantDates.length > 0 && idx < 5) {
        const topDate = anc.importantDates[0];
        const deadlineNodeId = `node-date-${topDate.id}`;
        nodes.push({
          id: deadlineNodeId,
          type: topDate.dateType === 'event' ? 'event' : 'deadline',
          position: { x: posX + 40, y: posY + 130 },
          data: {
            id: deadlineNodeId,
            label: `${topDate.dateValue} (${topDate.description.slice(0, 24)}...)`,
            type: topDate.dateType === 'event' ? 'event' : 'deadline',
            sourceId: anc.id
          }
        });

        edges.push({
          id: `edge-date-${topDate.id}`,
          source: anc.id,
          target: deadlineNodeId,
          label: topDate.dateType === 'event' ? 'scheduled on' : 'due by',
          style: { stroke: topDate.dateType === 'event' ? '#315BEA' : '#F27B42', strokeWidth: 2 },
          labelStyle: { fill: topDate.dateType === 'event' ? '#315BEA' : '#F27B42', fontSize: 10, fontFamily: 'IBM Plex Mono' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: topDate.dateType === 'event' ? '#315BEA' : '#F27B42'
          }
        });
      }
    });

    // Cross-Announcement Relationships
    relationships.forEach((rel) => {
      const isUrgent = rel.relationshipType === 'supersedes' || rel.relationshipType === 'has_deadline';
      const edgeColor =
        rel.relationshipType === 'supersedes'
          ? '#F27B42'
          : rel.relationshipType === 'related_to'
          ? '#315BEA'
          : '#92977C';

      edges.push({
        id: rel.id,
        source: rel.sourceId,
        target: rel.targetId,
        label: rel.relationshipType.replace('_', ' '),
        animated: rel.relationshipType === 'related_to',
        style: { stroke: edgeColor, strokeWidth: 2 },
        labelStyle: { fill: edgeColor, fontWeight: 600, fontSize: 10, fontFamily: 'IBM Plex Mono' },
        markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor }
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [announcements, departments, relationships, categories]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Filter and highlight nodes based on search and type filter
  const filteredNodes = useMemo(() => {
    return nodes.map((node) => {
      const label = (node.data as any)?.label?.toLowerCase() || '';
      const type = (node.data as any)?.type || '';
      const matchesSearch = searchQuery === '' || label.includes(searchQuery.toLowerCase());
      const matchesType = selectedTypeFilter === 'all' || type === selectedTypeFilter;
      const isSelected = node.id === selectedNodeId;

      return {
        ...node,
        hidden: !matchesSearch || !matchesType,
        data: {
          ...node.data,
          isHighlighted: isSelected
        }
      };
    });
  }, [nodes, searchQuery, selectedTypeFilter, selectedNodeId]);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  // Details for inspect drawer
  const inspectAnnouncement = useMemo(() => {
    if (!selectedNodeId) return null;
    return announcements.find((a) => a.id === selectedNodeId);
  }, [selectedNodeId, announcements]);

  const inspectDepartment = useMemo(() => {
    if (!selectedNodeId) return null;
    return departments.find((d) => d.id === selectedNodeId);
  }, [selectedNodeId, departments]);

  const connectedRelationships = useMemo(() => {
    if (!selectedNodeId) return [];
    return relationships.filter(
      (r) => r.sourceId === selectedNodeId || r.targetId === selectedNodeId
    );
  }, [selectedNodeId, relationships]);

  return (
    <div className="relative w-full h-[calc(100vh-140px)] bg-paper border-b border-divider overflow-hidden flex">
      {/* Main Canvas Area */}
      <div className="flex-1 h-full relative">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.8}
        >
          <Background color="#DCDAD2" gap={20} size={1} />
          <Controls className="!bg-paper-card !border !border-divider !shadow-sm !rounded-none" />
          <MiniMap
            className="!bg-paper !border !border-divider !rounded-none"
            nodeColor={(n) => {
              if (n.type === 'department') return '#17191C';
              if (n.type === 'deadline') return '#F27B42';
              if (n.type === 'event') return '#315BEA';
              return '#DCDAD2';
            }}
          />

          {/* Top Floating Control Bar */}
          <Panel position="top-left" className="m-4">
            <div className="bg-paper-card border-2 border-ink shadow-md p-3 flex flex-wrap items-center gap-3 max-w-xl">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-ink-muted absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search graph nodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-warm-light border border-divider text-ink focus:outline-none focus:border-cobalt font-mono"
                />
              </div>

              {/* Node Type Filter */}
              <div className="flex items-center gap-1.5 border-l border-divider pl-3">
                <Filter className="w-3.5 h-3.5 text-slate-deep" />
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  className="text-xs bg-warm-light border border-divider text-ink px-2 py-1.5 focus:outline-none font-mono"
                >
                  <option value="all">All Nodes ({nodes.length})</option>
                  <option value="announcement">Announcements</option>
                  <option value="department">Departments</option>
                  <option value="deadline">Deadlines</option>
                  <option value="event">Events</option>
                </select>
              </div>

              {/* Legend Indicator */}
              <div className="hidden sm:flex items-center gap-2 border-l border-divider pl-3 text-[10px] font-mono text-ink-muted">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-paper-card border border-ink inline-block"></span> Notice
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-ink inline-block"></span> Dept
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-signal-orange inline-block"></span> Deadline
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-cobalt inline-block"></span> Event
                </span>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Right-Hand Node Inspector Drawer */}
      <div className="w-96 border-l-2 border-ink bg-paper-card h-full overflow-y-auto flex flex-col p-5 shadow-lg">
        <div className="border-b border-divider pb-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-wider uppercase text-cobalt font-semibold">
              RELATIONSHIP INSPECTOR
            </span>
            <span className="px-2 py-0.5 bg-warm-grey text-[10px] font-mono text-ink">
              ACTIVE NODE
            </span>
          </div>
          <h3 className="font-serif text-lg leading-tight mt-1 text-ink">
            {inspectAnnouncement?.title || inspectDepartment?.name || 'Selected Graph Node'}
          </h3>
        </div>

        {inspectAnnouncement && (
          <div className="space-y-4 flex-1">
            <div className="bg-warm-light p-3 border border-divider">
              <span className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                EXECUTIVE SUMMARY
              </span>
              <p className="text-xs text-ink leading-relaxed">
                {inspectAnnouncement.summary}
              </p>
            </div>

            {/* Verification & Trust */}
            <div className="flex items-center gap-2 p-2.5 bg-paper border border-divider">
              <ShieldCheck className="w-4 h-4 text-cobalt shrink-0" />
              <div className="text-xs">
                <span className="font-mono font-semibold block text-ink">
                  {inspectAnnouncement.verificationStatus === 'verified'
                    ? 'Administrator Verified'
                    : 'Needs Staff Verification'}
                </span>
                <span className="text-[10px] text-ink-muted">
                  Issuing: {departments.find((d) => d.id === inspectAnnouncement.departmentId)?.name}
                </span>
              </div>
            </div>

            {/* Extracted Deadlines */}
            {inspectAnnouncement.importantDates.length > 0 && (
              <div>
                <span className="font-mono text-[10px] text-signal-orange font-bold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> CRITICAL DATES
                </span>
                <div className="space-y-1.5">
                  {inspectAnnouncement.importantDates.map((d) => (
                    <div key={d.id} className="p-2 bg-signal-soft border border-signal-orange text-xs flex justify-between">
                      <span className="font-mono font-semibold text-ink">{d.dateValue}</span>
                      <span className="text-slate-deep truncate ml-2">{d.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connected Graph Relationships */}
            <div>
              <span className="font-mono text-[10px] text-slate-deep font-bold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> CONNECTED ANNOUNCEMENTS ({connectedRelationships.length})
              </span>
              {connectedRelationships.length === 0 ? (
                <p className="text-xs text-ink-muted italic">No direct connections recorded.</p>
              ) : (
                <div className="space-y-2">
                  {connectedRelationships.map((r) => {
                    const otherId = r.sourceId === inspectAnnouncement.id ? r.targetId : r.sourceId;
                    const otherAnc = announcements.find((a) => a.id === otherId);
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedNodeId(otherId)}
                        className="p-2.5 bg-warm-light border border-divider hover:border-cobalt cursor-pointer transition text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[9px] uppercase font-bold text-cobalt">
                            {r.relationshipType.replace('_', ' ')}
                          </span>
                          <span className="font-mono text-[9px] text-ink-muted">
                            Conf: {Math.round(r.confidence * 100)}%
                          </span>
                        </div>
                        <div className="font-medium text-ink line-clamp-1">
                          {otherAnc?.title || otherId}
                        </div>
                        <p className="text-[10px] text-ink-muted mt-1 leading-snug line-clamp-2">
                          {r.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Link to Full Announcement Reader */}
            <div className="pt-3 border-t border-divider">
              <button
                onClick={() => navigate(`/announcement/${inspectAnnouncement.id}`)}
                className="w-full py-2.5 bg-ink text-paper font-display text-xs font-semibold hover:bg-cobalt transition flex items-center justify-center gap-2"
              >
                Open Full Editorial Reader <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {inspectDepartment && (
          <div className="space-y-4 flex-1">
            <div className="bg-warm-light p-3 border border-divider">
              <span className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                ABOUT DEPARTMENT
              </span>
              <p className="text-xs text-ink leading-relaxed">
                {inspectDepartment.description}
              </p>
            </div>

            <div className="text-xs space-y-2 font-mono">
              <div>
                <span className="text-ink-muted block text-[10px]">DEAN / HEAD:</span>
                <span className="font-semibold text-ink">{inspectDepartment.dean}</span>
              </div>
              <div>
                <span className="text-ink-muted block text-[10px]">BUILDING:</span>
                <span className="text-ink">{inspectDepartment.building}</span>
              </div>
              <div>
                <span className="text-ink-muted block text-[10px]">OFFICIAL EMAIL:</span>
                <span className="text-cobalt">{inspectDepartment.email}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-divider">
              <span className="font-mono text-[10px] text-slate-deep uppercase block mb-2">
                ACTIVE NOTICES ISSUED
              </span>
              <div className="space-y-1.5">
                {announcements
                  .filter((a) => a.departmentId === inspectDepartment.id)
                  .slice(0, 4)
                  .map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedNodeId(a.id)}
                      className="p-2 bg-paper border border-divider hover:border-cobalt cursor-pointer text-xs"
                    >
                      <div className="font-medium text-ink line-clamp-1">{a.title}</div>
                      <div className="text-[10px] text-cobalt font-mono mt-0.5">Click to inspect node →</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {!inspectAnnouncement && !inspectDepartment && (
          <div className="text-center py-12 text-ink-muted text-xs">
            <Info className="w-8 h-8 mx-auto text-divider mb-2" />
            Click on any announcement, department, or deadline node to inspect its connected graph stories.
          </div>
        )}
      </div>
    </div>
  );
};

