
(function () {
  "use strict";

  const allowed = window.TECHNOVA_ALLOWED_ROLE; // "admin" | "instructor" | "student"
  const TN = window.TechNova;
  if (!TN) { console.error("guard.js: TechNova not loaded — check script order"); return; }
  if (!allowed) { console.error("guard.js: window.TECHNOVA_ALLOWED_ROLE not set on this page"); return; }

  const roleOk = (role) => role === allowed;

  /* ---- 1) Instant check  ---- */
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
    TN.setSession(user);
  });
})();
