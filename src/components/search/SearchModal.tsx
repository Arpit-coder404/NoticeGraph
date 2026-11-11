import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Tag, Building2, Calendar, FileText } from 'lucide-react';
import { useNoticeStore } from '../../store/useNoticeStore';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXAMPLE_QUERIES = [
  'Scholarships closing this month',
  'Placement announcements for CSE',
  'Events happening next week',
  'Examination notifications',
  'Announcements from my department'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { announcements, departments, categories } = useNoticeStore();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [urgentOnly, setUrgentOnly] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = announcements.filter((anc) => {
    const q = query.toLowerCase();
    const matchesText =
      q === '' ||
      anc.title.toLowerCase().includes(q) ||
      anc.summary.toLowerCase().includes(q) ||
      anc.tags.some((t) => t.toLowerCase().includes(q)) ||
      anc.content.toLowerCase().includes(q);

    const matchesCat = selectedCategory === 'all' || anc.categoryId === selectedCategory;
    const matchesDept = selectedDepartment === 'all' || anc.departmentId === selectedDepartment;
    const matchesUrgent = !urgentOnly || anc.importance === 'urgent' || anc.importance === 'high';

    return matchesText && matchesCat && matchesDept && matchesUrgent;
  });

  const handleSelectAnnouncement = (id: string) => {
    onClose();
    navigate(`/announcement/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-ink/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-paper border-2 border-ink shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header / Input */}
        <div className="p-4 border-b-2 border-ink flex items-center gap-3 bg-paper-card">
          <Search className="w-5 h-5 text-cobalt shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type search query (or try: CSE placements, MCM scholarship, exams)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-ink placeholder-ink-muted text-base focus:outline-none font-display font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-warm-grey text-ink-muted hover:text-ink transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Example Quick Filter Chips */}
        <div className="px-4 py-2.5 bg-warm-light border-b border-divider flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] text-ink-muted uppercase">Try:</span>
          {EXAMPLE_QUERIES.map((example) => (
            <button
              key={example}
              onClick={() => {
                if (example.includes('CSE')) {
                  setSelectedDepartment('dept-cse');
                  setQuery('placement');
                } else if (example.includes('Scholarship')) {
                  setSelectedCategory('cat-scholarships');
                  setQuery('scholarship');
                } else if (example.includes('Examination')) {
                  setSelectedCategory('cat-exams');
                  setQuery('exam');
                } else if (example.includes('Events')) {
                  setSelectedCategory('cat-events');
                  setQuery('symposium');
                } else {
                  setQuery(example);
                }
              }}
              className="text-[11px] px-2 py-0.5 bg-paper border border-divider hover:border-cobalt text-ink font-mono hover:text-cobalt transition"
            >
              {example}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="px-4 py-2 border-b border-divider bg-paper flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <label className="text-ink-muted">Dept:</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-warm-light border border-divider px-1.5 py-1 text-ink focus:outline-none"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.code} - {d.name}
                </option>
              ))}
            </select>

            <label className="text-ink-muted ml-2">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-warm-light border border-divider px-1.5 py-1 text-ink focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-ink font-semibold">
            <input
              type="checkbox"
              checked={urgentOnly}
              onChange={(e) => setUrgentOnly(e.target.checked)}
              className="accent-signal-orange"
            />
            Urgent Only
          </label>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto flex-1 divide-y divide-divider p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-ink-muted">
              <p className="font-serif text-lg text-ink">No announcements found matching query.</p>
              <p className="text-xs font-mono mt-1">Try adjusting keywords or clearing category/department filters.</p>
            </div>
          ) : (
            results.map((anc) => {
              const dept = departments.find((d) => d.id === anc.departmentId);
              const cat = categories.find((c) => c.id === anc.categoryId);
              return (
                <div
                  key={anc.id}
                  onClick={() => handleSelectAnnouncement(anc.id)}
                  className="p-3.5 hover:bg-warm-light cursor-pointer transition flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="font-semibold text-cobalt uppercase">{dept?.code}</span>
                      <span className="text-divider">•</span>
                      <span className="text-ink-muted">{cat?.name}</span>
                      {anc.importance === 'urgent' && (
                        <span className="px-1.5 py-0.2 bg-signal-soft text-signal-orange font-bold">
                          URGENT
                        </span>
                      )}
                    </div>
                    <h4 className="font-display font-semibold text-sm text-ink group-hover:text-cobalt transition">
                      {anc.title}
                    </h4>
                    <p className="text-xs text-ink-muted line-clamp-1">
                      {anc.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-divider group-hover:text-cobalt transition shrink-0 mt-2" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-warm-grey/50 border-t border-divider flex items-center justify-between text-[11px] font-mono text-ink-muted">
          <span>Found {results.length} announcements</span>
          <span>ESC to close • Press ↵ to view</span>
        </div>
      </div>
    </div>
  );
};

