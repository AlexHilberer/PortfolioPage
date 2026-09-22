window.APP = window.APP || { data: {}, i18n: {} };

(function () {
  "use strict";

  var ICONS = {
    azure:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M8.5 3h5.1l-5.3 15.4L2 20.5 8.5 3z"/>' +
      '<path d="M14.2 3.8 8.9 18.6h11.7L15 9.4h-5l1.7-4.9z"/>' +
      "</svg>",
    gcp:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M14.5 8.3a5.6 5.6 0 0 0-5.4 4.1A4.3 4.3 0 0 0 5 16.6 4.3 4.3 0 0 0 9.3 21h9a4 4 0 0 0 .6-8 5.6 5.6 0 0 0-4.4-4.7z"/>' +
      "</svg>",
    onprem:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<rect x="3" y="4" width="18" height="4.5" rx="1"/>' +
      '<rect x="3" y="10" width="18" height="4.5" rx="1"/>' +
      '<rect x="3" y="16" width="18" height="4.5" rx="1"/>' +
      "</svg>",
    calendar:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="3" y="5" width="18" height="16" rx="2"/>' +
      '<path d="M16 3v4M8 3v4M3 10h18"/>' +
      "</svg>",
    dataplatforms:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z"/>' +
      '<path d="M4 9.5v3c0 1.7 3.6 3 8 3s8-1.3 8-3v-3c0 1.7-3.6 3-8 3s-8-1.3-8-3z"/>' +
      '<path d="M4 15.5V18c0 1.7 3.6 3 8 3s8-1.3 8-3v-2.5c0 1.7-3.6 3-8 3s-8-1.3-8-3z"/>' +
      "</svg>",
    aisystems:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<rect x="8" y="8" width="8" height="8" rx="1.5"/>' +
      '<rect x="10.5" y="2" width="3" height="4" rx="1"/>' +
      '<rect x="10.5" y="18" width="3" height="4" rx="1"/>' +
      '<rect x="2" y="10.5" width="4" height="3" rx="1"/>' +
      '<rect x="18" y="10.5" width="4" height="3" rx="1"/>' +
      "</svg>",
    mlops:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 5V2L8 5.5 12 9V6a5.5 5.5 0 0 1 5.4 6.6l1.9.5A7.5 7.5 0 0 0 12 5z"/>' +
      '<path d="M12 19v3l4-3.5L12 15v3a5.5 5.5 0 0 1-5.4-6.6l-1.9-.5A7.5 7.5 0 0 0 12 19z"/>' +
      "</svg>",
    cloud:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M7 18a5 5 0 0 1-.4-9.98 6 6 0 0 1 11.4 1.98A4.5 4.5 0 0 1 17.5 18H7z"/>' +
      "</svg>"
  };

  function getIcon(key) {
    return ICONS[key] || "";
  }

  APP.icons = {
    getIcon: getIcon
  };
})();
