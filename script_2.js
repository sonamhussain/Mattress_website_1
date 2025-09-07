// script.js
const base = 699;
const priceEl = document.getElementById('price');

const sizeEl = document.getElementById('size');
const firmEl = document.getElementById('firm');
const matEl = document.getElementById('material');

function computePrice(){
  const sizeMul = Number(sizeEl.selectedOptions[0].dataset.mult || 1);
  const firmAdd = Number(firmEl.selectedOptions[0].dataset.add || 0);
  const matAdd = Number(matEl.selectedOptions[0].dataset.add || 0);
  const price = Math.round((base * sizeMul) + firmAdd + matAdd);
  return price;
}
function updatePriceUI(){
  const p = computePrice();
  priceEl.textContent = `$${p.toLocaleString()}`;
}

// init
updatePriceUI();
[sizeEl, firmEl, matEl].forEach(el => el.addEventListener('change', updatePriceUI));

// Posture toggles
const postureBtns = document.querySelectorAll('.posture');
postureBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    postureBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed','true');

    // Recommend firmness based on posture
    const p = btn.dataset.posture;
    if(p === 'Side') firmEl.value = 'Soft';
    else if(p === 'Back') firmEl.value = 'Medium';
    else firmEl.value = 'Firm';
    updatePriceUI();
  });
});

// Customize modal behavior
const customizeBtn = document.getElementById('customizeBtn');
const modal = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const closeGhost = document.getElementById('closeGhost');
const modalContent = document.getElementById('modalContent');
const buyBtn = document.getElementById('buyBtn');

customizeBtn.addEventListener('click', () => {
  const posture = document.querySelector('.posture.active')?.dataset.posture || 'Side';
  const total = computePrice();
  modalContent.innerHTML = `
    <ul style="padding-left:18px;margin:6px 0">
      <li><strong>Posture:</strong> ${posture}</li>
      <li><strong>Size:</strong> ${sizeEl.value}</li>
      <li><strong>Firmness:</strong> ${firmEl.value}</li>
      <li><strong>Material:</strong> ${matEl.value}</li>
      <li style="margin-top:8px"><strong>Price:</strong> $${total}</li>
    </ul>
  `;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
});

// close modal functions
function closeModal(){
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}
modalClose.addEventListener('click', closeModal);
closeGhost.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=> { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

// Buy button (shows result / alert)
buyBtn.addEventListener('click', () => {
  const details = {
    posture: document.querySelector('.posture.active')?.dataset.posture || 'Side',
    size: sizeEl.value,
    firmness: firmEl.value,
    material: matEl.value,
    price: computePrice()
  };
  // show a neat result box (we'll use alert for demo)
  alert(`Order summary:\nPosture: ${details.posture}\nSize: ${details.size}\nFirmness: ${details.firmness}\nMaterial: ${details.material}\nTotal: $${details.price}`);
  closeModal();
});

// Compare button scroll
document.getElementById('compareBtn').addEventListener('click', () => {
  document.getElementById('compare-title').scrollIntoView({behavior:'smooth', block:'center'});
});

// Card buttons (learn/read)
document.querySelectorAll('[data-action]').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const action = btn.dataset.action;
    const product = btn.dataset.product;
    if(action === 'learn') alert(`Learn more: ${product}\n- Feature: Medium Firm\n- Offer: 30% off`);
    else if(action === 'read') alert(`Read more: ${product}\n- Comfortable layers\n- Price shown on card`);
  });
});
