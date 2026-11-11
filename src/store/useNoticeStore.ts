import { create } from 'zustand';
import {
  Announcement,
  Department,
  Category,
  AnnouncementRelationship,
  UserProfile,
  UserRole,
  PersonalReminder,
  UserNotification,
  AnnouncementVersion,
  DuplicateCluster
} from '../types';
import {
  DEPARTMENTS,
  CATEGORIES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_RELATIONSHIPS,
  DEMO_PROFILES,
  INITIAL_REMINDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VERSIONS,
  INITIAL_DUPLICATES
} from '../data/seedData';

interface NoticeStoreState {
  // Current session & active profile
  currentRole: UserRole;
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  toggleFollowDepartment: (deptId: string) => void;
  toggleFollowCategory: (catId: string) => void;

  // Master Data
  departments: Department[];
  categories: Category[];
  announcements: Announcement[];
  relationships: AnnouncementRelationship[];
  duplicates: DuplicateCluster[];
  versions: AnnouncementVersion[];
  
  // Student Personal Data
  savedIds: string[];
  reminders: PersonalReminder[];
  notifications: UserNotification[];
  recentlyViewedIds: string[];

  // Feed & Navigation State
  feedMode: 'for_you' | 'everyone' | 'following';
  setFeedMode: (mode: 'for_you' | 'everyone' | 'following') => void;
  searchFilter: string;
  setSearchFilter: (q: string) => void;
  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (catId: string | null) => void;
  activeDepartmentFilter: string | null;
  setActiveDepartmentFilter: (deptId: string | null) => void;

  // Student Actions
  toggleSaveAnnouncement: (id: string) => void;
  isSaved: (id: string) => boolean;
  addReminder: (reminder: Omit<PersonalReminder, 'id' | 'createdAt'>) => void;
  toggleReminderStatus: (reminderId: string) => void;
  deleteReminder: (reminderId: string) => void;
  recordView: (id: string) => void;

  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Publisher Actions
  createAnnouncement: (announcement: Omit<Announcement, 'id' | 'publishedAt' | 'updatedAt' | 'viewCount' | 'readCount'>) => string;
  updateAnnouncement: (id: string, updates: Partial<Announcement>, changeSummary?: string) => void;
  archiveAnnouncement: (id: string) => void;

  // Admin Actions
  approveAnnouncement: (id: string) => void;
  rejectAnnouncement: (id: string, reason?: string) => void;
  resolveDuplicate: (clusterId: string, action: 'keep_both' | 'merge_into_first' | 'dismiss') => void;
  addRelationship: (rel: Omit<AnnouncementRelationship, 'id' | 'createdAt'>) => void;
  deleteRelationship: (id: string) => void;
  verifyExtractedField: (announcementId: string, fieldId: string, newValue?: string) => void;

  // Reset to default seed
  resetToDemoData: () => void;
}

const STORAGE_KEY = 'noticegraph_state_v1';

// Helper to load or initialize
const loadInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        departments: parsed.departments || DEPARTMENTS,
        categories: parsed.categories || CATEGORIES,
        announcements: parsed.announcements || INITIAL_ANNOUNCEMENTS,
        relationships: parsed.relationships || INITIAL_RELATIONSHIPS,
        duplicates: parsed.duplicates || INITIAL_DUPLICATES,
        versions: parsed.versions || INITIAL_VERSIONS,
        savedIds: parsed.savedIds || ['anc-001'],
        reminders: parsed.reminders || INITIAL_REMINDERS,
        notifications: parsed.notifications || INITIAL_NOTIFICATIONS,
        recentlyViewedIds: parsed.recentlyViewedIds || ['anc-001', 'anc-002'],
      };
    }
  } catch (err) {
    console.warn('Could not parse persisted state, falling back to initial data', err);
  }
  return {
    departments: DEPARTMENTS,
    categories: CATEGORIES,
    announcements: INITIAL_ANNOUNCEMENTS,
    relationships: INITIAL_RELATIONSHIPS,
    duplicates: INITIAL_DUPLICATES,
    versions: INITIAL_VERSIONS,
    savedIds: ['anc-001'],
    reminders: INITIAL_REMINDERS,
    notifications: INITIAL_NOTIFICATIONS,
    recentlyViewedIds: ['anc-001', 'anc-002'],
  };
};

const initialPersisted = loadInitialState();

export const useNoticeStore = create<NoticeStoreState>((set, get) => ({
  currentRole: 'student',
  currentUser: DEMO_PROFILES.student,

  departments: initialPersisted.departments,
  categories: initialPersisted.categories,
  announcements: initialPersisted.announcements,
  relationships: initialPersisted.relationships,
  duplicates: initialPersisted.duplicates,
  versions: initialPersisted.versions,
  
  savedIds: initialPersisted.savedIds,
  reminders: initialPersisted.reminders,
  notifications: initialPersisted.notifications,
  recentlyViewedIds: initialPersisted.recentlyViewedIds,

  feedMode: 'for_you',
  searchFilter: '',
  activeCategoryFilter: null,
  activeDepartmentFilter: null,

  setFeedMode: (mode) => set({ feedMode: mode }),
  setSearchFilter: (q) => set({ searchFilter: q }),
  setActiveCategoryFilter: (catId) => set({ activeCategoryFilter: catId }),
  setActiveDepartmentFilter: (deptId) => set({ activeDepartmentFilter: deptId }),

  switchRole: (role: UserRole) => {
    const profile = DEMO_PROFILES[role] || DEMO_PROFILES.student;
    set({
      currentRole: role,
      currentUser: profile
    });
  },

  updateUserProfile: (profileUpdates) => {
    set((state) => ({
      currentUser: { ...state.currentUser, ...profileUpdates }
    }));
  },

  toggleFollowDepartment: (deptId: string) => {
    set((state) => {
      const exists = state.currentUser.followedDepartments.includes(deptId);
      const newFollowed = exists
        ? state.currentUser.followedDepartments.filter((id) => id !== deptId)
        : [...state.currentUser.followedDepartments, deptId];
      return {
        currentUser: {
          ...state.currentUser,
          followedDepartments: newFollowed
        }
      };
    });
  },

  toggleFollowCategory: (catId: string) => {
    set((state) => {
      const exists = state.currentUser.followedCategories.includes(catId);
      const newFollowed = exists
        ? state.currentUser.followedCategories.filter((id) => id !== catId)
        : [...state.currentUser.followedCategories, catId];
      return {
        currentUser: {
          ...state.currentUser,
          followedCategories: newFollowed
        }
      };
    });
  },

  toggleSaveAnnouncement: (id: string) => {
    set((state) => {
      const isSaved = state.savedIds.includes(id);
      const newSaved = isSaved
        ? state.savedIds.filter((item) => item !== id)
        : [id, ...state.savedIds];
      
      const nextState = { ...state, savedIds: newSaved };
      persistState(nextState);
      return { savedIds: newSaved };
    });
  },

  isSaved: (id: string) => {
    return get().savedIds.includes(id);
  },

  addReminder: (reminder) => {
    set((state) => {
      const newReminder: PersonalReminder = {
        ...reminder,
        id: `rem-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      const updated = [newReminder, ...state.reminders];
      const nextState = { ...state, reminders: updated };
      persistState(nextState);
      return { reminders: updated };
    });
  },

  toggleReminderStatus: (reminderId: string) => {
    set((state) => {
      const updated = state.reminders.map((rem) => {
        if (rem.id === reminderId) {
          return {
            ...rem,
            status: rem.status === 'completed' ? ('pending' as const) : ('completed' as const)
          };
        }
        return rem;
      });
      const nextState = { ...state, reminders: updated };
      persistState(nextState);
      return { reminders: updated };
    });
  },

  deleteReminder: (reminderId: string) => {
    set((state) => {
      const updated = state.reminders.filter((rem) => rem.id !== reminderId);
      const nextState = { ...state, reminders: updated };
      persistState(nextState);
      return { reminders: updated };
    });
  },

  recordView: (id: string) => {
    set((state) => {
      const currentRecently = state.recentlyViewedIds.filter((item) => item !== id);
      const updatedRecently = [id, ...currentRecently].slice(0, 10);
      
      const updatedAnnouncements = state.announcements.map((anc) => {
        if (anc.id === id) {
          return { ...anc, viewCount: (anc.viewCount || 0) + 1 };
        }
        return anc;
      });

      const nextState = {
        ...state,
        recentlyViewedIds: updatedRecently,
        announcements: updatedAnnouncements
      };
      persistState(nextState);
      return {
        recentlyViewedIds: updatedRecently,
        announcements: updatedAnnouncements
      };
    });
  },

  markNotificationAsRead: (id: string) => {
    set((state) => {
      const updated = state.notifications.map((n) => {
        if (n.id === id) {
          return { ...n, readAt: new Date().toISOString() };
        }
        return n;
      });
      const nextState = { ...state, notifications: updated };
      persistState(nextState);
      return { notifications: updated };
    });
  },

  clearAllNotifications: () => {
    set((state) => {
      const updated = state.notifications.map((n) => ({
        ...n,
        readAt: n.readAt || new Date().toISOString()
      }));
      const nextState = { ...state, notifications: updated };
      persistState(nextState);
      return { notifications: updated };
    });
  },

  createAnnouncement: (data) => {
    const newId = `anc-${Date.now().toString(36)}`;
    const now = new Date().toISOString();
    const newAnnouncement: Announcement = {
      ...data,
      id: newId,
      publishedAt: data.publicationStatus === 'published' ? now : '',
      updatedAt: now,
      viewCount: 0,
      readCount: 0
    };

    set((state) => {
      const updated = [newAnnouncement, ...state.announcements];
      
      // Check for duplicate detection automatically!
      const duplicateMatches = state.announcements.filter((existing) => {
        const titleA = existing.title.toLowerCase();
        const titleB = newAnnouncement.title.toLowerCase();
        const wordsA = new Set(titleA.split(/\s+/));
        const wordsB = new Set(titleB.split(/\s+/));
        let common = 0;
        wordsA.forEach((w) => {
          if (w.length > 3 && wordsB.has(w)) common++;
        });
        const matchScore = common / Math.max(wordsA.size, wordsB.size);
        return matchScore > 0.45 && existing.departmentId === newAnnouncement.departmentId;
      });

      let updatedDuplicates = state.duplicates;
      if (duplicateMatches.length > 0) {
        const cluster: DuplicateCluster = {
          id: `dup-${Date.now()}`,
          titleMatchScore: 0.88,
          announcementIds: [duplicateMatches[0].id, newId],
          reason: `High lexical overlap with existing announcement "${duplicateMatches[0].title.slice(0, 40)}..." published by the same department.`,
          status: 'detected',
          createdAt: now
        };
        updatedDuplicates = [cluster, ...updatedDuplicates];
      }

      const nextState = {
        ...state,
        announcements: updated,
        duplicates: updatedDuplicates
      };
      persistState(nextState);
      return {
        announcements: updated,
        duplicates: updatedDuplicates
      };
    });

    return newId;
  },

  updateAnnouncement: (id, updates, changeSummary) => {
    const now = new Date().toISOString();
    set((state) => {
      const existing = state.announcements.find((a) => a.id === id);
      if (!existing) return state;

      // Track version if substantial change or requested
      let updatedVersions = state.versions;
      if (changeSummary || updates.content || updates.title || updates.importantDates) {
        const newVersion: AnnouncementVersion = {
          id: `ver-${Date.now()}`,
          announcementId: id,
          versionNumber: updatedVersions.filter((v) => v.announcementId === id).length + 2,
          previousContent: existing.content,
          updatedContent: updates.content || existing.content,
          changeSummary: changeSummary || 'Notice details amended by publisher.',
          updatedBy: state.currentUser.fullName,
          createdAt: now
        };
        updatedVersions = [newVersion, ...updatedVersions];
      }

      const updatedAnnouncements = state.announcements.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            ...updates,
            updatedAt: now
          };
        }
        return a;
      });

      const nextState = {
        ...state,
        announcements: updatedAnnouncements,
        versions: updatedVersions
      };
      persistState(nextState);
      return {
        announcements: updatedAnnouncements,
        versions: updatedVersions
      };
    });
  },

  archiveAnnouncement: (id) => {
    set((state) => {
      const updated = state.announcements.map((a) => {
        if (a.id === id) {
          return { ...a, publicationStatus: 'archived' as const };
        }
        return a;
      });
      const nextState = { ...state, announcements: updated };
      persistState(nextState);
      return { announcements: updated };
    });
  },

  approveAnnouncement: (id) => {
    const now = new Date().toISOString();
    set((state) => {
      const updated = state.announcements.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            publicationStatus: 'published' as const,
            verificationStatus: 'verified' as const,
            publishedAt: a.publishedAt || now,
            updatedAt: now
          };
        }
        return a;
      });
      const nextState = { ...state, announcements: updated };
      persistState(nextState);
      return { announcements: updated };
    });
  },

  rejectAnnouncement: (id) => {
    set((state) => {
      const updated = state.announcements.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            publicationStatus: 'draft' as const,
            verificationStatus: 'unverified' as const
          };
        }
        return a;
      });
      const nextState = { ...state, announcements: updated };
      persistState(nextState);
      return { announcements: updated };
    });
  },

  resolveDuplicate: (clusterId, action) => {
    set((state) => {
      const cluster = state.duplicates.find((d) => d.id === clusterId);
      if (!cluster) return state;

      let updatedAnnouncements = state.announcements;
      if (action === 'merge_into_first' && cluster.announcementIds.length > 1) {
        const secondaryId = cluster.announcementIds[1];
        updatedAnnouncements = updatedAnnouncements.map((a) => {
          if (a.id === secondaryId) {
            return { ...a, publicationStatus: 'archived' as const };
          }
          return a;
        });
      }

      const updatedDuplicates = state.duplicates.map((d) => {
        if (d.id === clusterId) {
          return { ...d, status: 'resolved' as const };
        }
        return d;
      });

      const nextState = {
        ...state,
        announcements: updatedAnnouncements,
        duplicates: updatedDuplicates
      };
      persistState(nextState);
      return {
        announcements: updatedAnnouncements,
        duplicates: updatedDuplicates
      };
    });
  },

  addRelationship: (rel) => {
    const newRel: AnnouncementRelationship = {
      ...rel,
      id: `rel-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    set((state) => {
      const updated = [newRel, ...state.relationships];
      const nextState = { ...state, relationships: updated };
      persistState(nextState);
      return { relationships: updated };
    });
  },

  deleteRelationship: (id) => {
    set((state) => {
      const updated = state.relationships.filter((r) => r.id !== id);
      const nextState = { ...state, relationships: updated };
      persistState(nextState);
      return { relationships: updated };
    });
  },

  verifyExtractedField: (announcementId, fieldId, newValue) => {
    set((state) => {
      const updatedAnnouncements = state.announcements.map((a) => {
        if (a.id === announcementId) {
          const updatedFields = a.extractedFields.map((f) => {
            if (f.id === fieldId) {
              return {
                ...f,
                extractedValue: newValue !== undefined ? newValue : f.extractedValue,
                verificationStatus: 'verified' as const,
                verifiedBy: state.currentUser.fullName,
                verifiedAt: new Date().toISOString()
              };
            }
            return f;
          });
          return { ...a, extractedFields: updatedFields };
        }
        return a;
      });
      const nextState = { ...state, announcements: updatedAnnouncements };
      persistState(nextState);
      return { announcements: updatedAnnouncements };
    });
  },

  resetToDemoData: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      departments: DEPARTMENTS,
      categories: CATEGORIES,
      announcements: INITIAL_ANNOUNCEMENTS,
      relationships: INITIAL_RELATIONSHIPS,
      duplicates: INITIAL_DUPLICATES,
      versions: INITIAL_VERSIONS,
      savedIds: ['anc-001'],
      reminders: INITIAL_REMINDERS,
      notifications: INITIAL_NOTIFICATIONS,
      recentlyViewedIds: ['anc-001', 'anc-002'],
      feedMode: 'for_you',
      searchFilter: '',
      activeCategoryFilter: null,
      activeDepartmentFilter: null,
      currentRole: 'student',
      currentUser: DEMO_PROFILES.student
    });
  }
}));

// Helper to save state to localStorage
function persistState(state: any) {
  try {
    const toSave = {
      departments: state.departments,
      categories: state.categories,
      announcements: state.announcements,
      relationships: state.relationships,
      duplicates: state.duplicates,
      versions: state.versions,
      savedIds: state.savedIds,
      reminders: state.reminders,
      notifications: state.notifications,
      recentlyViewedIds: state.recentlyViewedIds
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('Failed to persist state', e);
  }
}

