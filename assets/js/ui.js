/* ===================== TOAST & MODAL ===================== */
function toast(msg, type){
  type = type || 'info';
  const w = $('#toast-wrap');
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  const ic = type==='success' ? 'check' : type==='error' ? 'alert-triangle' : 'info';
  t.innerHTML = '<i data-lucide="'+ic+'"></i><span>'+esc(msg)+'</span>';
  w.appendChild(t); refreshIcons();
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),300); }, 3200);
}
function openModal(html){
  $('#modal-root').innerHTML = '<div class="overlay" id="m-overlay"><div class="modal">'+html+'</div></div>';
  document.body.style.overflow = 'hidden';
  $('#m-overlay').addEventListener('click', e=>{ if(e.target.id==='m-overlay') closeModal(); });
  refreshIcons();
}
function closeModal(){ $('#modal-root').innerHTML=''; document.body.style.overflow=''; }
function confirmDialog(msg, onYes){
  openModal('<h3>Konfirmasi</h3><p class="m-text">'+esc(msg)+'</p>'+
    '<div class="m-actions"><button class="btn btn-outline btn-sm" id="m-cancel">Batal</button>'+
    '<button class="btn btn-danger btn-sm" id="m-yes">Ya, Hapus</button></div>');
  $('#m-cancel').onclick = closeModal;
  $('#m-yes').onclick = ()=>{ closeModal(); onYes(); };
}

