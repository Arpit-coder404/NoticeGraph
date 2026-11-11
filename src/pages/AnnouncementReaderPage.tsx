import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNoticeStore } from '../store/useNoticeStore';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Share2,
  Network,
  Download,
  Building2,
  Mail,
  Phone,
  ArrowLeft,
  ShieldCheck,
  Check,
  Layers,
  History,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { Announcement } from '../types';

export const AnnouncementReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    announcements,
    departments,
    categories,
    relationships,
    versions,
    toggleSaveAnnouncement,
    isSaved,
    addReminder,
    recordView
  } = useNoticeStore();

  const [shareCopied, setShareCopied] = useState(false);
  const [reminderAdded, setReminderAdded] = useState(false);
  const [completedActionIds, setCompletedActionIds] = useState<string[]>([]);
  const [showVersionModal, setShowVersionModal] = useState(false);

  const announcement = announcements.find((a: Announcement) => a.id === id);

  useEffect(() => {
    if (id) {
      recordView(id);
    }
  }, [id, recordView]);

  if (!announcement) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-ink">Announcement Not Found</h2>
        <p className="text-sm font-mono text-ink-muted mt-2">
          The requested notice ID does not exist or may have been unlisted.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 bg-ink text-paper font-display text-xs font-semibold hover:bg-cobalt transition"
        >
          Return to Front Page
        </button>
      </div>
    );
  }

  const dept = departments.find((d) => d.id === announcement.departmentId);
  const cat = categories.find((c) => c.id === announcement.categoryId);
  const saved = isSaved(announcement.id);
  const isVerified = announcement.verificationStatus === 'verified';
  const noticeVersions = versions.filter((v) => v.announcementId === announcement.id);

  // Connected relationships
  const connectedRels = relationships.filter(
    (r) => r.sourceId === announcement.id || r.targetId === announcement.id
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handleSetReminder = () => {
    const primaryDate = announcement.importantDates[0];
    if (primaryDate) {
      addReminder({
        userId: 'usr-student-01',
        announcementId: announcement.id,
        title: `${primaryDate.description} (${announcement.title.slice(0, 30)}...)`,
        reminderDate: primaryDate.dateValue,
        reminderTime: primaryDate.timeValue || '17:00',
        status: 'pending'
      });
      setReminderAdded(true);
      setTimeout(() => setReminderAdded(false), 3000);
    }
  };

  const toggleAction = (actionId: string) => {
    setCompletedActionIds((prev) =>
      prev.includes(actionId) ? prev.filter((i) => i !== actionId) : [...prev, actionId]
    );
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-24">
      {/* Editorial Navigation Masthead Strip */}
      <div className="border-b border-divider bg-paper-dark py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-ink hover:text-cobalt transition font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Newsroom
          </button>

          <div className="flex items-center gap-2">
            <span className="text-ink-muted">Published:</span>
            <span className="font-semibold text-ink">
              {new Date(announcement.publishedAt || announcement.updatedAt).toLocaleDateString(
                'en-US',
                {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Reading Canvas (8 of 12 cols) */}
          <article className="lg:col-span-8 space-y-6">
            {/* Header Meta Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 bg-ink text-paper font-semibold uppercase">
                {dept?.name || 'Department'}
              </span>
              <span className="text-divider">•</span>
              <span className="px-2 py-0.5 bg-paper-dark border border-divider text-ink-light">
                {cat?.name || 'Category'}
              </span>

              {announcement.importance === 'urgent' && (
                <span className="px-2 py-0.5 bg-signal-soft border border-signal-orange text-signal-orange font-bold uppercase tracking-wider">
                  URGENT NOTICE
                </span>
              )}

              {isVerified ? (
                <span className="px-2 py-0.5 bg-olive-soft border border-olive text-olive font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Confirmed Institutional Dispatch
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-signal-soft border border-signal-orange text-signal-orange font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Contains Extracted Facts Awaiting Staff Sign-off
                </span>
              )}
            </div>

            {/* Oversized Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.12]">
              {announcement.title}
            </h1>

            {/* Change History Banner if announcement has version history */}
            {noticeVersions.length > 0 && (
              <div className="p-3 bg-warm-light border border-divider flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-cobalt" />
                  <span className="font-semibold text-ink">
                    Notice has been amended (Version {noticeVersions.length + 1}).
                  </span>
                </div>
                <button
                  onClick={() => setShowVersionModal(true)}
                  className="text-cobalt hover:underline font-semibold"
                >
                  View Change History →
                </button>
              </div>
            )}

            {/* Lead Summary Deck */}
            <div className="p-4 bg-paper-card border-l-4 border-cobalt shadow-sm">
              <span className="font-mono text-[10px] uppercase font-bold text-cobalt block mb-1">
                SUMMARY
              </span>
              <p className="text-base sm:text-lg text-ink font-sans leading-relaxed">
                {announcement.summary}
              </p>
            </div>

            {/* Reader Controls Toolbar */}
            <div className="py-3 border-y-2 border-ink flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveAnnouncement(announcement.id)}
                  className={`px-3 py-1.5 border flex items-center gap-1.5 transition ${
                    saved
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-paper text-ink border-divider hover:border-ink'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                  <span>{saved ? 'Saved in Personal Library' : 'Save Notice'}</span>
                </button>

                <button
                  onClick={handleSetReminder}
                  disabled={reminderAdded}
                  className="px-3 py-1.5 bg-paper border border-divider hover:border-signal-orange hover:text-signal-orange transition flex items-center gap-1.5 text-ink"
                >
                  <Clock className="w-3.5 h-3.5 text-signal-orange" />
                  <span>{reminderAdded ? 'Reminder Scheduled!' : 'Add Deadline Reminder'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 bg-paper border border-divider hover:border-cobalt hover:text-cobalt transition flex items-center gap-1.5 text-ink"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shareCopied ? 'Link Copied!' : 'Share Notice'}</span>
                </button>
              </div>

              <Link
                to="/graph"
                className="text-cobalt hover:underline font-semibold flex items-center gap-1"
              >
                <Network className="w-3.5 h-3.5" />
                <span>Inspect in Graph ({connectedRels.length} connections)</span>
              </Link>
            </div>

            {/* Full Body Text */}
            <div className="prose prose-stone max-w-none text-ink text-base sm:text-lg leading-relaxed font-sans whitespace-pre-line py-2">
              {announcement.content}
            </div>

            {/* Original Document Preview Attachment Section */}
            {announcement.hasDocument && (
              <div className="mt-8 p-6 bg-paper-card border-2 border-ink">
                <div className="flex items-center justify-between border-b border-divider pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cobalt" />
                    <h3 className="font-serif text-lg font-bold text-ink">
                      Official Source Document Preview
                    </h3>
                  </div>

                  <a
                    href={announcement.documentUrl || '#'}
                    download={announcement.documentName || 'official_circular.pdf'}
                    onClick={(e) => {
                      if (!announcement.documentUrl) {
                        e.preventDefault();
                        alert('Demo mode: Downloading original signed circular PDF.');
                      }
                    }}
                    className="px-3 py-1.5 bg-ink text-paper font-mono text-xs font-semibold hover:bg-cobalt transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Original ({announcement.documentSize || 'PDF'})</span>
                  </a>
                </div>

                {/* Simulated Authentic Document Preview */}
                <div className="bg-paper-dark border border-divider p-6 font-mono text-xs text-ink space-y-4">
                  <div className="border-b border-divider pb-3 text-center">
                    <div className="font-bold text-sm tracking-wider uppercase text-ink">
                      UNIVERSITY CENTRAL SECRETARIAT
                    </div>
                    <div className="text-[10px] text-ink-muted">
                      OFFICE OF {dept?.name.toUpperCase()}
                    </div>
                    <div className="text-[10px] text-slate-deep mt-1">
                      CIRCULAR REF: UO/{dept?.code || 'UNIV'}/2026/NOTIF-{announcement.id.slice(-4).toUpperCase()}
                    </div>
                  </div>

                  <div className="py-2">
                    <div className="font-bold text-xs uppercase mb-1">
                      SUBJECT: {announcement.title}
                    </div>
                    <p className="text-xs text-ink-light leading-relaxed">
                      {announcement.content.slice(0, 360)}...
                    </p>
                  </div>

                  <div className="border-t border-divider pt-3 flex items-center justify-between text-[10px] text-ink-muted">
                    <div>ISSUED BY: {announcement.createdBy}</div>
                    <div className="text-right">
                      SIGNATURE VERIFIED • SHA256: 8f4e...29c1
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Right Action Panel (4 of 12 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Action Matrix: What Do I Need To Do? */}
            <div className="bg-paper-card border-2 border-ink p-5 shadow-sm">
              <div className="flex items-center gap-2 border-b-2 border-ink pb-2.5 mb-4">
                <CheckCircle2 className="w-4 h-4 text-cobalt" />
                <h3 className="font-serif text-lg font-bold text-ink">
                  Required Action Items
                </h3>
              </div>

              {announcement.requiredActions.length === 0 ? (
                <p className="text-xs font-mono text-ink-muted">
                  No direct student actions required for this notice. Information for reference only.
                </p>
              ) : (
                <div className="space-y-3">
                  {announcement.requiredActions.map((act) => {
                    const isDone = completedActionIds.includes(act.id);
                    return (
                      <div
                        key={act.id}
                        className={`p-3 border text-xs transition ${
                          isDone
                            ? 'bg-olive-soft border-olive'
                            : 'bg-warm-light border-divider hover:border-ink'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleAction(act.id)}
                            className="mt-0.5 accent-cobalt cursor-pointer"
                          />
                          <div className="flex-1">
                            <span
                              className={`font-medium block leading-snug ${
                                isDone ? 'line-through text-ink-muted' : 'text-ink'
                              }`}
                            >
                              {act.title}
                            </span>
                            {act.deadline && (
                              <span className="font-mono text-[10px] text-signal-orange block mt-1">
                                Due: {new Date(act.deadline).toLocaleDateString()}
                              </span>
                            )}
                            {act.url && (
                              <a
                                href={act.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-2 font-mono text-[10px] text-cobalt underline hover:text-cobalt-hover font-semibold"
                              >
                                Access Action Link →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Critical Dates & Timelines */}
            <div className="bg-paper border-2 border-signal-orange p-5">
              <div className="flex items-center gap-2 border-b-2 border-signal-orange pb-2.5 mb-4">
                <Clock className="w-4 h-4 text-signal-orange" />
                <h3 className="font-serif text-lg font-bold text-ink">
                  Important Dates & Timings
                </h3>
              </div>

              {announcement.importantDates.length === 0 ? (
                <p className="text-xs font-mono text-ink-muted">
                  No specific deadlines linked to this circular.
                </p>
              ) : (
                <div className="space-y-3">
                  {announcement.importantDates.map((date) => (
                    <div
                      key={date.id}
                      className="p-3 bg-signal-soft border border-signal-orange/40 text-xs"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-mono font-bold text-signal-orange">
                          {date.dateValue}
                        </span>
                        <span className="font-mono text-[10px] text-ink-muted">
                          {date.timeValue || 'EOD'}
                        </span>
                      </div>
                      <p className="text-ink font-medium leading-snug">
                        {date.description}
                      </p>
                      <div className="mt-1 font-mono text-[9px] text-ink-muted">
                        Status:{' '}
                        {date.verificationStatus === 'verified'
                          ? 'Staff Verified'
                          : 'Extracted (Pending verification)'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Eligibility Requirements */}
            {announcement.eligibilityRequirements.length > 0 && (
              <div className="bg-paper border border-divider p-5">
                <div className="flex items-center gap-2 border-b border-divider pb-2.5 mb-3">
                  <UserCheck className="w-4 h-4 text-olive" />
                  <h3 className="font-serif text-base font-bold text-ink">
                    Eligibility Criteria
                  </h3>
                </div>

                <ul className="space-y-2 text-xs text-ink-light">
                  {announcement.eligibilityRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cobalt font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Target Audience Scope */}
            <div className="bg-paper border border-divider p-5 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-ink-muted block mb-2">
                TARGET AUDIENCE SCOPE
              </span>
              <div className="space-y-1.5 text-ink">
                <div>
                  <span className="text-ink-muted">Type: </span>
                  <span className="font-semibold uppercase">
                    {announcement.audience.audienceType}
                  </span>
                </div>
                <div>
                  <span className="text-ink-muted">Programs: </span>
                  <span>{announcement.audience.programs.join(', ')}</span>
                </div>
                <div>
                  <span className="text-ink-muted">Semesters: </span>
                  <span>
                    {announcement.audience.semesters.length === 0
                      ? 'All Semesters'
                      : announcement.audience.semesters.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Person */}
            {announcement.contactInfo && (
              <div className="bg-paper border border-divider p-5 font-mono text-xs">
                <span className="text-[10px] uppercase font-bold text-ink-muted block mb-2">
                  OFFICIAL CONTACT DESK
                </span>
                <div className="space-y-1 text-ink">
                  <div className="font-bold text-sm">{announcement.contactInfo.name}</div>
                  <div className="text-ink-muted">{announcement.contactInfo.role}</div>
                  {announcement.contactInfo.office && (
                    <div className="text-slate-deep">{announcement.contactInfo.office}</div>
                  )}
                  <div className="pt-2 text-cobalt flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <a href={`mailto:${announcement.contactInfo.email}`} className="hover:underline">
                      {announcement.contactInfo.email}
                    </a>
                  </div>
                  {announcement.contactInfo.phone && (
                    <div className="text-slate-deep flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{announcement.contactInfo.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Change History Modal */}
      {showVersionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-paper border-2 border-ink shadow-2xl p-6">
            <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-cobalt" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  Notice Audit & Version Log
                </h3>
              </div>
              <button
                onClick={() => setShowVersionModal(false)}
                className="text-xs font-mono font-semibold px-2 py-1 bg-warm-grey hover:bg-ink hover:text-paper"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {noticeVersions.map((v) => (
                <div key={v.id} className="p-4 bg-warm-light border border-divider text-xs">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="font-bold text-cobalt uppercase">
                      Revision {v.versionNumber}
                    </span>
                    <span className="text-ink-muted">
                      {new Date(v.createdAt).toLocaleString()} by {v.updatedBy}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="font-mono text-[10px] text-ink-muted uppercase block">
                      SUMMARY OF CHANGES:
                    </span>
                    <p className="font-semibold text-ink">{v.changeSummary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-divider font-mono text-[11px]">
                    <div className="p-2 bg-paper border border-divider">
                      <span className="text-signal-orange block font-bold mb-1">
                        PREVIOUS CONTENT
                      </span>
                      <p className="text-ink-muted">{v.previousContent}</p>
                    </div>
                    <div className="p-2 bg-paper border border-cobalt">
                      <span className="text-cobalt block font-bold mb-1">
                        UPDATED AMENDMENT
                      </span>
                      <p className="text-ink">{v.updatedContent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
