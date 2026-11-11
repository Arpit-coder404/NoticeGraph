import React from 'react';
import { AlertCircle, Flame, ArrowRight, Clock } from 'lucide-react';
import { useNoticeStore } from '../../store/useNoticeStore';
import { Link } from 'react-router-dom';

export const BreakingStrip: React.FC = () => {
  const { announcements } = useNoticeStore();

  const urgentNotices = announcements.filter(
    (a) =>
      a.publicationStatus === 'published' &&
      (a.importance === 'urgent' || a.importantDates.some((d) => d.dateType === 'deadline'))
  );

  if (urgentNotices.length === 0) return null;

  const topUrgent = urgentNotices[0];
  const primaryDeadline = topUrgent.importantDates.find((d) => d.dateType === 'deadline');

  return (
    <div className="w-full bg-signal-soft border-b-2 border-signal-orange px-4 py-2 text-ink">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-signal-orange text-paper font-mono text-[10px] font-bold uppercase tracking-wider animate-pulse">
            <Flame className="w-3 h-3" />
            <span>URGENT DISPATCH</span>
          </div>
          <span className="font-display font-semibold text-ink line-clamp-1">
            {topUrgent.title}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          {primaryDeadline && (
            <span className="flex items-center gap-1 text-signal-orange font-bold">
              <Clock className="w-3.5 h-3.5" />
              Due: {primaryDeadline.dateValue} {primaryDeadline.timeValue && `@ ${primaryDeadline.timeValue}`}
            </span>
          )}
          <Link
            to={`/announcement/${topUrgent.id}`}
            className="flex items-center gap-1 font-display font-bold text-ink hover:text-signal-orange transition underline decoration-signal-orange underline-offset-4"
          >
            Review Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

