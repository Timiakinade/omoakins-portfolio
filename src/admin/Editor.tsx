/** @jsxImportSource preact */
/* The dashboard editor: a form generated from admin/fields.ts, with Save draft / Preview / Publish. */
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { supabase } from "../lib/supabase-browser";
import type { EntryType } from "../lib/schema";
import { FIELDS, SECTION_TYPES, TYPE_LABELS, publicPath, type Field } from "./fields";

type Obj = Record<string, any>;
interface Ctx { categories: string[]; projects: { slug: string; name: string }[] }

interface Props {
  type: EntryType;
  slug: string;
  draft: Obj;
  published: Obj | null;
  categories: string[];
  projects: { slug: string; name: string }[];
}

/* ---------- image upload (Supabase Storage, bucket "media") ---------- */
async function upload(file: File): Promise<string> {
  const clean = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID().slice(0, 8)}-${clean}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000", upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

function pickFile(onFile: (f: File) => void) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/jpeg,image/png,image/webp,image/gif,image/avif";
  input.onchange = () => input.files?.[0] && onFile(input.files[0]);
  input.click();
}

/* ---------- field widgets ---------- */
function Wrap({ label, help, children, id }: { label: string; help?: string; children: ComponentChildren; id?: string }) {
  return (
    <div class="f-row">
      <label class="a-label" for={id}>{label}</label>
      {children}
      {help && <p class="f-help">{help}</p>}
    </div>
  );
}

let uid = 0;
const useId = () => useMemo(() => `f${++uid}`, []);

function ImageField({ label, help, value, onChange }: { label: string; help?: string; value?: string; onChange: (v?: string) => void }) {
  const [busy, setBusy] = useState("");
  const id = useId();
  const choose = () =>
    pickFile(async (f) => {
      setBusy("Uploading…");
      try {
        onChange(await upload(f));
        setBusy("");
      } catch (e) {
        setBusy(`Upload failed: ${(e as Error).message}`);
      }
    });
  return (
    <Wrap label={label} help={help} id={id}>
      <div class="f-image">
        {value ? <img src={value} alt="" /> : <div class="f-image-empty">No image</div>}
        <div class="f-image-actions">
          <button type="button" class="a-btn" onClick={choose}>{value ? "Replace image" : "Upload image"}</button>
          {value && <button type="button" class="a-link" onClick={() => onChange(undefined)}>Remove</button>}
          {busy && <span class="f-help">{busy}</span>}
        </div>
      </div>
      <input id={id} class="a-input f-small" placeholder="…or paste an image address" value={value ?? ""} onInput={(e) => onChange(e.currentTarget.value || undefined)} />
    </Wrap>
  );
}

function MarkdownField({ label, help, value, onChange }: { label: string; help?: string; value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [busy, setBusy] = useState("");
  const id = useId();
  const addImage = () =>
    pickFile(async (f) => {
      setBusy("Uploading…");
      try {
        const url = await upload(f);
        const ta = ref.current!;
        const at = ta.selectionStart ?? value.length;
        onChange(`${value.slice(0, at)}\n\n![${f.name.replace(/\.[a-z]+$/i, "")}](${url})\n\n${value.slice(at)}`);
        setBusy("");
      } catch (e) {
        setBusy(`Upload failed: ${(e as Error).message}`);
      }
    });
  return (
    <Wrap label={label} help={help} id={id}>
      <div class="f-md-bar">
        <button type="button" class="a-btn" onClick={addImage}>Add image</button>
        {busy && <span class="f-help">{busy}</span>}
      </div>
      <textarea id={id} ref={ref} class="a-input f-md" value={value} onInput={(e) => onChange(e.currentTarget.value)} />
    </Wrap>
  );
}

function LinesField({ label, help, value, paragraphs, onChange }: { label: string; help?: string; value: string[]; paragraphs?: boolean; onChange: (v: string[]) => void }) {
  const sep = paragraphs ? "\n\n" : "\n";
  const id = useId();
  // While typing, keep the raw text (blank lines included); otherwise show the saved list.
  const [editing, setEditing] = useState<string | null>(null);
  return (
    <Wrap label={label} help={help} id={id}>
      <textarea
        id={id}
        class={`a-input ${paragraphs ? "f-tall" : "f-lines"}`}
        value={editing ?? (value ?? []).join(sep)}
        onFocus={() => setEditing((value ?? []).join(sep))}
        onBlur={() => setEditing(null)}
        onInput={(e) => {
          setEditing(e.currentTarget.value);
          onChange(e.currentTarget.value.split(paragraphs ? /\n\s*\n/ : "\n").map((s) => s.trim()).filter(Boolean));
        }}
      />
    </Wrap>
  );
}

function ListField({ f, value, onChange, ctx }: { f: Extract<Field, { kind: "list" }>; value: Obj[]; onChange: (v: Obj[]) => void; ctx: Ctx }) {
  const items = value ?? [];
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div class="f-row">
      <div class="a-label">{f.label}</div>
      {f.help && <p class="f-help">{f.help}</p>}
      {items.map((item, i) => (
        <div class="f-item" key={i}>
          <div class="f-item-head">
            <span class="f-item-n">{f.item} {i + 1}</span>
            <span class="f-item-tools">
              <button type="button" class="a-link" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
              <button type="button" class="a-link" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
              <button type="button" class="a-link danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
            </span>
          </div>
          <Fields fields={f.fields} value={item} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} ctx={ctx} />
        </div>
      ))}
      <button type="button" class="a-btn" onClick={() => onChange([...items, f.blank()])}>+ Add {f.item}</button>
    </div>
  );
}

function SectionsField({ value, onChange, ctx }: { value: Obj[]; onChange: (v: Obj[]) => void; ctx: Ctx }) {
  const items = value ?? [];
  const [adding, setAdding] = useState<keyof typeof SECTION_TYPES>("text");
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div class="f-row">
      <div class="a-label">Sections, top to bottom</div>
      {items.map((s, i) => {
        const spec = SECTION_TYPES[s.type as keyof typeof SECTION_TYPES];
        return (
          <div class="f-item" key={i}>
            <div class="f-item-head">
              <span class="f-item-n">{i + 1}. {spec?.label ?? s.type}</span>
              <span class="f-item-tools">
                <button type="button" class="a-link" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
                <button type="button" class="a-link" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
                <button type="button" class="a-link danger" onClick={() => confirm("Remove this section?") && onChange(items.filter((_, j) => j !== i))}>Remove</button>
              </span>
            </div>
            {spec && <Fields fields={spec.fields} value={s} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} ctx={ctx} />}
          </div>
        );
      })}
      <div class="f-add">
        <select class="a-input" value={adding} onChange={(e) => setAdding(e.currentTarget.value as keyof typeof SECTION_TYPES)} aria-label="Section type">
          {Object.entries(SECTION_TYPES).map(([k, s]) => <option value={k}>{s.label}</option>)}
        </select>
        <button type="button" class="a-btn" onClick={() => onChange([...items, SECTION_TYPES[adding].blank()])}>+ Add section</button>
      </div>
    </div>
  );
}

function LayoutField({ f, value, onChange }: { f: Extract<Field, { kind: "layout" }>; value: Obj[]; onChange: (v: Obj[]) => void }) {
  // Always list every block, even ones added after this was last saved.
  const items = [...(value ?? [])];
  for (const section of Object.keys(f.names)) if (!items.some((x) => x.section === section)) items.push({ section, show: true });
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div class="f-row">
      <div class="a-label">{f.label}</div>
      {items.map((x, i) => (
        <div class="f-layout" key={x.section}>
          <label class="f-check">
            <input type="checkbox" checked={x.show} onChange={(e) => onChange(items.map((y, j) => (j === i ? { ...y, show: e.currentTarget.checked } : y)))} />
            <span class={x.show ? "" : "a-muted"}>{f.names[x.section] ?? x.section}</span>
          </label>
          <span class="f-item-tools">
            <button type="button" class="a-link" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
            <button type="button" class="a-link" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
          </span>
        </div>
      ))}
      {f.help && <p class="f-help">{f.help}</p>}
    </div>
  );
}

function FieldView({ f, value, onChange, ctx }: { f: Field; value: Obj; onChange: (v: Obj) => void; ctx: Ctx }) {
  const id = useId();
  if (f.kind === "fieldset") {
    return (
      <fieldset class="f-set">
        <legend>{f.label}</legend>
        <Fields fields={f.fields} value={value} onChange={onChange} ctx={ctx} />
      </fieldset>
    );
  }
  const v = value[f.key];
  const set = (x: unknown) => {
    const next = { ...value };
    if (x === undefined) delete next[f.key];
    else next[f.key] = x;
    onChange(next);
  };
  switch (f.kind) {
    case "text":
    case "url":
    case "date":
      return (
        <Wrap label={f.label} help={f.help} id={id}>
          <input id={id} class="a-input" type={f.kind === "date" ? "date" : "text"} placeholder={f.placeholder} value={v ?? ""}
            onInput={(e) => set(e.currentTarget.value === "" && f.optional ? undefined : e.currentTarget.value)} />
        </Wrap>
      );
    case "textarea":
      return (
        <Wrap label={f.label} help={f.help} id={id}>
          <textarea id={id} class="a-input" value={v ?? ""} onInput={(e) => set(e.currentTarget.value === "" && f.optional ? undefined : e.currentTarget.value)} />
        </Wrap>
      );
    case "markdown":
      return <MarkdownField label={f.label} help={f.help} value={v ?? ""} onChange={set} />;
    case "number":
      return (
        <Wrap label={f.label} help={f.help} id={id}>
          <input id={id} class="a-input f-num" type="number" value={v ?? ""} onInput={(e) => set(Number(e.currentTarget.value) || 0)} />
        </Wrap>
      );
    case "boolean":
      return (
        <div class="f-row f-check">
          <label>
            <input type="checkbox" checked={!!v} onChange={(e) => set(e.currentTarget.checked)} /> {f.label}
          </label>
          {f.help && <p class="f-help">{f.help}</p>}
        </div>
      );
    case "select": {
      const options = f.options === "categories" ? ctx.categories : f.options;
      return (
        <Wrap label={f.label} help={f.help} id={id}>
          <select id={id} class="a-input" value={v ?? ""} onChange={(e) => set(e.currentTarget.value)}>
            {!options.includes(v) && <option value={v ?? ""}>{v || "Choose…"}</option>}
            {options.map((o) => <option value={o}>{o}</option>)}
          </select>
        </Wrap>
      );
    }
    case "lines":
      return <LinesField label={f.label} help={f.help} value={v} paragraphs={f.paragraphs} onChange={set} />;
    case "image":
      return <ImageField label={f.label} help={f.help} value={v} onChange={set} />;
    case "group":
      return (
        <fieldset class="f-set">
          <legend>{f.label}</legend>
          {f.help && <p class="f-help">{f.help}</p>}
          <Fields fields={f.fields} value={v ?? {}} onChange={set} ctx={ctx} />
        </fieldset>
      );
    case "list":
      return <ListField f={f} value={v} onChange={set} ctx={ctx} />;
    case "sections":
      return <SectionsField value={v} onChange={set} ctx={ctx} />;
    case "layout":
      return <LayoutField f={f} value={v} onChange={set} />;
    case "projects": {
      const chosen: string[] = v ?? [];
      return (
        <div class="f-row">
          <div class="a-label">{f.label}</div>
          <div class="f-picks">
            {ctx.projects.map((p) => (
              <label class="f-check">
                <input type="checkbox" checked={chosen.includes(p.slug)}
                  onChange={(e) => set(e.currentTarget.checked ? [...chosen, p.slug] : chosen.filter((s) => s !== p.slug))} /> {p.name}
              </label>
            ))}
          </div>
          {f.help && <p class="f-help">{f.help}</p>}
        </div>
      );
    }
  }
}

function Fields({ fields, value, onChange, ctx }: { fields: Field[]; value: Obj; onChange: (v: Obj) => void; ctx: Ctx }) {
  return <>{fields.map((f, i) => <FieldView key={i} f={f} value={value} onChange={onChange} ctx={ctx} />)}</>;
}

/* ---------- the editor ---------- */
type Status = { kind: "idle" | "busy" | "ok" | "error"; text: string; problems?: string[] };

export default function Editor(props: Props) {
  const { type, slug } = props;
  const [value, setValue] = useState<Obj>(props.draft);
  const [saved, setSaved] = useState(JSON.stringify(props.draft));
  const [published, setPublished] = useState<string | null>(props.published ? JSON.stringify(props.published) : null);
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });
  const [previewPage, setPreviewPage] = useState("home");
  const dirty = JSON.stringify(value) !== saved;
  const live = published !== null;
  const liveMatches = live && published === saved && !dirty;
  const labels = TYPE_LABELS[type];

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    addEventListener("beforeunload", warn);
    return () => removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function save(): Promise<boolean> {
    if (!dirty) return true;
    setStatus({ kind: "busy", text: "Saving…" });
    const { error } = await supabase.from("entries").update({ draft: value }).eq("type", type).eq("slug", slug);
    if (error) {
      setStatus({ kind: "error", text: `Couldn't save: ${error.message}` });
      return false;
    }
    setSaved(JSON.stringify(value));
    setStatus({ kind: "ok", text: "Draft saved. Nothing on the live site has changed." });
    return true;
  }

  async function preview() {
    const tab = window.open("about:blank", "_blank"); // open now so pop-up blockers allow it
    if (!(await save())) return tab?.close();
    const q = type === "settings" ? `?page=${previewPage}` : "";
    if (tab) tab.location.href = `/preview/${type}/${slug}${q}`;
  }

  async function act(action: "publish" | "unpublish" | "delete") {
    if (action === "publish" && !(await save())) return;
    if (action === "unpublish" && !confirm(`Take this ${labels.one.toLowerCase()} off the live site? It stays here as a draft.`)) return;
    if (action === "delete" && !confirm(`Delete this ${labels.one.toLowerCase()} for good? This can't be undone.`)) return;
    setStatus({ kind: "busy", text: action === "publish" ? "Publishing…" : "Working…" });
    const res = await fetch(`/api/admin/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, slug }),
    });
    const body = await res.json().catch(() => ({ error: "Something went wrong." }));
    if (!res.ok) return setStatus({ kind: "error", text: body.error, problems: body.problems });
    if (action === "delete") return (location.href = "/admin");
    setPublished(action === "publish" ? JSON.stringify(value) : null);
    const rebuild =
      body.rebuild === "started" ? " The live site updates in about a minute."
      : body.rebuild === "not-configured" ? " The site rebuild isn't connected yet, so the live site won't change until it is."
      : " The site rebuild didn't start; try Publish again in a minute.";
    setStatus({ kind: body.rebuild === "started" ? "ok" : "error", text: (action === "publish" ? "Published." : "Taken off the live site.") + rebuild });
  }

  const ctx: Ctx = { categories: props.categories, projects: props.projects };
  const path = publicPath(type, slug);

  return (
    <div class="editor">
      <div class="e-bar">
        <div class="e-state">
          <span class={`badge ${liveMatches ? "live" : live ? "changed" : "draft"}`}>
            {liveMatches ? "Live" : live ? "Live · changes not published" : "Draft · not live"}
          </span>
          {dirty && <span class="badge unsaved">Unsaved changes</span>}
        </div>
        <div class="e-actions">
          {type === "settings" && (
            <select class="a-input f-small" value={previewPage} onChange={(e) => setPreviewPage(e.currentTarget.value)} aria-label="Page to preview">
              <option value="home">Preview: Home</option>
              <option value="work">Preview: Work</option>
              <option value="about">Preview: About</option>
              <option value="contact">Preview: Contact</option>
              <option value="blog">Preview: Blog</option>
            </select>
          )}
          <button type="button" class="a-btn" onClick={save} disabled={!dirty || status.kind === "busy"}>Save draft</button>
          <button type="button" class="a-btn" onClick={preview} disabled={status.kind === "busy"}>Preview</button>
          <button type="button" class="a-btn primary" onClick={() => act("publish")} disabled={status.kind === "busy" || liveMatches}>Publish</button>
        </div>
      </div>
      {status.text && (
        <div class={`e-status ${status.kind}`} role="status">
          {status.text}
          {status.problems && <ul>{status.problems.map((p) => <li>{p}</li>)}</ul>}
        </div>
      )}

      <form class="e-form" onSubmit={(e) => { e.preventDefault(); save(); }}>
        <Fields fields={FIELDS[type]} value={value} onChange={setValue} ctx={ctx} />
      </form>

      <div class="e-foot">
        {live && type !== "testimonial" && <a href={path} target="_blank" rel="noopener">View live page ↗</a>}
        {type !== "settings" && (
          <span class="e-danger">
            {live && <button type="button" class="a-link" onClick={() => act("unpublish")}>Take off live site</button>}
            <button type="button" class="a-link danger" onClick={() => act("delete")}>Delete</button>
          </span>
        )}
      </div>
    </div>
  );
}
