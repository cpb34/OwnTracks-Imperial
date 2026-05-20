window.owntracks = window.owntracks || {};
const startDateTime = new Date();
startDateTime.setHours(0, 0, 0, 0);
startDateTime.setDate(startDateTime.getDate() - 1);

// Default to metric until loaded from server
window._owntracks_metric = true;

// Load preference from server
fetch('/units-api')
  .then(r => r.json())
  .then(data => {
    window._owntracks_metric = data.metric;
    _owntracks_applyUnits();
    const root = document.querySelector('#app').__vue__.$root;
    if (root) {
      const forceAll = (vm) => { vm.$forceUpdate(); vm.$children.forEach(forceAll); };
      forceAll(root);
    }
  });

// Apply units to scale bar, retry until map is ready
window._owntracks_applyUnits = function() {
  const metric = document.querySelector('.leaflet-control-scale-line:first-child');
  const imperial = document.querySelector('.leaflet-control-scale-line:last-child');
  if (!metric || !imperial) {
    setTimeout(_owntracks_applyUnits, 200);
    return;
  }
  metric.style.display = window._owntracks_metric ? '' : 'none';
  imperial.style.display = window._owntracks_metric ? 'none' : '';
};

// Toggle function
window._owntracks_toggle = function() {
  window._owntracks_metric = !window._owntracks_metric;

  // Save to server
  fetch('/units-api', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({metric: window._owntracks_metric})
  });

  _owntracks_applyUnits();
  document.activeElement.blur();
  const root = document.querySelector('#app').__vue__.$root;
  if (root) {
    const forceAll = (vm) => { vm.$forceUpdate(); vm.$children.forEach(forceAll); };
    forceAll(root);
  }
};

// Apply scale bar on load
window._owntracks_applyUnits();

window.owntracks.config = {
    startDateTime,
    endDateTime: new Date(),
    map: {
        layers: {
            points: true,
        },
        controls: {
            scale: {
                metric: true,
                imperial: true,
            },
        },
    },
};
