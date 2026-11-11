import React, { useState, useMemo } from 'react';
import { useNoticeStore } from '../store/useNoticeStore';
import {
  ShieldCheck,
  AlertTriangle,
  Building2,
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Copy,
  Users,
  Eye,
  FileText
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Link } from 'react-router-dom';
import { Announcement, Department, Category, DuplicateCluster } from '../types';

const CHART_COLORS = ['#315BEA', '#F27B42', '#92977C', '#17191C', '#41464D', '#525863', '#64748B', '#0EA5E9'];

export const AdminAnalyticsPage: React.FC = () => {
  const {
    announcements,
    departments,
    categories,
    duplicates,
    relationships,
    approveAnnouncement,
    rejectAnnouncement,
    resolveDuplicate
  } = useNoticeStore();

  const [activeSection, setActiveSection] = useState<'analytics' | 'review' | 'duplicates' | 'departments'>('analytics');

  // Pending Review Announcements
  const pendingNotices = announcements.filter((a: Announcement) => a.publicationStatus === 'pending_review');
  const activeDuplicates = duplicates.filter((d: DuplicateCluster) => d.status === 'detected');

  // Metrics dynamically computed from real store records
  const totalAnnouncements = announcements.length;
  const publishedCount = announcements.filter((a: Announcement) => a.publicationStatus === 'published').length;
  const verifiedCount = announcements.filter((a: Announcement) => a.verificationStatus === 'verified').length;
  const totalViews = announcements.reduce((acc: number, a: Announcement) => acc + (a.viewCount || 0), 0);

  // Department Publication Trends Data
  const deptChartData = useMemo(() => {
    return departments.map((d: Department) => {
      const count = announcements.filter((a: Announcement) => a.departmentId === d.id).length;
      const views = announcements
        .filter((a: Announcement) => a.departmentId === d.id)
        .reduce((sum: number, a: Announcement) => sum + (a.viewCount || 0), 0);
      return {
        name: d.code,
        fullName: d.name,
        notices: count,
        readership: views
      };
    });
  }, [departments, announcements]);

  // Category Distribution Data
  const categoryChartData = useMemo(() => {
    return categories.map((c: Category) => {
      const count = announcements.filter((a: Announcement) => a.categoryId === c.id).length;
      return {
        name: c.name,
        value: count
      };
    }).filter((item) => item.value > 0);
  }, [categories, announcements]);

  return (
    <div className="w-full min-h-screen bg-paper pb-24">
      {/* Header */}
      <div className="border-b-2 border-ink bg-paper-card py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-ink text-paper font-mono text-[10px] font-bold uppercase tracking-wider">
                ADMINISTRATION & GOVERNANCE
              </span>
              <span className="font-mono text-xs text-ink-muted">
                Office of the Registrar & Academic Affairs
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mt-1">
              Institutional Intelligence & Quality Audit
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {pendingNotices.length > 0 && (
              <span className="px-3 py-1.5 bg-signal-soft border border-signal-orange text-signal-orange font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {pendingNotices.length} Awaiting Approval
              </span>
            )}
            {activeDuplicates.length > 0 && (
              <span className="px-3 py-1.5 bg-warm-light border border-divider text-ink font-bold flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5 text-cobalt" />
                {activeDuplicates.length} Duplicate Flagged
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b-2 border-ink pb-2 font-display text-xs font-semibold">
          <button
            onClick={() => setActiveSection('analytics')}
            className={`px-3 py-1.5 border transition flex items-center gap-1.5 ${
              activeSection === 'analytics'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-divider hover:border-ink'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Campus Telemetry & Metrics</span>
          </button>

          <button
            onClick={() => setActiveSection('review')}
            className={`px-3 py-1.5 border transition flex items-center gap-1.5 ${
              activeSection === 'review'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-divider hover:border-ink'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-olive" />
            <span>Review Queue</span>
            {pendingNotices.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-signal-orange text-paper text-[10px] font-mono flex items-center justify-center">
                {pendingNotices.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSection('duplicates')}
            className={`px-3 py-1.5 border transition flex items-center gap-1.5 ${
              activeSection === 'duplicates'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-divider hover:border-ink'
            }`}
          >
            <Copy className="w-3.5 h-3.5 text-cobalt" />
            <span>Duplicate Notice Detection</span>
            {activeDuplicates.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-cobalt text-paper text-[10px] font-mono flex items-center justify-center">
                {activeDuplicates.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSection('departments')}
            className={`px-3 py-1.5 border transition flex items-center gap-1.5 ${
              activeSection === 'departments'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-divider hover:border-ink'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-slate-deep" />
            <span>Department Directory ({departments.length})</span>
          </button>
        </div>

        {/* SECTION 1: VISUAL ANALYTICS */}
        {activeSection === 'analytics' && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-paper-card border-2 border-ink">
                <span className="font-mono text-[10px] uppercase text-ink-muted block mb-1">
                  TOTAL ANNOUNCEMENTS
                </span>
                <div className="font-serif text-3xl font-bold text-ink">{totalAnnouncements}</div>
                <div className="text-[11px] font-mono text-olive mt-1">
                  {publishedCount} live in feed
                </div>
              </div>

              <div className="p-4 bg-paper-card border-2 border-ink">
                <span className="font-mono text-[10px] uppercase text-ink-muted block mb-1">
                  VERIFICATION RATE
                </span>
                <div className="font-serif text-3xl font-bold text-cobalt">
                  {Math.round((verifiedCount / Math.max(1, totalAnnouncements)) * 100)}%
                </div>
                <div className="text-[11px] font-mono text-ink-muted mt-1">
                  {verifiedCount} confirmed by staff
                </div>
              </div>

              <div className="p-4 bg-paper-card border-2 border-ink">
                <span className="font-mono text-[10px] uppercase text-ink-muted block mb-1">
                  TOTAL STUDENT READS
                </span>
                <div className="font-serif text-3xl font-bold text-signal-orange">
                  {totalViews.toLocaleString()}
                </div>
                <div className="text-[11px] font-mono text-ink-muted mt-1">
                  Across 8 campus faculties
                </div>
              </div>

              <div className="p-4 bg-paper-card border-2 border-ink">
                <span className="font-mono text-[10px] uppercase text-ink-muted block mb-1">
                  CONNECTED GRAPH EDGES
                </span>
                <div className="font-serif text-3xl font-bold text-slate-deep">
                  {relationships.length}
                </div>
                <div className="text-[11px] font-mono text-ink-muted mt-1">
                  Cross-notice intelligence
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Department Trends Bar Chart */}
              <div className="lg:col-span-7 bg-paper-card border-2 border-ink p-5">
                <div className="flex items-center justify-between border-b border-divider pb-3 mb-4">
                  <h3 className="font-serif text-lg font-bold text-ink">
                    Announcements Published by Department
                  </h3>
                  <span className="text-[10px] font-mono text-ink-muted">Volume Count</span>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deptChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#DCDAD2" />
                      <XAxis dataKey="name" stroke="#17191C" fontSize={11} fontFamily="IBM Plex Mono" />
                      <YAxis stroke="#17191C" fontSize={11} fontFamily="IBM Plex Mono" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FAF9F5',
                          border: '2px solid #17191C',
                          fontFamily: 'IBM Plex Mono',
                          fontSize: '11px'
                        }}
                      />
                      <Bar dataKey="notices" fill="#315BEA" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Distribution Pie Chart */}
              <div className="lg:col-span-5 bg-paper-card border-2 border-ink p-5">
                <div className="flex items-center justify-between border-b border-divider pb-3 mb-4">
                  <h3 className="font-serif text-lg font-bold text-ink">
                    Information Category Share
                  </h3>
                  <span className="text-[10px] font-mono text-ink-muted">Campus Distribution</span>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FAF9F5',
                          border: '2px solid #17191C',
                          fontFamily: 'IBM Plex Mono',
                          fontSize: '11px'
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: '10px', fontFamily: 'IBM Plex Mono' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: REVIEW QUEUE */}
        {activeSection === 'review' && (
          <div className="space-y-4">
            <div className="border-b-2 border-ink pb-2">
              <h2 className="font-serif text-2xl font-bold text-ink">
                Announcements Awaiting Institutional Approval ({pendingNotices.length})
              </h2>
              <p className="text-xs font-mono text-ink-muted mt-0.5">
                Submissions from faculty and departments requiring administrative sign-off before entering the student feed.
              </p>
            </div>

            {pendingNotices.length === 0 ? (
              <div className="p-12 border-2 border-divider text-center bg-paper-card text-ink-muted font-mono text-xs">
                <CheckCircle2 className="w-8 h-8 mx-auto text-olive mb-2" />
                All pending notices have been reviewed. The queue is clear!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingNotices.map((anc: Announcement) => {
                  const dept = departments.find((d: Department) => d.id === anc.departmentId);
                  const cat = categories.find((c: Category) => c.id === anc.categoryId);

                  return (
                    <div
                      key={anc.id}
                      className="p-5 bg-paper-card border-2 border-ink shadow-sm space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-divider pb-2.5">
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="font-bold text-cobalt uppercase">{dept?.name}</span>
                          <span className="text-divider">•</span>
                          <span className="text-ink-muted">{cat?.name}</span>
                          {anc.hasDocument && (
                            <span className="px-1.5 py-0.2 bg-warm-light border border-divider text-ink font-mono text-[9px]">
                              {anc.documentName}
                            </span>
                          )}
                        </div>

                        <span className="px-2 py-0.5 bg-signal-soft text-signal-orange font-mono text-[10px] font-bold uppercase">
                          Awaiting Sign-off
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-ink">{anc.title}</h3>

                      <p className="text-xs text-ink-light leading-relaxed">{anc.summary}</p>

                      {/* Extracted Fields check */}
                      {anc.extractedFields.length > 0 && (
                        <div className="p-3 bg-warm-light border border-divider text-xs font-mono space-y-1">
                          <span className="font-bold text-[10px] text-ink-muted uppercase block">
                            EXTRACTED FACTS FOR VALIDATION:
                          </span>
                          {anc.extractedFields.map((f) => (
                            <div key={f.id} className="flex justify-between">
                              <span className="text-ink-muted">{f.fieldName}:</span>
                              <span className="font-semibold text-ink">{f.extractedValue}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Approval Actions */}
                      <div className="pt-3 border-t border-divider flex items-center justify-between">
                        <Link
                          to={`/announcement/${anc.id}`}
                          className="text-xs font-display font-semibold text-ink hover:text-cobalt flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Full Document Preview
                        </Link>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => rejectAnnouncement(anc.id)}
                            className="px-4 py-2 border border-divider font-display text-xs text-ink hover:bg-warm-light flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5 text-signal-orange" /> Send Back to Draft
                          </button>

                          <button
                            onClick={() => approveAnnouncement(anc.id)}
                            className="px-5 py-2 bg-olive text-paper font-display text-xs font-semibold hover:bg-olive/90 transition flex items-center gap-1.5 shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish Live
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: DUPLICATE DETECTION */}
        {activeSection === 'duplicates' && (
          <div className="space-y-4">
            <div className="border-b-2 border-ink pb-2">
              <h2 className="font-serif text-2xl font-bold text-ink">
                Intelligent Duplicate Notice Detection
              </h2>
              <p className="text-xs font-mono text-ink-muted mt-0.5">
                NoticeGraph scans newly uploaded circulars for lexical similarity, overlapping deadlines, and matching issuing departments.
              </p>
            </div>

            {activeDuplicates.length === 0 ? (
              <div className="p-12 border-2 border-divider text-center bg-paper-card text-ink-muted font-mono text-xs">
                <CheckCircle2 className="w-8 h-8 mx-auto text-olive mb-2" />
                No unresolved duplicate announcements detected.
              </div>
            ) : (
              <div className="space-y-4">
                {activeDuplicates.map((cluster: DuplicateCluster) => {
                  const items = announcements.filter((a: Announcement) =>
                    cluster.announcementIds.includes(a.id)
                  );

                  return (
                    <div
                      key={cluster.id}
                      className="p-5 bg-paper-card border-2 border-signal-orange shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-divider pb-2.5">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-signal-orange" />
                          <span className="font-mono text-xs font-bold text-signal-orange uppercase">
                            POTENTIAL DUPLICATE DETECTED ({Math.round(cluster.titleMatchScore * 100)}% SIMILARITY)
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-ink-muted">
                          Detected on {new Date(cluster.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="p-3 bg-signal-soft border border-signal-orange text-xs font-mono text-ink">
                        <strong>Reason:</strong> {cluster.reason}
                      </div>

                      {/* Comparison Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item: Announcement, idx: number) => (
                          <div
                            key={item.id}
                            className="p-4 bg-paper border border-divider text-xs space-y-2"
                          >
                            <span className="font-mono text-[10px] text-cobalt font-bold uppercase block">
                              CANDIDATE {idx + 1} ({item.publicationStatus.toUpperCase()})
                            </span>
                            <div className="font-display font-semibold text-sm text-ink">
                              {item.title}
                            </div>
                            <p className="text-ink-muted line-clamp-2">{item.summary}</p>
                            <div className="font-mono text-[10px] text-slate-deep">
                              Issuing: {departments.find((d: Department) => d.id === item.departmentId)?.name}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Admin Decision Actions */}
                      <div className="pt-3 border-t border-divider flex items-center justify-end gap-3 font-display text-xs">
                        <button
                          onClick={() => resolveDuplicate(cluster.id, 'dismiss')}
                          className="px-3 py-1.5 border border-divider hover:bg-warm-light text-ink"
                        >
                          Dismiss (Different Notices)
                        </button>

                        <button
                          onClick={() => resolveDuplicate(cluster.id, 'merge_into_first')}
                          className="px-4 py-1.5 bg-ink text-paper hover:bg-cobalt transition font-semibold"
                        >
                          Archive Duplicate (Retain Primary)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: DEPARTMENT DIRECTORY */}
        {activeSection === 'departments' && (
          <div className="space-y-4">
            <div className="border-b-2 border-ink pb-2">
              <h2 className="font-serif text-2xl font-bold text-ink">
                Campus Faculties & Department Publishing Nodes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept: Department) => {
                const count = announcements.filter((a: Announcement) => a.departmentId === dept.id).length;
                return (
                  <div
                    key={dept.id}
                    className="p-5 bg-paper-card border border-divider hover:border-ink transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-ink text-paper font-mono text-[10px] font-bold">
                        {dept.code}
                      </span>
                      <span className="font-mono text-xs text-cobalt font-semibold">
                        {count} Active Circulars
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-base text-ink">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-ink-muted">{dept.description}</p>

                    <div className="pt-3 border-t border-divider font-mono text-[11px] text-slate-deep space-y-1">
                      <div>Dean / Head: {dept.dean}</div>
                      <div>Building: {dept.building}</div>
                      <div>Contact: {dept.email} • {dept.phone}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
