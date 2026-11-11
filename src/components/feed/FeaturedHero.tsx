import React from 'react';
import { Announcement, Department, Category } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Tag
} from 'lucide-react';
import { useNoticeStore } from '../../store/useNoticeStore';

interface FeaturedHeroProps {
  hero: Announcement;
  sidekick1?: Announcement;
  sidekick2?: Announcement;
}

export const FeaturedHero: React.FC<FeaturedHeroProps> = ({ hero, sidekick1, sidekick2 }) => {
  const navigate = useNavigate();
  const { departments, categories, toggleSaveAnnouncement, isSaved } = useNoticeStore();

  const heroDept = departments.find((d) => d.id === hero.departmentId);
  const heroCat = categories.find((c) => c.id === hero.categoryId);
  const heroDeadline = hero.importantDates.find((d) => d.dateType === 'deadline');
  const heroSaved = isSaved(hero.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b-2 border-ink">
      {/* 60% Width Hero (8 of 12 columns on desktop) */}
      <div className="lg:col-span-8 flex flex-col justify-between border-r-0 lg:border-r border-divider lg:pr-6">
        <div>
          {/* Editorial Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-cobalt text-paper font-mono text-[10px] font-bold uppercase tracking-wider">
                FEATURED DISPATCH
              </span>
              <span className="font-mono text-xs font-semibold text-slate-deep uppercase">
                {heroDept?.name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1 text-olive font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified by {hero.createdBy}
              </span>
            </div>
          </div>

          {/* Oversized Editorial Headline */}
          <Link to={`/announcement/${hero.id}`} className="group block">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] text-ink group-hover:text-cobalt transition mb-4">
              {hero.title}
            </h1>
          </Link>

          {/* Lead Summary */}
          <p className="text-base sm:text-lg text-ink-light leading-relaxed mb-6 font-sans">
            {hero.summary}
          </p>

          {/* Document Preview Box (Authentic Document Intelligence Touch) */}
          {hero.hasDocument && (
            <div className="p-4 bg-paper-dark border-2 border-ink mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 bg-ink text-paper flex flex-col items-center justify-center font-mono text-[9px] font-bold shrink-0">
                  <FileText className="w-5 h-5 text-signal-orange mb-0.5" />
                  PDF
                </div>
                <div>
                  <div className="font-mono font-semibold text-xs text-ink truncate max-w-xs sm:max-w-md">
                    {hero.documentName}
                  </div>
                  <div className="text-[11px] font-mono text-ink-muted">
                    Verified Digital Circular • {hero.documentSize || '1.4 MB'} • {hero.extractedFields.length} structured fields extracted
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/announcement/${hero.id}`)}
                className="px-3 py-1.5 bg-paper border border-ink text-xs font-mono font-semibold text-ink hover:bg-ink hover:text-paper transition shrink-0"
              >
                Inspect Original Doc →
              </button>
            </div>
          )}
        </div>

        {/* Action & Meta Strip */}
        <div className="pt-4 border-t border-divider flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {heroDeadline && (
              <span className="px-2 py-1 bg-signal-soft border border-signal-orange text-signal-orange font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Deadline: {heroDeadline.dateValue} {heroDeadline.timeValue && `@ ${heroDeadline.timeValue}`}
              </span>
            )}

            <span className="text-ink-muted">
              Audience: {hero.audience.audienceType === 'all' ? 'All Students' : hero.audience.programs.join(', ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveAnnouncement(hero.id)}
              className={`p-2 border transition ${
                heroSaved
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
              title={heroSaved ? 'Remove from Saved' : 'Save Notice'}
            >
              <Bookmark className={`w-4 h-4 ${heroSaved ? 'fill-current' : ''}`} />
            </button>

            <Link
              to={`/announcement/${hero.id}`}
              className="px-4 py-2 bg-ink text-paper font-display text-xs font-semibold hover:bg-cobalt transition flex items-center gap-1.5"
            >
              Read Full Notice <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 40% Width Side Column: 2 Secondary Editorial Previews */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
        {sidekick1 && (
          <div className="flex-1 flex flex-col justify-between border-b lg:border-b-0 pb-6 lg:pb-0">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-cobalt font-semibold uppercase">
                <span>{departments.find((d) => d.id === sidekick1.departmentId)?.code}</span>
                <span>•</span>
                <span>{categories.find((c) => c.id === sidekick1.categoryId)?.name}</span>
              </div>
              <Link to={`/announcement/${sidekick1.id}`} className="group block">
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug text-ink group-hover:text-cobalt transition mb-2">
                  {sidekick1.title}
                </h3>
              </Link>
              <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 mb-3">
                {sidekick1.summary}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-divider">
              <span className="text-signal-orange font-semibold">
                {sidekick1.importantDates[0]?.dateValue || 'Important Notice'}
              </span>
              <Link
                to={`/announcement/${sidekick1.id}`}
                className="text-cobalt font-semibold hover:underline flex items-center gap-0.5"
              >
                Read →
              </Link>
            </div>
          </div>
        )}

        {/* Separator rule between the two previews */}
        <div className="border-t-2 border-ink hidden lg:block"></div>

        {sidekick2 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-signal-orange font-semibold uppercase">
                <span>{departments.find((d) => d.id === sidekick2.departmentId)?.code}</span>
                <span>•</span>
                <span>{categories.find((c) => c.id === sidekick2.categoryId)?.name}</span>
              </div>
              <Link to={`/announcement/${sidekick2.id}`} className="group block">
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug text-ink group-hover:text-cobalt transition mb-2">
                  {sidekick2.title}
                </h3>
              </Link>
              <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 mb-3">
                {sidekick2.summary}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-divider">
              <span className="text-ink-muted">
                {sidekick2.importantDates[0]?.dateValue || 'Upcoming'}
              </span>
              <Link
                to={`/announcement/${sidekick2.id}`}
                className="text-cobalt font-semibold hover:underline flex items-center gap-0.5"
              >
                Read →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

