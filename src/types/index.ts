export type UserRole = 'student' | 'publisher' | 'admin';

export type ImportanceLevel = 'low' | 'normal' | 'high' | 'urgent';

export type PublicationStatus = 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';

export type VerificationStatus = 'unverified' | 'partially_verified' | 'verified';

export type RelationshipType =
  | 'published_by'
  | 'related_to'
  | 'applies_to'
  | 'happens_on'
  | 'has_deadline'
  | 'requires_participation'
  | 'supersedes'
  | 'updates'
  | 'references';

export type RelationshipSource = 'publisher' | 'extracted' | 'matching' | 'admin';

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  dean: string;
  building: string;
  email: string;
  phone: string;
  announcementCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  badgeColor?: string;
  iconName?: string;
}

export interface ExtractedField {
  id: string;
  fieldName: string;
  extractedValue: string;
  confidence: number; // 0 to 1
  sourceReference?: string;
  verificationStatus: 'verified' | 'needs_verification' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface AnnouncementDate {
  id: string;
  dateType: 'deadline' | 'event' | 'submission' | 'exam' | 'result' | 'registration';
  dateValue: string; // ISO string or YYYY-MM-DD
  timeValue?: string;
  description: string;
  verificationStatus: 'verified' | 'needs_verification';
}

export interface ActionItem {
  id: string;
  title: string;
  actionType: 'form' | 'upload' | 'payment' | 'attend' | 'verify';
  deadline?: string;
  url?: string;
  completed?: boolean;
}

export interface ContactInfo {
  name: string;
  role: string;
  email: string;
  phone?: string;
  office?: string;
}

export interface AudienceSpec {
  departments: string[]; // dept IDs or ['ALL']
  programs: string[]; // e.g. ['B.Tech Computer Science', 'M.Tech AI', 'B.Sc Data Science', 'ALL']
  semesters: number[]; // e.g. [4, 6, 8] or empty for all
  audienceType: 'all' | 'specific';
}

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categoryId: string;
  departmentId: string;
  importance: ImportanceLevel;
  publicationStatus: PublicationStatus;
  verificationStatus: VerificationStatus;
  publishedAt: string;
  updatedAt: string;
  expiresAt?: string;
  createdBy: string;
  updatedBy?: string;
  viewCount: number;
  readCount: number;
  
  // Document details
  hasDocument: boolean;
  documentName?: string;
  documentType?: 'pdf' | 'docx' | 'image' | 'text';
  documentSize?: string;
  documentUrl?: string;
  extractedText?: string;
  
  // Extracted intelligence
  extractedFields: ExtractedField[];
  importantDates: AnnouncementDate[];
  eligibilityRequirements: string[];
  requiredActions: ActionItem[];
  contactInfo?: ContactInfo;
  
  // Target audience
  audience: AudienceSpec;
  
  // Tags
  tags: string[];
}

export interface AnnouncementRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  relationshipType: RelationshipType;
  relationshipSource: RelationshipSource;
  confidence: number;
  verificationStatus: 'verified' | 'suggested' | 'rejected';
  description: string;
  createdAt: string;
}

export interface SavedAnnouncement {
  id: string;
  userId: string;
  announcementId: string;
  savedAt: string;
  notes?: string;
}

export interface PersonalReminder {
  id: string;
  userId: string;
  announcementId: string;
  title: string;
  reminderDate: string; // YYYY-MM-DD
  reminderTime?: string;
  status: 'pending' | 'completed' | 'dismissed';
  createdAt: string;
}

export interface UserNotification {
  id: string;
  userId: string;
  announcementId?: string;
  type: 'deadline' | 'urgent_announcement' | 'update' | 'department_notice' | 'review_required';
  title: string;
  message: string;
  readAt?: string;
  createdAt: string;
  importance: ImportanceLevel;
}

export interface AnnouncementVersion {
  id: string;
  announcementId: string;
  versionNumber: number;
  previousContent: string;
  updatedContent: string;
  changeSummary: string;
  updatedBy: string;
  createdAt: string;
}

export interface DuplicateCluster {
  id: string;
  titleMatchScore: number;
  announcementIds: string[];
  reason: string;
  status: 'detected' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  role: UserRole;
  email: string;
  avatarUrl?: string;
  departmentId: string;
  program: string;
  semester: number;
  followedDepartments: string[];
  followedCategories: string[];
}

