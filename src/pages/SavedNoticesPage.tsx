import React from 'react';
import { useNoticeStore } from '../store/useNoticeStore';
import { AnnouncementCardEditorial } from '../components/feed/AnnouncementCardEditorial';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Announcement } from '../types';

export const SavedNoticesPage: React.FC = () => {
  const { savedIds, announcements } = useNoticeStore();

  const savedNotices = announcements.filter((a: Announcement) => savedIds.includes(a.id));

  return (
    <div className="w-full min-h-screen bg-paper pb-24">
      {/* Editorial Header */}
      <div className="border-b-2 border-ink bg-paper-card py-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-ink text-paper font-mono text-[10px] font-bold uppercase tracking-wider">
                PERSONAL ARCHIVE
              </span>
              <span className="font-mono text-xs text-ink-muted">
                {savedNotices.length} Saved Circulars
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mt-1">
              My Saved Notices & Pinned Circulars
            </h1>
          </div>

          <Link
            to="/calendar"
            className="px-4 py-2 border border-divider hover:border-ink font-display text-xs font-semibold text-ink hover:bg-warm-light transition"
          >
            Check Associated Deadlines →
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        {savedNotices.length === 0 ? (
          <div className="p-16 border-2 border-divider text-center bg-paper-card text-ink-muted font-mono text-xs">
            <Bookmark className="w-8 h-8 mx-auto text-divider mb-2" />
            <p className="font-serif text-lg text-ink">You haven't saved any notices yet.</p>
            <p className="mt-1">
              Click the bookmark icon on any announcement in the feed to save it for quick reference.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block px-4 py-2 bg-ink text-paper font-display text-xs font-semibold hover:bg-cobalt transition"
            >
              Browse Campus Feed
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedNotices.map((anc: Announcement) => (
              <AnnouncementCardEditorial
                key={anc.id}
                announcement={anc}
                variant="standard"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
