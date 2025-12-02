import html2pdf from 'html2pdf.js';

// Opens an in-page download preview modal allowing the user to adjust
// advanced settings (scale, margins) and confirm the PDF download.
// This keeps the UX in-app (no popup) and then uses html2pdf to save.
export const generatePDF = () => {
  const existing = document.getElementById('resume-download-modal');
  if (existing) return; // already open

  const element = document.getElementById('resume-preview');
  if (!element) return;

  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'resume-download-modal';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    background: 'rgba(0,0,0,0.6)',
    zIndex: '99999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  });

  // Modal box
  const modal = document.createElement('div');
  Object.assign(modal.style, {
    width: '100%',
    maxWidth: '1100px',
    height: '80vh',
    background: '#fff',
    borderRadius: '8px',
    display: 'flex',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  });

  // Left: preview area
  const previewPane = document.createElement('div');
  Object.assign(previewPane.style, {
    flex: '1 1 0',
    overflow: 'auto',
    padding: '20px',
    background: '#f6f7f9'
  });

  // Right: controls
  const controls = document.createElement('div');
  Object.assign(controls.style, {
    width: '320px',
    padding: '18px',
    borderLeft: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  });

  // Title
  const title = document.createElement('h3');
  title.textContent = 'Download Preview & Settings';
  Object.assign(title.style, { margin: '0 0 8px 0', fontSize: '16px' });
  controls.appendChild(title);

  // Scale control
  const scaleLabel = document.createElement('label');
  scaleLabel.textContent = 'Preview scale';
  const scaleInput = document.createElement('input');
  scaleInput.type = 'range';
  scaleInput.min = '0.5';
  scaleInput.max = '1.2';
  scaleInput.step = '0.05';
  scaleInput.value = '1';
  Object.assign(scaleInput.style, { width: '100%' });
  const scaleValue = document.createElement('div');
  scaleValue.textContent = '100%';
  controls.appendChild(scaleLabel);
  controls.appendChild(scaleInput);
  controls.appendChild(scaleValue);

  // Margin control
  const marginLabel = document.createElement('label');
  marginLabel.textContent = 'PDF margin (mm)';
  const marginInput = document.createElement('input');
  marginInput.type = 'number';
  marginInput.min = '0';
  marginInput.max = '50';
  marginInput.value = '10';
  Object.assign(marginInput.style, { width: '100%' });
  controls.appendChild(marginLabel);
  controls.appendChild(marginInput);

  // Format select
  const formatLabel = document.createElement('label');
  formatLabel.textContent = 'Page format';
  const formatSelect = document.createElement('select');
  ['a4', 'letter'].forEach(f => {
    const o = document.createElement('option'); o.value = f; o.textContent = f.toUpperCase(); formatSelect.appendChild(o);
  });
  formatSelect.value = 'a4';
  controls.appendChild(formatLabel);
  controls.appendChild(formatSelect);

  // Filename
  const fileLabel = document.createElement('label');
  fileLabel.textContent = 'Filename';
  const fileInput = document.createElement('input');
  fileInput.type = 'text'; fileInput.value = 'resume.pdf';
  controls.appendChild(fileLabel);
  controls.appendChild(fileInput);

  // DevTools debug toggle (allows showing the export container in DOM for inspection)
  const debugLabel = document.createElement('label');
  debugLabel.textContent = 'Show export container (DevTools)';
  const debugCheckbox = document.createElement('input');
  debugCheckbox.type = 'checkbox';
  debugCheckbox.style.marginLeft = '8px';
  const debugRow = document.createElement('div');
  Object.assign(debugRow.style, { display: 'flex', alignItems: 'center', gap: '8px' });
  debugRow.appendChild(debugLabel);
  debugRow.appendChild(debugCheckbox);
  controls.appendChild(debugRow);

  // Buttons
  const btnRow = document.createElement('div');
  Object.assign(btnRow.style, { display: 'flex', gap: '8px', marginTop: 'auto' });
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  const downloadBtn = document.createElement('button');
  downloadBtn.textContent = 'Download';
  Object.assign(cancelBtn.style, { padding: '8px 12px' });
  Object.assign(downloadBtn.style, { padding: '8px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' });
  btnRow.appendChild(cancelBtn);
  btnRow.appendChild(downloadBtn);
  controls.appendChild(btnRow);

  // Build preview content: clone the .resume-page elements to keep DOM clean
  const cloneContainer = document.createElement('div');
  cloneContainer.style.display = 'flex';
  cloneContainer.style.flexDirection = 'column';
  cloneContainer.style.gap = '20px';
  cloneContainer.style.alignItems = 'center';

  const pages = Array.from(element.querySelectorAll('.resume-page'));
  if (pages.length === 0) {
    // fallback: clone entire element
    const fallback = element.cloneNode(true);
    // remove measurement helper if present
    const m = fallback.querySelector('.resume-hidden-measurement'); if (m) m.remove();
    fallback.style.width = '210mm';
    cloneContainer.appendChild(fallback);
  } else {
    pages.forEach(p => {
      const pClone = p.cloneNode(true);
      // remove ids and animations
      pClone.removeAttribute('id');
      pClone.style.animation = 'none';
      pClone.style.transition = 'none';
      pClone.style.transform = 'none';
      pClone.style.width = '210mm';
      pClone.style.boxShadow = 'none';
      pClone.style.background = '#fff';
      cloneContainer.appendChild(pClone);
    });
  }

  previewPane.appendChild(cloneContainer);
  modal.appendChild(previewPane);
  modal.appendChild(controls);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Update preview scale when slider changes
  const applyScale = (s) => {
    cloneContainer.style.transform = `scale(${s})`;
    cloneContainer.style.transformOrigin = 'top center';
    scaleValue.textContent = `${Math.round(s*100)}%`;
  };
  applyScale(parseFloat(scaleInput.value));
  scaleInput.addEventListener('input', () => applyScale(parseFloat(scaleInput.value)));

  // Cancel handler
  const closeModal = () => {
    const el = document.getElementById('resume-download-modal');
    if (el) el.remove();
    window.removeEventListener('keydown', escHandler);
  };
  cancelBtn.addEventListener('click', closeModal);

  const escHandler = (e) => { if (e.key === 'Escape') closeModal(); };
  window.addEventListener('keydown', escHandler);

  // Download handler: run html2pdf on the real `element` with chosen options
  downloadBtn.addEventListener('click', async () => {
    downloadBtn.disabled = true; cancelBtn.disabled = true;
    const marginMm = parseFloat(marginInput.value);
    const filename = (fileInput.value && fileInput.value.trim()) || 'resume.pdf';
    const format = (formatSelect.value || 'a4').toLowerCase();
    const scale = parseFloat(scaleInput.value) || 1;

    // Create a temporary container for the PDF generation so html2canvas can render it.
    // It must be present in the viewport (not visibility:hidden or display:none) to be captured,
    // so we position it at top-left and make it invisible with opacity:0 and pointer-events:none.
    const exportContainer = document.createElement('div');
    // Expose an id so it's easy to find in DevTools
    exportContainer.id = 'resume-export-container-debug';
    Object.assign(exportContainer.style, {
      width: '210mm',
      display: 'block',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '99998',
      background: '#fff',
      opacity: '0',
      pointerEvents: 'none',
      boxSizing: 'border-box'
    });

    // Clone all pages so their styles from the app still apply. Force page breaks between clones.
    const pages = element.querySelectorAll('.resume-page');
    pages.forEach(p => {
      const pClone = p.cloneNode(true);
      pClone.removeAttribute('id');
      pClone.style.margin = '0';
      pClone.style.boxShadow = 'none';
      pClone.style.width = '210mm';
      pClone.style.boxSizing = 'border-box';
      pClone.style.transform = 'none';
      // Ensure each clone starts on its own PDF page
      pClone.style.pageBreakAfter = 'always';
      pClone.style.breakAfter = 'page';
      // make sure cloned content is visible to html2canvas (opacity inherited from container)
      pClone.style.opacity = '1';
      exportContainer.appendChild(pClone);
    });

    document.body.appendChild(exportContainer);

    // Toggle debug visibility from the modal checkbox
    const setDebugVisible = (visible) => {
      if (!exportContainer) return;
      if (visible) {
        exportContainer.style.opacity = '0.95';
        exportContainer.style.pointerEvents = 'auto';
        exportContainer.style.zIndex = '999999';
        exportContainer.style.border = '2px solid rgba(255,0,0,0.6)';
      } else {
        exportContainer.style.opacity = '0';
        exportContainer.style.pointerEvents = 'none';
        exportContainer.style.zIndex = '99998';
        exportContainer.style.border = 'none';
      }
    };
    // Initialize from checkbox (off by default)
    setDebugVisible(debugCheckbox.checked);
    debugCheckbox.addEventListener('change', () => setDebugVisible(debugCheckbox.checked));

    // Map selected preview scale to html2canvas scale factor (higher => sharper)
    const canvasScale = Math.max(1, Math.round(2 * scale));

    const opt = {
      margin: isNaN(marginMm) ? 0 : marginMm,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: canvasScale, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: format, orientation: 'portrait' }
    };

    try {
      // Helpful debug logs for DevTools inspection
      console.log('[pdfExport] Starting export with options:', { filename, format, marginMm, scale, canvasScale });
      console.log('[pdfExport] Export container id:', exportContainer.id, 'clone count:', exportContainer.children.length);
      Array.from(exportContainer.children).forEach((c, i) => {
        try {
          console.log(`[pdfExport] clone ${i}: scrollHeight=${c.scrollHeight} offsetHeight=${c.offsetHeight} textLength=${(c.innerText||'').length}`);
        } catch (e) { /* ignore */ }
      });

      // Wait a frame to ensure any final UI paints
      await new Promise(r => requestAnimationFrame(r));

      // Small additional delay can help resources (fonts/images) finish loading when debugging
      if (debugCheckbox.checked) await new Promise(r => setTimeout(r, 250));

      await html2pdf().set(opt).from(exportContainer).save();
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      if (document.body.contains(exportContainer)) {
        document.body.removeChild(exportContainer);
      }
      closeModal();
    }
  });
};

// Direct download without modal or print preview.
// Uses existing paginated .resume-page elements inside #resume-print-root if present;
// falls back to #resume-preview.
