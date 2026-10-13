/* =====================================================================
   INIT
===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.dataset.logo = CONFIG.logoMode === 'logo-only' ? 'only' : 'text';
  bindHeader();
  updateSettingsUI();
  route();
  window.addEventListener('hashchange', () => route());
  syncFromSheets();
});
