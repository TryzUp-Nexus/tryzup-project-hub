export function ProgressBar(progress) {
  const defined = Number.isFinite(progress);
  const value = defined ? Math.min(100, Math.max(0, progress)) : 0;
  return `<div class="progress-head"><span>Avance</span><strong>${defined ? `${value}%` : "Por definir"}</strong></div><div class="progress-track" role="progressbar" aria-label="Avance del proyecto" aria-valuemin="0" aria-valuemax="100" ${defined ? `aria-valuenow="${value}"` : "aria-valuetext=\"Por definir\""}><span style="width:${value}%"></span></div>`;
}

