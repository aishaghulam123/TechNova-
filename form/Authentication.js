document.addEventListener('DOMContentLoaded', () => {
  // App State Variables
  let currentRole = 'student';
  let currentTab = 'login';

  // DOM Elements Initialization
  const tabLogin = document.getElementById('tabLogin');
  const tabSignup = document.getElementById('tabSignup');
  const loginFormSection = document.getElementById('loginFormSection');
  const signupFormSection = document.getElementById('signupFormSection');

  const roleStudent = document.getElementById('roleStudent');
  const roleInstructor = document.getElementById('roleInstructor');

  const studentCourseField = document.getElementById('studentCourseField');
  const instructorExpertiseField = document.getElementById('instructorExpertiseField');

  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');

  const linkToSignup = document.getElementById('linkToSignup');
  const linkToLogin = document.getElementById('linkToLogin');

  const authLoginForm = document.getElementById('authLoginForm');
  const authSignupForm = document.getElementById('authSignupForm');

  // Navigation Event Listeners
  tabLogin.addEventListener('click', () => switchTab('login'));
  tabSignup.addEventListener('click', () => switchTab('signup'));
  linkToSignup.addEventListener('click', () => switchTab('signup'));
  linkToLogin.addEventListener('click', () => switchTab('login'));

  roleStudent.addEventListener('click', () => updateRole('student'));
  roleInstructor.addEventListener('click', () => updateRole('instructor'));

  function switchTab(targetTab) {
    currentTab = targetTab;
    const isLogin = targetTab === 'login';

    tabLogin.classList.toggle('active', isLogin);
    tabSignup.classList.toggle('active', !isLogin);

    loginFormSection.classList.toggle('active', isLogin);
    signupFormSection.classList.toggle('active', !isLogin);
  }

  function updateRole(targetRole) {
    currentRole = targetRole;
    const isStudent = targetRole === 'student';

    roleStudent.classList.toggle('active', isStudent);
    roleInstructor.classList.toggle('active', !isStudent);

    studentCourseField.style.display = isStudent ? 'block' : 'none';
    instructorExpertiseField.style.display = isStudent ? 'none' : 'block';

    const formattedRole = targetRole.charAt(0).toUpperCase() + targetRole.slice(1);
    loginBtn.textContent = `Login as ${formattedRole}`;
    signupBtn.textContent = `Register as ${formattedRole}`;
  }

  // Form Submissions
  authLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Logged in successfully as ${currentRole.toUpperCase()}!`);
  });

  authSignupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Account created successfully for ${currentRole.toUpperCase()}!`);
  });

  // Particle Canvas Background Animation
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  
  let nodes = [];
  const maxNodes = 45;
  const maxDistance = 130;

  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', handleResize);
  handleResize();

  class ParticleNode {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#2F80ED' : '#FFAA00';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  // Initialize particles
  for (let i = 0; i < maxNodes; i++) {
    nodes.push(new ParticleNode());
  }

  function renderConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = 1 - (dist / maxDistance);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(47, 128, 237, ${alpha * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    renderConnections();
    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();
});