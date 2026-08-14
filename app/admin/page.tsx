'use client';

import { useState, useEffect, useRef } from 'react';
import type { Project, Category, Status } from '@/lib/types';
import { CATEGORY_META } from '@/lib/types';

// ── Helpers ──────────────────────────────────────────────────
function autoSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

async function api(method: string, path: string, body?: object) {
  const apiKey = sessionStorage.getItem('admin_api_key') ?? '';
  const res = await fetch(`/api/projects${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': apiKey },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data;
}

type View  = 'list' | 'form';
type Toast = { message: string; type: 'success' | 'error' };

// ── Password Gate ────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: (pw: string) => void }) {
  const [pw, setPw]     = useState('');
  const [err, setErr]   = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(false);
    const res = await fetch('/api/projects', { headers: { 'X-Admin-Key': pw } });
    if (res.ok || res.status === 404) { onAuth(pw); }
    else { setErr(true); setPw(''); }
    setBusy(false);
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-black/5 rounded-2xl p-8 text-center shadow-sm">
        <div className="text-4xl mb-5">🔐</div>
        <h2 className="font-bold text-xl text-dark mb-2">Admin Access</h2>
        <p className="text-sm text-muted mb-6">Enter your admin password to manage projects.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password" value={pw} onChange={e => setPw(e.target.value)}
            placeholder="Password" autoComplete="current-password"
            className="w-full px-3 py-2.5 bg-cream border border-black/10 rounded-xl text-dark text-sm focus:outline-none focus:ring-2 focus:ring-orange"
          />
          <button type="submit" disabled={busy || !pw}
            className="w-full py-2.5 bg-orange hover:bg-orange-dark text-white font-bold text-sm rounded-xl disabled:opacity-50 transition-colors">
            {busy ? 'Checking…' : 'Enter'}
          </button>
          {err && <p className="text-red-500 text-xs font-medium">Incorrect password. Try again.</p>}
        </form>
      </div>
    </div>
  );
}

// ── Tag Input ────────────────────────────────────────────────
function TagInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('');
  function add() {
    const v = input.trim().replace(/,$/, '');
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput('');
  }
  return (
    <div
      className="flex flex-wrap gap-1.5 min-h-[42px] px-2 py-2 bg-cream border border-black/10 rounded-xl focus-within:ring-2 focus-within:ring-orange cursor-text"
      onClick={() => document.getElementById('tag-input-field')?.focus()}
    >
      {value.map((t, i) => (
        <span key={t} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-orange/10 rounded-full text-xs text-orange font-semibold">
          {t}
          <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="opacity-60 hover:opacity-100 leading-none">×</button>
        </span>
      ))}
      <input
        id="tag-input-field" value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ',') && input.trim()) { e.preventDefault(); add(); }
          if (e.key === 'Backspace' && !input && value.length) onChange(value.slice(0, -1));
        }}
        placeholder={value.length === 0 ? 'e.g. n8n, Claude API… (Enter to add)' : ''}
        className="border-none bg-transparent text-dark text-sm outline-none flex-1 min-w-[100px] py-0.5"
      />
    </div>
  );
}

// ── Project Form ─────────────────────────────────────────────
interface FormProps { initial?: Project | null; onSave: () => void; onCancel: () => void; showToast: (m: string, t?: Toast['type']) => void }

function ProjectForm({ initial, onSave, onCancel, showToast }: FormProps) {
  const [title,    setTitle]    = useState(initial?.title ?? '');
  const [slug,     setSlug]     = useState(initial?.slug ?? '');
  const [shortDesc,setShortDesc]= useState(initial?.short_desc ?? '');
  const [longDesc, setLongDesc] = useState(initial?.long_desc ?? '');
  const [category, setCategory] = useState<Category | ''>(initial?.category ?? '');
  const [status,   setStatus]   = useState<Status | ''>(initial?.status ?? '');
  const [tags,     setTags]     = useState<string[]>(initial?.tech_stack ?? []);
  const [thumb,    setThumb]    = useState(initial?.thumbnail_url ?? '');
  const [github,   setGithub]   = useState(initial?.github_url ?? '');
  const [live,     setLive]     = useState(initial?.live_url ?? '');
  const [yt,       setYt]       = useState(initial?.youtube_url ?? '');
  const [sortOrder,setSortOrder]= useState(initial?.sort_order?.toString() ?? '');
  const [featured,    setFeatured]    = useState(initial?.featured ?? false);
  const [error,       setError]       = useState('');
  const [busy,        setBusy]        = useState(false);
  const [uploading,   setUploading]   = useState(false);
  const fileInputRef  = useRef<HTMLInputElement>(null);
  const isEdit = !!initial;

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'X-Admin-Key': sessionStorage.getItem('admin_api_key') ?? '' },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setThumb(data.url);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  }

  const inp = 'px-3 py-2 bg-cream border border-black/10 rounded-xl text-dark text-sm focus:outline-none focus:ring-2 focus:ring-orange w-full';
  const lbl = 'text-xs font-bold text-muted uppercase tracking-wide';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError('');
    if (!title || !slug || !category || !status || !shortDesc) { setError('Title, slug, category, status, and short description are required.'); return; }
    setBusy(true);
    try {
      const payload = { title, slug, short_desc: shortDesc, long_desc: longDesc || null, category, status, tech_stack: tags,
        thumbnail_url: thumb || null, github_url: github || null, live_url: live || null, youtube_url: yt || null,
        sort_order: sortOrder ? parseInt(sortOrder) : null, featured };
      if (isEdit) { await api('PUT', `?id=${initial.id}`, payload); showToast('Project updated!'); }
      else        { await api('POST', '', payload); showToast('Project added!'); }
      onSave();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Something went wrong.'); }
    finally { setBusy(false); }
  }

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-cream">
        <h2 className="font-bold text-lg text-dark">{isEdit ? 'Edit Project' : 'Add Project'}</h2>
        <button onClick={onCancel} className="text-sm text-muted hover:text-dark px-3 py-1.5 rounded-xl hover:bg-cream-dark transition-colors">← Back</button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className={lbl}>Title *</label>
          <input className={inp} value={title} onChange={e => { setTitle(e.target.value); if (!isEdit) setSlug(autoSlug(e.target.value)); }} placeholder="Project title" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={lbl}>Slug * <span className="font-normal normal-case">(auto-generated)</span></label>
          <input className={inp} value={slug} onChange={e => setSlug(e.target.value)} placeholder="project-slug" required />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className={lbl}>Short Description * <span className="font-normal normal-case">({shortDesc.length}/150)</span></label>
          <textarea className={inp} rows={2} value={shortDesc} onChange={e => setShortDesc(e.target.value)} maxLength={150} placeholder="1–2 sentence summary" required />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className={lbl}>Long Description <span className="font-normal normal-case">(Markdown)</span></label>
          <textarea className={inp} rows={8} value={longDesc} onChange={e => setLongDesc(e.target.value)} placeholder="Full project details. Supports **markdown**." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={lbl}>Category *</label>
          <select className={inp} value={category} onChange={e => setCategory(e.target.value as Category)} required>
            <option value="">— Select —</option>
            {Object.entries(CATEGORY_META).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={lbl}>Status *</label>
          <select className={inp} value={status} onChange={e => setStatus(e.target.value as Status)} required>
            <option value="">— Select —</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Case Study">Case Study</option>
          </select>
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className={lbl}>Tech Stack <span className="font-normal normal-case">(Enter to add)</span></label>
          <TagInput value={tags} onChange={setTags} />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className={lbl}>Thumbnail</label>
          <div className="flex gap-3 items-start">
            <input className={inp} value={thumb} onChange={e => setThumb(e.target.value)} placeholder="Paste URL or upload →" type="url" />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-shrink-0 px-4 py-2 bg-cream border border-black/10 rounded-xl text-sm font-semibold text-dark hover:bg-cream-dark disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {uploading ? 'Uploading…' : '📁 Upload'}
            </button>
          </div>
          {thumb && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-black/10 bg-cream mt-1">
              <img src={thumb} alt="preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setThumb('')}
                className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white rounded-full text-xs hover:bg-black/70 transition-colors flex items-center justify-center"
              >×</button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5"><label className={lbl}>GitHub URL</label><input className={inp} value={github} onChange={e => setGithub(e.target.value)} placeholder="https://github.com/…" type="url" /></div>
        <div className="flex flex-col gap-1.5"><label className={lbl}>Live URL</label><input className={inp} value={live} onChange={e => setLive(e.target.value)} placeholder="https://…" type="url" /></div>
        <div className="flex flex-col gap-1.5"><label className={lbl}>YouTube URL</label><input className={inp} value={yt} onChange={e => setYt(e.target.value)} placeholder="https://youtube.com/watch?v=…" type="url" /></div>
        <div className="flex flex-col gap-1.5"><label className={lbl}>Sort Order</label><input className={inp} value={sortOrder} onChange={e => setSortOrder(e.target.value)} type="number" min="0" placeholder="0" /></div>

        <div className="sm:col-span-2 flex items-center justify-between py-2 border-t border-black/5">
          <span className="text-sm font-medium text-dark">Featured project</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="sr-only peer" />
            <div className="w-10 h-[22px] bg-black/10 rounded-full peer-checked:bg-orange transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-transform peer-checked:after:translate-x-[18px]" />
          </label>
        </div>

        {error && <div className="sm:col-span-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

        <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-black/5">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-black/10 text-muted rounded-xl hover:bg-cream transition-colors">Cancel</button>
          <button type="submit" disabled={busy} className="px-5 py-2 text-sm bg-orange hover:bg-orange-dark text-white font-bold rounded-xl disabled:opacity-50 transition-colors">
            {busy ? 'Saving…' : isEdit ? 'Update Project' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Project Table ────────────────────────────────────────────
interface TableProps { projects: Project[]; onEdit: (p: Project) => void; onDelete: (p: Project) => void; onAdd: () => void }

type CatFilter    = 'all' | Category;
type StatusFilter = 'all' | Status;

function ProjectTable({ projects, onEdit, onDelete, onAdd }: TableProps) {
  const [query,      setQuery]      = useState('');
  const [catFilter,  setCatFilter]  = useState<CatFilter>('all');
  const [statFilter, setStatFilter] = useState<StatusFilter>('all');
  const [featOnly,   setFeatOnly]   = useState(false);

  const statusKey = (s: Status) => s === 'Completed' ? 'done' : s === 'In Progress' ? 'wip' : 'case';
  const stats = { total: projects.length, done: projects.filter(p => p.status === 'Completed').length, wip: projects.filter(p => p.status === 'In Progress').length, feat: projects.filter(p => p.featured).length };

  const categoryEntries = Object.entries(CATEGORY_META) as [Category, typeof CATEGORY_META[Category]][];
  const q = query.trim().toLowerCase();

  const filtered = projects.filter(p => {
    if (catFilter !== 'all' && p.category !== catFilter) return false;
    if (statFilter !== 'all' && p.status !== statFilter) return false;
    if (featOnly && !p.featured) return false;
    if (q && !p.title.toLowerCase().includes(q) && !p.slug.toLowerCase().includes(q)) return false;
    return true;
  });

  const hasActiveFilters = catFilter !== 'all' || statFilter !== 'all' || featOnly || q.length > 0;
  function clearFilters() { setQuery(''); setCatFilter('all'); setStatFilter('all'); setFeatOnly(false); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-black text-2xl text-dark">Projects</h1><p className="text-sm text-muted mt-0.5">Manage your portfolio content</p></div>
        <button onClick={onAdd} className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-orange hover:bg-orange-dark text-white text-sm font-bold rounded-full transition-colors">+ Add Project</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total',       value: stats.total, cls: 'text-dark'        },
          { label: 'Completed',   value: stats.done,  cls: 'text-green-600'   },
          { label: 'In Progress', value: stats.wip,   cls: 'text-amber-600'   },
          { label: 'Featured',    value: stats.feat,  cls: 'text-orange'      },
        ].map(s => (
          <div key={s.label} className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
            <div className="text-xs text-muted uppercase tracking-wide font-semibold mb-1.5">{s.label}</div>
            <div className={`text-3xl font-black ${s.cls}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm mb-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by title or slug…"
              className="w-full pl-9 pr-3 py-2 bg-cream border border-black/10 rounded-xl text-dark text-sm focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>
          <select value={statFilter} onChange={e => setStatFilter(e.target.value as StatusFilter)}
            className="px-3 py-2 bg-cream border border-black/10 rounded-xl text-dark text-sm focus:outline-none focus:ring-2 focus:ring-orange sm:w-44">
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Case Study">Case Study</option>
          </select>
          <button
            onClick={() => setFeatOnly(v => !v)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl border whitespace-nowrap transition-colors ${
              featOnly ? 'bg-orange/10 border-orange text-orange' : 'bg-cream border-black/10 text-muted hover:text-dark'
            }`}
          >
            ★ Featured only
          </button>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="px-4 py-2 text-sm font-semibold text-muted hover:text-dark whitespace-nowrap">
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCatFilter('all')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              catFilter === 'all' ? 'bg-dark text-cream border-dark' : 'bg-cream text-muted border-black/10 hover:text-dark'
            }`}
          >
            All <span className="opacity-70">{projects.length}</span>
          </button>
          {categoryEntries.map(([key, meta]) => {
            const count = projects.filter(p => p.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setCatFilter(key)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  catFilter === key ? 'bg-dark text-cream border-dark' : 'bg-cream text-muted border-black/10 hover:text-dark'
                }`}
              >
                {meta.icon} {meta.label} <span className="opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
          <h3 className="font-bold text-sm text-dark">All Projects</h3>
          <span className="text-xs text-muted font-medium">{filtered.length} of {projects.length}</span>
        </div>
        {projects.length === 0 ? (
          <div className="py-16 text-center text-muted text-sm font-medium">No projects yet. Add your first one!</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-muted text-sm font-medium">No projects match these filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-cream">
                  {['Thumb', 'Title', 'Category', 'Status', 'Featured', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-bold text-muted uppercase tracking-wider border-b border-black/5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-black/5 hover:bg-cream/50 transition-colors">
                    <td className="px-5 py-3.5">
                      {p.thumbnail_url
                        ? <img src={p.thumbnail_url} alt="" className="w-14 h-9 object-cover rounded-lg" />
                        : <div className="w-14 h-9 flex items-center justify-center bg-cream rounded-lg text-xl">{CATEGORY_META[p.category].icon}</div>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-sm text-dark">{p.title}</div>
                      <div className="text-xs text-muted font-mono mt-0.5">{p.slug}</div>
                    </td>
                    <td className="px-5 py-3.5"><span className={`badge ${CATEGORY_META[p.category].badgeClass}`}>{CATEGORY_META[p.category].icon} {CATEGORY_META[p.category].label}</span></td>
                    <td className="px-5 py-3.5"><span className={`badge badge-${statusKey(p.status)}`}>{p.status}</span></td>
                    <td className="px-5 py-3.5">{p.featured ? <span className="w-2 h-2 bg-orange rounded-full inline-block" /> : <span className="text-muted">—</span>}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5">
                        <button onClick={() => onEdit(p)} className="px-3 py-1 text-xs border border-black/10 rounded-lg text-muted hover:text-orange hover:border-orange transition-colors font-medium">Edit</button>
                        <button onClick={() => onDelete(p)} className="px-3 py-1 text-xs border border-black/10 rounded-lg text-muted hover:text-red-500 hover:border-red-300 transition-colors font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed,   setAuthed]   = useState(false);
  const [view,     setView]     = useState<View>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing,  setEditing]  = useState<Project | null>(null);
  const [toast,    setToast]    = useState<Toast | null>(null);
  const [pending,  setPending]  = useState<Project | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { if (sessionStorage.getItem('admin_authed') === 'true') setAuthed(true); }, []);
  useEffect(() => { if (authed) load(); }, [authed]);

  function showToast(message: string, type: Toast['type'] = 'success') {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), 3000);
  }
  function handleAuth(pw: string) { sessionStorage.setItem('admin_authed', 'true'); sessionStorage.setItem('admin_api_key', pw); setAuthed(true); }
  async function load() { try { setProjects(await api('GET', '')); } catch { showToast('Failed to load', 'error'); } }
  async function confirmDelete() {
    if (!pending) return;
    try { await api('DELETE', `?id=${pending.id}`); showToast('Deleted.'); load(); }
    catch (e: unknown) { showToast(e instanceof Error ? e.message : 'Delete failed', 'error'); }
    finally { setPending(null); }
  }

  if (!authed) return <PasswordGate onAuth={handleAuth} />;

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-white border-r border-black/5 flex flex-col py-5 sticky top-0 h-screen hidden sm:flex shadow-sm">
        <div className="px-5 pb-5 border-b border-black/5 font-black text-lg text-dark">
          steven<span className="text-orange">.</span>admin
        </div>
        <nav className="flex-1 p-3 mt-2 flex flex-col gap-0.5">
          {[
            { id: 'list', label: 'All Projects', icon: '▦' },
            { id: 'form', label: 'Add Project',  icon: '+' },
          ].map(item => (
            <button key={item.id}
              onClick={() => { if (item.id === 'form') { setEditing(null); setView('form'); } else setView('list'); }}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                view === item.id ? 'bg-orange/10 text-orange' : 'text-muted hover:text-dark hover:bg-cream'
              }`}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
          <a href="/" className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-semibold text-muted hover:text-dark hover:bg-cream transition-colors">
            <span>⌂</span> View Site
          </a>
        </nav>
        <div className="p-3 border-t border-black/5">
          <button onClick={() => { sessionStorage.clear(); setAuthed(false); }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-muted hover:text-red-500 hover:bg-red-50 transition-colors">
            ↩ Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-4xl">
        {view === 'list'
          ? <ProjectTable projects={projects} onEdit={p => { setEditing(p); setView('form'); }} onDelete={setPending} onAdd={() => { setEditing(null); setView('form'); }} />
          : <ProjectForm initial={editing} onSave={() => { setView('list'); load(); }} onCancel={() => setView('list')} showToast={showToast} />
        }
      </main>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold animate-fade-up border ${
          toast.type === 'error' ? 'bg-white border-red-200 text-red-600' : 'bg-white border-green-200 text-green-700'
        }`}>{toast.message}</div>
      )}

      {/* Confirm Delete */}
      {pending && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white border border-black/5 rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
            <h3 className="font-black text-lg text-dark mb-3">Delete Project</h3>
            <p className="text-sm text-muted mb-6">Delete &ldquo;{pending.title}&rdquo;? This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setPending(null)} className="px-5 py-2 text-sm border border-black/10 rounded-full text-muted hover:bg-cream transition-colors font-medium">Cancel</button>
              <button onClick={confirmDelete} className="px-5 py-2 text-sm bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
