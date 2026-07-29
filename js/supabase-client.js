// ─── FAFX SUPABASE CLIENT ───
// Requires the Supabase JS CDN script to be loaded BEFORE this file:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>

// TODO: replace with your real project values (Supabase Dashboard → Project Settings → API)
const SUPABASE_URL = 'https://qbfxwnbpjwuqtqzhmnca.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZnh3bmJwand1cXRxemhtbmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzMTk2NzYsImV4cCI6MjEwMDg5NTY3Nn0.r7DPgRI3h7oUzJcatf6OvyQ6WtGL_xux5AgsdYcNITk';

const fafxDB = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Shared helpers used across login / admission / dashboard / admin pages ──

// Returns the logged-in user's profile row, or null if not logged in / no profile yet
async function fafxGetProfile() {
  const { data: { session } } = await fafxDB.auth.getSession();
  if (!session) return null;
  const { data, error } = await fafxDB
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  if (error) return null;
  return data;
}

// Redirects to login if not authenticated. Call at top of protected pages.
async function fafxRequireLogin(redirectTo = 'login.html') {
  const { data: { session } } = await fafxDB.auth.getSession();
  if (!session) {
    window.location.href = redirectTo;
    return null;
  }
  return session;
}

// Redirects away if the logged-in user isn't an admin. Call at top of admin.html.
async function fafxRequireAdmin(redirectTo = 'login.html') {
  const profile = await fafxGetProfile();
  if (!profile || profile.role !== 'admin') {
    window.location.href = redirectTo;
    return null;
  }
  return profile;
}

async function fafxLogout() {
  await fafxDB.auth.signOut();
  window.location.href = 'login.html';
}
