import React, { useState } from 'react';
import { useNoticeStore } from '../store/useNoticeStore';
import {
  Bell,
  CheckCircle2,
  Trash2,
  Clock,
  AlertTriangle,
  FileText,
  Building2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserNotification, Announcement } from '../types';

export const PersonalInboxPage: React.FC = () => {
  const {
    notifications,
    announcements,
    markNotificationAsRead,
    clearAllNotifications
  } = useNoticeStore();

  const [filterType, setFilterType] = useState<string>('all');

  const unreadCount = notifications.filter((n: UserNotification) => !n.readAt).length;

  const filtered = notifications.filter((n: UserNotification) => {
    if (filterType === 'unread') return !n.readAt;
    if (filterType === 'urgent') return n.importance === 'urgent' || n.importance === 'high';
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-paper pb-24">
      {/* Header */}
      <div className="border-b-2 border-ink bg-paper-card py-6 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-ink text-paper font-mono text-[10px] font-bold uppercase tracking-wider">
                PERSONAL DISPATCH INBOX
              </span>
              <span className="font-mono text-xs text-ink-muted">
                {unreadCount} unread notifications
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mt-1">
              Campus Intelligence Alerts
            </h1>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="px-3 py-1.5 border border-divider hover:border-ink text-ink font-display text-xs font-semibold hover:bg-warm-light transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-olive" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-6 space-y-4">
        {/* Filter Strip */}
        <div className="flex items-center gap-2 border-b-2 border-ink pb-2 text-xs font-display font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 border transition ${
              filterType === 'all'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-divider hover:border-ink'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilterType('unread')}
            className={`px-3 py-1.5 border transition ${
              filterType === 'unread'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-divider hover:border-ink'
            }`}
          >
            Unread Only ({unreadCount})
          </button>
          <button
            onClick={() => setFilterType('urgent')}
            className={`px-3 py-1.5 border transition ${
              filterType === 'urgent'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-divider hover:border-ink'
            }`}
          >
            High Importance & Deadlines
          </button>
        </div>

        {/* Notifications List */}
        {filtered.length === 0 ? (
          <div className="p-16 border-2 border-divider text-center bg-paper-card text-ink-muted font-mono text-xs">
            <Bell className="w-8 h-8 mx-auto text-divider mb-2" />
            Your campus dispatch inbox is up to date.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item: UserNotification) => {
              const isUnread = !item.readAt;
              const linkedAnc = item.announcementId
                ? announcements.find((a: Announcement) => a.id === item.announcementId)
                : null;

              return (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-4 border-2 transition flex items-start justify-between gap-4 cursor-pointer ${
                    isUnread
                      ? 'bg-paper-card border-ink shadow-sm'
                      : 'bg-warm-light/40 border-divider text-ink-muted'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      {item.importance === 'urgent' ? (
                        <span className="px-1.5 py-0.2 bg-signal-soft text-signal-orange font-bold uppercase">
                          URGENT ALERT
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 bg-cobalt-soft text-cobalt font-semibold uppercase">
                          NOTICE UPDATE
                        </span>
                      )}
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()} at{' '}
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-signal-orange"></span>
                      )}
                    </div>

                    <h4 className="font-display font-semibold text-sm text-ink leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-ink-light leading-relaxed">
                      {item.message}
                    </p>

                    {linkedAnc && (
                      <Link
                        to={`/announcement/${linkedAnc.id}`}
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-cobalt hover:underline pt-1 font-semibold"
                      >
                        Read Associated Circular →
                      </Link>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-ink-muted">
                      {isUnread ? 'Click to mark read' : 'Read'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
