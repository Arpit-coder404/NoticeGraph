import React from 'react';
import { useNoticeStore } from '../store/useNoticeStore';
import { BreakingStrip } from '../components/feed/BreakingStrip';
import { FeaturedHero } from '../components/feed/FeaturedHero';
import { DeadlinesSidebar } from '../components/feed/DeadlinesSidebar';
import { AnnouncementCardEditorial } from '../components/feed/AnnouncementCardEditorial';
import { CategoryTicker } from '../components/layout/CategoryTicker';
import {
  Sparkles,
  Compass,
  Users,
  Bookmark,
  Building2,
  Calendar,
  Network,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Announcement } from '../types';

export const HomePage: React.FC = () => {
  const {
    announcements,
    departments,
    categories,
    feedMode,
    setFeedMode,
    currentUser,
    activeCategoryFilter,
    activeDepartmentFilter,
    savedIds,
    toggleFollowDepartment
  } = useNoticeStore();

  // Filter announcements based on publication status
  const publishedAnnouncements = announcements.filter(
    (a: Announcement) => a.publicationStatus === 'published'
  );

  // Apply feed mode filtering:
  // 1. For You: matches user's department, program, semester, or followed depts/categories
  // 2. Everyone: all published
  // 3. Following: only followed departments and followed categories
  const filteredFeed = publishedAnnouncements.filter((anc: Announcement) => {
    // Check manual category / department ticker filters first
    if (activeCategoryFilter && anc.categoryId !== activeCategoryFilter) return false;
    if (activeDepartmentFilter && anc.departmentId !== activeDepartmentFilter) return false;

    if (feedMode === 'everyone') {
      return true;
    }

    if (feedMode === 'following') {
      const matchesFollowedDept = currentUser.followedDepartments.includes(anc.departmentId);
      const matchesFollowedCat = currentUser.followedCategories.includes(anc.categoryId);
      return matchesFollowedDept || matchesFollowedCat;
    }

    if (feedMode === 'for_you') {
      // Relevance logic
      const isUniversal = anc.audience.audienceType === 'all';
      const matchesDept =
        anc.departmentId === currentUser.departmentId ||
        anc.audience.departments.includes(currentUser.departmentId) ||
        anc.audience.departments.includes('ALL');
      const matchesProgram =
        anc.audience.programs.includes(currentUser.program) ||
        anc.audience.programs.includes('ALL');
      const matchesSemester =
        anc.audience.semesters.length === 0 ||
        anc.audience.semesters.includes(currentUser.semester);
      const isFollowed =
        currentUser.followedDepartments.includes(anc.departmentId) ||
        currentUser.followedCategories.includes(anc.categoryId);

      return isUniversal || (matchesDept && matchesSemester) || matchesProgram || isFollowed;
    }

    return true;
  });

  // Pick hero and sidekicks
  const heroNotice = filteredFeed[0] || publishedAnnouncements[0];
  const sidekick1 = filteredFeed[1] || publishedAnnouncements[1];
  const sidekick2 = filteredFeed[2] || publishedAnnouncements[2];
  const remainingNotices = filteredFeed.slice(3);

  // Filter specific opportunities / competitions
  const opportunityNotices = publishedAnnouncements.filter(
    (a: Announcement) => a.categoryId === 'cat-competitions' || a.categoryId === 'cat-scholarships'
  );

  return (
    <div className="w-full min-h-screen bg-paper pb-20">
      {/* Category Ribbon */}
      <CategoryTicker />

      {/* Breaking Announcement Strip */}
      <BreakingStrip />

      {/* Main Editorial Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Feed Mode Switcher & Student Persona Context */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-3 mb-6">
          {/* Feed Filter Mode Tabs */}
          <div className="flex items-center gap-1 font-display text-xs font-semibold">
            <button
              onClick={() => setFeedMode('for_you')}
              className={`px-3 py-1.5 transition flex items-center gap-1.5 border ${
                feedMode === 'for_you'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-signal-orange" />
              <span>For You</span>
              <span className="text-[10px] font-mono text-ink-muted ml-0.5">
                ({currentUser.program.split(' ')[0]})
              </span>
            </button>

            <button
              onClick={() => setFeedMode('everyone')}
              className={`px-3 py-1.5 transition flex items-center gap-1.5 border ${
                feedMode === 'everyone'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cobalt" />
              <span>Everyone</span>
              <span className="text-[10px] font-mono opacity-75">
                ({publishedAnnouncements.length})
              </span>
            </button>

            <button
              onClick={() => setFeedMode('following')}
              className={`px-3 py-1.5 transition flex items-center gap-1.5 border ${
                feedMode === 'following'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-divider hover:border-ink'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-olive" />
              <span>Following</span>
              <span className="text-[10px] font-mono opacity-75">
                ({currentUser.followedDepartments.length} depts)
              </span>
            </button>
          </div>

          {/* Editorial Perspective Label */}
          <div className="text-xs font-mono text-ink-muted flex items-center gap-2">
            <span>Viewing as:</span>
            <span className="font-semibold text-ink">{currentUser.fullName}</span>
            <span className="text-divider">•</span>
            <span>{currentUser.program} (Sem {currentUser.semester})</span>
          </div>
        </div>

        {/* Hero Section: 60% Featured Notice + 2 Secondary Editorial Previews */}
        {heroNotice && (
          <FeaturedHero
            hero={heroNotice}
            sidekick1={sidekick1}
            sidekick2={sidekick2}
          />
        )}

        {/* Section: Latest Announcements & Deadlines Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Main Feed Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b-2 border-ink pb-2">
              <h2 className="font-serif text-2xl font-bold text-ink">
                Latest Campus Dispatches
              </h2>
              <span className="font-mono text-xs text-ink-muted">
                Showing {remainingNotices.length} stories
              </span>
            </div>

            {remainingNotices.length === 0 ? (
              <div className="p-8 border-2 border-divider text-center text-ink-muted bg-paper-card">
                <p className="font-serif text-lg text-ink">No other notices matching your current filter.</p>
                <p className="text-xs font-mono mt-1">Switch to "Everyone" or reset category filters above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {remainingNotices.map((anc: Announcement) => (
                  <AnnouncementCardEditorial
                    key={anc.id}
                    announcement={anc}
                    variant="standard"
                  />
                ))}
              </div>
            )}

            {/* Quick Relationship Engine Banner */}
            <div className="p-6 bg-ink text-paper border-2 border-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-signal-orange font-mono text-[10px] uppercase font-bold tracking-wider mb-1">
                  <Network className="w-3.5 h-3.5" />
                  <span>THE NOTICEGRAPH ENGINE</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-paper">
                  Explore how campus announcements connect.
                </h3>
                <p className="text-xs text-warm-grey mt-1 max-w-lg">
                  Every notice links to issuing departments, eligible courses, registration deadlines, and subsequent career events.
                </p>
              </div>

              <Link
                to="/graph"
                className="px-4 py-2.5 bg-cobalt text-paper font-display text-xs font-semibold hover:bg-cobalt-hover transition shrink-0 flex items-center gap-1.5"
              >
                Launch Graph Canvas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Side Column (4 cols): Critical Deadlines & Followed Depts */}
          <div className="lg:col-span-4 space-y-6">
            {/* Deadlines Widget */}
            <DeadlinesSidebar />

            {/* Follow Departments Quick Widget */}
            <div className="bg-paper border border-divider p-5">
              <div className="flex items-center justify-between border-b border-divider pb-2.5 mb-3">
                <h3 className="font-serif text-base font-bold text-ink flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-cobalt" /> Follow Departments
                </h3>
                <span className="text-[10px] font-mono text-ink-muted">
                  Personalize Feed
                </span>
              </div>

              <div className="space-y-2">
                {departments.map((dept) => {
                  const isFollowed = currentUser.followedDepartments.includes(dept.id);
                  return (
                    <div
                      key={dept.id}
                      className="flex items-center justify-between py-1.5 text-xs font-mono"
                    >
                      <span className="font-medium text-ink truncate max-w-[190px]">
                        {dept.name}
                      </span>
                      <button
                        onClick={() => toggleFollowDepartment(dept.id)}
                        className={`px-2 py-0.5 text-[10px] border transition ${
                          isFollowed
                            ? 'bg-ink text-paper border-ink'
                            : 'bg-paper text-ink border-divider hover:border-ink'
                        }`}
                      >
                        {isFollowed ? 'Following' : '+ Follow'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Opportunities & Competitions Strip */}
        <section className="pt-12 mt-12 border-t-2 border-ink">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono text-[10px] text-signal-orange font-bold uppercase tracking-wider block">
                CAMPUS OPPORTUNITIES & FELLOWSHIPS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                Grants, Competitions & Hackathons
              </h2>
            </div>

            <Link
              to="/calendar"
              className="text-xs font-mono text-cobalt hover:underline flex items-center gap-1"
            >
              View Application Timelines →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunityNotices.slice(0, 3).map((opp: Announcement) => (
              <AnnouncementCardEditorial
                key={opp.id}
                announcement={opp}
                variant="standard"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
