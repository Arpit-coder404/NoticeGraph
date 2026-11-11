import React from 'react';
import { Announcement } from '../../types';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useNoticeStore } from '../../store/useNoticeStore';

interface CardProps {
  announcement: Announcement;
  variant?: 'standard' | 'compact' | 'wide' | 'spotlight';
}

export const AnnouncementCardEditorial: React.FC<CardProps> = ({
  announcement,
  variant = 'standard'
}) => {
  const { departments, categories, toggleSaveAnnouncement, isSaved } = useNoticeStore();
  const dept = departments.find((d) => d.id === announcement.departmentId);
  const cat = categories.find((c) => c.id === announcement.categoryId);
  const primaryDeadline = announcement.importantDates.find((d) => d.dateType === 'deadline');
  const saved = isSaved(announcement.id);
  const isUrgent = announcement.importance === 'urgent';
  const isVerified = announcement.verificationStatus === 'verified';

  if (variant === 'compact') {
    return (
      <div className="py-3 border-b border-divider flex items-baseline justify-between gap-4 group">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 text-[10px] font-mono">
            <span className="font-semibold text-cobalt uppercase">{dept?.code}</span>
            <span className="text-divider">•</span>
            <span className="text-ink-muted">{cat?.name}</span>
            {isUrgent && (
              <span className="px-1 bg-signal-soft text-signal-orange font-bold">URGENT</span>
            )}
          </div>
          <Link
            to={`/announcement/${announcement.id}`}
            className="font-display font-medium text-sm text-ink group-hover:text-cobalt transition line-clamp-1 block"
          >
            {announcement.title}
          </Link>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
          {primaryDeadline && (
            <span className="text-signal-orange font-semibold hidden sm:inline">
              {primaryDeadline.dateValue}
            </span>
          )}
          <button
            onClick={() => toggleSaveAnnouncement(announcement.id)}
            className="p-1 hover:text-cobalt text-ink-muted transition"
            title={saved ? 'Saved' : 'Save'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current text-ink' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-paper border border-divider hover:border-ink transition-all duration-150 p-5 flex flex-col justify-between group h-full">
      <div>
        {/* Card Header Meta */}
        <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-cobalt uppercase tracking-wider">{dept?.code}</span>
            <span className="text-divider">•</span>
            <span className="text-slate-deep">{cat?.name}</span>
          </div>

          <div className="flex items-center gap-1">
            {isUrgent && (
              <span className="px-1.5 py-0.2 bg-signal-soft text-signal-orange font-bold uppercase tracking-wider">
                URGENT
              </span>
            )}
            {isVerified ? (
              <span title="Verified notice">
                <CheckCircle2 className="w-3.5 h-3.5 text-olive" />
              </span>
            ) : (
              <span title="Needs verification">
                <AlertCircle className="w-3.5 h-3.5 text-signal-orange" />
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <Link to={`/announcement/${announcement.id}`} className="block mb-2">
          <h3 className="font-serif text-lg font-bold leading-snug text-ink group-hover:text-cobalt transition line-clamp-2">
            {announcement.title}
          </h3>
        </Link>

        {/* Summary Snippet */}
        <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 mb-4">
          {announcement.summary}
        </p>
      </div>

      <div>
        {/* Document or Deadline Highlight */}
        {primaryDeadline && (
          <div className="p-2 bg-signal-soft border border-signal-orange/30 text-xs font-mono flex items-center justify-between mb-3 text-signal-orange">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3 h-3" /> Due {primaryDeadline.dateValue}
            </span>
            <span className="text-[10px] text-ink-muted truncate max-w-[120px]">
              {primaryDeadline.description}
            </span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-divider flex items-center justify-between text-xs font-mono">
          <span className="text-ink-muted text-[11px]">
            {new Date(announcement.publishedAt || announcement.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveAnnouncement(announcement.id)}
              className="p-1 hover:text-cobalt text-ink-muted transition"
              title={saved ? 'Remove bookmark' : 'Save announcement'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current text-ink' : ''}`} />
            </button>
            <Link
              to={`/announcement/${announcement.id}`}
              className="font-display font-semibold text-xs text-ink group-hover:text-cobalt transition flex items-center gap-1"
            >
              Read <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
