/* ==========================================================================
   TaniRaya ERP — Shared JS (Static Prototype, no backend)
   ========================================================================== */

// ---- Live clock shown in headers ----
function startLiveClock() {
  const el = document.getElementById('liveClock');
  if (!el) return;

  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  function pad(n) { return n.toString().padStart(2, '0'); }

  function render() {
    const now = new Date();
    const time = pad(now.getHours()) + ':' + pad(now.getMinutes());
    const date = dayNames[now.getDay()] + ', ' + now.getDate() + ' ' + monthNames[now.getMonth()] + ' ' + now.getFullYear();
    el.innerHTML = '<span class="clock-time">' + time + '</span><span>' + date + '</span>';
  }
  render();
  setInterval(render, 15000);
}

// ---- Tabs: switch between "Daftar" (list) and "Form" views ----
function initTabs() {
  const tabButtons = document.querySelectorAll('[data-tab-target]');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');
      switchView(targetId, btn);
    });
  });
}

function switchView(targetId, triggerBtn) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('is-active'));
  const target = document.getElementById(targetId);
  if (target) target.classList.add('is-active');

  if (triggerBtn) {
    const group = triggerBtn.closest('.tabs');
    if (group) {
      group.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('is-active'));
      triggerBtn.classList.add('is-active');
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Toast (used to simulate save / approve / reject actions) ----
let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById('demoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demoToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

// ---- Demo form submit: prevent real submit, show toast, go back to list ----
function handleDemoSubmit(event, message, listViewId) {
  event.preventDefault();
  showToast(message || 'Data tersimpan (mode demo, belum tersambung database)');
  setTimeout(() => {
    if (listViewId) {
      switchView(listViewId, document.querySelector('[data-tab-target="' + listViewId + '"]'));
    }
    event.target.reset();
  }, 900);
  return false;
}

// ---- Demo action buttons (approve / reject / delete) on list cards ----
function handleDemoAction(event, message) {
  event.preventDefault();
  event.stopPropagation();
  showToast(message);
}

document.addEventListener('DOMContentLoaded', () => {
  startLiveClock();
  initTabs();
});
