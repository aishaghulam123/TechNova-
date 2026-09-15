/* =========================================================
   TechNova Academy — guard.js
   ---------------------------------------------------------
   Page guard for role-protected dashboards (admin / instructor
   / student). This is the "admin guard" pattern you shared,
   generalised for any role and adapted to this project's real
   file names (authentication.html, admin.html, instructor.html,
   stdashboard.html live together inside /pages/).

   HOW TO USE (already added to admin.html / instructor.html /
   stdashboard.html — nothing to do):
     <script>window.TECHNOVA_ALLOWED_ROLE = "admin";</script>
     <script type="module" src="../js/firebase.js"></script>
     <script type="module" src="../js/guard.js"></script>

   What it does:
   1. INSTANT check from the cached session (localStorage) so the
      page doesn't flash before Firebase responds — exactly like
      your pasted guard:
        const user = ...; if (!user) redirect to login;
        else if (user.role !== "admin") redirect away.
   2. REAL check against Firebase Auth + Firestore right after,
      so a revoked/suspended/rejected account (or a stale/tampered
      localStorage value) gets kicked out even if step 1 passed.
   ========================================================= */
(function () {
  "use strict";

  const allowed = window.TECHNOVA_ALLOWED_ROLE; // "admin" | "instructor" | "student"
  const TN = window.TechNova;
  if (!TN) { console.error("guard.js: TechNova not loaded — check script order"); return; }
  if (!allowed) { console.error("guard.js: window.TECHNOVA_ALLOWED_ROLE not set on this page"); return; }

  const roleOk = (role) => role === allowed;

  /* ---- 1) Instant check (your pasted admin-guard pattern) ---- */
  const cached = TN.getSession();
  if (!cached) {
    window.location.replace(TN.loginPath());
    return;
  } else if (!roleOk(cached.role)) {
    window.location.replace(TN.homeFor(cached.role));
    return;
  }

  /* ---- 2) Real re-verification against Firebase ---- */
  TN.onAuth((user) => {
    if (!user) {
      TN.clearSession();
      window.location.replace(TN.loginPath());
      return;
    }
    if (user.status !== "approved") {
      TN.clearSession();
      window.location.replace(TN.loginPath());
      return;
    }
    if (!roleOk(user.role)) {
      window.location.replace(TN.homeFor(user.role));
      return;
    }
    // All good — keep the cached session fresh.
    TN.setSession(user);
  });
})();
