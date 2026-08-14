import { createClient } from '@supabase/supabase-js';
import type { Project } from './types';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    return ((data as Project[]) ?? []).filter(project =>
      !['robotics', 'research'].includes(project.category as string) &&
      !/robot|makertronics|maker tronics|mechatronic|control system/i.test(`${project.title} ${project.short_desc}`)
    );
  } catch {
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return null;
    const project = data as Project;
    if (['robotics', 'research'].includes(project.category as string) || /robot|makertronics|maker tronics|mechatronic|control system/i.test(`${project.title} ${project.short_desc}`)) return null;
    return project;
  } catch {
    return null;
  }
}
