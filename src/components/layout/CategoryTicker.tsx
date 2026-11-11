import React from 'react';
import { useNoticeStore } from '../../store/useNoticeStore';
import { Tag, Building2, Check } from 'lucide-react';

export const CategoryTicker: React.FC = () => {
  const {
    categories,
    activeCategoryFilter,
    setActiveCategoryFilter,
    departments,
    activeDepartmentFilter,
    setActiveDepartmentFilter,
    announcements
  } = useNoticeStore();

  return (
    <div className="w-full bg-paper border-b border-divider overflow-x-auto py-2 px-4 scrollbar-thin">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 min-w-max">
        {/* Categories Strip */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setActiveCategoryFilter(null)}
            className={`px-2.5 py-1 transition flex items-center gap-1.5 border ${
              activeCategoryFilter === null
                ? 'bg-ink text-paper border-ink font-semibold'
                : 'bg-paper-card text-ink-muted border-divider hover:border-ink hover:text-ink'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] opacity-75 font-mono">
              ({announcements.filter((a) => a.publicationStatus === 'published').length})
            </span>
          </button>

          {categories.map((cat) => {
            const count = announcements.filter(
              (a) => a.categoryId === cat.id && a.publicationStatus === 'published'
            ).length;
            const isSelected = activeCategoryFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(isSelected ? null : cat.id)}
                className={`px-2.5 py-1 transition flex items-center gap-1.5 border whitespace-nowrap ${
                  isSelected
                    ? 'bg-cobalt text-paper border-cobalt font-semibold'
                    : 'bg-paper-card text-ink-muted border-divider hover:border-ink hover:text-ink'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Quick Department Filter Selector */}
        <div className="flex items-center gap-1.5 pl-4 border-l border-divider text-xs font-mono">
          <Building2 className="w-3.5 h-3.5 text-slate-deep" />
          <select
            value={activeDepartmentFilter || ''}
            onChange={(e) => setActiveDepartmentFilter(e.target.value || null)}
            className="bg-paper-card border border-divider px-2 py-1 text-ink focus:outline-none focus:border-cobalt text-xs font-mono"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.code} ({d.name.length > 25 ? d.name.slice(0, 25) + '...' : d.name})
              </option>
            ))}
          </select>
          {activeDepartmentFilter && (
            <button
              onClick={() => setActiveDepartmentFilter(null)}
              className="text-[10px] text-signal-orange underline hover:text-signal-hover ml-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

