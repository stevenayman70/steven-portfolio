export type Category = 'ai-automation' | 'n8n' | 'serenoil' | 'robotics' | 'web' | 'youtube';
export type Status   = 'Completed' | 'In Progress' | 'Case Study';

export interface Project {
  id:            string;
  title:         string;
  slug:          string;
  short_desc:    string;
  long_desc:     string | null;
  category:      Category;
  tech_stack:    string[];
  thumbnail_url: string | null;
  github_url:    string | null;
  live_url:      string | null;
  youtube_url:   string | null;
  status:        Status;
  featured:      boolean;
  created_at:    string;
  sort_order:    number | null;
}

export const CATEGORY_META: Record<Category, { label: string; icon: string; color: string; badgeClass: string }> = {
  'ai-automation': { label: 'AI Automation', icon: '🤖', color: '#00d4aa', badgeClass: 'badge-ai'       },
  'n8n':           { label: 'n8n Workflows', icon: '⚙️', color: '#ff6b35', badgeClass: 'badge-n8n'       },
  'serenoil':      { label: 'Serenoil',      icon: '🌿', color: '#84cc16', badgeClass: 'badge-serenoil'  },
  'robotics':      { label: 'Robotics',      icon: '🦾', color: '#a855f7', badgeClass: 'badge-robotics'  },
  'web':           { label: 'Web Dev',       icon: '🌐', color: '#3b82f6', badgeClass: 'badge-web'       },
  'youtube':       { label: 'YouTube',       icon: '📹', color: '#ef4444', badgeClass: 'badge-youtube'   },
};

export const STATUS_META: Record<Status, { label: string; color: string }> = {
  'Completed':   { label: 'Completed',   color: '#22c55e' },
  'In Progress': { label: 'In Progress', color: '#f59e0b' },
  'Case Study':  { label: 'Case Study',  color: '#3b82f6' },
};
