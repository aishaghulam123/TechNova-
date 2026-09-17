
(() => {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  // ------------------------------------------------------------------
  // Intro animation (GSAP with graceful fallback)
  // ------------------------------------------------------------------
  const runIntro = () => {
    if (!window.gsap) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".brand", { y: -14, opacity: 0, duration: .6 })
      .from(".hero-illu", { y: 20, opacity: 0, duration: .8 }, "-=.3")
      .from(".hero-title", { y: 20, opacity: 0, duration: .7 }, "-=.5")
      .from(".hero-sub", { y: 14, opacity: 0, duration: .6 }, "-=.5")
      .from(".feature-list li", { y: 14, opacity: 0, duration: .5, stagger: .08 }, "-=.4")
      .from(".auth-card", { y: 26, opacity: 0, duration: .8, ease: "power4.out" }, "-=.9")
      .from(".auth-card .tabs, .auth-card .panel.active > *", {
        y: 12, opacity: 0, duration: .5, stagger: .06
      }, "-=.5");
  };
  if (document.readyState !== "loading") requestAnimationFrame(runIntro);
  else document.addEventListener("DOMContentLoaded", runIntro);
  // ------------------------------------------------------------------
  // Toasts
  // ------------------------------------------------------------------
  const ICONS = {
    success: "fa-solid fa-circle-check",
    error:   "fa-solid fa-circle-exclamation",
    info:    "fa-solid fa-circle-info"
  };
  const toast = (title, msg = "", type = "info", ms = 2600) => {
    const wrap = $("#toastWrap");
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="t-icon"><i class="${ICONS[type]}"></i></span>
                    <div><b>${title}</b>${msg ? `<span>${msg}</span>` : ""}</div>`;
    wrap.appendChild(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 320); }, ms);
  };
  // ------------------------------------------------------------------
  // Modal
  // ------------------------------------------------------------------
  const modal = $("#modal");
  const modalBody = $("#modalBody");
  const openModal = (html) => {
    modalBody.innerHTML = html;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  modal.addEventListener("click", (e) => { if (e.target.matches("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  // ------------------------------------------------------------------
  // Tabs
  // ------------------------------------------------------------------
  const tabs = $(".tabs");
  const tabBtns = $$(".tab", tabs);
  const panels = $$(".panel");
   const switchTab = (name, { animate = true } = {}) => {
    tabs.dataset.active = name;
    tabBtns.forEach(b => {
      const on = b.dataset.tab === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(p => {
      const on = p.dataset.panel === name;
      p.classList.toggle("active", on);
    });
    if (animate && window.gsap) {
      const active = $(`.panel[data-panel="${name}"]`);
      gsap.from(active.children, { y: 12, opacity: 0, duration: .45, stagger: .05, ease: "power3.out" });
    }
  };
  tabBtns.forEach(b => b.addEventListener("click", () => switchTab(b.dataset.tab)));

  const params = new URLSearchParams(location.search);
  if (params.get("mode") === "signup") switchTab("signup", { animate: false });
  // ------------------------------------------------------------------
  // Password visibility toggle
  // ------------------------------------------------------------------
  $$(".pw-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.toggle);
      if (!input) return;
      const isPw = input.type === "password";
      input.type = isPw ? "text" : "password";
      btn.innerHTML = `<i class="fa-regular ${isPw ? "fa-eye-slash" : "fa-eye"}"></i>`;
      btn.setAttribute("aria-label", isPw ? "Hide password" : "Show password");
    });
  });
  // ------------------------------------------------------------------
  // Password strength
  // ------------------------------------------------------------------
  const strengthEl = $(".pw-strength");
  const pwLabel = $("#pwLabel");
  const scorePw = (v) => {
    let s = 0;
    if (v.length >= 6) s++;
    if (v.length >= 10) s++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
    if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) s++;
    return Math.min(s, 4);
  };
  const LABELS = ["Password strength", "Weak", "Fair", "Good", "Strong"];
  $("#suPassword")?.addEventListener("input", (e) => {
    const s = scorePw(e.target.value);
    strengthEl.dataset.level = s;
    pwLabel.textContent = LABELS[s];
  });
  // ------------------------------------------------------------------
  // Validation helpers
  // ------------------------------------------------------------------
  const setErr = (id, msg) => {
    const input = document.getElementById(id);
    if (!input) return;
    const field = input.closest(".field");
    const err = $(`[data-err="${id}"]`);
    if (msg) {
      field.classList.add("invalid");
      if (err) err.textContent = msg;
    } else {
      field.classList.remove("invalid");
      if (err) err.textContent = "";
    }
  };
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  // Live validation cleanup
  document.addEventListener("input", (e) => {
    if (e.target.matches(".field input")) setErr(e.target.id, "");
  });
  // ------------------------------------------------------------------
  // Ripple effect
  // ------------------------------------------------------------------
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".ripple");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ink = document.createElement("span");
    ink.className = "ink";
    ink.style.width = ink.style.height = size + "px";
    ink.style.left = (e.clientX - rect.left - size / 2) + "px";
    ink.style.top  = (e.clientY - rect.top  - size / 2) + "px";
    btn.appendChild(ink);
    setTimeout(() => ink.remove(), 650);
  });
  // ------------------------------------------------------------------
  // Magnetic hover on primary buttons
  // ------------------------------------------------------------------
  $$(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top  - r.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
  // ------------------------------------------------------------------
  // Role selection micro-animation
  // ------------------------------------------------------------------
  $$(".role-card").forEach(card => {
    card.addEventListener("change", () => {
      if (!window.gsap) return;
      gsap.fromTo(card, { scale: .97 }, { scale: 1, duration: .35, ease: "back.out(2)" });
    });
  });
  // ------------------------------------------------------------------
  // Redirect helper
  // ------------------------------------------------------------------
  const redirectByRole = (role, user = {}) => {
    
    window.TechNova?.setSession({ role, ...user });
   
    const next = params.get("next");
    const target = next || window.TechNova?.homeFor(role) ||
      (role === "instructor" ? "instructor.html" : "stdashboard.html");
    setTimeout(() => { window.location.href = target; }, 900);
  };
  const loadingBtn = (btn, on, textOn = "Please wait…") => {
    if (on) {
      btn.dataset.orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <span>${textOn}</span>`;
    } else {
      btn.disabled = false;
      if (btn.dataset.orig) btn.innerHTML = btn.dataset.orig;
    }
  };
  // ------------------------------------------------------------------
  // Friendly copy for Firebase Auth / approval errors
  // ------------------------------------------------------------------
  const AUTH_ERROR_COPY = {
    "invalid-credentials": ["Incorrect email or password", "Please double-check and try again."],
    "no-profile": ["Account problem", "We couldn't find your profile. Please contact support."],
    "pending-approval": ["Awaiting admin approval", "Your account is still pending — you'll be able to log in once an admin approves it."],
    "rejected": ["Application rejected", "This account was not approved. Contact support if you think this is a mistake."],
    "suspended": ["Account suspended", "This account has been suspended. Contact support for help."],
    "auth/email-already-in-use": ["Email already registered", "Try logging in instead, or use a different email."],
    "auth/weak-password": ["Weak password", "Please choose at least 6 characters."],
    "auth/invalid-email": ["Invalid email", "Please enter a valid email address."],
    "auth/popup-closed-by-user": ["Sign-in cancelled", "You closed the Google window before finishing."],
    "auth/popup-blocked": ["Popup blocked", "Please allow popups for this site and try again."],
  };
  const explainAuthError = (err) => AUTH_ERROR_COPY[err?.message] || AUTH_ERROR_COPY[err?.code] ||
    ["Something went wrong", "Please try again in a moment."];
  // ------------------------------------------------------------------
  // LOGIN
  // ------------------------------------------------------------------
  $("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = $("#loginEmail").value.trim();
    const pass  = $("#loginPassword").value;
    let ok = true;
    if (!email) { setErr("loginEmail", "Email is required."); ok = false; }
    else if (!isEmail(email)) { setErr("loginEmail", "Enter a valid email."); ok = false; }
    if (!pass) { setErr("loginPassword", "Password is required."); ok = false; }
    else if (pass.length < 6) { setErr("loginPassword", "At least 6 characters."); ok = false; }
    if (!ok) return;
    const btn = e.submitter || $("#loginForm .btn-primary");
    loadingBtn(btn, true, "Signing in…");
    try {
      const user = await window.TechNova.logIn({ email, password: pass });
      toast("Welcome back!", `Redirecting to ${user.role} dashboard…`, "success");
      redirectByRole(user.role, user);
    } catch (err) {
      const [title, msg] = explainAuthError(err);
      toast(title, msg, "error");
    } finally {
      loadingBtn(btn, false);
    }
  });
  // ------------------------------------------------------------------
  // SIGNUP
  // ------------------------------------------------------------------
  $("#signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#suName").value.trim();
    const email = $("#suEmail").value.trim();
    const pass  = $("#suPassword").value;
    const conf  = $("#suConfirm").value;
    const role  = ($$("input[name='role']").find(r => r.checked) || {}).value || "student";
    let ok = true;
    if (!name) { setErr("suName", "Please tell us your name."); ok = false; }
    if (!email) { setErr("suEmail", "Email is required."); ok = false; }
    else if (!isEmail(email)) { setErr("suEmail", "Enter a valid email."); ok = false; }
    if (!pass) { setErr("suPassword", "Choose a password."); ok = false; }
    else if (pass.length < 6) { setErr("suPassword", "At least 6 characters."); ok = false; }
    if (!conf) { setErr("suConfirm", "Please confirm your password."); ok = false; }
    else if (conf !== pass) { setErr("suConfirm", "Passwords do not match."); ok = false; }
    if (!ok) return;
    const btn = e.submitter || $("#signupForm .btn-primary");
    loadingBtn(btn, true, "Creating account…");
    try {
      await window.TechNova.signUp({ name, email, password: pass, role });
      toast("Account created 🎉", "An admin needs to approve your account before you can log in.", "success", 4200);
      switchTab("login");
      $("#signupForm").reset();
    } catch (err) {
      const [title, msg] = explainAuthError(err);
      toast(title, msg, "error");
    } finally {
      loadingBtn(btn, false);
    }
  });
  // ------------------------------------------------------------------
  // Google sign-in — not wired to a real OAuth provider yet.
  // ------------------------------------------------------------------
  $$("[data-google]").forEach(b => {
    b.addEventListener("click", async () => {
      loadingBtn(b, true, "Connecting to Google…");
      try {
        const user = await window.TechNova.signInWithGoogle();
        toast("Welcome!", `Redirecting to ${user.role} dashboard…`, "success");
        redirectByRole(user.role, user);
      } catch (err) {
        const [title, msg] = explainAuthError(err);
        toast(title, msg, "error");
      } finally {
        loadingBtn(b, false);
      }
    });
  });
  // ------------------------------------------------------------------
  // Forgot password
  // ------------------------------------------------------------------
  $("#forgotLink").addEventListener("click", (e) => {
    e.preventDefault();
    openModal(`
      <h3>Reset your password</h3>
      <p>Enter your email and we'll send you a reset link.</p>
      <div class="field" style="margin-bottom:12px;">
        <input type="email" id="fpEmail" placeholder=" " />
        <label for="fpEmail">Email address</label>
      </div>
      <button class="btn-primary ripple" id="fpSend" style="width:100%;">
        <span>Send reset link</span>
      </button>
    `);
    setTimeout(() => {
      $("#fpSend").addEventListener("click", () => {
        const v = $("#fpEmail").value.trim();
        if (!isEmail(v)) { toast("Invalid email", "Please enter a valid email address.", "error"); return; }
        closeModal();
        toast("Reset link sent", `Check ${v} for instructions.`, "success");
      });
    }, 0);
  });
})();