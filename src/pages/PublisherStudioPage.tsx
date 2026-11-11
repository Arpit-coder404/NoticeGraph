import React, { useState } from 'react';
import { useNoticeStore } from '../store/useNoticeStore';
import { DocumentImportWizard } from '../components/studio/DocumentImportWizard';
import {
  PenTool,
  Upload,
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Archive,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Send,
  Layers,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicationStatus, Announcement } from '../types';

export const PublisherStudioPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    announcements,
    departments,
    categories,
    currentUser,
    createAnnouncement,
    updateAnnouncement,
    archiveAnnouncement,
    approveAnnouncement
  } = useNoticeStore();

  const [activeTab, setActiveTab] = useState<'all' | 'drafts' | 'review' | 'published' | 'archived'>('all');
  const [showImportWizard, setShowImportWizard] = useState(false);
  const [showNewManualModal, setShowNewManualModal] = useState(false);

  // Manual Form State
  const [manualTitle, setManualTitle] = useState('');
  const [manualSummary, setManualSummary] = useState('');
  const [manualContent, setManualContent] = useState('');
  const [manualDept, setManualDept] = useState(currentUser.departmentId || 'dept-cse');
  const [manualCategory, setManualCategory] = useState('cat-academics');
  const [manualDeadline, setManualDeadline] = useState('');
  const [manualImportance, setManualImportance] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal');

  // Filter announcements for the publisher's scope (or all if admin)
  const publisherNotices = announcements.filter((a: Announcement) => {
    if (currentUser.role === 'admin') return true;
    // For publishers, prioritize their department, but allow managing
    return a.departmentId === currentUser.departmentId || currentUser.role === 'publisher';
  });

  const filteredNotices = publisherNotices.filter((a: Announcement) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'drafts') return a.publicationStatus === 'draft';
    if (activeTab === 'review') return a.publicationStatus === 'pending_review';
    if (activeTab === 'published') return a.publicationStatus === 'published';
    if (activeTab === 'archived') return a.publicationStatus === 'archived';
    return true;
  });

  const handleWizardComplete = (payload: any) => {
    const newId = createAnnouncement(payload);
    setShowImportWizard(false);
    navigate(`/announcement/${newId}`);
  };

  const handleManualSubmit = (status: PublicationStatus) => {
    if (!manualTitle.trim()) {
      alert('Please enter a valid announcement title.');
      return;
    }

    const payload: Omit<Announcement, 'id' | 'publishedAt' | 'updatedAt' | 'viewCount' | 'readCount'> = {
      title: manualTitle,
      slug: manualTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: manualSummary || manualContent.slice(0, 150) + '...',
      content: manualContent,
      categoryId: manualCategory,
      departmentId: manualDept,
      importance: manualImportance,
      publicationStatus: status,
      verificationStatus: 'verified',
      createdBy: currentUser.fullName,
      hasDocument: false,
      extractedFields: [],
      importantDates: manualDeadline
        ? [
            {
              id: `date-${Date.now()}`,
              dateType: 'deadline',
              dateValue: manualDeadline,
              timeValue: '17:00',
              description: 'Official Action Deadline',
              verificationStatus: 'verified'
            }
          ]
        : [],
      eligibilityRequirements: ['All registered students in department'],
      requiredActions: [],
      audience: {
        departments: [manualDept],
        programs: ['ALL'],
        semesters: [],
        audienceType: 'all'
      },
      tags: ['Manual', 'Studio']
    };

    const newId = createAnnouncement(payload);
    setShowNewManualModal(false);
    // Clear form
    setManualTitle('');
    setManualSummary('');
    setManualContent('');
    setManualDeadline('');
    navigate(`/announcement/${newId}`);
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-24">
      {/* Editorial Studio Header */}
      <div className="border-b-2 border-ink bg-paper-card py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-cobalt text-paper font-mono text-[10px] font-bold uppercase tracking-wider">
                PUBLISHING DESK
              </span>
              <span className="font-mono text-xs text-ink-muted">
                {currentUser.fullName} • {departments.find((d) => d.id === currentUser.departmentId)?.name}
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mt-1">
              Campus Publisher Studio
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowImportWizard(true)}
              className="px-4 py-2.5 bg-signal-soft border-2 border-signal-orange text-signal-orange hover:bg-signal-orange hover:text-paper transition font-display text-xs font-semibold flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Import via Document OCR</span>
            </button>

            <button
              onClick={() => setShowNewManualModal(true)}
              className="px-4 py-2.5 bg-ink text-paper hover:bg-cobalt transition font-display text-xs font-semibold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Write Manual Announcement</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        {/* Document Import Wizard Modal if active */}
        {showImportWizard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm overflow-y-auto">
            <div className="my-8 w-full max-w-5xl">
              <DocumentImportWizard
                onComplete={handleWizardComplete}
                onCancel={() => setShowImportWizard(false)}
              />
            </div>
          </div>
        )}

        {/* Manual Blank Composition Modal if active */}
        {showNewManualModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-paper-card border-2 border-ink p-6 max-w-2xl w-full shadow-2xl my-8">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
                <h3 className="font-serif text-xl font-bold text-ink">
                  Compose Official Announcement
                </h3>
                <button
                  onClick={() => setShowNewManualModal(false)}
                  className="text-xs font-mono px-2 py-1 bg-warm-grey hover:bg-ink hover:text-paper"
                >
                  CANCEL
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Schedule of Annual Technical Fest 2026"
                    value={manualTitle}
                    onChange={(e) => setManualTitle(e.target.value)}
                    className="w-full p-2.5 bg-paper border border-divider text-ink font-display text-sm font-semibold focus:outline-none focus:border-cobalt"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                      Department
                    </label>
                    <select
                      value={manualDept}
                      onChange={(e) => setManualDept(e.target.value)}
                      className="w-full p-2 bg-paper border border-divider text-ink font-mono text-xs focus:outline-none"
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.code} - {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                      Category
                    </label>
                    <select
                      value={manualCategory}
                      onChange={(e) => setManualCategory(e.target.value)}
                      className="w-full p-2 bg-paper border border-divider text-ink font-mono text-xs focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                    Short Summary (1-2 sentences)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief highlights for student feed..."
                    value={manualSummary}
                    onChange={(e) => setManualSummary(e.target.value)}
                    className="w-full p-2 bg-paper border border-divider text-ink font-sans text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                    Full Notice Body Text
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Complete detailed instructions and rules..."
                    value={manualContent}
                    onChange={(e) => setManualContent(e.target.value)}
                    className="w-full p-2.5 bg-paper border border-divider text-ink font-sans text-xs focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[10px] text-signal-orange uppercase font-bold block mb-1">
                      Action Deadline (Optional)
                    </label>
                    <input
                      type="date"
                      value={manualDeadline}
                      onChange={(e) => setManualDeadline(e.target.value)}
                      className="w-full p-2 bg-signal-soft border border-signal-orange text-ink font-mono text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                      Importance Level
                    </label>
                    <select
                      value={manualImportance}
                      onChange={(e) => setManualImportance(e.target.value as any)}
                      className="w-full p-2 bg-paper border border-divider text-ink font-mono text-xs focus:outline-none"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t-2 border-ink flex items-center justify-between mt-6">
                <button
                  onClick={() => handleManualSubmit('draft')}
                  className="px-4 py-2 border border-divider font-display text-xs text-ink hover:bg-warm-light"
                >
                  Save as Draft
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleManualSubmit('pending_review')}
                    className="px-4 py-2 bg-cobalt-soft border border-cobalt text-cobalt font-display text-xs font-semibold hover:bg-cobalt hover:text-paper transition"
                  >
                    Submit for Admin Review
                  </button>

                  <button
                    onClick={() => handleManualSubmit('published')}
                    className="px-5 py-2 bg-ink text-paper font-display text-xs font-semibold hover:bg-cobalt transition"
                  >
                    Publish Instantly
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Filters Strip */}
        <div className="flex items-center justify-between border-b-2 border-ink pb-2">
          <div className="flex items-center gap-2 text-xs font-display font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 border transition ${
                activeTab === 'all'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              All Notices ({publisherNotices.length})
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`px-3 py-1.5 border transition ${
                activeTab === 'published'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              Published ({publisherNotices.filter((a: Announcement) => a.publicationStatus === 'published').length})
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-3 py-1.5 border transition ${
                activeTab === 'review'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              Awaiting Review ({publisherNotices.filter((a: Announcement) => a.publicationStatus === 'pending_review').length})
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-3 py-1.5 border transition ${
                activeTab === 'drafts'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              Drafts ({publisherNotices.filter((a: Announcement) => a.publicationStatus === 'draft').length})
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`px-3 py-1.5 border transition ${
                activeTab === 'archived'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              Archived ({publisherNotices.filter((a: Announcement) => a.publicationStatus === 'archived').length})
            </button>
          </div>

          <span className="text-xs font-mono text-ink-muted hidden sm:inline">
            Showing {filteredNotices.length} announcements
          </span>
        </div>

        {/* Notices Table */}
        <div className="bg-paper-card border-2 border-ink overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-ink bg-warm-light font-mono text-[10px] text-ink-muted uppercase">
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Department & Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Readership</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider font-sans">
              {filteredNotices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-ink-muted font-mono">
                    No announcements found in this status.
                  </td>
                </tr>
              ) : (
                filteredNotices.map((anc: Announcement) => {
                  const dept = departments.find((d) => d.id === anc.departmentId);
                  const cat = categories.find((c) => c.id === anc.categoryId);
                  const deadline = anc.importantDates.find((d) => d.dateType === 'deadline');

                  return (
                    <tr key={anc.id} className="hover:bg-warm-light/60 transition group">
                      <td className="py-3.5 px-4 max-w-md">
                        <Link
                          to={`/announcement/${anc.id}`}
                          className="font-display font-semibold text-sm text-ink group-hover:text-cobalt transition line-clamp-1 block"
                        >
                          {anc.title}
                        </Link>
                        <div className="text-[11px] font-mono text-ink-muted flex items-center gap-2 mt-0.5">
                          <span>By {anc.createdBy}</span>
                          <span>•</span>
                          <span>
                            {new Date(anc.publishedAt || anc.updatedAt).toLocaleDateString()}
                          </span>
                          {anc.hasDocument && (
                            <span className="px-1 bg-warm-grey text-ink font-mono text-[9px]">
                              DOC ATTACHED
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs">
                        <div className="font-semibold text-ink">{dept?.code}</div>
                        <div className="text-ink-muted text-[10px]">{cat?.name}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {anc.publicationStatus === 'published' && (
                          <span className="px-2 py-0.5 bg-olive-soft border border-olive text-olive font-semibold uppercase">
                            Published
                          </span>
                        )}
                        {anc.publicationStatus === 'pending_review' && (
                          <span className="px-2 py-0.5 bg-signal-soft border border-signal-orange text-signal-orange font-semibold uppercase">
                            Pending Review
                          </span>
                        )}
                        {anc.publicationStatus === 'draft' && (
                          <span className="px-2 py-0.5 bg-warm-grey border border-divider text-ink font-semibold uppercase">
                            Draft
                          </span>
                        )}
                        {anc.publicationStatus === 'archived' && (
                          <span className="px-2 py-0.5 bg-paper border border-divider text-ink-muted uppercase">
                            Archived
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs">
                        {deadline ? (
                          <span className="text-signal-orange font-semibold">
                            {deadline.dateValue}
                          </span>
                        ) : (
                          <span className="text-ink-muted">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs">
                        <div className="text-ink font-semibold">{anc.viewCount || 0} views</div>
                        <div className="text-ink-muted text-[10px]">{anc.readCount || 0} reads</div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/announcement/${anc.id}`}
                            className="p-1.5 hover:bg-warm-grey text-ink-muted hover:text-ink transition"
                            title="Preview Notice"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {anc.publicationStatus === 'pending_review' && (
                            <button
                              onClick={() => approveAnnouncement(anc.id)}
                              className="px-2 py-1 bg-olive text-paper text-[10px] font-mono font-semibold hover:bg-olive/90 transition"
                              title="Approve for Campus Feed"
                            >
                              Approve
                            </button>
                          )}

                          {anc.publicationStatus !== 'archived' && (
                            <button
                              onClick={() => archiveAnnouncement(anc.id)}
                              className="p-1.5 hover:bg-warm-grey text-ink-muted hover:text-signal-orange transition"
                              title="Archive Notice"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
