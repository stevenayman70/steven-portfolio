export type Category = 'ai-automation' | 'n8n' | 'serenoil' | 'web' | 'youtube';
export type Status = 'Completed' | 'In Progress' | 'Case Study';

export interface Project {
  id: string; title: string; slug: string; short_desc: string; long_desc: string | null;
  category: Category; tech_stack: string[]; thumbnail_url: string | null;
  github_url: string | null; live_url: string | null; youtube_url: string | null;
  status: Status; featured: boolean; created_at: string; sort_order: number | null;
}

export const CATEGORY_META: Record<Category, { label: string; icon: string; color: string; badgeClass: string; sub: string }> = {
  'ai-automation': { label: 'AI Systems', icon: 'AI', color: '#b7ff5a', badgeClass: 'badge-ai', sub: 'Agents, RAG, and intelligent operations' },
  'n8n': { label: 'Automations', icon: 'WF', color: '#b7ff5a', badgeClass: 'badge-n8n', sub: 'Connected workflows, bots, and integrations' },
  'serenoil': { label: 'AI in Commerce', icon: 'EC', color: '#b7ff5a', badgeClass: 'badge-serenoil', sub: 'Applied automation for a live consumer brand' },
  'web': { label: 'AI Products', icon: 'AP', color: '#b7ff5a', badgeClass: 'badge-web', sub: 'Intelligent tools and product experiences' },
  'youtube': { label: 'AI Content', icon: 'AC', color: '#b7ff5a', badgeClass: 'badge-youtube', sub: 'Automated content systems and education' },
};

export const STATUS_META: Record<Status, { label: string; color: string }> = {
  'Completed': { label: 'Completed', color: '#22c55e' },
  'In Progress': { label: 'In Progress', color: '#347a53' },
  'Case Study': { label: 'Case Study', color: '#347a53' },
};
