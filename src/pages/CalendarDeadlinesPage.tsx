import React, { useState, useMemo } from 'react';
import { useNoticeStore } from '../store/useNoticeStore';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Announcement, AnnouncementDate, PersonalReminder } from '../types';

export const CalendarDeadlinesPage: React.FC = () => {
  const { announcements, reminders, addReminder, toggleReminderStatus, deleteReminder } = useNoticeStore();

  const [viewMode, setViewMode] = useState<'timeline' | 'month' | 'reminders'>('timeline');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);

  // New Reminder Form State
  const [customTitle, setCustomTitle] = useState('');
  const [customDate, setCustomDate] = useState('2026-11-20');
  const [customTime, setCustomTime] = useState('17:00');
  const [linkedAncId, setLinkedAncId] = useState('');

  // Collect all confirmed dates from published announcements
  const allEvents = useMemo(() => {
    const list: {
      id: string;
      announcement: Announcement;
      date: AnnouncementDate;
    }[] = [];

    announcements
      .filter((a: Announcement) => a.publicationStatus === 'published')
      .forEach((a: Announcement) => {
        a.importantDates.forEach((d: AnnouncementDate) => {
          list.push({
            id: `${a.id}-${d.id}`,
            announcement: a,
            date: d
          });
        });
      });

    // Sort by date ascending
    list.sort((a, b) => a.date.dateValue.localeCompare(b.date.dateValue));
    return list;
  }, [announcements]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((item) => {
      if (filterType === 'all') return true;
      if (filterType === 'deadline') return item.date.dateType === 'deadline';
      if (filterType === 'exam') return item.date.dateType === 'exam';
      if (filterType === 'event') return item.date.dateType === 'event';
      return true;
    });
  }, [allEvents, filterType]);

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    addReminder({
      userId: 'usr-student-01',
      announcementId: linkedAncId || announcements[0]?.id || 'anc-001',
      title: customTitle,
      reminderDate: customDate,
      reminderTime: customTime,
      status: 'pending'
    });

    setCustomTitle('');
    setShowAddReminderModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-24">
      {/* Editorial Header */}
      <div className="border-b-2 border-ink bg-paper-card py-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-signal-orange text-paper font-mono text-[10px] font-bold uppercase tracking-wider">
                CHRONOLOGICAL DEADLINES
              </span>
              <span className="font-mono text-xs text-ink-muted">
                Autumn & Winter Term 2026
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mt-1">
              Campus Deadlines & Milestone Calendar
            </h1>
          </div>

          <button
            onClick={() => setShowAddReminderModal(true)}
            className="px-4 py-2.5 bg-ink text-paper font-display text-xs font-semibold hover:bg-cobalt transition flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Personal Reminder</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* View Switcher & Type Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-3">
          <div className="flex items-center gap-1.5 font-display text-xs font-semibold">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 border transition ${
                viewMode === 'timeline'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              Timeline View ({filteredEvents.length})
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 border transition ${
                viewMode === 'month'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              Month Calendar View
            </button>
            <button
              onClick={() => setViewMode('reminders')}
              className={`px-3 py-1.5 border transition flex items-center gap-1.5 ${
                viewMode === 'reminders'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              <span>My Reminders</span>
              <span className="w-4 h-4 rounded-full bg-signal-orange text-paper text-[10px] font-mono flex items-center justify-center">
                {reminders.length}
              </span>
            </button>
          </div>

          {/* Event Type Filter */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-deep" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-paper-card border border-divider px-2 py-1 text-ink focus:outline-none"
            >
              <option value="all">All Dates & Events</option>
              <option value="deadline">Registration Deadlines</option>
              <option value="exam">Examination Assessments</option>
              <option value="event">Campus Activities</option>
            </select>
          </div>
        </div>

        {/* MODAL: ADD CUSTOM REMINDER */}
        {showAddReminderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
            <div className="bg-paper-card border-2 border-ink p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
                <h3 className="font-serif text-xl font-bold text-ink">
                  Set Personal Reminder
                </h3>
                <button
                  onClick={() => setShowAddReminderModal(false)}
                  className="text-xs font-mono px-2 py-1 bg-warm-grey hover:bg-ink hover:text-paper"
                >
                  CANCEL
                </button>
              </div>

              <form onSubmit={handleCreateReminder} className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                    Reminder Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Submit Google placement resume before 5 PM"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full p-2 bg-paper border border-divider text-xs font-display text-ink focus:outline-none focus:border-cobalt"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full p-2 bg-paper border border-divider text-xs font-mono text-ink"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="w-full p-2 bg-paper border border-divider text-xs font-mono text-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-ink-muted uppercase block mb-1">
                    Associated Announcement
                  </label>
                  <select
                    value={linkedAncId}
                    onChange={(e) => setLinkedAncId(e.target.value)}
                    className="w-full p-2 bg-paper border border-divider text-xs font-mono text-ink"
                  >
                    <option value="">Select an Announcement...</option>
                    {announcements.map((a: Announcement) => (
                      <option key={a.id} value={a.id}>
                        {a.title.slice(0, 45)}...
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 border-t border-divider flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-ink text-paper font-display text-xs font-semibold hover:bg-cobalt transition"
                  >
                    Save Reminder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 1: TIMELINE VIEW */}
        {viewMode === 'timeline' && (
          <div className="space-y-4">
            {filteredEvents.map(({ id, announcement, date }) => {
              const isDeadline = date.dateType === 'deadline';
              const isExam = date.dateType === 'exam';

              return (
                <div
                  key={id}
                  className={`p-5 border-2 transition ${
                    isDeadline
                      ? 'bg-signal-soft/30 border-signal-orange'
                      : isExam
                      ? 'bg-cobalt-soft/30 border-cobalt'
                      : 'bg-paper-card border-divider hover:border-ink'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span
                          className={`px-2 py-0.5 font-bold uppercase text-[10px] ${
                            isDeadline
                              ? 'bg-signal-orange text-paper'
                              : isExam
                              ? 'bg-cobalt text-paper'
                              : 'bg-warm-grey text-ink'
                          }`}
                        >
                          {date.dateType.toUpperCase()}
                        </span>
                        <span className="font-bold text-ink text-sm">{date.dateValue}</span>
                        {date.timeValue && (
                          <span className="text-ink-muted">@ {date.timeValue}</span>
                        )}
                        <span className="text-divider">•</span>
                        <span className="text-olive font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Staff Confirmed
                        </span>
                      </div>

                      <div className="font-semibold text-sm text-ink pt-1">
                        {date.description}
                      </div>

                      <Link
                        to={`/announcement/${announcement.id}`}
                        className="text-xs text-ink-muted hover:text-cobalt transition block line-clamp-1"
                      >
                        Circular: {announcement.title}
                      </Link>
                    </div>

                    <Link
                      to={`/announcement/${announcement.id}`}
                      className="px-3 py-1.5 bg-paper border border-ink text-xs font-mono font-semibold text-ink hover:bg-ink hover:text-paper transition self-start sm:self-auto shrink-0 flex items-center gap-1"
                    >
                      Read Notice <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: MONTH CALENDAR GRID */}
        {viewMode === 'month' && (
          <div className="bg-paper-card border-2 border-ink p-6 shadow-sm">
            <div className="flex items-center justify-between border-b-2 border-ink pb-4 mb-4">
              <h3 className="font-serif text-2xl font-bold text-ink">
                November 2026
              </h3>
              <div className="text-xs font-mono text-ink-muted">
                Showing Verified Institutional Deadlines
              </div>
            </div>

            {/* 7-day grid header */}
            <div className="grid grid-cols-7 border-b border-divider text-center font-mono text-xs font-bold uppercase py-2 bg-warm-light">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Simulated 30-day November calendar cells */}
            <div className="grid grid-cols-7 border-l border-t border-divider">
              {Array.from({ length: 30 }).map((_, idx) => {
                const dayNum = idx + 1;
                const dateKey = `2026-11-${String(dayNum).padStart(2, '0')}`;
                const dayEvents = allEvents.filter((e) => e.date.dateValue === dateKey);

                return (
                  <div
                    key={dayNum}
                    className={`min-h-[100px] p-2 border-r border-b border-divider flex flex-col justify-between ${
                      dayEvents.length > 0 ? 'bg-signal-soft/20' : 'bg-paper'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-ink">
                      <span>{dayNum}</span>
                      {dayEvents.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-signal-orange"></span>
                      )}
                    </div>

                    <div className="space-y-1 mt-1">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <Link
                          key={ev.id}
                          to={`/announcement/${ev.announcement.id}`}
                          className="block text-[10px] p-1 bg-paper border border-signal-orange text-signal-orange font-mono truncate hover:bg-signal-orange hover:text-paper transition"
                          title={ev.date.description}
                        >
                          {ev.date.description.slice(0, 15)}...
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: MY PERSONAL REMINDERS */}
        {viewMode === 'reminders' && (
          <div className="space-y-4">
            <div className="border-b-2 border-ink pb-2">
              <h2 className="font-serif text-2xl font-bold text-ink">
                My Deadline Reminders ({reminders.length})
              </h2>
              <p className="text-xs font-mono text-ink-muted">
                Personal action checkpoints set from verified announcement deadlines.
              </p>
            </div>

            {reminders.length === 0 ? (
              <div className="p-12 border-2 border-divider text-center bg-paper-card text-ink-muted font-mono text-xs">
                <Clock className="w-8 h-8 mx-auto text-divider mb-2" />
                No personal reminders added yet. Click "+ Create Personal Reminder" above or add them from notices.
              </div>
            ) : (
              <div className="space-y-3">
                {reminders.map((rem: PersonalReminder) => {
                  const isDone = rem.status === 'completed';
                  return (
                    <div
                      key={rem.id}
                      className={`p-4 border-2 transition flex items-center justify-between gap-4 ${
                        isDone
                          ? 'bg-olive-soft/40 border-olive'
                          : 'bg-paper-card border-ink'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleReminderStatus(rem.id)}
                          className="w-4 h-4 accent-cobalt cursor-pointer"
                        />
                        <div>
                          <div
                            className={`font-display text-sm font-semibold ${
                              isDone ? 'line-through text-ink-muted' : 'text-ink'
                            }`}
                          >
                            {rem.title}
                          </div>
                          <div className="text-[11px] font-mono text-signal-orange font-bold mt-0.5">
                            Target Date: {rem.reminderDate} {rem.reminderTime && `@ ${rem.reminderTime}`}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteReminder(rem.id)}
                        className="p-1.5 hover:bg-warm-grey text-ink-muted hover:text-signal-orange transition"
                        title="Delete Reminder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
