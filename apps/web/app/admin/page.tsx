"use client";

import type { Template } from "@reelio/template-schema";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type TemplateRow = {
  id: string;
  name: string;
  category: string;
  published: boolean;
  created_at: string;
  preview_image_url: string | null;
  schema: Template;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [rows, setRows] = useState<TemplateRow[]>([]);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("created_at", { ascending: false });

    // RLS rejects non-admins; surface that as an access-denied state.
    if (error && (error.code === "42501" || error.code === "PGRST301")) {
      setDenied(true);
      setRows([]);
    } else if (error) {
      console.error(error.message);
    } else {
      setDenied(false);
      setRows((data ?? []) as TemplateRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }
      load();
    });
  }, [router, load]);

  async function togglePublish(row: TemplateRow) {
    setRows((current) =>
      current.map((r) => (r.id === row.id ? { ...r, published: !r.published } : r))
    );
    const { error } = await supabase
      .from("templates")
      .update({ published: !row.published })
      .eq("id", row.id);
    if (error) {
      console.error(error.message);
      // Revert optimistic update on failure.
      setRows((current) =>
        current.map((r) => (r.id === row.id ? { ...r, published: row.published } : r))
      );
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return <main className="p-10 text-white/50">Loading…</main>;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Templates</h1>
          <p className="text-sm text-white/50">
            Design, preview and publish templates to the app.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            disabled
            title="Template designer arrives in the next milestone"
            className="cursor-not-allowed rounded-lg bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-black opacity-40"
          >
            New template
          </button>
          <button
            onClick={signOut}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40"
          >
            Sign out
          </button>
        </div>
      </header>

      {denied ? (
        <p className="mt-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          This account doesn&apos;t have admin access. Set{" "}
          <code className="rounded bg-black/40 px-1">is_admin = true</code> for
          your profile in Supabase (see supabase/README.md).
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-10 text-white/50">
          No templates yet. The starter templates live in{" "}
          <code className="rounded bg-black/40 px-1">
            packages/template-schema
          </code>{" "}
          — the designer and seed script arrive in the next milestone.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center gap-4">
                {row.preview_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={row.preview_image_url}
                    alt=""
                    className="h-16 w-9 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-16 w-9 rounded-md bg-white/10" />
                )}
                <div>
                  <p className="font-semibold">{row.name}</p>
                  <p className="text-xs text-white/50">
                    {row.category} ·{" "}
                    {new Date(row.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => togglePublish(row)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  row.published
                    ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {row.published ? "Published" : "Draft"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
