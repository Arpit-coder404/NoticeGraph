import React from 'react';
import { Announcement, AnnouncementDate } from '../../types';
import { Link } from 'react-router-dom';
import { Clock, Plus, Check, Calendar, ArrowRight, Bell } from 'lucide-react';
import { useNoticeStore } from '../../store/useNoticeStore';

export const DeadlinesSidebar: React.FC = () => {
  const { announcements, reminders, addReminder, toggleReminderStatus } = useNoticeStore();

  // Collect all verified deadlines across published announcements
  const upcomingDeadlines: { announcement: Announcement; date: AnnouncementDate }[] = [];

  announcements
    .filter((a) => a.publicationStatus === 'published')
    .forEach((a) => {
      a.importantDates
        .filter((d) => d.dateType === 'deadline' || d.dateType === 'submission')
        .forEach((d) => {
          upcomingDeadlines.push({ announcement: a, date: d });
        });
    });

  // Sort by date ascending
  upcomingDeadlines.sort((a, b) => a.date.dateValue.localeCompare(b.date.dateValue));

  const handleQuickAddReminder = (anc: Announcement, d: AnnouncementDate) => {
    addReminder({
      userId: 'usr-student-01',
      announcementId: anc.id,
      title: `${d.description} (${anc.title.slice(0, 30)}...)`,
      reminderDate: d.dateValue,
      reminderTime: d.timeValue || '17:00',
      status: 'pending'
    });
  };

  return (
    <div className="bg-paper border-2 border-ink p-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-signal-orange" />
          <h3 className="font-serif text-lg font-bold text-ink">
            Critical Deadlines
          </h3>
        </div>
        <Link
          to="/calendar"
          className="font-mono text-[11px] text-cobalt hover:underline flex items-center gap-0.5"
        >
          View Calendar →
        </Link>
      </div>

      {/* Deadlines List */}
      <div className="space-y-3.5 divide-y divide-divider">
        {upcomingDeadlines.slice(0, 6).map(({ announcement, date }, idx) => {
          const isReminded = reminders.some(
            (r) => r.announcementId === announcement.id && r.reminderDate === date.dateValue
          );

          return (
            <div key={`${announcement.id}-${date.id}`} className={idx > 0 ? 'pt-3.5' : ''}>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-signal-orange">
                  {date.dateValue}
                </span>
                <span className="text-[10px] font-mono text-ink-muted">
                  {date.timeValue ? `@ ${date.timeValue}` : 'EOD'}
                </span>
              </div>

              <Link
                to={`/announcement/${announcement.id}`}
                className="font-display font-medium text-xs text-ink hover:text-cobalt transition line-clamp-2 block leading-snug mb-1.5"
              >
                {announcement.title}
              </Link>

              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-deep truncate max-w-[180px]">
                  {date.description}
                </span>

                <button
                  onClick={() => handleQuickAddReminder(announcement, date)}
                  disabled={isReminded}
                  className={`px-1.5 py-0.5 text-[10px] font-mono flex items-center gap-1 border transition ${
                    isReminded
                      ? 'bg-olive-soft text-olive border-olive'
                      : 'bg-paper text-ink border-divider hover:border-signal-orange hover:text-signal-orange'
                  }`}
                  title={isReminded ? 'Reminder already active' : 'Add to personal reminders'}
                >
                  {isReminded ? (
                    <>
                      <Check className="w-2.5 h-2.5" /> Set
                    </>
                  ) : (
                    <>
                      <Plus className="w-2.5 h-2.5" /> Remind
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-3 border-t border-divider text-[11px] font-mono text-ink-muted flex items-center justify-between">
        <span>Verified Institutional Dates</span>
        <span className="text-signal-orange font-semibold">{upcomingDeadlines.length} Active</span>
      </div>
    </div>
  );
};

