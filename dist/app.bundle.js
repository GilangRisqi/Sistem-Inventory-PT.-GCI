"use strict";
(self["webpackChunkprojectkp"] = self["webpackChunkprojectkp"] || []).push([["app"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/style.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Reset and base styles */

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.half-width {
  flex: 1;
}

.third-width {
  flex: 1;
}

.total-qty-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.total-qty-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.total-display {
  padding: 0.75rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  font-size: 1.1em;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background-color: #f5f5f5;
  padding-top: 80px; /* Adjust this value based on your header height */
}

/* Page management */
.page {
  display: none;
}

.page.active {
  display: block;
}

/* Login page styles */
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-container h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-form .form-group {
  margin-bottom: 1rem;
}

.login-form input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.login-form button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-form button:hover {
  background-color: #1976d2;
}

/* Header styles with Bootstrap */
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: white;
  padding: 0.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1001;
}

.main-header .btn-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
}

.main-header .btn-link:hover {
  color: #2196f3;
}

.sync-status {
  color: #28a745;
  font-size: 0.9rem;
  margin-left: 1rem;
}

.sync-status i {
  margin-right: 0.5rem;
}

/* Dashboard layout */
#dashboard-page {
  min-height: 100vh;
}

#dashboard-page.active {
  display: flex;
}

/* Sidebar styles */
.sidebar {
  width: 280px;
  height: calc(100vh - 80px); /* Subtract header height */
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  position: fixed;
  left: 0;
  top: 80px; /* Start below header */
  overflow-y: auto;
  padding-top: 1rem;
  z-index: 1000;
}

/* Main content area */
.main-content {
  margin-left: 280px; /* Match sidebar width */
  margin-top: 80px; /* Match header height */
  min-height: calc(100vh - 80px);
  padding: 1rem;
  width: calc(100% - 280px); /* Full width minus sidebar */
  box-sizing: border-box;
}

/* Header/Section Title */
.content-section h2 {
  margin: 0;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 999;
  font-size: 1.5rem;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Section content */
.content-section {
  display: none;
  padding: 2rem;
}

/* Form styling */
form {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: none; /* Remove any max-width constraints */
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 1rem;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="date"],
.form-group input[type="time"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #2196f3;
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
}

.half-width {
  flex: 1;
  min-width: calc(50% - 0.5rem); /* Account for gap */
}

.third-width {
  flex: 1;
  min-width: calc(33.333% - 0.67rem); /* Account for gap */
}

/* Total display sections */
.total-qty-section,
.summary-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.total-qty-section h3,
.summary-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.total-display {
  padding: 0.75rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  font-size: 1.1em;
  color: #333;
}

/* Submit button */
form button[type="submit"] {
  width: 100%;
  padding: 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 2rem;
}

form button[type="submit"]:hover {
  background-color: #1976d2;
}

/* Navigation styles - keeping existing styles */
.main-nav {
  padding: 1rem;
}

.main-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-nav > ul > li {
  margin-bottom: 0.75rem;
}

.main-nav ul li a {
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.main-nav ul li a:hover {
  background-color: #e9ecef;
  color: #2196f3;
}

/* Submenu styles */
.submenu {
  display: none;
  padding-left: 1.25rem;
  margin-top: 0.5rem;
  border-left: 2px solid #dee2e6;
}

.submenu.active {
  display: block;
}

.submenu li {
  margin-bottom: 0.4rem;
}

.submenu li a {
  padding: 0.5rem 1rem;
  font-size: 0.95em;
  color: #666;
}

.menu-toggle {
  position: relative;
  padding-right: 2rem !important;
}

.menu-toggle:after {
  content: "▼";
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8em;
  transition: transform 0.2s;
}

.has-submenu.active .menu-toggle:after {
  transform: translateY(-50%) rotate(180deg);
}

/* Active states */
.main-nav ul li a.active {
  background-color: #2196f3;
  color: white;
}

.submenu li a.active {
  background-color: rgba(33, 150, 243, 0.1);
  color: #2196f3;
  font-weight: 500;
}

/* Logout button special styling */
#logout-btn {
  margin-top: 2rem;
  background-color: #f8d7da;
  color: #dc3545;
}

#logout-btn:hover {
  background-color: #dc3545;
  color: white;
}

/* Logout button */
#logout-btn {
  margin-top: 2rem;
  background-color: #f8d7da;
  color: #dc3545;
}

#logout-btn:hover {
  background-color: #dc3545;
  color: white;
}

/* Daily Report Form styles */
#daily-report-form .form-group {
  margin-bottom: 1rem;
}

#daily-report-form input[type="text"],
#daily-report-form input[type="number"],
#daily-report-form input[type="date"],
#daily-report-form input[type="time"],
#daily-report-form select,
#daily-report-form textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

#daily-report-form textarea {
  resize: vertical;
  min-height: 100px;
}

#daily-report-form button[type="submit"] {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.2s;
}

#daily-report-form button[type="submit"]:hover {
  background-color: #1976d2;
}

/* Content sections */
.content-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.content-section h2 {
  margin-bottom: 20px;
  color: #333;
}

/* Table styles */
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

td,
th {
  padding: 0.75rem;
  border: 1px solid #ddd;
}

/* Menu toggle button */
#menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  padding: 0.5rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  #menu-toggle {
    display: block;
  }

  .content-section {
    padding: 15px;
  }

  .form-group {
    margin-bottom: 0.75rem;
  }
}

/* Utility classes */
.hidden {
  display: none;
}

.rekap-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sync-status {
  display: none;
  padding: 4px 8px;
  background-color: #ff9800;
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 1rem;
}

.summary-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

#iridesse-form .form-group {
  margin-bottom: 1rem;
}

#iridesse-form input,
#iridesse-form select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

#iridesse-form input:focus,
#iridesse-form select:focus {
  border-color: #2196f3;
  outline: none;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

#iridesse-form .total-display {
  padding: 0.75rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  font-size: 1.1em;
  color: #333;
}

#iridesse-form button[type="submit"] {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.2s;
}

#iridesse-form button[type="submit"]:hover {
  background-color: #1976d2;
}

/* Status colors */
#iridesse-form #status {
  font-weight: bold;
}

#iridesse-form #status option[value="SELESAI"] {
  color: #28a745;
}

#iridesse-form #status option[value="PENDING"] {
  color: #ffc107;
}

#iridesse-form #status option[value="BERMASALAH"] {
  color: #dc3545;
}
`, "",{"version":3,"sources":["webpack://./src/css/style.css"],"names":[],"mappings":"AAAA,0BAA0B;;AAE1B;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,4DAA4D;EAC5D,gBAAgB;EAChB,yBAAyB;EACzB,iBAAiB,EAAE,kDAAkD;AACvE;;AAEA,oBAAoB;AACpB;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA,sBAAsB;AACtB;EACE,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,kBAAkB;EAClB,wCAAwC;AAC1C;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,eAAe;EACf,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,gBAAgB;EAChB,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iCAAiC;AACnC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,iCAAiC;AACjC;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,YAAY;EACZ,uBAAuB;EACvB,oBAAoB;EACpB,wCAAwC;EACxC,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,aAAa;AACf;;AAEA;EACE,WAAW;EACX,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,oBAAoB;AACtB;;AAEA,qBAAqB;AACrB;EACE,iBAAiB;AACnB;;AAEA;EACE,aAAa;AACf;;AAEA,mBAAmB;AACnB;EACE,YAAY;EACZ,0BAA0B,EAAE,2BAA2B;EACvD,yBAAyB;EACzB,+BAA+B;EAC/B,eAAe;EACf,OAAO;EACP,SAAS,EAAE,uBAAuB;EAClC,gBAAgB;EAChB,iBAAiB;EACjB,aAAa;AACf;;AAEA,sBAAsB;AACtB;EACE,kBAAkB,EAAE,wBAAwB;EAC5C,gBAAgB,EAAE,wBAAwB;EAC1C,8BAA8B;EAC9B,aAAa;EACb,yBAAyB,EAAE,6BAA6B;EACxD,sBAAsB;AACxB;;AAEA,yBAAyB;AACzB;EACE,SAAS;EACT,kBAAkB;EAClB,uBAAuB;EACvB,gCAAgC;EAChC,gBAAgB;EAChB,MAAM;EACN,YAAY;EACZ,iBAAiB;EACjB,WAAW;EACX,wCAAwC;AAC1C;;AAEA,oBAAoB;AACpB;EACE,aAAa;EACb,aAAa;AACf;;AAEA,iBAAiB;AACjB;EACE,uBAAuB;EACvB,eAAe;EACf,kBAAkB;EAClB,wCAAwC;EACxC,WAAW;EACX,eAAe,EAAE,qCAAqC;EACtD,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,cAAc;EACd,qBAAqB;EACrB,gBAAgB;EAChB,WAAW;AACb;;AAEA;;;;;;EAME,WAAW;EACX,gBAAgB;EAChB,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;EACf,sBAAsB;AACxB;;AAEA;;;EAGE,qBAAqB;EACrB,aAAa;EACb,6CAA6C;AAC/C;;AAEA;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,OAAO;EACP,6BAA6B,EAAE,oBAAoB;AACrD;;AAEA;EACE,OAAO;EACP,kCAAkC,EAAE,oBAAoB;AAC1D;;AAEA,2BAA2B;AAC3B;;EAEE,gBAAgB;EAChB,eAAe;EACf,yBAAyB;EACzB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;EAChB,WAAW;AACb;;AAEA,kBAAkB;AAClB;EACE,WAAW;EACX,aAAa;EACb,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,gBAAgB;EAChB,eAAe;EACf,iCAAiC;EACjC,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,gDAAgD;AAChD;EACE,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,qBAAqB;EACrB,WAAW;EACX,qBAAqB;EACrB,kBAAkB;EAClB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA,mBAAmB;AACnB;EACE,aAAa;EACb,qBAAqB;EACrB,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,oBAAoB;EACpB,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,2BAA2B;EAC3B,gBAAgB;EAChB,0BAA0B;AAC5B;;AAEA;EACE,0CAA0C;AAC5C;;AAEA,kBAAkB;AAClB;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,yCAAyC;EACzC,cAAc;EACd,gBAAgB;AAClB;;AAEA,kCAAkC;AAClC;EACE,gBAAgB;EAChB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA,kBAAkB;AAClB;EACE,gBAAgB;EAChB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA,6BAA6B;AAC7B;EACE,mBAAmB;AACrB;;AAEA;;;;;;EAME,WAAW;EACX,eAAe;EACf,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,gBAAgB;EAChB,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iCAAiC;AACnC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,qBAAqB;AACrB;EACE,iBAAiB;EACjB,aAAa;EACb,kBAAkB;EAClB,wCAAwC;EACxC,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA,iBAAiB;AACjB;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;;EAEE,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA,uBAAuB;AACvB;EACE,aAAa;EACb,gBAAgB;EAChB,YAAY;EACZ,iBAAiB;EACjB,YAAY;EACZ,eAAe;AACjB;;AAEA,sBAAsB;AACtB;EACE;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,sBAAsB;EACxB;AACF;;AAEA,oBAAoB;AACpB;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,2DAA2D;EAC3D,SAAS;EACT,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,yBAAyB;EACzB,kBAAkB;EAClB,wCAAwC;AAC1C;;AAEA;EACE,mBAAmB;AACrB;;AAEA;;EAEE,WAAW;EACX,eAAe;EACf,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;EACf,6BAA6B;AAC/B;;AAEA;;EAEE,qBAAqB;EACrB,aAAa;EACb,6CAA6C;AAC/C;;AAEA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,gBAAgB;EAChB,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iCAAiC;AACnC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,kBAAkB;AAClB;EACE,iBAAiB;AACnB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB","sourcesContent":["/* Reset and base styles */\n\n.form-row {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.half-width {\n  flex: 1;\n}\n\n.third-width {\n  flex: 1;\n}\n\n.total-qty-section {\n  margin-top: 2rem;\n  padding: 1rem;\n  background-color: #f8f9fa;\n  border-radius: 4px;\n}\n\n.total-qty-section h3 {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  color: #333;\n}\n\n.total-display {\n  padding: 0.75rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-weight: bold;\n  text-align: center;\n  font-size: 1.1em;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;\n  line-height: 1.6;\n  background-color: #f5f5f5;\n  padding-top: 80px; /* Adjust this value based on your header height */\n}\n\n/* Page management */\n.page {\n  display: none;\n}\n\n.page.active {\n  display: block;\n}\n\n/* Login page styles */\n.login-container {\n  max-width: 400px;\n  margin: 100px auto;\n  padding: 2rem;\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.login-container h1 {\n  text-align: center;\n  margin-bottom: 2rem;\n  color: #333;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.login-form .form-group {\n  margin-bottom: 1rem;\n}\n\n.login-form input {\n  width: 100%;\n  padding: 0.5rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 1rem;\n}\n\n.login-form button {\n  width: 100%;\n  padding: 0.75rem;\n  background-color: #2196f3;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 1.1em;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n\n.login-form button:hover {\n  background-color: #1976d2;\n}\n\n/* Header styles with Bootstrap */\n.main-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 80px;\n  background-color: white;\n  padding: 0.5rem 2rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  z-index: 1001;\n}\n\n.main-header .btn-link {\n  color: #333;\n  text-decoration: none;\n  padding: 0.5rem;\n}\n\n.main-header .btn-link:hover {\n  color: #2196f3;\n}\n\n.sync-status {\n  color: #28a745;\n  font-size: 0.9rem;\n  margin-left: 1rem;\n}\n\n.sync-status i {\n  margin-right: 0.5rem;\n}\n\n/* Dashboard layout */\n#dashboard-page {\n  min-height: 100vh;\n}\n\n#dashboard-page.active {\n  display: flex;\n}\n\n/* Sidebar styles */\n.sidebar {\n  width: 280px;\n  height: calc(100vh - 80px); /* Subtract header height */\n  background-color: #f8f9fa;\n  border-right: 1px solid #dee2e6;\n  position: fixed;\n  left: 0;\n  top: 80px; /* Start below header */\n  overflow-y: auto;\n  padding-top: 1rem;\n  z-index: 1000;\n}\n\n/* Main content area */\n.main-content {\n  margin-left: 280px; /* Match sidebar width */\n  margin-top: 80px; /* Match header height */\n  min-height: calc(100vh - 80px);\n  padding: 1rem;\n  width: calc(100% - 280px); /* Full width minus sidebar */\n  box-sizing: border-box;\n}\n\n/* Header/Section Title */\n.content-section h2 {\n  margin: 0;\n  padding: 1rem 2rem;\n  background-color: white;\n  border-bottom: 1px solid #dee2e6;\n  position: sticky;\n  top: 0;\n  z-index: 999;\n  font-size: 1.5rem;\n  color: #333;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n/* Section content */\n.content-section {\n  display: none;\n  padding: 2rem;\n}\n\n/* Form styling */\nform {\n  background-color: white;\n  padding: 1.5rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  width: 100%;\n  max-width: none; /* Remove any max-width constraints */\n  box-sizing: border-box;\n}\n\n.form-group {\n  margin-bottom: 1rem;\n  width: 100%;\n}\n\n.form-group label {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  color: #333;\n}\n\n.form-group input[type=\"text\"],\n.form-group input[type=\"number\"],\n.form-group input[type=\"date\"],\n.form-group input[type=\"time\"],\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 1rem;\n  box-sizing: border-box;\n}\n\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  border-color: #2196f3;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);\n}\n\n.form-row {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  width: 100%;\n}\n\n.half-width {\n  flex: 1;\n  min-width: calc(50% - 0.5rem); /* Account for gap */\n}\n\n.third-width {\n  flex: 1;\n  min-width: calc(33.333% - 0.67rem); /* Account for gap */\n}\n\n/* Total display sections */\n.total-qty-section,\n.summary-section {\n  margin-top: 2rem;\n  padding: 1.5rem;\n  background-color: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #dee2e6;\n}\n\n.total-qty-section h3,\n.summary-section h3 {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  color: #333;\n}\n\n.total-display {\n  padding: 0.75rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-weight: bold;\n  text-align: center;\n  font-size: 1.1em;\n  color: #333;\n}\n\n/* Submit button */\nform button[type=\"submit\"] {\n  width: 100%;\n  padding: 1rem;\n  background-color: #2196f3;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 1.1em;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.2s;\n  margin-top: 2rem;\n}\n\nform button[type=\"submit\"]:hover {\n  background-color: #1976d2;\n}\n\n/* Navigation styles - keeping existing styles */\n.main-nav {\n  padding: 1rem;\n}\n\n.main-nav ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.main-nav > ul > li {\n  margin-bottom: 0.75rem;\n}\n\n.main-nav ul li a {\n  display: block;\n  padding: 0.75rem 1rem;\n  color: #333;\n  text-decoration: none;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n  font-weight: 500;\n}\n\n.main-nav ul li a:hover {\n  background-color: #e9ecef;\n  color: #2196f3;\n}\n\n/* Submenu styles */\n.submenu {\n  display: none;\n  padding-left: 1.25rem;\n  margin-top: 0.5rem;\n  border-left: 2px solid #dee2e6;\n}\n\n.submenu.active {\n  display: block;\n}\n\n.submenu li {\n  margin-bottom: 0.4rem;\n}\n\n.submenu li a {\n  padding: 0.5rem 1rem;\n  font-size: 0.95em;\n  color: #666;\n}\n\n.menu-toggle {\n  position: relative;\n  padding-right: 2rem !important;\n}\n\n.menu-toggle:after {\n  content: \"▼\";\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 0.8em;\n  transition: transform 0.2s;\n}\n\n.has-submenu.active .menu-toggle:after {\n  transform: translateY(-50%) rotate(180deg);\n}\n\n/* Active states */\n.main-nav ul li a.active {\n  background-color: #2196f3;\n  color: white;\n}\n\n.submenu li a.active {\n  background-color: rgba(33, 150, 243, 0.1);\n  color: #2196f3;\n  font-weight: 500;\n}\n\n/* Logout button special styling */\n#logout-btn {\n  margin-top: 2rem;\n  background-color: #f8d7da;\n  color: #dc3545;\n}\n\n#logout-btn:hover {\n  background-color: #dc3545;\n  color: white;\n}\n\n/* Logout button */\n#logout-btn {\n  margin-top: 2rem;\n  background-color: #f8d7da;\n  color: #dc3545;\n}\n\n#logout-btn:hover {\n  background-color: #dc3545;\n  color: white;\n}\n\n/* Daily Report Form styles */\n#daily-report-form .form-group {\n  margin-bottom: 1rem;\n}\n\n#daily-report-form input[type=\"text\"],\n#daily-report-form input[type=\"number\"],\n#daily-report-form input[type=\"date\"],\n#daily-report-form input[type=\"time\"],\n#daily-report-form select,\n#daily-report-form textarea {\n  width: 100%;\n  padding: 0.5rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 1rem;\n}\n\n#daily-report-form textarea {\n  resize: vertical;\n  min-height: 100px;\n}\n\n#daily-report-form button[type=\"submit\"] {\n  margin-top: 1.5rem;\n  width: 100%;\n  padding: 0.75rem;\n  background-color: #2196f3;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 1.1em;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n\n#daily-report-form button[type=\"submit\"]:hover {\n  background-color: #1976d2;\n}\n\n/* Content sections */\n.content-section {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n}\n\n.content-section h2 {\n  margin-bottom: 20px;\n  color: #333;\n}\n\n/* Table styles */\n.table-container {\n  overflow-x: auto;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n}\n\ntd,\nth {\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n}\n\n/* Menu toggle button */\n#menu-toggle {\n  display: none;\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  color: white;\n  padding: 0.5rem;\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  .sidebar {\n    transform: translateX(-100%);\n  }\n\n  .sidebar.active {\n    transform: translateX(0);\n  }\n\n  .main-content {\n    margin-left: 0;\n  }\n\n  #menu-toggle {\n    display: block;\n  }\n\n  .content-section {\n    padding: 15px;\n  }\n\n  .form-group {\n    margin-bottom: 0.75rem;\n  }\n}\n\n/* Utility classes */\n.hidden {\n  display: none;\n}\n\n.rekap-controls {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n\n.sync-status {\n  display: none;\n  padding: 4px 8px;\n  background-color: #ff9800;\n  color: white;\n  border-radius: 4px;\n  font-size: 0.8rem;\n  margin-left: 1rem;\n}\n\n.summary-section {\n  margin-top: 2rem;\n  padding: 1.5rem;\n  background-color: #f8f9fa;\n  border-radius: 4px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n\n#iridesse-form .form-group {\n  margin-bottom: 1rem;\n}\n\n#iridesse-form input,\n#iridesse-form select {\n  width: 100%;\n  padding: 0.5rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 1rem;\n  transition: border-color 0.2s;\n}\n\n#iridesse-form input:focus,\n#iridesse-form select:focus {\n  border-color: #2196f3;\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);\n}\n\n#iridesse-form .total-display {\n  padding: 0.75rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-weight: bold;\n  text-align: center;\n  font-size: 1.1em;\n  color: #333;\n}\n\n#iridesse-form button[type=\"submit\"] {\n  margin-top: 1.5rem;\n  width: 100%;\n  padding: 0.75rem;\n  background-color: #2196f3;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 1.1em;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n\n#iridesse-form button[type=\"submit\"]:hover {\n  background-color: #1976d2;\n}\n\n/* Status colors */\n#iridesse-form #status {\n  font-weight: bold;\n}\n\n#iridesse-form #status option[value=\"SELESAI\"] {\n  color: #28a745;\n}\n\n#iridesse-form #status option[value=\"PENDING\"] {\n  color: #ffc107;\n}\n\n#iridesse-form #status option[value=\"BERMASALAH\"] {\n  color: #dc3545;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ "./src/css/style.css");
/* harmony import */ var _models_BahanBakuModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/BahanBakuModel.js */ "./src/js/models/BahanBakuModel.js");
/* harmony import */ var _models_DailyReportModel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/DailyReportModel.js */ "./src/js/models/DailyReportModel.js");
/* harmony import */ var _views_LoginView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/LoginView.js */ "./src/js/views/LoginView.js");
/* harmony import */ var _views_NavigationView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/NavigationView.js */ "./src/js/views/NavigationView.js");
/* harmony import */ var _views_HeaderView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/HeaderView.js */ "./src/js/views/HeaderView.js");
/* harmony import */ var _views_BahanBakuView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/BahanBakuView.js */ "./src/js/views/BahanBakuView.js");
/* harmony import */ var _views_DailyReportView_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/DailyReportView.js */ "./src/js/views/DailyReportView.js");
/* harmony import */ var _views_RekapView_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/RekapView.js */ "./src/js/views/RekapView.js");
/* harmony import */ var _presenters_LoginPresenter_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./presenters/LoginPresenter.js */ "./src/js/presenters/LoginPresenter.js");
/* harmony import */ var _presenters_NavigationPresenter_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./presenters/NavigationPresenter.js */ "./src/js/presenters/NavigationPresenter.js");
/* harmony import */ var _presenters_HeaderPresenter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./presenters/HeaderPresenter.js */ "./src/js/presenters/HeaderPresenter.js");
/* harmony import */ var _presenters_BahanBakuPresenter_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./presenters/BahanBakuPresenter.js */ "./src/js/presenters/BahanBakuPresenter.js");
/* harmony import */ var _presenters_DailyReportPresenter_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./presenters/DailyReportPresenter.js */ "./src/js/presenters/DailyReportPresenter.js");
/* harmony import */ var _presenters_RekapPresenter_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./presenters/RekapPresenter.js */ "./src/js/presenters/RekapPresenter.js");
/* harmony import */ var _db_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./db.js */ "./src/js/db.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Import CSS


// Import Models



// Import Views







// Import Presenters







// Import Database

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);
    // Initialize Models
    this.bahanBakuModel = new _models_BahanBakuModel_js__WEBPACK_IMPORTED_MODULE_1__.BahanBakuModel();
    this.dailyReportModel = new _models_DailyReportModel_js__WEBPACK_IMPORTED_MODULE_2__.DailyReportModel();

    // Initialize Views
    this.loginView = new _views_LoginView_js__WEBPACK_IMPORTED_MODULE_3__.LoginView();
    this.navigationView = new _views_NavigationView_js__WEBPACK_IMPORTED_MODULE_4__.NavigationView();
    this.headerView = new _views_HeaderView_js__WEBPACK_IMPORTED_MODULE_5__.HeaderView();
    this.bahanBakuView = new _views_BahanBakuView_js__WEBPACK_IMPORTED_MODULE_6__.BahanBakuView();
    this.dailyReportView = new _views_DailyReportView_js__WEBPACK_IMPORTED_MODULE_7__.DailyReportView();
    this.rekapView = new _views_RekapView_js__WEBPACK_IMPORTED_MODULE_8__.RekapView();

    // Initialize Presenters
    this.loginPresenter = new _presenters_LoginPresenter_js__WEBPACK_IMPORTED_MODULE_9__.LoginPresenter(this.loginView);
    this.navigationPresenter = new _presenters_NavigationPresenter_js__WEBPACK_IMPORTED_MODULE_10__.NavigationPresenter(this.navigationView);
    this.headerPresenter = new _presenters_HeaderPresenter_js__WEBPACK_IMPORTED_MODULE_11__.HeaderPresenter(this.headerView, this.navigationView);
    this.bahanBakuPresenter = new _presenters_BahanBakuPresenter_js__WEBPACK_IMPORTED_MODULE_12__.BahanBakuPresenter(this.bahanBakuModel, this.bahanBakuView);
    this.dailyReportPresenter = new _presenters_DailyReportPresenter_js__WEBPACK_IMPORTED_MODULE_13__.DailyReportPresenter(this.dailyReportModel, this.dailyReportView);
    this.rekapPresenter = new _presenters_RekapPresenter_js__WEBPACK_IMPORTED_MODULE_14__.RekapPresenter(this.bahanBakuModel, this.dailyReportModel, this.rekapView);

    // Bind event listeners
    this.bindEvents();
  }
  return _createClass(App, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      document.addEventListener("loginSuccess", function () {
        _this.navigationPresenter.showPage("dashboard");
        _this.navigationPresenter.showDefaultSection();
      });
      document.addEventListener("logout", function () {
        _this.navigationPresenter.showPage("login");
      });

      // Online/Offline handling
      window.addEventListener("online", function () {
        console.log("Back online");
        _db_js__WEBPACK_IMPORTED_MODULE_15__.processSyncQueue();
      });
      window.addEventListener("offline", function () {
        console.log("Gone offline");
      });
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _db_js__WEBPACK_IMPORTED_MODULE_15__.openDB();
            case 1:
              console.log("Database initialized successfully");
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error("Error initializing database:", _t);
              alert("Gagal menginisialisasi database");
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }]);
}(); // Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  var app = new App();
  app.init();
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(function (registration) {
      console.log("ServiceWorker registration successful");
    })["catch"](function (err) {
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}

/***/ }),

/***/ "./src/js/db.js":
/*!**********************!*\
  !*** ./src/js/db.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DB_STORES: () => (/* binding */ DB_STORES),
/* harmony export */   addRecord: () => (/* binding */ addRecord),
/* harmony export */   addToSyncQueue: () => (/* binding */ addToSyncQueue),
/* harmony export */   getRecords: () => (/* binding */ getRecords),
/* harmony export */   getRecordsByDateRange: () => (/* binding */ getRecordsByDateRange),
/* harmony export */   getRecordsByIndex: () => (/* binding */ getRecordsByIndex),
/* harmony export */   openDB: () => (/* binding */ openDB),
/* harmony export */   processSyncQueue: () => (/* binding */ processSyncQueue)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Database configuration
var DB_STORES = {
  bahanBakuStock: "bahan_baku_stock",
  bahanBakuTransactions: "bahan_baku_transactions",
  dailyReport: "daily_report"
};

// Open database connection
var openDB = function openDB() {
  return new Promise(function (resolve, reject) {
    var request = indexedDB.open("PrintingDB", 1);
    request.onerror = function () {
      return reject(request.error);
    };
    request.onsuccess = function () {
      return resolve(request.result);
    };
    request.onupgradeneeded = function (event) {
      var db = event.target.result;

      // Create Bahan Baku Stock store
      if (!db.objectStoreNames.contains(DB_STORES.bahanBakuStock)) {
        var stockStore = db.createObjectStore(DB_STORES.bahanBakuStock, {
          keyPath: "id",
          autoIncrement: true
        });
        stockStore.createIndex("category", "category");
        stockStore.createIndex("updatedAt", "updatedAt");
      }

      // Create Bahan Baku Transactions store
      if (!db.objectStoreNames.contains(DB_STORES.bahanBakuTransactions)) {
        var transactionsStore = db.createObjectStore(DB_STORES.bahanBakuTransactions, {
          keyPath: "id",
          autoIncrement: true
        });
        transactionsStore.createIndex("category", "category");
        transactionsStore.createIndex("type", "type");
        transactionsStore.createIndex("timestamp", "timestamp");
      }

      // Create Daily Report store
      if (!db.objectStoreNames.contains(DB_STORES.dailyReport)) {
        var dailyReportStore = db.createObjectStore(DB_STORES.dailyReport, {
          keyPath: "id",
          autoIncrement: true
        });
        dailyReportStore.createIndex("tanggal", "tanggal");
        dailyReportStore.createIndex("shift", "shift");
      }
    };
  });
};

// Generic add record function
var addRecord = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(storeName, data) {
    var db;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          console.log('Adding record to store:', storeName, data);
          _context.n = 1;
          return openDB();
        case 1:
          db = _context.v;
          return _context.a(2, new Promise(function (resolve, reject) {
            var transaction = db.transaction(storeName, "readwrite");
            var store = transaction.objectStore(storeName);

            // Ensure tanggal is a Date object
            var processedData = _objectSpread(_objectSpread({}, data), {}, {
              tanggal: data.tanggal ? new Date(data.tanggal) : new Date(),
              timestamp: new Date().toISOString()
            });
            var request = store.add(processedData);
            request.onsuccess = function () {
              return resolve(request.result);
            };
            request.onerror = function () {
              return reject(request.error);
            };
          }));
      }
    }, _callee);
  }));
  return function addRecord(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Generic get records function
var getRecords = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(storeName) {
    var query,
      db,
      _args2 = arguments;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          query = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
          _context2.n = 1;
          return openDB();
        case 1:
          db = _context2.v;
          return _context2.a(2, new Promise(function (resolve, reject) {
            var transaction = db.transaction(storeName, "readonly");
            var store = transaction.objectStore(storeName);
            var request = store.getAll();
            request.onsuccess = function () {
              var results = request.result;
              if (query) {
                results = results.filter(function (record) {
                  for (var key in query) {
                    if (record[key] !== query[key]) return false;
                  }
                  return true;
                });
              }
              resolve(results);
            };
            request.onerror = function () {
              return reject(request.error);
            };
          }));
      }
    }, _callee2);
  }));
  return function getRecords(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

// Get records by date range
var getRecordsByDateRange = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(storeName, startDate, endDate) {
    var db;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return openDB();
        case 1:
          db = _context3.v;
          return _context3.a(2, new Promise(function (resolve, reject) {
            var transaction = db.transaction(storeName, "readonly");
            var store = transaction.objectStore(storeName);
            var request = store.getAll();
            request.onsuccess = function () {
              var results = request.result.filter(function (record) {
                var recordDate = new Date(record.tanggal);
                return recordDate >= startDate && recordDate <= endDate;
              });
              resolve(results);
            };
            request.onerror = function () {
              return reject(request.error);
            };
          }));
      }
    }, _callee3);
  }));
  return function getRecordsByDateRange(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Get records by index
var getRecordsByIndex = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(storeName, indexName, value) {
    var db;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return openDB();
        case 1:
          db = _context4.v;
          return _context4.a(2, new Promise(function (resolve, reject) {
            var transaction = db.transaction(storeName, 'readonly');
            var store = transaction.objectStore(storeName);
            var index = store.index(indexName);
            var request = index.getAll(value);
            request.onsuccess = function () {
              return resolve(request.result);
            };
            request.onerror = function () {
              return reject(request.error);
            };
          }));
      }
    }, _callee4);
  }));
  return function getRecordsByIndex(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

// Sync queue management
var addToSyncQueue = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(data) {
    var queue;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          queue = JSON.parse(localStorage.getItem("syncQueue") || "[]");
          queue.push({
            id: Date.now(),
            data: data,
            timestamp: new Date().toISOString()
          });
          localStorage.setItem("syncQueue", JSON.stringify(queue));
        case 1:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function addToSyncQueue(_x0) {
    return _ref5.apply(this, arguments);
  };
}();
var processSyncQueue = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    var queue;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          if (navigator.onLine) {
            _context6.n = 1;
            break;
          }
          return _context6.a(2);
        case 1:
          queue = JSON.parse(localStorage.getItem("syncQueue") || "[]");
          if (!(queue.length === 0)) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2);
        case 2:
          // Process each item in the queue
          // This is where you would implement the actual sync logic with your backend
          // For now, we'll just clear the queue
          localStorage.setItem("syncQueue", "[]");
        case 3:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return function processSyncQueue() {
    return _ref6.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/js/models/BahanBakuModel.js":
/*!*****************************************!*\
  !*** ./src/js/models/BahanBakuModel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BahanBakuModel: () => (/* binding */ BahanBakuModel)
/* harmony export */ });
/* harmony import */ var _db_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db.js */ "./src/js/db.js");
var _excluded = ["tanggalLengkap"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var BahanBakuModel = /*#__PURE__*/function () {
  function BahanBakuModel() {
    _classCallCheck(this, BahanBakuModel);
    this.storeNames = {
      stock: _db_js__WEBPACK_IMPORTED_MODULE_0__.DB_STORES.bahanBakuStock,
      transactions: _db_js__WEBPACK_IMPORTED_MODULE_0__.DB_STORES.bahanBakuTransactions
    };
  }
  return _createClass(BahanBakuModel, [{
    key: "updateStock",
    value: function () {
      var _updateStock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(category, data) {
        var tanggalLengkap, restData, stockData, existing, id, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              // Extract tanggalLengkap from data if it exists
              tanggalLengkap = data.tanggalLengkap, restData = _objectWithoutProperties(data, _excluded);
              stockData = _objectSpread(_objectSpread({
                category: category
              }, restData), {}, {
                updatedAt: tanggalLengkap || new Date().toISOString()
              });
              _context.p = 1;
              _context.n = 2;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.getRecordsByIndex(this.storeNames.stock, "nomor", data.nomor, function (record) {
                return record.category === category;
              });
            case 2:
              existing = _context.v;
              if (!(existing && existing.length > 0)) {
                _context.n = 3;
                break;
              }
              throw new Error("Nomor ".concat(data.nomor, " sudah ada untuk kategori ").concat(category));
            case 3:
              _context.n = 4;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.addRecord(this.storeNames.stock, stockData);
            case 4:
              id = _context.v;
              _context.n = 5;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.addToSyncQueue({
                type: "bahanBakuStock",
                action: "update",
                data: stockData
              });
            case 5:
              return _context.a(2, id);
            case 6:
              _context.p = 6;
              _t = _context.v;
              throw new Error("Gagal memperbarui stock ".concat(category, ": ").concat(_t.message));
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[1, 6]]);
      }));
      function updateStock(_x, _x2) {
        return _updateStock.apply(this, arguments);
      }
      return updateStock;
    }()
  }, {
    key: "addStock",
    value: function () {
      var _addStock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(category, data) {
        var transactionData, id, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              console.log('Adding stock:', {
                category: category,
                data: data
              });
              transactionData = _objectSpread(_objectSpread({
                category: category,
                type: "in"
              }, data), {}, {
                timestamp: new Date().toISOString(),
                sisaStock: data.total || data.qtyLastMonth + data.jumlahMasuk || 0
              });
              console.log('Transaction data:', transactionData);
              _context2.p = 1;
              _context2.n = 2;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.addRecord(this.storeNames.transactions, transactionData);
            case 2:
              id = _context2.v;
              _context2.n = 3;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.addToSyncQueue({
                type: "bahanBakuTransactions",
                action: "add",
                data: transactionData
              });
            case 3:
              return _context2.a(2, id);
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              throw new Error("Gagal menambah stock ".concat(category, ": ").concat(_t2.message));
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 4]]);
      }));
      function addStock(_x3, _x4) {
        return _addStock.apply(this, arguments);
      }
      return addStock;
    }()
  }, {
    key: "reduceStock",
    value: function () {
      var _reduceStock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(category, data) {
        var transactionData, id, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              transactionData = _objectSpread(_objectSpread({
                category: category,
                type: "out"
              }, data), {}, {
                timestamp: new Date().toISOString()
              });
              _context3.p = 1;
              _context3.n = 2;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.addRecord(this.storeNames.transactions, transactionData);
            case 2:
              id = _context3.v;
              _context3.n = 3;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.addToSyncQueue({
                type: "bahanBakuTransactions",
                action: "add",
                data: transactionData
              });
            case 3:
              return _context3.a(2, id);
            case 4:
              _context3.p = 4;
              _t3 = _context3.v;
              throw new Error("Gagal mengurangi stock ".concat(category, ": ").concat(_t3.message));
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 4]]);
      }));
      function reduceStock(_x5, _x6) {
        return _reduceStock.apply(this, arguments);
      }
      return reduceStock;
    }()
  }, {
    key: "getStockByCategory",
    value: function () {
      var _getStockByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(category) {
        var _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.getRecordsByIndex(this.storeNames.stock, "category", category);
            case 1:
              return _context4.a(2, _context4.v);
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              throw new Error("Gagal mengambil data stock ".concat(category, ": ").concat(_t4.message));
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 2]]);
      }));
      function getStockByCategory(_x7) {
        return _getStockByCategory.apply(this, arguments);
      }
      return getStockByCategory;
    }()
  }, {
    key: "getTransactionsByDateRange",
    value: function () {
      var _getTransactionsByDateRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(category, startDate, endDate) {
        var _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.getRecordsByDateRange(this.storeNames.transactions, startDate, endDate, function (record) {
                return record.category === category;
              });
            case 1:
              return _context5.a(2, _context5.v);
            case 2:
              _context5.p = 2;
              _t5 = _context5.v;
              throw new Error("Gagal mengambil data transaksi ".concat(category, ": ").concat(_t5.message));
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 2]]);
      }));
      function getTransactionsByDateRange(_x8, _x9, _x0) {
        return _getTransactionsByDateRange.apply(this, arguments);
      }
      return getTransactionsByDateRange;
    }()
  }, {
    key: "getCurrentStock",
    value: function () {
      var _getCurrentStock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(category) {
        var transactions, stockMap, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.getRecordsByIndex(this.storeNames.transactions, "category", category);
            case 1:
              transactions = _context6.v;
              // Group transactions by product (jenisKertas & ukuran combination)
              stockMap = new Map();
              transactions.forEach(function (transaction) {
                var key = "".concat(transaction.jenisKertas, "-").concat(transaction.ukuran);
                if (!stockMap.has(key)) {
                  stockMap.set(key, {
                    nomor: transaction.nomor,
                    jenisKertas: transaction.jenisKertas,
                    ukuran: transaction.ukuran,
                    totalMasuk: 0,
                    totalKeluar: 0,
                    tanggal: transaction.tanggal
                  });
                }
                var item = stockMap.get(key);

                // Update the latest date
                if (new Date(transaction.tanggal) > new Date(item.tanggal)) {
                  item.tanggal = transaction.tanggal;
                }
                if (transaction.type === "in") {
                  // Untuk transaksi masuk, tambahkan jumlah masuk ke total
                  var jumlahMasuk = transaction.jumlahMasuk || 0;
                  item.totalMasuk += jumlahMasuk;

                  // Update tanggal jika ini adalah transaksi terbaru
                  if (!item.lastUpdate || new Date(transaction.tanggal) > new Date(item.lastUpdate)) {
                    item.lastUpdate = transaction.tanggal;
                  }
                } else if (transaction.type === "out") {
                  // Untuk transaksi keluar, tambahkan total keluar
                  var totalKeluarBaru = (transaction.totalKeluarOk || 0) + (transaction.totalKeluarNg || 0);
                  item.totalKeluar += totalKeluarBaru;
                }

                // Hitung sisa stock berdasarkan total masuk dan keluar
                item.sisaStock = item.totalMasuk - item.totalKeluar;
              });

              // Convert map to array and sort by nomor
              return _context6.a(2, Array.from(stockMap.values()).sort(function (a, b) {
                return a.nomor - b.nomor;
              }));
            case 2:
              _context6.p = 2;
              _t6 = _context6.v;
              throw new Error("Gagal mengambil data stock ".concat(category, ": ").concat(_t6.message));
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 2]]);
      }));
      function getCurrentStock(_x1) {
        return _getCurrentStock.apply(this, arguments);
      }
      return getCurrentStock;
    }()
  }, {
    key: "getCurrentBannerStock",
    value: function () {
      var _getCurrentBannerStock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              return _context7.a(2, this.getCurrentStock('banner'));
          }
        }, _callee7, this);
      }));
      function getCurrentBannerStock() {
        return _getCurrentBannerStock.apply(this, arguments);
      }
      return getCurrentBannerStock;
    }()
  }, {
    key: "getCurrentDigitalStock",
    value: function () {
      var _getCurrentDigitalStock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              return _context8.a(2, this.getCurrentStock('digital'));
          }
        }, _callee8, this);
      }));
      function getCurrentDigitalStock() {
        return _getCurrentDigitalStock.apply(this, arguments);
      }
      return getCurrentDigitalStock;
    }()
  }, {
    key: "getCurrentProduksiStock",
    value: function () {
      var _getCurrentProduksiStock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2, this.getCurrentStock('produksi'));
          }
        }, _callee9, this);
      }));
      function getCurrentProduksiStock() {
        return _getCurrentProduksiStock.apply(this, arguments);
      }
      return getCurrentProduksiStock;
    }()
  }]);
}();

/***/ }),

/***/ "./src/js/models/DailyReportModel.js":
/*!*******************************************!*\
  !*** ./src/js/models/DailyReportModel.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DailyReportModel: () => (/* binding */ DailyReportModel)
/* harmony export */ });
/* harmony import */ var _db_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db.js */ "./src/js/db.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var DailyReportModel = /*#__PURE__*/function () {
  function DailyReportModel() {
    _classCallCheck(this, DailyReportModel);
    this.storeName = _db_js__WEBPACK_IMPORTED_MODULE_0__.DB_STORES.dailyReport;
  }
  return _createClass(DailyReportModel, [{
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data) {
        var id, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.addRecord(this.storeName, data);
            case 1:
              id = _context.v;
              _context.n = 2;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.addToSyncQueue({
                type: "dailyReport",
                action: "add",
                data: data
              });
            case 2:
              return _context.a(2, id);
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new Error("Gagal menyimpan daily report: " + _t.message);
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[0, 3]]);
      }));
      function add(_x) {
        return _add.apply(this, arguments);
      }
      return add;
    }()
  }, {
    key: "getByDateRange",
    value: function () {
      var _getByDateRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(startDate, endDate) {
        var _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return _db_js__WEBPACK_IMPORTED_MODULE_0__.getRecordsByDateRange(this.storeName, startDate, endDate);
            case 1:
              return _context2.a(2, _context2.v);
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              throw new Error("Gagal mengambil daily report: " + _t2.message);
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function getByDateRange(_x2, _x3) {
        return _getByDateRange.apply(this, arguments);
      }
      return getByDateRange;
    }()
  }]);
}();

/***/ }),

/***/ "./src/js/presenters/BahanBakuPresenter.js":
/*!*************************************************!*\
  !*** ./src/js/presenters/BahanBakuPresenter.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BahanBakuPresenter: () => (/* binding */ BahanBakuPresenter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BahanBakuPresenter = /*#__PURE__*/function () {
  function BahanBakuPresenter(model, view) {
    _classCallCheck(this, BahanBakuPresenter);
    this.model = model;
    this.view = view;

    // Bind stock form handlers
    this.bindStockHandlers();

    // Bind in/out form handlers
    this.bindInOutHandlers();

    // Initial load of stock data
    this.loadBannerStockData();
    this.loadDigitalStockData();
    this.loadProduksiStockData();
  }
  return _createClass(BahanBakuPresenter, [{
    key: "loadBannerStockData",
    value: function () {
      var _loadBannerStockData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var stockData, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return this.model.getCurrentBannerStock();
            case 1:
              stockData = _context.v;
              this.view.updateStockBannerDisplay(stockData);
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              this.view.showError(_t.message);
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function loadBannerStockData() {
        return _loadBannerStockData.apply(this, arguments);
      }
      return loadBannerStockData;
    }()
  }, {
    key: "loadDigitalStockData",
    value: function () {
      var _loadDigitalStockData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var stockData, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.model.getCurrentDigitalStock();
            case 1:
              stockData = _context2.v;
              this.view.updateStockDigitalDisplay(stockData);
              _context2.n = 3;
              break;
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              this.view.showError(_t2.message);
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function loadDigitalStockData() {
        return _loadDigitalStockData.apply(this, arguments);
      }
      return loadDigitalStockData;
    }()
  }, {
    key: "loadProduksiStockData",
    value: function () {
      var _loadProduksiStockData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var stockData, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this.model.getCurrentProduksiStock();
            case 1:
              stockData = _context3.v;
              this.view.updateStockProduksiDisplay(stockData);
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              this.view.showError(_t3.message);
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function loadProduksiStockData() {
        return _loadProduksiStockData.apply(this, arguments);
      }
      return loadProduksiStockData;
    }()
  }, {
    key: "bindStockHandlers",
    value: function bindStockHandlers() {
      var _this = this;
      ["banner", "digital", "produksi"].forEach(function (category) {
        _this.view.bindStockSubmit(category, function (data) {
          return _this.handleStockSubmit(category, data);
        });
      });
    }
  }, {
    key: "bindInOutHandlers",
    value: function bindInOutHandlers() {
      var _this2 = this;
      ["banner", "digital", "produksi"].forEach(function (category) {
        _this2.view.bindInOutSubmit(category, "in", function (data) {
          return _this2.handleInSubmit(category, data);
        });
        _this2.view.bindInOutSubmit(category, "out", function (data) {
          return _this2.handleOutSubmit(category, data);
        });
      });
    }
  }, {
    key: "handleStockSubmit",
    value: function () {
      var _handleStockSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(category, formData) {
        var _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.model.updateStock(category, formData);
            case 1:
              this.view.resetForm(category);
              this.view.showSuccess("Stock ".concat(category, " berhasil diperbarui!"));
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              this.view.showError(_t4.message);
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 2]]);
      }));
      function handleStockSubmit(_x, _x2) {
        return _handleStockSubmit.apply(this, arguments);
      }
      return handleStockSubmit;
    }()
  }, {
    key: "handleInSubmit",
    value: function () {
      var _handleInSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(category, formData) {
        var _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              console.log('Saving data:', {
                category: category,
                formData: formData
              });
              _context5.n = 1;
              return this.model.addStock(category, formData);
            case 1:
              if (!(category === 'banner')) {
                _context5.n = 3;
                break;
              }
              _context5.n = 2;
              return this.loadBannerStockData();
            case 2:
              _context5.n = 6;
              break;
            case 3:
              if (!(category === 'digital')) {
                _context5.n = 5;
                break;
              }
              _context5.n = 4;
              return this.loadDigitalStockData();
            case 4:
              _context5.n = 6;
              break;
            case 5:
              if (!(category === 'produksi')) {
                _context5.n = 6;
                break;
              }
              _context5.n = 6;
              return this.loadProduksiStockData();
            case 6:
              this.view.resetForm(category, "in");
              this.view.showSuccess("Input ".concat(category, " berhasil disimpan!"));
              _context5.n = 8;
              break;
            case 7:
              _context5.p = 7;
              _t5 = _context5.v;
              console.error('Error in handleInSubmit:', _t5);
              this.view.showError("Gagal menyimpan data: ".concat(_t5.message));
            case 8:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 7]]);
      }));
      function handleInSubmit(_x3, _x4) {
        return _handleInSubmit.apply(this, arguments);
      }
      return handleInSubmit;
    }()
  }, {
    key: "handleOutSubmit",
    value: function () {
      var _handleOutSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(category, formData) {
        var _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.model.reduceStock(category, formData);
            case 1:
              this.view.resetForm(category, "out");
              this.view.showSuccess("Output ".concat(category, " berhasil disimpan!"));
              if (!(category === 'banner')) {
                _context6.n = 3;
                break;
              }
              _context6.n = 2;
              return this.loadBannerStockData();
            case 2:
              _context6.n = 6;
              break;
            case 3:
              if (!(category === 'digital')) {
                _context6.n = 5;
                break;
              }
              _context6.n = 4;
              return this.loadDigitalStockData();
            case 4:
              _context6.n = 6;
              break;
            case 5:
              if (!(category === 'produksi')) {
                _context6.n = 6;
                break;
              }
              _context6.n = 6;
              return this.loadProduksiStockData();
            case 6:
              _context6.n = 8;
              break;
            case 7:
              _context6.p = 7;
              _t6 = _context6.v;
              this.view.showError(_t6.message);
            case 8:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 7]]);
      }));
      function handleOutSubmit(_x5, _x6) {
        return _handleOutSubmit.apply(this, arguments);
      }
      return handleOutSubmit;
    }()
  }]);
}();

/***/ }),

/***/ "./src/js/presenters/DailyReportPresenter.js":
/*!***************************************************!*\
  !*** ./src/js/presenters/DailyReportPresenter.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DailyReportPresenter: () => (/* binding */ DailyReportPresenter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DailyReportPresenter = /*#__PURE__*/function () {
  function DailyReportPresenter(model, view) {
    _classCallCheck(this, DailyReportPresenter);
    this.model = model;
    this.view = view;
    this.view.bindSubmit(this.handleSubmit.bind(this));
  }
  return _createClass(DailyReportPresenter, [{
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(formData) {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return this.model.add(formData);
            case 1:
              this.view.reset();
              this.view.showSuccess("Daily report berhasil disimpan!");
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              this.view.showError(_t.message);
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function handleSubmit(_x) {
        return _handleSubmit.apply(this, arguments);
      }
      return handleSubmit;
    }()
  }]);
}();

/***/ }),

/***/ "./src/js/presenters/HeaderPresenter.js":
/*!**********************************************!*\
  !*** ./src/js/presenters/HeaderPresenter.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderPresenter: () => (/* binding */ HeaderPresenter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var HeaderPresenter = /*#__PURE__*/function () {
  function HeaderPresenter(view, navigationView) {
    var _this = this;
    _classCallCheck(this, HeaderPresenter);
    this.view = view;
    this.navigationView = navigationView;

    // Bind menu toggle to sidebar
    this.view.bindMenuToggle(function () {
      _this.toggleSidebar();
    });
  }
  return _createClass(HeaderPresenter, [{
    key: "setTitle",
    value: function setTitle(title) {
      this.view.setTitle(title);
    }
  }, {
    key: "updateSyncStatus",
    value: function updateSyncStatus(status) {
      this.view.updateSyncStatus(status);
    }
  }, {
    key: "toggleSidebar",
    value: function toggleSidebar() {
      if (this.navigationView) {
        this.navigationView.toggleSidebar();
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/js/presenters/LoginPresenter.js":
/*!*********************************************!*\
  !*** ./src/js/presenters/LoginPresenter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPresenter: () => (/* binding */ LoginPresenter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LoginPresenter = /*#__PURE__*/function () {
  function LoginPresenter(view) {
    _classCallCheck(this, LoginPresenter);
    this.view = view;
    this.view.bindLogin(this.handleLogin.bind(this));
  }
  return _createClass(LoginPresenter, [{
    key: "handleLogin",
    value: function handleLogin(credentials) {
      // For demo purposes, any login will succeed
      // In real application, you would validate credentials here
      this.onLoginSuccess();
    }
  }, {
    key: "onLoginSuccess",
    value: function onLoginSuccess() {
      // Notify the App presenter about successful login
      document.dispatchEvent(new CustomEvent("loginSuccess"));
    }
  }]);
}();

/***/ }),

/***/ "./src/js/presenters/NavigationPresenter.js":
/*!**************************************************!*\
  !*** ./src/js/presenters/NavigationPresenter.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationPresenter: () => (/* binding */ NavigationPresenter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NavigationPresenter = /*#__PURE__*/function () {
  function NavigationPresenter(view) {
    _classCallCheck(this, NavigationPresenter);
    this.view = view;
    this.view.bindNavigation(this.handleNavigation.bind(this));
    this.view.bindLogout(this.handleLogout.bind(this));
  }
  return _createClass(NavigationPresenter, [{
    key: "handleNavigation",
    value: function handleNavigation(pageId) {
      this.view.showSection(pageId);
    }
  }, {
    key: "handleLogout",
    value: function handleLogout() {
      // Notify the App presenter about logout
      document.dispatchEvent(new CustomEvent("logout"));
    }
  }, {
    key: "showPage",
    value: function showPage(pageId) {
      this.view.showPage(pageId);
    }
  }, {
    key: "showDefaultSection",
    value: function showDefaultSection() {
      this.view.showSection("bahan-baku");
    }
  }]);
}();

/***/ }),

/***/ "./src/js/presenters/RekapPresenter.js":
/*!*********************************************!*\
  !*** ./src/js/presenters/RekapPresenter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RekapPresenter: () => (/* binding */ RekapPresenter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var RekapPresenter = /*#__PURE__*/function () {
  function RekapPresenter(bahanBakuModel, dailyReportModel, view) {
    _classCallCheck(this, RekapPresenter);
    this.bahanBakuModel = bahanBakuModel;
    this.dailyReportModel = dailyReportModel;
    this.view = view;
    this.view.bindGenerateRekap(this.handleGenerateRekap.bind(this));
  }
  return _createClass(RekapPresenter, [{
    key: "handleGenerateRekap",
    value: function () {
      var _handleGenerateRekap = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var tipe, startDate, endDate, model, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              tipe = _ref.tipe, startDate = _ref.startDate, endDate = _ref.endDate;
              _context.p = 1;
              model = tipe === "bahan-baku" ? this.bahanBakuModel : this.dailyReportModel;
              _context.n = 2;
              return model.getByDateRange(startDate, endDate);
            case 2:
              data = _context.v;
              this.view.displayTable(data, tipe);
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              this.view.showError(_t.message);
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function handleGenerateRekap(_x) {
        return _handleGenerateRekap.apply(this, arguments);
      }
      return handleGenerateRekap;
    }()
  }]);
}();

/***/ }),

/***/ "./src/js/views/BahanBakuView.js":
/*!***************************************!*\
  !*** ./src/js/views/BahanBakuView.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BahanBakuView: () => (/* binding */ BahanBakuView)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BahanBakuView = /*#__PURE__*/function () {
  function BahanBakuView() {
    _classCallCheck(this, BahanBakuView);
    this.stockForms = {
      banner: this.initializeStockForm("stock-banner"),
      digital: this.initializeStockForm("stock-digital"),
      produksi: this.initializeStockForm("stock-produksi")
    };
    this.inOutForms = {
      banner: {
        "in": this.initializeInOutForm("in-banner"),
        out: this.initializeInOutForm("out-banner")
      },
      digital: {
        "in": this.initializeInOutForm("in-digital"),
        out: this.initializeInOutForm("out-digital")
      },
      produksi: {
        "in": this.initializeInOutForm("in-produksi"),
        out: this.initializeInOutForm("out-produksi")
      }
    };
  }
  return _createClass(BahanBakuView, [{
    key: "initializeStockForm",
    value: function initializeStockForm(sectionId) {
      var section = document.getElementById("".concat(sectionId, "-section"));
      if (!section) return null;

      // For stock sections, we'll only show results without a form
      if (sectionId === "stock-banner" || sectionId === "stock-digital" || sectionId === "stock-produksi") {
        if (!section.querySelector(".stock-results")) {
          var resultsContainer = document.createElement("div");
          resultsContainer.className = "stock-results";
          resultsContainer.innerHTML = "\n          <div class=\"results-table\">\n            <h3>Current Stock Status</h3>\n            <table>\n              <thead>\n                <tr>\n                  <th>No.</th>\n                  <th>Jenis Kertas</th>\n                  <th>Ukuran</th>\n                  <th>Total Masuk</th>\n                  <th>Total Keluar</th>\n                  <th>Sisa Stock</th>\n                  <th>Tanggal Update</th>\n                </tr>\n              </thead>\n              <tbody id=\"".concat(sectionId, "-results\"></tbody>\n            </table>\n          </div>\n        ");
          section.appendChild(resultsContainer);
        }
        return {
          resultsContainer: section.querySelector(".stock-results"),
          resultsBody: section.querySelector("#".concat(sectionId, "-results"))
        };
      }

      // For other sections, add form if it doesn't exist
      if (!section.querySelector("form")) {
        var form = document.createElement("form");
        form.id = "".concat(sectionId, "-form");
        form.className = "stock-form";
        var isDigital = sectionId === "stock-digital";
        form.innerHTML = "\n        <div class=\"form-group\">\n          <label for=\"".concat(sectionId, "-nomor\">No.</label>\n          <input type=\"number\" id=\"").concat(sectionId, "-nomor\" name=\"nomor\" required />\n        </div>\n        <div class=\"form-group\">\n          <label for=\"").concat(sectionId, "-jenis-kertas\">Jenis Kertas</label>\n          <input type=\"text\" id=\"").concat(sectionId, "-jenis-kertas\" name=\"jenisKertas\" required />\n        </div>\n        <div class=\"form-group\">\n          <label for=\"").concat(sectionId, "-ukuran\">Ukuran</label>\n          <input type=\"text\" id=\"").concat(sectionId, "-ukuran\" name=\"ukuran\" required />\n        </div>\n        <div class=\"form-group\">\n          <label for=\"").concat(sectionId, "-qty\">Qty Stock (Lembar)</label>\n          <input type=\"number\" id=\"").concat(sectionId, "-qty\" name=\"qty\" min=\"0\" required />\n        </div>\n        <div class=\"form-group\">\n          <label for=\"").concat(sectionId, "-").concat(isDigital ? "actual" : "satuan", "\">").concat(isDigital ? "Actual" : "Satuan", "</label>\n          <input type=\"text\" id=\"").concat(sectionId, "-").concat(isDigital ? "actual" : "satuan", "\" name=\"").concat(isDigital ? "actual" : "satuan", "\" required />\n        </div>\n        <div class=\"form-group\">\n          <label for=\"").concat(sectionId, "-tanggal\">Tanggal</label>\n          <input type=\"date\" id=\"").concat(sectionId, "-tanggal\" name=\"tanggal\" required />\n        </div>\n        <button type=\"submit\">Simpan</button>\n      ");
        section.appendChild(form);
      }
      return _objectSpread(_objectSpread({
        form: section.querySelector("form"),
        nomor: section.querySelector('[name="nomor"]'),
        jenisKertas: section.querySelector('[name="jenisKertas"]'),
        ukuran: section.querySelector('[name="ukuran"]'),
        qty: section.querySelector('[name="qty"]')
      }, sectionId === "stock-digital" ? {
        actual: section.querySelector('[name="actual"]')
      } : {
        satuan: section.querySelector('[name="satuan"]')
      }), {}, {
        tanggal: section.querySelector('[name="tanggal"]')
      });
    }
  }, {
    key: "initializeInOutForm",
    value: function initializeInOutForm(sectionId) {
      var section = document.getElementById("".concat(sectionId, "-section"));
      if (!section) return null;

      // Tambahkan form jika belum ada
      if (!section.querySelector("form")) {
        var form = document.createElement("form");
        form.id = "".concat(sectionId, "-form");
        form.className = "inout-form";

        // Khusus untuk form In Banner dan In Digital
        if (sectionId === "in-banner" || sectionId === "in-digital") {
          form.innerHTML = "\n          <div class=\"form-group\">\n            <label for=\"".concat(sectionId, "-nomor\">No.</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-nomor\" name=\"nomor\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-jenis-kertas\">Jenis Kertas</label>\n            <input type=\"text\" id=\"").concat(sectionId, "-jenis-kertas\" name=\"jenisKertas\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-ukuran\">Ukuran</label>\n            <input type=\"text\" id=\"").concat(sectionId, "-ukuran\" name=\"ukuran\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-qty-last-month\">Qty Last Month</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-qty-last-month\" name=\"qtyLastMonth\" min=\"0\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-tanggal\">Tanggal</label>\n            <input type=\"date\" id=\"").concat(sectionId, "-tanggal\" name=\"tanggal\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-jumlah-masuk\">Jumlah Kertas Masuk</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-jumlah-masuk\" name=\"jumlahMasuk\" min=\"0\" required />\n          </div>\n          <div class=\"form-group\">\n            <label>Total</label>\n            <div class=\"total-display\" id=\"").concat(sectionId, "-total\">0</div>\n          </div>\n          <button type=\"submit\">Simpan</button>\n        ");

          // Tambahkan event listener untuk menghitung total
          var updateTotal = function updateTotal() {
            var qtyLastMonth = Number(form.querySelector('[name="qtyLastMonth"]').value) || 0;
            var jumlahMasuk = Number(form.querySelector('[name="jumlahMasuk"]').value) || 0;
            var total = qtyLastMonth + jumlahMasuk;
            document.getElementById("".concat(sectionId, "-total")).textContent = total;
          };
          form.querySelector('[name="qtyLastMonth"]').addEventListener("input", updateTotal);
          form.querySelector('[name="jumlahMasuk"]').addEventListener("input", updateTotal);
        }
        // Khusus untuk form In Produksi
        else if (sectionId === "in-produksi") {
          form.innerHTML = "\n          <div class=\"form-group\">\n            <label for=\"".concat(sectionId, "-nomor\">No.</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-nomor\" name=\"nomor\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-jenis-kertas\">Jenis Kertas</label>\n            <input type=\"text\" id=\"").concat(sectionId, "-jenis-kertas\" name=\"jenisKertas\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-ukuran\">Ukuran</label>\n            <input type=\"text\" id=\"").concat(sectionId, "-ukuran\" name=\"ukuran\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-qty-last-month\">Qty Last Month</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-qty-last-month\" name=\"qtyLastMonth\" min=\"0\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-tanggal\">Tanggal</label>\n            <input type=\"date\" id=\"").concat(sectionId, "-tanggal\" name=\"tanggal\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-jumlah-masuk\">Jumlah Kertas Masuk</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-jumlah-masuk\" name=\"jumlahMasuk\" min=\"0\" required />\n          </div>\n          <div class=\"form-group\">\n            <label>Total</label>\n            <div class=\"total-display\" id=\"").concat(sectionId, "-total\">0</div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-remark\">Remark</label>\n            <input type=\"text\" id=\"").concat(sectionId, "-remark\" name=\"remark\" />\n          </div>\n          <button type=\"submit\">Simpan</button>\n        ");

          // Tambahkan event listener untuk menghitung total
          var _updateTotal = function _updateTotal() {
            var qtyLastMonth = Number(form.querySelector('[name="qtyLastMonth"]').value) || 0;
            var jumlahMasuk = Number(form.querySelector('[name="jumlahMasuk"]').value) || 0;
            var total = qtyLastMonth + jumlahMasuk;
            document.getElementById("".concat(sectionId, "-total")).textContent = total;
          };
          form.querySelector('[name="qtyLastMonth"]').addEventListener("input", _updateTotal);
          form.querySelector('[name="jumlahMasuk"]').addEventListener("input", _updateTotal);
        }
        // Khusus untuk form Out Banner, Out Digital, dan Out Produksi
        else if (sectionId === "out-banner" || sectionId === "out-digital" || sectionId === "out-produksi") {
          form.innerHTML = "\n          <div class=\"form-group\">\n            <label for=\"".concat(sectionId, "-nomor\">No.</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-nomor\" name=\"nomor\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-jenis-kertas\">Jenis Kertas</label>\n            <input type=\"text\" id=\"").concat(sectionId, "-jenis-kertas\" name=\"jenisKertas\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-ukuran\">Ukuran</label>\n            <input type=\"text\" id=\"").concat(sectionId, "-ukuran\" name=\"ukuran\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-total-masuk\">Total Kertas Masuk</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-total-masuk\" name=\"totalMasuk\" min=\"0\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-tanggal\">Tanggal</label>\n            <input type=\"date\" id=\"").concat(sectionId, "-tanggal\" name=\"tanggal\" required />\n          </div>\n          <div class=\"form-row\">\n            <div class=\"form-group half-width\">\n              <label for=\"").concat(sectionId, "-total-keluar-ok\">Total Keluar (OK)</label>\n              <input type=\"number\" id=\"").concat(sectionId, "-total-keluar-ok\" name=\"totalKeluarOk\" min=\"0\" required />\n            </div>\n            <div class=\"form-group half-width\">\n              <label for=\"").concat(sectionId, "-total-keluar-ng\">Total Keluar (NG)</label>\n              <input type=\"number\" id=\"").concat(sectionId, "-total-keluar-ng\" name=\"totalKeluarNg\" min=\"0\" required />\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label>Total Keluar</label>\n            <div class=\"total-display\" id=\"").concat(sectionId, "-total-keluar\">0</div>\n          </div>\n          <div class=\"form-group\">\n            <label>Sisa Stock</label>\n            <div class=\"total-display\" id=\"").concat(sectionId, "-sisa-stock\">0</div>\n          </div>\n          <button type=\"submit\">Simpan</button>\n        ");

          // Tambahkan event listener untuk menghitung total dan sisa stock
          var updateTotals = function updateTotals() {
            var totalMasuk = Number(form.querySelector('[name="totalMasuk"]').value) || 0;
            var totalKeluarOk = Number(form.querySelector('[name="totalKeluarOk"]').value) || 0;
            var totalKeluarNg = Number(form.querySelector('[name="totalKeluarNg"]').value) || 0;
            var totalKeluar = totalKeluarOk + totalKeluarNg;
            var sisaStock = totalMasuk - totalKeluar;
            document.getElementById("".concat(sectionId, "-total-keluar")).textContent = totalKeluar;
            document.getElementById("".concat(sectionId, "-sisa-stock")).textContent = sisaStock;
          };
          form.querySelector('[name="totalMasuk"]').addEventListener("input", updateTotals);
          form.querySelector('[name="totalKeluarOk"]').addEventListener("input", updateTotals);
          form.querySelector('[name="totalKeluarNg"]').addEventListener("input", updateTotals);
        } else {
          form.innerHTML = "\n          <div class=\"form-group\">\n            <label for=\"".concat(sectionId, "-jenis\">Jenis Bahan</label>\n            <input type=\"text\" id=\"").concat(sectionId, "-jenis\" name=\"jenis\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-jumlah\">Jumlah</label>\n            <input type=\"number\" id=\"").concat(sectionId, "-jumlah\" name=\"jumlah\" min=\"0\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-tanggal\">Tanggal</label>\n            <input type=\"date\" id=\"").concat(sectionId, "-tanggal\" name=\"tanggal\" required />\n          </div>\n          <div class=\"form-group\">\n            <label for=\"").concat(sectionId, "-keterangan\">Keterangan</label>\n            <textarea id=\"").concat(sectionId, "-keterangan\" name=\"keterangan\" rows=\"3\"></textarea>\n          </div>\n          <button type=\"submit\">Simpan</button>\n        ");
        }
        section.appendChild(form);
      }

      // Return untuk form In Banner dan In Digital
      if (sectionId === "in-banner" || sectionId === "in-digital") {
        return {
          form: section.querySelector("form"),
          nomor: section.querySelector('[name="nomor"]'),
          jenisKertas: section.querySelector('[name="jenisKertas"]'),
          ukuran: section.querySelector('[name="ukuran"]'),
          qtyLastMonth: section.querySelector('[name="qtyLastMonth"]'),
          tanggal: section.querySelector('[name="tanggal"]'),
          jumlahMasuk: section.querySelector('[name="jumlahMasuk"]'),
          total: section.querySelector("#".concat(sectionId, "-total"))
        };
      } else if (sectionId === "out-banner" || sectionId === "out-digital" || sectionId === "out-produksi") {
        return {
          form: section.querySelector("form"),
          nomor: section.querySelector('[name="nomor"]'),
          jenisKertas: section.querySelector('[name="jenisKertas"]'),
          ukuran: section.querySelector('[name="ukuran"]'),
          totalMasuk: section.querySelector('[name="totalMasuk"]'),
          tanggal: section.querySelector('[name="tanggal"]'),
          totalKeluarOk: section.querySelector('[name="totalKeluarOk"]'),
          totalKeluarNg: section.querySelector('[name="totalKeluarNg"]'),
          totalKeluar: section.querySelector("#".concat(sectionId, "-total-keluar")),
          sisaStock: section.querySelector("#".concat(sectionId, "-sisa-stock"))
        };
      } else if (sectionId === "in-produksi") {
        return {
          form: section.querySelector("form"),
          nomor: section.querySelector('[name="nomor"]'),
          jenisKertas: section.querySelector('[name="jenisKertas"]'),
          ukuran: section.querySelector('[name="ukuran"]'),
          qtyLastMonth: section.querySelector('[name="qtyLastMonth"]'),
          tanggal: section.querySelector('[name="tanggal"]'),
          jumlahMasuk: section.querySelector('[name="jumlahMasuk"]'),
          total: section.querySelector("#in-produksi-total"),
          remark: section.querySelector('[name="remark"]')
        };
      }
      return {
        form: section.querySelector("form"),
        jenis: section.querySelector('[name="jenis"]'),
        jumlah: section.querySelector('[name="jumlah"]'),
        tanggal: section.querySelector('[name="tanggal"]'),
        keterangan: section.querySelector('[name="keterangan"]')
      };
    }
  }, {
    key: "formatTitle",
    value: function formatTitle(sectionId) {
      return sectionId.split("-").map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(" ");
    }
  }, {
    key: "bindStockSubmit",
    value: function bindStockSubmit(category, handler) {
      var _this$stockForms$cate;
      if (category === "banner" || category === "digital" || category === "produksi") return; // Skip binding for display-only sections

      var form = (_this$stockForms$cate = this.stockForms[category]) === null || _this$stockForms$cate === void 0 ? void 0 : _this$stockForms$cate.form;
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var formElements = form.elements;
          var isDigital = category === "digital";
          var data = _defineProperty(_defineProperty({
            nomor: Number(formElements.nomor.value),
            jenisKertas: formElements.jenisKertas.value,
            ukuran: formElements.ukuran.value,
            qty: Number(formElements.qty.value)
          }, isDigital ? "actual" : "satuan", formElements[isDigital ? "actual" : "satuan"].value), "tanggalLengkap", formElements.tanggal.value);
          handler(data);
        });
      }
    }
  }, {
    key: "bindInOutSubmit",
    value: function bindInOutSubmit(handler) {
      var self = this;
      ["in-banner", "in-digital", "in-produksi"].forEach(function (formType) {
        var formElements = self.inOutForms[formType.split('-')[1]]["in"];
        if (!formElements) return;
        var form = formElements.form;
        if (!form) return;
        form.onsubmit = function (e) {
          e.preventDefault();
          e.stopPropagation();
          var category = formType.split('-')[1];
          var formData = {
            category: category,
            type: formType,
            data: {
              nomor: Number(formElements.nomor.value),
              jenisKertas: formElements.jenisKertas.value,
              ukuran: formElements.ukuran.value,
              qtyLastMonth: Number(formElements.qtyLastMonth.value),
              tanggal: formElements.tanggal.value,
              jumlahMasuk: Number(formElements.jumlahMasuk.value),
              total: Number(formElements.total.textContent)
            }
          };
          if (formType === "in-produksi" && formElements.remark) {
            formData.data.remark = formElements.remark.value;
          }
          handler(formData).then(function () {
            form.reset();
            formElements.total.textContent = '0';
          })["catch"](function (error) {
            console.error('Error submitting form:', error);
            self.showError("Gagal menyimpan data: " + error.message);
          });
          return false;
        };
      });

      // Bind untuk form Out Banner, Out Digital, dan Out Produksi
      ["out-banner", "out-digital", "out-produksi"].forEach(function (formType) {
        var formElements = self.inOutForms[formType.split('-')[1]].out;
        if (!formElements) return;
        var form = formElements.form;
        if (!form) return;
        form.onsubmit = function (e) {
          e.preventDefault();
          e.stopPropagation();
          var totalKeluar = Number(formElements.totalKeluarOk.value) + Number(formElements.totalKeluarNg.value);
          var sisaStock = Number(formElements.totalMasuk.value) - totalKeluar;
          var formData = {
            type: formType,
            data: {
              nomor: Number(formElements.nomor.value),
              jenisKertas: formElements.jenisKertas.value,
              ukuran: formElements.ukuran.value,
              totalMasuk: Number(formElements.totalMasuk.value),
              tanggal: formElements.tanggal.value,
              totalKeluarOk: Number(formElements.totalKeluarOk.value),
              totalKeluarNg: Number(formElements.totalKeluarNg.value),
              totalKeluar: totalKeluar,
              sisaStock: sisaStock
            }
          };
          handler(formData).then(function () {
            form.reset();
          })["catch"](function (error) {
            console.error('Error submitting form:', error);
            self.showError("Gagal menyimpan data: " + error.message);
          });
          return false;
        };
      });
    }
  }, {
    key: "resetForm",
    value: function resetForm(category) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (type === null) {
        var _this$stockForms$cate2;
        // Reset stock form
        (_this$stockForms$cate2 = this.stockForms[category]) === null || _this$stockForms$cate2 === void 0 || _this$stockForms$cate2.form.reset();
      } else {
        var _this$inOutForms$cate;
        // Reset in/out form
        (_this$inOutForms$cate = this.inOutForms[category]) === null || _this$inOutForms$cate === void 0 || (_this$inOutForms$cate = _this$inOutForms$cate[type]) === null || _this$inOutForms$cate === void 0 || _this$inOutForms$cate.form.reset();
      }
    }
  }, {
    key: "showSuccess",
    value: function showSuccess(message) {
      alert(message);
    }
  }, {
    key: "showError",
    value: function showError(message) {
      alert(message);
    }
  }, {
    key: "updateStockBannerDisplay",
    value: function updateStockBannerDisplay(data) {
      var stockBanner = this.stockForms.banner;
      if (!(stockBanner !== null && stockBanner !== void 0 && stockBanner.resultsBody)) return;

      // Clear existing rows
      stockBanner.resultsBody.innerHTML = '';

      // Handle empty data case
      if (!data || data.length === 0) {
        var emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="7" class="text-center">Belum ada data stock</td>';
        stockBanner.resultsBody.appendChild(emptyRow);
        return;
      }

      // Add new rows from data
      data.forEach(function (item) {
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>".concat(item.nomor, "</td>\n        <td>").concat(item.jenisKertas, "</td>\n        <td>").concat(item.ukuran, "</td>\n        <td>").concat(item.totalMasuk, "</td>\n        <td>").concat(item.totalKeluar, "</td>\n        <td>").concat(item.sisaStock, "</td>\n        <td>").concat(new Date(item.tanggal).toLocaleDateString(), "</td>\n      ");
        stockBanner.resultsBody.appendChild(row);
      });
    }
  }, {
    key: "updateStockDigitalDisplay",
    value: function updateStockDigitalDisplay(data) {
      var stockDigital = this.stockForms.digital;
      if (!(stockDigital !== null && stockDigital !== void 0 && stockDigital.resultsBody)) return;

      // Clear existing rows
      stockDigital.resultsBody.innerHTML = '';

      // Add new rows from data
      data.forEach(function (item) {
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>".concat(item.nomor, "</td>\n        <td>").concat(item.jenisKertas, "</td>\n        <td>").concat(item.ukuran, "</td>\n        <td>").concat(item.totalMasuk, "</td>\n        <td>").concat(item.totalKeluar, "</td>\n        <td>").concat(item.sisaStock, "</td>\n        <td>").concat(new Date(item.tanggal).toLocaleDateString(), "</td>\n      ");
        stockDigital.resultsBody.appendChild(row);
      });
    }
  }, {
    key: "updateStockProduksiDisplay",
    value: function updateStockProduksiDisplay(data) {
      var stockProduksi = this.stockForms.produksi;
      if (!(stockProduksi !== null && stockProduksi !== void 0 && stockProduksi.resultsBody)) return;

      // Clear existing rows
      stockProduksi.resultsBody.innerHTML = '';

      // Add new rows from data
      data.forEach(function (item) {
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>".concat(item.nomor, "</td>\n        <td>").concat(item.jenisKertas, "</td>\n        <td>").concat(item.ukuran, "</td>\n        <td>").concat(item.totalMasuk, "</td>\n        <td>").concat(item.totalKeluar, "</td>\n        <td>").concat(item.sisaStock, "</td>\n        <td>").concat(new Date(item.tanggal).toLocaleDateString(), "</td>\n        <td>").concat(item.remark || '-', "</td>\n      ");
        stockProduksi.resultsBody.appendChild(row);
      });
    }
  }]);
}();

/***/ }),

/***/ "./src/js/views/DailyReportView.js":
/*!*****************************************!*\
  !*** ./src/js/views/DailyReportView.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DailyReportView: () => (/* binding */ DailyReportView)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DailyReportView = /*#__PURE__*/function () {
  function DailyReportView() {
    _classCallCheck(this, DailyReportView);
    this.form = document.getElementById("daily-report-form");
    this.totalQtyOk = document.getElementById("total-qty-ok");
    this.totalQtyNg = document.getElementById("total-qty-ng");
    this.totalQtyAll = document.getElementById("total-qty-all");
    if (this.form) {
      this.initializeEventListeners();
    }
  }
  return _createClass(DailyReportView, [{
    key: "initializeEventListeners",
    value: function initializeEventListeners() {
      var _this = this;
      var qtyOkInput = this.form.querySelector("#qty-cetak-ok");
      var qtyNgInput = this.form.querySelector("#qty-cetak-ng");
      var updateTotals = function updateTotals() {
        var qtyOk = Number(qtyOkInput.value) || 0;
        var qtyNg = Number(qtyNgInput.value) || 0;
        var total = qtyOk + qtyNg;
        _this.totalQtyOk.textContent = qtyOk.toLocaleString();
        _this.totalQtyNg.textContent = qtyNg.toLocaleString();
        _this.totalQtyAll.textContent = total.toLocaleString();
      };
      qtyOkInput.addEventListener("input", updateTotals);
      qtyNgInput.addEventListener("input", updateTotals);
      this.form.addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(_this.form);
        var data = {
          nomor: Number(formData.get("nomor")),
          tanggal: formData.get("tanggal"),
          qtyPo: Number(formData.get("qty-po")),
          satuan: formData.get("satuan"),
          jenisBahan: formData.get("jenis-bahan"),
          jenisPekerjaan: formData.get("jenis-pekerjaan"),
          client: formData.get("client"),
          spesifikasi: formData.get("spesifikasi"),
          qtyCetakOk: Number(formData.get("qty-cetak-ok")),
          qtyCetakNg: Number(formData.get("qty-cetak-ng")),
          satuanCetak: formData.get("satuan-cetak"),
          waktuStart: formData.get("waktu-start"),
          waktuFinish: formData.get("waktu-finish"),
          noSpk: formData.get("no-spk"),
          keterangan: formData.get("keterangan"),
          totalQtyCetakOk: Number(_this.totalQtyOk.textContent.replace(/,/g, "")),
          totalQtyCetakNg: Number(_this.totalQtyNg.textContent.replace(/,/g, "")),
          totalQtyCetakAll: Number(_this.totalQtyAll.textContent.replace(/,/g, ""))
        };

        // Disini bisa ditambahkan kode untuk menyimpan data ke server
        console.log("Form submitted:", data);

        // Reset form setelah submit
        _this.form.reset();
        updateTotals();
      });
    }
  }, {
    key: "bindSubmit",
    value: function bindSubmit(handler) {
      var _this2 = this;
      this.form.addEventListener("submit", function (e) {
        e.preventDefault();
        handler({
          tanggal: _this2.tanggal.value,
          shift: _this2.shift.value,
          jamJalan: Number(_this2.jamJalan.value),
          jamBerhenti: Number(_this2.jamBerhenti.value),
          hasilProduksi: Number(_this2.hasilProduksi.value),
          catatan: _this2.catatan.value
        });
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.form.reset();
    }
  }, {
    key: "showSuccess",
    value: function showSuccess(message) {
      alert(message);
    }
  }, {
    key: "showError",
    value: function showError(message) {
      alert(message);
    }
  }]);
}();

/***/ }),

/***/ "./src/js/views/HeaderView.js":
/*!************************************!*\
  !*** ./src/js/views/HeaderView.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderView: () => (/* binding */ HeaderView)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var HeaderView = /*#__PURE__*/function () {
  function HeaderView() {
    _classCallCheck(this, HeaderView);
    this.header = document.querySelector(".main-header");
    this.menuToggle = document.getElementById("menu-toggle");
    this.syncStatus = document.getElementById("sync-status");

    // Initialize header if it doesn't exist
    if (!this.header) {
      this.createHeader();
    }
  }
  return _createClass(HeaderView, [{
    key: "createHeader",
    value: function createHeader() {
      var header = document.createElement("header");
      header.className = "main-header";
      header.innerHTML = "\n      <div class=\"d-flex align-items-center\">\n        <img src=\"images/logoheader.png\" alt=\"Logo\" style=\"height:60px; margin-right:10px;\">\n        <nav class=\"d-flex align-items-center\">\n          <button id=\"menu-toggle\" class=\"btn btn-link\" aria-label=\"Toggle menu\">\n            <i class=\"bi bi-list fs-4\"></i>\n          </button>\n          <div id=\"sync-status\" class=\"sync-status d-flex align-items-center\">\n            <i class=\"bi bi-cloud-check fs-5 me-2\"></i>\n            <span></span>\n          </div>\n        </nav>\n      </div>\n    ";

      // Insert header at the beginning of dashboard page
      var dashboardPage = document.getElementById("dashboard-page");
      if (dashboardPage) {
        dashboardPage.insertBefore(header, dashboardPage.firstChild);
      }

      // Update references
      this.header = header;
      this.menuToggle = header.querySelector("#menu-toggle");
      this.syncStatus = header.querySelector("#sync-status");
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      var h1 = this.header.querySelector("h1");
      if (h1) {
        h1.textContent = title;
      }
    }
  }, {
    key: "updateSyncStatus",
    value: function updateSyncStatus(status) {
      if (this.syncStatus) {
        this.syncStatus.textContent = status;
      }
    }
  }, {
    key: "bindMenuToggle",
    value: function bindMenuToggle(handler) {
      if (this.menuToggle) {
        this.menuToggle.addEventListener("click", handler);
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/js/views/LoginView.js":
/*!***********************************!*\
  !*** ./src/js/views/LoginView.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginView: () => (/* binding */ LoginView)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LoginView = /*#__PURE__*/function () {
  function LoginView() {
    _classCallCheck(this, LoginView);
    this.form = document.getElementById("login-form");
    this.loginPage = document.getElementById("login-page");
    this.dashboardPage = document.getElementById("dashboard-page");
    if (this.form) {
      this.initializeEventListeners();
    }
  }
  return _createClass(LoginView, [{
    key: "initializeEventListeners",
    value: function initializeEventListeners() {
      var _this = this;
      this.form.addEventListener("submit", function (e) {
        e.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Untuk sementara, kita langsung redirect ke dashboard
        // Nanti bisa ditambahkan validasi username dan password
        _this.showDashboard();
      });

      // Handle logout
      document.getElementById("logout-btn").addEventListener("click", function (e) {
        e.preventDefault();
        _this.showLogin();
      });
    }
  }, {
    key: "showDashboard",
    value: function showDashboard() {
      this.loginPage.classList.remove("active");
      this.dashboardPage.classList.add("active");
    }
  }, {
    key: "showLogin",
    value: function showLogin() {
      this.dashboardPage.classList.remove("active");
      this.loginPage.classList.add("active");
      this.form.reset();
    }
  }]);
}();

/***/ }),

/***/ "./src/js/views/NavigationView.js":
/*!****************************************!*\
  !*** ./src/js/views/NavigationView.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationView: () => (/* binding */ NavigationView)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NavigationView = /*#__PURE__*/function () {
  function NavigationView() {
    _classCallCheck(this, NavigationView);
    this.pages = {
      login: document.getElementById("login-page"),
      dashboard: document.getElementById("dashboard-page")
    };
    this.sections = {
      "stock-banner": document.getElementById("stock-banner-section"),
      "stock-digital": document.getElementById("stock-digital-section"),
      "stock-produksi": document.getElementById("stock-produksi-section"),
      "in-banner": document.getElementById("in-banner-section"),
      "out-banner": document.getElementById("out-banner-section"),
      "in-digital": document.getElementById("in-digital-section"),
      "out-digital": document.getElementById("out-digital-section"),
      "in-produksi": document.getElementById("in-produksi-section"),
      "out-produksi": document.getElementById("out-produksi-section"),
      "daily-report": document.getElementById("daily-report-section"),
      rekap: document.getElementById("rekap-section")
    };
    this.sidebar = document.querySelector(".sidebar");
    this.logoutBtn = document.getElementById("logout-btn");
    this.bindEvents();
    this.setupSubmenuToggle();
    this.currentPage = null;
  }
  return _createClass(NavigationView, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      // Handle navigation links
      document.querySelectorAll("a[data-page]").forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          var page = e.target.dataset.page;
          if (page) {
            _this.showPage(page);
            _this.updateActiveState(e.target);
          }
        });
      });
    }
  }, {
    key: "setupSubmenuToggle",
    value: function setupSubmenuToggle() {
      // Handle submenu toggles
      document.querySelectorAll(".menu-toggle").forEach(function (toggle) {
        toggle.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation(); // Prevent event bubbling

          var menuItem = toggle.closest(".has-submenu");
          if (menuItem) {
            // Close other open submenus
            document.querySelectorAll(".has-submenu").forEach(function (item) {
              if (item !== menuItem && item.classList.contains("active")) {
                item.classList.remove("active");
                var _submenu = item.querySelector(".submenu");
                if (_submenu) _submenu.classList.remove("active");
              }
            });

            // Toggle current submenu
            menuItem.classList.toggle("active");
            var submenu = menuItem.querySelector(".submenu");
            if (submenu) {
              submenu.classList.toggle("active");
            }
          }
        });
      });
    }
  }, {
    key: "bindLogout",
    value: function bindLogout(handler) {
      this.logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        handler();
      });
    }
  }, {
    key: "toggleSidebar",
    value: function toggleSidebar() {
      if (this.sidebar) {
        this.sidebar.classList.toggle("active");
      }
    }
  }, {
    key: "showPage",
    value: function showPage(pageId) {
      // Hide all sections first
      document.querySelectorAll(".content-section").forEach(function (section) {
        section.style.display = "none";
      });

      // Show the selected section
      var section = document.getElementById("".concat(pageId, "-section"));
      if (section) {
        section.style.display = "block";
        this.currentPage = pageId;
      }
    }
  }, {
    key: "updateActiveState",
    value: function updateActiveState(clickedLink) {
      // Remove active class from all links
      document.querySelectorAll(".main-nav a").forEach(function (link) {
        link.classList.remove("active");
      });

      // Add active class to clicked link
      clickedLink.classList.add("active");

      // If it's a submenu item, make sure the parent menu is expanded
      var submenu = clickedLink.closest(".submenu");
      if (submenu) {
        var parentMenu = submenu.closest(".has-submenu");
        if (parentMenu) {
          parentMenu.classList.add("active");
          submenu.classList.add("active");
        }
      }
    }
  }, {
    key: "showSection",
    value: function showSection(sectionId) {
      // Hide all sections first
      Object.values(this.sections).forEach(function (section) {
        if (section) section.style.display = "none";
      });

      // Show the requested section if it exists
      var section = this.sections[sectionId];
      if (section) {
        section.style.display = "block";
      } else {
        console.warn("Section ".concat(sectionId, " not found"));
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/js/views/RekapView.js":
/*!***********************************!*\
  !*** ./src/js/views/RekapView.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RekapView: () => (/* binding */ RekapView)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var RekapView = /*#__PURE__*/function () {
  function RekapView() {
    _classCallCheck(this, RekapView);
    this.generateBtn = document.getElementById("generate-rekap");
    this.tipeSelect = document.getElementById("rekap-tipe");
    this.periodeInput = document.getElementById("rekap-periode");
    this.tableContainer = document.querySelector(".table-container");
  }
  return _createClass(RekapView, [{
    key: "bindGenerateRekap",
    value: function bindGenerateRekap(handler) {
      var _this = this;
      this.generateBtn.addEventListener("click", function () {
        var periode = _this.periodeInput.value;
        if (!periode) {
          _this.showError("Pilih periode terlebih dahulu!");
          return;
        }
        var _periode$split = periode.split("-"),
          _periode$split2 = _slicedToArray(_periode$split, 2),
          year = _periode$split2[0],
          month = _periode$split2[1];
        handler({
          tipe: _this.tipeSelect.value,
          startDate: new Date(year, month - 1, 1),
          endDate: new Date(year, month, 0)
        });
      });
    }
  }, {
    key: "displayTable",
    value: function displayTable(data, tipe) {
      var html = "";
      if (tipe === "bahan-baku") {
        html = this.generateBahanBakuTable(data);
      } else {
        html = this.generateDailyReportTable(data);
      }
      this.tableContainer.innerHTML = html;
    }
  }, {
    key: "generateBahanBakuTable",
    value: function generateBahanBakuTable(data) {
      return "\n            <table>\n                <thead>\n                    <tr>\n                        <th>Tanggal</th>\n                        <th>Jenis Bahan</th>\n                        <th>Stok Masuk</th>\n                        <th>Pemakaian</th>\n                        <th>Sisa</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ".concat(data.map(function (item) {
        return "\n                        <tr>\n                            <td>".concat(new Date(item.tanggal).toLocaleDateString("id-ID"), "</td>\n                            <td>").concat(item.jenisBahan, "</td>\n                            <td>").concat(item.stokMasuk, "</td>\n                            <td>").concat(item.pemakaian, "</td>\n                            <td>").concat(item.sisa, "</td>\n                        </tr>\n                    ");
      }).join(""), "\n                </tbody>\n            </table>\n        ");
    }
  }, {
    key: "generateDailyReportTable",
    value: function generateDailyReportTable(data) {
      return "\n            <table>\n                <thead>\n                    <tr>\n                        <th>Tanggal</th>\n                        <th>Shift</th>\n                        <th>Jam Jalan</th>\n                        <th>Jam Berhenti</th>\n                        <th>Hasil Produksi</th>\n                        <th>Catatan</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ".concat(data.map(function (item) {
        return "\n                        <tr>\n                            <td>".concat(new Date(item.tanggal).toLocaleDateString("id-ID"), "</td>\n                            <td>").concat(item.shift, "</td>\n                            <td>").concat(item.jamJalan, "</td>\n                            <td>").concat(item.jamBerhenti, "</td>\n                            <td>").concat(item.hasilProduksi, "</td>\n                            <td>").concat(item.catatan || "-", "</td>\n                        </tr>\n                    ");
      }).join(""), "\n                </tbody>\n            </table>\n        ");
    }
  }, {
    key: "showError",
    value: function showError(message) {
      alert(message);
    }
  }]);
}();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/js/app.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sNEZBQTRGLE1BQU0sVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEseUJBQXlCLE9BQU8sWUFBWSxNQUFNLFVBQVUsTUFBTSxLQUFLLFVBQVUsT0FBTyxZQUFZLE1BQU0sWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxZQUFZLE1BQU0sVUFBVSx3QkFBd0IsYUFBYSxhQUFhLFdBQVcsVUFBVSxzQkFBc0IsYUFBYSxhQUFhLFdBQVcsTUFBTSxZQUFZLE1BQU0sd0JBQXdCLHlCQUF5QixhQUFhLFdBQVcsd0JBQXdCLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLFVBQVUsTUFBTSxZQUFZLE1BQU0sWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLHNCQUFzQixhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sT0FBTyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSx3QkFBd0IsT0FBTyxLQUFLLFVBQVUsd0JBQXdCLE9BQU8sWUFBWSxPQUFPLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLE1BQU0sVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLFlBQVksTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxZQUFZLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLFlBQVksTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxZQUFZLE1BQU0sWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sWUFBWSxNQUFNLFlBQVksT0FBTyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sWUFBWSxNQUFNLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sTUFBTSxZQUFZLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsT0FBTyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sTUFBTSxZQUFZLE1BQU0sVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sTUFBTSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLE1BQU0sWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxX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LENBQUM4TyxrQkFBa0IsQ0FDN0MsT0FDRixDQUFDLDZDQUFBckssTUFBQSxDQUNLZ0MsSUFBSSxDQUFDaUssS0FBSyw2Q0FBQWpNLE1BQUEsQ0FDVmdDLElBQUksQ0FBQ2tLLFFBQVEsNkNBQUFsTSxNQUFBLENBQ2JnQyxJQUFJLENBQUNtSyxXQUFXLDZDQUFBbk0sTUFBQSxDQUNoQmdDLElBQUksQ0FBQ29LLGFBQWEsNkNBQUFwTSxNQUFBLENBQ2xCZ0MsSUFBSSxDQUFDcUssT0FBTyxJQUFJLEdBQUc7TUFBQSxDQUcvQixDQUFDLENBQ0EvQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBSTdCO0VBQUM7SUFBQXRVLEdBQUE7SUFBQTVCLEtBQUEsRUFFRCxTQUFBaVIsU0FBU0EsQ0FBQ2xFLE9BQU8sRUFBRTtNQUNqQjlILEtBQUssQ0FBQzhILE9BQU8sQ0FBQztJQUNoQjtFQUFDO0FBQUEsSSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3RrcC8uL3NyYy9jc3Mvc3R5bGUuY3NzIiwid2VicGFjazovL3Byb2plY3RrcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdGtwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdGtwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3Byb2plY3RrcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdGtwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Byb2plY3RrcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0a3AvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0a3AvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0a3AvLi9zcmMvY3NzL3N0eWxlLmNzcz85ZmNkIiwid2VicGFjazovL3Byb2plY3RrcC8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdGtwLy4vc3JjL2pzL2RiLmpzIiwid2VicGFjazovL3Byb2plY3RrcC8uL3NyYy9qcy9tb2RlbHMvQmFoYW5CYWt1TW9kZWwuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdGtwLy4vc3JjL2pzL21vZGVscy9EYWlseVJlcG9ydE1vZGVsLmpzIiwid2VicGFjazovL3Byb2plY3RrcC8uL3NyYy9qcy9wcmVzZW50ZXJzL0JhaGFuQmFrdVByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0a3AvLi9zcmMvanMvcHJlc2VudGVycy9EYWlseVJlcG9ydFByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0a3AvLi9zcmMvanMvcHJlc2VudGVycy9IZWFkZXJQcmVzZW50ZXIuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdGtwLy4vc3JjL2pzL3ByZXNlbnRlcnMvTG9naW5QcmVzZW50ZXIuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdGtwLy4vc3JjL2pzL3ByZXNlbnRlcnMvTmF2aWdhdGlvblByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0a3AvLi9zcmMvanMvcHJlc2VudGVycy9SZWthcFByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0a3AvLi9zcmMvanMvdmlld3MvQmFoYW5CYWt1Vmlldy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0a3AvLi9zcmMvanMvdmlld3MvRGFpbHlSZXBvcnRWaWV3LmpzIiwid2VicGFjazovL3Byb2plY3RrcC8uL3NyYy9qcy92aWV3cy9IZWFkZXJWaWV3LmpzIiwid2VicGFjazovL3Byb2plY3RrcC8uL3NyYy9qcy92aWV3cy9Mb2dpblZpZXcuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdGtwLy4vc3JjL2pzL3ZpZXdzL05hdmlnYXRpb25WaWV3LmpzIiwid2VicGFjazovL3Byb2plY3RrcC8uL3NyYy9qcy92aWV3cy9SZWthcFZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIFJlc2V0IGFuZCBiYXNlIHN0eWxlcyAqL1xuXG4uZm9ybS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDFyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5oYWxmLXdpZHRoIHtcbiAgZmxleDogMTtcbn1cblxuLnRoaXJkLXdpZHRoIHtcbiAgZmxleDogMTtcbn1cblxuLnRvdGFsLXF0eS1zZWN0aW9uIHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbiAgcGFkZGluZzogMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG4udG90YWwtcXR5LXNlY3Rpb24gaDMge1xuICBtYXJnaW4tdG9wOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBjb2xvcjogIzMzMztcbn1cblxuLnRvdGFsLWRpc3BsYXkge1xuICBwYWRkaW5nOiAwLjc1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4xZW07XG59XG5cbioge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmJvZHkge1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcbiAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbiAgcGFkZGluZy10b3A6IDgwcHg7IC8qIEFkanVzdCB0aGlzIHZhbHVlIGJhc2VkIG9uIHlvdXIgaGVhZGVyIGhlaWdodCAqL1xufVxuXG4vKiBQYWdlIG1hbmFnZW1lbnQgKi9cbi5wYWdlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnBhZ2UuYWN0aXZlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qIExvZ2luIHBhZ2Ugc3R5bGVzICovXG4ubG9naW4tY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbiAgbWFyZ2luOiAxMDBweCBhdXRvO1xuICBwYWRkaW5nOiAycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ubG9naW4tY29udGFpbmVyIGgxIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICBjb2xvcjogIzMzMztcbn1cblxuLmxvZ2luLWZvcm0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDIwcHg7XG59XG5cbi5sb2dpbi1mb3JtIC5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLmxvZ2luLWZvcm0gaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMC41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmxvZ2luLWZvcm0gYnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuNzVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMS4xZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzO1xufVxuXG4ubG9naW4tZm9ybSBidXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk3NmQyO1xufVxuXG4vKiBIZWFkZXIgc3R5bGVzIHdpdGggQm9vdHN0cmFwICovXG4ubWFpbi1oZWFkZXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogODBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDAuNXJlbSAycmVtO1xuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHotaW5kZXg6IDEwMDE7XG59XG5cbi5tYWluLWhlYWRlciAuYnRuLWxpbmsge1xuICBjb2xvcjogIzMzMztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbi5tYWluLWhlYWRlciAuYnRuLWxpbms6aG92ZXIge1xuICBjb2xvcjogIzIxOTZmMztcbn1cblxuLnN5bmMtc3RhdHVzIHtcbiAgY29sb3I6ICMyOGE3NDU7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cblxuLnN5bmMtc3RhdHVzIGkge1xuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbn1cblxuLyogRGFzaGJvYXJkIGxheW91dCAqL1xuI2Rhc2hib2FyZC1wYWdlIHtcbiAgbWluLWhlaWdodDogMTAwdmg7XG59XG5cbiNkYXNoYm9hcmQtcGFnZS5hY3RpdmUge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4vKiBTaWRlYmFyIHN0eWxlcyAqL1xuLnNpZGViYXIge1xuICB3aWR0aDogMjgwcHg7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDgwcHgpOyAvKiBTdWJ0cmFjdCBoZWFkZXIgaGVpZ2h0ICovXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZWUyZTY7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgdG9wOiA4MHB4OyAvKiBTdGFydCBiZWxvdyBoZWFkZXIgKi9cbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZy10b3A6IDFyZW07XG4gIHotaW5kZXg6IDEwMDA7XG59XG5cbi8qIE1haW4gY29udGVudCBhcmVhICovXG4ubWFpbi1jb250ZW50IHtcbiAgbWFyZ2luLWxlZnQ6IDI4MHB4OyAvKiBNYXRjaCBzaWRlYmFyIHdpZHRoICovXG4gIG1hcmdpbi10b3A6IDgwcHg7IC8qIE1hdGNoIGhlYWRlciBoZWlnaHQgKi9cbiAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDgwcHgpO1xuICBwYWRkaW5nOiAxcmVtO1xuICB3aWR0aDogY2FsYygxMDAlIC0gMjgwcHgpOyAvKiBGdWxsIHdpZHRoIG1pbnVzIHNpZGViYXIgKi9cbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLyogSGVhZGVyL1NlY3Rpb24gVGl0bGUgKi9cbi5jb250ZW50LXNlY3Rpb24gaDIge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGVlMmU2O1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICB0b3A6IDA7XG4gIHotaW5kZXg6IDk5OTtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGNvbG9yOiAjMzMzO1xuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4vKiBTZWN0aW9uIGNvbnRlbnQgKi9cbi5jb250ZW50LXNlY3Rpb24ge1xuICBkaXNwbGF5OiBub25lO1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4vKiBGb3JtIHN0eWxpbmcgKi9cbmZvcm0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IG5vbmU7IC8qIFJlbW92ZSBhbnkgbWF4LXdpZHRoIGNvbnN0cmFpbnRzICovXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5mb3JtLWdyb3VwIGxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5mb3JtLWdyb3VwIGlucHV0W3R5cGU9XCJ0ZXh0XCJdLFxuLmZvcm0tZ3JvdXAgaW5wdXRbdHlwZT1cIm51bWJlclwiXSxcbi5mb3JtLWdyb3VwIGlucHV0W3R5cGU9XCJkYXRlXCJdLFxuLmZvcm0tZ3JvdXAgaW5wdXRbdHlwZT1cInRpbWVcIl0sXG4uZm9ybS1ncm91cCBzZWxlY3QsXG4uZm9ybS1ncm91cCB0ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmZvcm0tZ3JvdXAgaW5wdXQ6Zm9jdXMsXG4uZm9ybS1ncm91cCBzZWxlY3Q6Zm9jdXMsXG4uZm9ybS1ncm91cCB0ZXh0YXJlYTpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMztcbiAgb3V0bGluZTogbm9uZTtcbiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMzMsIDE1MCwgMjQzLCAwLjEpO1xufVxuXG4uZm9ybS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDFyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uaGFsZi13aWR0aCB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogY2FsYyg1MCUgLSAwLjVyZW0pOyAvKiBBY2NvdW50IGZvciBnYXAgKi9cbn1cblxuLnRoaXJkLXdpZHRoIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiBjYWxjKDMzLjMzMyUgLSAwLjY3cmVtKTsgLyogQWNjb3VudCBmb3IgZ2FwICovXG59XG5cbi8qIFRvdGFsIGRpc3BsYXkgc2VjdGlvbnMgKi9cbi50b3RhbC1xdHktc2VjdGlvbixcbi5zdW1tYXJ5LXNlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RlZTJlNjtcbn1cblxuLnRvdGFsLXF0eS1zZWN0aW9uIGgzLFxuLnN1bW1hcnktc2VjdGlvbiBoMyB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4udG90YWwtZGlzcGxheSB7XG4gIHBhZGRpbmc6IDAuNzVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjFlbTtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi8qIFN1Ym1pdCBidXR0b24gKi9cbmZvcm0gYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0ge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxLjFlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnM7XG4gIG1hcmdpbi10b3A6IDJyZW07XG59XG5cbmZvcm0gYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl06aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk3NmQyO1xufVxuXG4vKiBOYXZpZ2F0aW9uIHN0eWxlcyAtIGtlZXBpbmcgZXhpc3Rpbmcgc3R5bGVzICovXG4ubWFpbi1uYXYge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ubWFpbi1uYXYgdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbi5tYWluLW5hdiA+IHVsID4gbGkge1xuICBtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xufVxuXG4ubWFpbi1uYXYgdWwgbGkgYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAwLjc1cmVtIDFyZW07XG4gIGNvbG9yOiAjMzMzO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLm1haW4tbmF2IHVsIGxpIGE6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTllY2VmO1xuICBjb2xvcjogIzIxOTZmMztcbn1cblxuLyogU3VibWVudSBzdHlsZXMgKi9cbi5zdWJtZW51IHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcGFkZGluZy1sZWZ0OiAxLjI1cmVtO1xuICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgI2RlZTJlNjtcbn1cblxuLnN1Ym1lbnUuYWN0aXZlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zdWJtZW51IGxpIHtcbiAgbWFyZ2luLWJvdHRvbTogMC40cmVtO1xufVxuXG4uc3VibWVudSBsaSBhIHtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMC45NWVtO1xuICBjb2xvcjogIzY2Njtcbn1cblxuLm1lbnUtdG9nZ2xlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nLXJpZ2h0OiAycmVtICFpbXBvcnRhbnQ7XG59XG5cbi5tZW51LXRvZ2dsZTphZnRlciB7XG4gIGNvbnRlbnQ6IFwi4pa8XCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDFyZW07XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIGZvbnQtc2l6ZTogMC44ZW07XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzO1xufVxuXG4uaGFzLXN1Ym1lbnUuYWN0aXZlIC5tZW51LXRvZ2dsZTphZnRlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMTgwZGVnKTtcbn1cblxuLyogQWN0aXZlIHN0YXRlcyAqL1xuLm1haW4tbmF2IHVsIGxpIGEuYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uc3VibWVudSBsaSBhLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzMsIDE1MCwgMjQzLCAwLjEpO1xuICBjb2xvcjogIzIxOTZmMztcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLyogTG9nb3V0IGJ1dHRvbiBzcGVjaWFsIHN0eWxpbmcgKi9cbiNsb2dvdXQtYnRuIHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZDdkYTtcbiAgY29sb3I6ICNkYzM1NDU7XG59XG5cbiNsb2dvdXQtYnRuOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RjMzU0NTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4vKiBMb2dvdXQgYnV0dG9uICovXG4jbG9nb3V0LWJ0biB7XG4gIG1hcmdpbi10b3A6IDJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGQ3ZGE7XG4gIGNvbG9yOiAjZGMzNTQ1O1xufVxuXG4jbG9nb3V0LWJ0bjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDU7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLyogRGFpbHkgUmVwb3J0IEZvcm0gc3R5bGVzICovXG4jZGFpbHktcmVwb3J0LWZvcm0gLmZvcm0tZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4jZGFpbHktcmVwb3J0LWZvcm0gaW5wdXRbdHlwZT1cInRleHRcIl0sXG4jZGFpbHktcmVwb3J0LWZvcm0gaW5wdXRbdHlwZT1cIm51bWJlclwiXSxcbiNkYWlseS1yZXBvcnQtZm9ybSBpbnB1dFt0eXBlPVwiZGF0ZVwiXSxcbiNkYWlseS1yZXBvcnQtZm9ybSBpbnB1dFt0eXBlPVwidGltZVwiXSxcbiNkYWlseS1yZXBvcnQtZm9ybSBzZWxlY3QsXG4jZGFpbHktcmVwb3J0LWZvcm0gdGV4dGFyZWEge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMC41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuI2RhaWx5LXJlcG9ydC1mb3JtIHRleHRhcmVhIHtcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgbWluLWhlaWdodDogMTAwcHg7XG59XG5cbiNkYWlseS1yZXBvcnQtZm9ybSBidXR0b25bdHlwZT1cInN1Ym1pdFwiXSB7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuNzVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMS4xZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzO1xufVxuXG4jZGFpbHktcmVwb3J0LWZvcm0gYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl06aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk3NmQyO1xufVxuXG4vKiBDb250ZW50IHNlY3Rpb25zICovXG4uY29udGVudC1zZWN0aW9uIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmNvbnRlbnQtc2VjdGlvbiBoMiB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4vKiBUYWJsZSBzdHlsZXMgKi9cbi50YWJsZS1jb250YWluZXIge1xuICBvdmVyZmxvdy14OiBhdXRvO1xufVxuXG50YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG50ZCxcbnRoIHtcbiAgcGFkZGluZzogMC43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbn1cblxuLyogTWVudSB0b2dnbGUgYnV0dG9uICovXG4jbWVudS10b2dnbGUge1xuICBkaXNwbGF5OiBub25lO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuLyogUmVzcG9uc2l2ZSBkZXNpZ24gKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuc2lkZWJhciB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgfVxuXG4gIC5zaWRlYmFyLmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICB9XG5cbiAgLm1haW4tY29udGVudCB7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gIH1cblxuICAjbWVudS10b2dnbGUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG5cbiAgLmNvbnRlbnQtc2VjdGlvbiB7XG4gICAgcGFkZGluZzogMTVweDtcbiAgfVxuXG4gIC5mb3JtLWdyb3VwIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xuICB9XG59XG5cbi8qIFV0aWxpdHkgY2xhc3NlcyAqL1xuLmhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5yZWthcC1jb250cm9scyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpO1xuICBnYXA6IDFyZW07XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbn1cblxuLnN5bmMtc3RhdHVzIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTgwMDtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cblxuLnN1bW1hcnktc2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDJyZW07XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4jaXJpZGVzc2UtZm9ybSAuZm9ybS1ncm91cCB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbiNpcmlkZXNzZS1mb3JtIGlucHV0LFxuI2lyaWRlc3NlLWZvcm0gc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzO1xufVxuXG4jaXJpZGVzc2UtZm9ybSBpbnB1dDpmb2N1cyxcbiNpcmlkZXNzZS1mb3JtIHNlbGVjdDpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMztcbiAgb3V0bGluZTogbm9uZTtcbiAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoMzMsIDE1MCwgMjQzLCAwLjEpO1xufVxuXG4jaXJpZGVzc2UtZm9ybSAudG90YWwtZGlzcGxheSB7XG4gIHBhZGRpbmc6IDAuNzVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjFlbTtcbiAgY29sb3I6ICMzMzM7XG59XG5cbiNpcmlkZXNzZS1mb3JtIGJ1dHRvblt0eXBlPVwic3VibWl0XCJdIHtcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMC43NXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxLjFlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnM7XG59XG5cbiNpcmlkZXNzZS1mb3JtIGJ1dHRvblt0eXBlPVwic3VibWl0XCJdOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE5NzZkMjtcbn1cblxuLyogU3RhdHVzIGNvbG9ycyAqL1xuI2lyaWRlc3NlLWZvcm0gI3N0YXR1cyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4jaXJpZGVzc2UtZm9ybSAjc3RhdHVzIG9wdGlvblt2YWx1ZT1cIlNFTEVTQUlcIl0ge1xuICBjb2xvcjogIzI4YTc0NTtcbn1cblxuI2lyaWRlc3NlLWZvcm0gI3N0YXR1cyBvcHRpb25bdmFsdWU9XCJQRU5ESU5HXCJdIHtcbiAgY29sb3I6ICNmZmMxMDc7XG59XG5cbiNpcmlkZXNzZS1mb3JtICNzdGF0dXMgb3B0aW9uW3ZhbHVlPVwiQkVSTUFTQUxBSFwiXSB7XG4gIGNvbG9yOiAjZGMzNTQ1O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3Nz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LGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQix3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsV0FBVztFQUNYLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZiw2QkFBNkI7QUFDL0I7O0FBRUE7O0VBRUUscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYiw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBLGtCQUFrQjtBQUNsQjtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBSZXNldCBhbmQgYmFzZSBzdHlsZXMgKi9cXG5cXG4uZm9ybS1yb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5oYWxmLXdpZHRoIHtcXG4gIGZsZXg6IDE7XFxufVxcblxcbi50aGlyZC13aWR0aCB7XFxuICBmbGV4OiAxO1xcbn1cXG5cXG4udG90YWwtcXR5LXNlY3Rpb24ge1xcbiAgbWFyZ2luLXRvcDogMnJlbTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG5cXG4udG90YWwtcXR5LXNlY3Rpb24gaDMge1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICBjb2xvcjogIzMzMztcXG59XFxuXFxuLnRvdGFsLWRpc3BsYXkge1xcbiAgcGFkZGluZzogMC43NXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMWVtO1xcbn1cXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiU2Vnb2UgVUlcXFwiLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcXG4gIGxpbmUtaGVpZ2h0OiAxLjY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgcGFkZGluZy10b3A6IDgwcHg7IC8qIEFkanVzdCB0aGlzIHZhbHVlIGJhc2VkIG9uIHlvdXIgaGVhZGVyIGhlaWdodCAqL1xcbn1cXG5cXG4vKiBQYWdlIG1hbmFnZW1lbnQgKi9cXG4ucGFnZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4ucGFnZS5hY3RpdmUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qIExvZ2luIHBhZ2Ugc3R5bGVzICovXFxuLmxvZ2luLWNvbnRhaW5lciB7XFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcbiAgbWFyZ2luOiAxMDBweCBhdXRvO1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuLmxvZ2luLWNvbnRhaW5lciBoMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgY29sb3I6ICMzMzM7XFxufVxcblxcbi5sb2dpbi1mb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4ubG9naW4tZm9ybSAuZm9ybS1ncm91cCB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4ubG9naW4tZm9ybSBpbnB1dCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcblxcbi5sb2dpbi1mb3JtIGJ1dHRvbiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgZm9udC1zaXplOiAxLjFlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycztcXG59XFxuXFxuLmxvZ2luLWZvcm0gYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxOTc2ZDI7XFxufVxcblxcbi8qIEhlYWRlciBzdHlsZXMgd2l0aCBCb290c3RyYXAgKi9cXG4ubWFpbi1oZWFkZXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAwLjVyZW0gMnJlbTtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHotaW5kZXg6IDEwMDE7XFxufVxcblxcbi5tYWluLWhlYWRlciAuYnRuLWxpbmsge1xcbiAgY29sb3I6ICMzMzM7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbi5tYWluLWhlYWRlciAuYnRuLWxpbms6aG92ZXIge1xcbiAgY29sb3I6ICMyMTk2ZjM7XFxufVxcblxcbi5zeW5jLXN0YXR1cyB7XFxuICBjb2xvcjogIzI4YTc0NTtcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XFxufVxcblxcbi5zeW5jLXN0YXR1cyBpIHtcXG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xcbn1cXG5cXG4vKiBEYXNoYm9hcmQgbGF5b3V0ICovXFxuI2Rhc2hib2FyZC1wYWdlIHtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jZGFzaGJvYXJkLXBhZ2UuYWN0aXZlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi8qIFNpZGViYXIgc3R5bGVzICovXFxuLnNpZGViYXIge1xcbiAgd2lkdGg6IDI4MHB4O1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gODBweCk7IC8qIFN1YnRyYWN0IGhlYWRlciBoZWlnaHQgKi9cXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZGVlMmU2O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogODBweDsgLyogU3RhcnQgYmVsb3cgaGVhZGVyICovXFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgcGFkZGluZy10b3A6IDFyZW07XFxuICB6LWluZGV4OiAxMDAwO1xcbn1cXG5cXG4vKiBNYWluIGNvbnRlbnQgYXJlYSAqL1xcbi5tYWluLWNvbnRlbnQge1xcbiAgbWFyZ2luLWxlZnQ6IDI4MHB4OyAvKiBNYXRjaCBzaWRlYmFyIHdpZHRoICovXFxuICBtYXJnaW4tdG9wOiA4MHB4OyAvKiBNYXRjaCBoZWFkZXIgaGVpZ2h0ICovXFxuICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gODBweCk7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDI4MHB4KTsgLyogRnVsbCB3aWR0aCBtaW51cyBzaWRlYmFyICovXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4vKiBIZWFkZXIvU2VjdGlvbiBUaXRsZSAqL1xcbi5jb250ZW50LXNlY3Rpb24gaDIge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RlZTJlNjtcXG4gIHBvc2l0aW9uOiBzdGlja3k7XFxuICB0b3A6IDA7XFxuICB6LWluZGV4OiA5OTk7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGNvbG9yOiAjMzMzO1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuLyogU2VjdGlvbiBjb250ZW50ICovXFxuLmNvbnRlbnQtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcGFkZGluZzogMnJlbTtcXG59XFxuXFxuLyogRm9ybSBzdHlsaW5nICovXFxuZm9ybSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDEuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC13aWR0aDogbm9uZTsgLyogUmVtb3ZlIGFueSBtYXgtd2lkdGggY29uc3RyYWludHMgKi9cXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi5mb3JtLWdyb3VwIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmZvcm0tZ3JvdXAgbGFiZWwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgY29sb3I6ICMzMzM7XFxufVxcblxcbi5mb3JtLWdyb3VwIGlucHV0W3R5cGU9XFxcInRleHRcXFwiXSxcXG4uZm9ybS1ncm91cCBpbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXSxcXG4uZm9ybS1ncm91cCBpbnB1dFt0eXBlPVxcXCJkYXRlXFxcIl0sXFxuLmZvcm0tZ3JvdXAgaW5wdXRbdHlwZT1cXFwidGltZVxcXCJdLFxcbi5mb3JtLWdyb3VwIHNlbGVjdCxcXG4uZm9ybS1ncm91cCB0ZXh0YXJlYSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmZvcm0tZ3JvdXAgaW5wdXQ6Zm9jdXMsXFxuLmZvcm0tZ3JvdXAgc2VsZWN0OmZvY3VzLFxcbi5mb3JtLWdyb3VwIHRleHRhcmVhOmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMztcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgzMywgMTUwLCAyNDMsIDAuMSk7XFxufVxcblxcbi5mb3JtLXJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uaGFsZi13aWR0aCB7XFxuICBmbGV4OiAxO1xcbiAgbWluLXdpZHRoOiBjYWxjKDUwJSAtIDAuNXJlbSk7IC8qIEFjY291bnQgZm9yIGdhcCAqL1xcbn1cXG5cXG4udGhpcmQtd2lkdGgge1xcbiAgZmxleDogMTtcXG4gIG1pbi13aWR0aDogY2FsYygzMy4zMzMlIC0gMC42N3JlbSk7IC8qIEFjY291bnQgZm9yIGdhcCAqL1xcbn1cXG5cXG4vKiBUb3RhbCBkaXNwbGF5IHNlY3Rpb25zICovXFxuLnRvdGFsLXF0eS1zZWN0aW9uLFxcbi5zdW1tYXJ5LXNlY3Rpb24ge1xcbiAgbWFyZ2luLXRvcDogMnJlbTtcXG4gIHBhZGRpbmc6IDEuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGVlMmU2O1xcbn1cXG5cXG4udG90YWwtcXR5LXNlY3Rpb24gaDMsXFxuLnN1bW1hcnktc2VjdGlvbiBoMyB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG5cXG4udG90YWwtZGlzcGxheSB7XFxuICBwYWRkaW5nOiAwLjc1cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4xZW07XFxuICBjb2xvcjogIzMzMztcXG59XFxuXFxuLyogU3VibWl0IGJ1dHRvbiAqL1xcbmZvcm0gYnV0dG9uW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBmb250LXNpemU6IDEuMWVtO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycztcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxufVxcblxcbmZvcm0gYnV0dG9uW3R5cGU9XFxcInN1Ym1pdFxcXCJdOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxOTc2ZDI7XFxufVxcblxcbi8qIE5hdmlnYXRpb24gc3R5bGVzIC0ga2VlcGluZyBleGlzdGluZyBzdHlsZXMgKi9cXG4ubWFpbi1uYXYge1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuLm1haW4tbmF2IHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4ubWFpbi1uYXYgPiB1bCA+IGxpIHtcXG4gIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XFxufVxcblxcbi5tYWluLW5hdiB1bCBsaSBhIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogMC43NXJlbSAxcmVtO1xcbiAgY29sb3I6ICMzMzM7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuXFxuLm1haW4tbmF2IHVsIGxpIGE6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U5ZWNlZjtcXG4gIGNvbG9yOiAjMjE5NmYzO1xcbn1cXG5cXG4vKiBTdWJtZW51IHN0eWxlcyAqL1xcbi5zdWJtZW51IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwYWRkaW5nLWxlZnQ6IDEuMjVyZW07XFxuICBtYXJnaW4tdG9wOiAwLjVyZW07XFxuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNkZWUyZTY7XFxufVxcblxcbi5zdWJtZW51LmFjdGl2ZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLnN1Ym1lbnUgbGkge1xcbiAgbWFyZ2luLWJvdHRvbTogMC40cmVtO1xcbn1cXG5cXG4uc3VibWVudSBsaSBhIHtcXG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcbiAgZm9udC1zaXplOiAwLjk1ZW07XFxuICBjb2xvcjogIzY2NjtcXG59XFxuXFxuLm1lbnUtdG9nZ2xlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmctcmlnaHQ6IDJyZW0gIWltcG9ydGFudDtcXG59XFxuXFxuLm1lbnUtdG9nZ2xlOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCLilrxcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDFyZW07XFxuICB0b3A6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycztcXG59XFxuXFxuLmhhcy1zdWJtZW51LmFjdGl2ZSAubWVudS10b2dnbGU6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG4vKiBBY3RpdmUgc3RhdGVzICovXFxuLm1haW4tbmF2IHVsIGxpIGEuYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5zdWJtZW51IGxpIGEuYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzMsIDE1MCwgMjQzLCAwLjEpO1xcbiAgY29sb3I6ICMyMTk2ZjM7XFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5cXG4vKiBMb2dvdXQgYnV0dG9uIHNwZWNpYWwgc3R5bGluZyAqL1xcbiNsb2dvdXQtYnRuIHtcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhkN2RhO1xcbiAgY29sb3I6ICNkYzM1NDU7XFxufVxcblxcbiNsb2dvdXQtYnRuOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDU7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi8qIExvZ291dCBidXR0b24gKi9cXG4jbG9nb3V0LWJ0biB7XFxuICBtYXJnaW4tdG9wOiAycmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZDdkYTtcXG4gIGNvbG9yOiAjZGMzNTQ1O1xcbn1cXG5cXG4jbG9nb3V0LWJ0bjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGMzNTQ1O1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4vKiBEYWlseSBSZXBvcnQgRm9ybSBzdHlsZXMgKi9cXG4jZGFpbHktcmVwb3J0LWZvcm0gLmZvcm0tZ3JvdXAge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuI2RhaWx5LXJlcG9ydC1mb3JtIGlucHV0W3R5cGU9XFxcInRleHRcXFwiXSxcXG4jZGFpbHktcmVwb3J0LWZvcm0gaW5wdXRbdHlwZT1cXFwibnVtYmVyXFxcIl0sXFxuI2RhaWx5LXJlcG9ydC1mb3JtIGlucHV0W3R5cGU9XFxcImRhdGVcXFwiXSxcXG4jZGFpbHktcmVwb3J0LWZvcm0gaW5wdXRbdHlwZT1cXFwidGltZVxcXCJdLFxcbiNkYWlseS1yZXBvcnQtZm9ybSBzZWxlY3QsXFxuI2RhaWx5LXJlcG9ydC1mb3JtIHRleHRhcmVhIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG59XFxuXFxuI2RhaWx5LXJlcG9ydC1mb3JtIHRleHRhcmVhIHtcXG4gIHJlc2l6ZTogdmVydGljYWw7XFxuICBtaW4taGVpZ2h0OiAxMDBweDtcXG59XFxuXFxuI2RhaWx5LXJlcG9ydC1mb3JtIGJ1dHRvblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICBtYXJnaW4tdG9wOiAxLjVyZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgZm9udC1zaXplOiAxLjFlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycztcXG59XFxuXFxuI2RhaWx5LXJlcG9ydC1mb3JtIGJ1dHRvblt0eXBlPVxcXCJzdWJtaXRcXFwiXTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk3NmQyO1xcbn1cXG5cXG4vKiBDb250ZW50IHNlY3Rpb25zICovXFxuLmNvbnRlbnQtc2VjdGlvbiB7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuXFxuLmNvbnRlbnQtc2VjdGlvbiBoMiB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgY29sb3I6ICMzMzM7XFxufVxcblxcbi8qIFRhYmxlIHN0eWxlcyAqL1xcbi50YWJsZS1jb250YWluZXIge1xcbiAgb3ZlcmZsb3cteDogYXV0bztcXG59XFxuXFxudGFibGUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxudGQsXFxudGgge1xcbiAgcGFkZGluZzogMC43NXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxufVxcblxcbi8qIE1lbnUgdG9nZ2xlIGJ1dHRvbiAqL1xcbiNtZW51LXRvZ2dsZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgYmFja2dyb3VuZDogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4vKiBSZXNwb25zaXZlIGRlc2lnbiAqL1xcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xcbiAgLnNpZGViYXIge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgfVxcblxcbiAgLnNpZGViYXIuYWN0aXZlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgfVxcblxcbiAgLm1haW4tY29udGVudCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcblxcbiAgI21lbnUtdG9nZ2xlIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICB9XFxuXFxuICAuY29udGVudC1zZWN0aW9uIHtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gIH1cXG5cXG4gIC5mb3JtLWdyb3VwIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC43NXJlbTtcXG4gIH1cXG59XFxuXFxuLyogVXRpbGl0eSBjbGFzc2VzICovXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4ucmVrYXAtY29udHJvbHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpO1xcbiAgZ2FwOiAxcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xcbn1cXG5cXG4uc3luYy1zdGF0dXMge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5ODAwO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG59XFxuXFxuLnN1bW1hcnktc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAycmVtO1xcbiAgcGFkZGluZzogMS41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxufVxcblxcbiNpcmlkZXNzZS1mb3JtIC5mb3JtLWdyb3VwIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbiNpcmlkZXNzZS1mb3JtIGlucHV0LFxcbiNpcmlkZXNzZS1mb3JtIHNlbGVjdCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycztcXG59XFxuXFxuI2lyaWRlc3NlLWZvcm0gaW5wdXQ6Zm9jdXMsXFxuI2lyaWRlc3NlLWZvcm0gc2VsZWN0OmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMztcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSgzMywgMTUwLCAyNDMsIDAuMSk7XFxufVxcblxcbiNpcmlkZXNzZS1mb3JtIC50b3RhbC1kaXNwbGF5IHtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjFlbTtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG5cXG4jaXJpZGVzc2UtZm9ybSBidXR0b25bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAwLjc1cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGZvbnQtc2l6ZTogMS4xZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnM7XFxufVxcblxcbiNpcmlkZXNzZS1mb3JtIGJ1dHRvblt0eXBlPVxcXCJzdWJtaXRcXFwiXTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk3NmQyO1xcbn1cXG5cXG4vKiBTdGF0dXMgY29sb3JzICovXFxuI2lyaWRlc3NlLWZvcm0gI3N0YXR1cyB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuI2lyaWRlc3NlLWZvcm0gI3N0YXR1cyBvcHRpb25bdmFsdWU9XFxcIlNFTEVTQUlcXFwiXSB7XFxuICBjb2xvcjogIzI4YTc0NTtcXG59XFxuXFxuI2lyaWRlc3NlLWZvcm0gI3N0YXR1cyBvcHRpb25bdmFsdWU9XFxcIlBFTkRJTkdcXFwiXSB7XFxuICBjb2xvcjogI2ZmYzEwNztcXG59XFxuXFxuI2lyaWRlc3NlLWZvcm0gI3N0YXR1cyBvcHRpb25bdmFsdWU9XFxcIkJFUk1BU0FMQUhcXFwiXSB7XFxuICBjb2xvcjogI2RjMzU0NTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIi8vIEltcG9ydCBDU1NcbmltcG9ydCBcIi4uL2Nzcy9zdHlsZS5jc3NcIjtcblxuLy8gSW1wb3J0IE1vZGVsc1xuaW1wb3J0IHsgQmFoYW5CYWt1TW9kZWwgfSBmcm9tIFwiLi9tb2RlbHMvQmFoYW5CYWt1TW9kZWwuanNcIjtcbmltcG9ydCB7IERhaWx5UmVwb3J0TW9kZWwgfSBmcm9tIFwiLi9tb2RlbHMvRGFpbHlSZXBvcnRNb2RlbC5qc1wiO1xuXG4vLyBJbXBvcnQgVmlld3NcbmltcG9ydCB7IExvZ2luVmlldyB9IGZyb20gXCIuL3ZpZXdzL0xvZ2luVmlldy5qc1wiO1xuaW1wb3J0IHsgTmF2aWdhdGlvblZpZXcgfSBmcm9tIFwiLi92aWV3cy9OYXZpZ2F0aW9uVmlldy5qc1wiO1xuaW1wb3J0IHsgSGVhZGVyVmlldyB9IGZyb20gXCIuL3ZpZXdzL0hlYWRlclZpZXcuanNcIjtcbmltcG9ydCB7IEJhaGFuQmFrdVZpZXcgfSBmcm9tIFwiLi92aWV3cy9CYWhhbkJha3VWaWV3LmpzXCI7XG5pbXBvcnQgeyBEYWlseVJlcG9ydFZpZXcgfSBmcm9tIFwiLi92aWV3cy9EYWlseVJlcG9ydFZpZXcuanNcIjtcbmltcG9ydCB7IFJla2FwVmlldyB9IGZyb20gXCIuL3ZpZXdzL1Jla2FwVmlldy5qc1wiO1xuXG4vLyBJbXBvcnQgUHJlc2VudGVyc1xuaW1wb3J0IHsgTG9naW5QcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXJzL0xvZ2luUHJlc2VudGVyLmpzXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uUHJlc2VudGVyIH0gZnJvbSBcIi4vcHJlc2VudGVycy9OYXZpZ2F0aW9uUHJlc2VudGVyLmpzXCI7XG5pbXBvcnQgeyBIZWFkZXJQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXJzL0hlYWRlclByZXNlbnRlci5qc1wiO1xuaW1wb3J0IHsgQmFoYW5CYWt1UHJlc2VudGVyIH0gZnJvbSBcIi4vcHJlc2VudGVycy9CYWhhbkJha3VQcmVzZW50ZXIuanNcIjtcbmltcG9ydCB7IERhaWx5UmVwb3J0UHJlc2VudGVyIH0gZnJvbSBcIi4vcHJlc2VudGVycy9EYWlseVJlcG9ydFByZXNlbnRlci5qc1wiO1xuaW1wb3J0IHsgUmVrYXBQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXJzL1Jla2FwUHJlc2VudGVyLmpzXCI7XG5cbi8vIEltcG9ydCBEYXRhYmFzZVxuaW1wb3J0ICogYXMgZGIgZnJvbSBcIi4vZGIuanNcIjtcblxuY2xhc3MgQXBwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBNb2RlbHNcbiAgICB0aGlzLmJhaGFuQmFrdU1vZGVsID0gbmV3IEJhaGFuQmFrdU1vZGVsKCk7XG4gICAgdGhpcy5kYWlseVJlcG9ydE1vZGVsID0gbmV3IERhaWx5UmVwb3J0TW9kZWwoKTtcblxuICAgIC8vIEluaXRpYWxpemUgVmlld3NcbiAgICB0aGlzLmxvZ2luVmlldyA9IG5ldyBMb2dpblZpZXcoKTtcbiAgICB0aGlzLm5hdmlnYXRpb25WaWV3ID0gbmV3IE5hdmlnYXRpb25WaWV3KCk7XG4gICAgdGhpcy5oZWFkZXJWaWV3ID0gbmV3IEhlYWRlclZpZXcoKTtcbiAgICB0aGlzLmJhaGFuQmFrdVZpZXcgPSBuZXcgQmFoYW5CYWt1VmlldygpO1xuICAgIHRoaXMuZGFpbHlSZXBvcnRWaWV3ID0gbmV3IERhaWx5UmVwb3J0VmlldygpO1xuICAgIHRoaXMucmVrYXBWaWV3ID0gbmV3IFJla2FwVmlldygpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBQcmVzZW50ZXJzXG4gICAgdGhpcy5sb2dpblByZXNlbnRlciA9IG5ldyBMb2dpblByZXNlbnRlcih0aGlzLmxvZ2luVmlldyk7XG4gICAgdGhpcy5uYXZpZ2F0aW9uUHJlc2VudGVyID0gbmV3IE5hdmlnYXRpb25QcmVzZW50ZXIodGhpcy5uYXZpZ2F0aW9uVmlldyk7XG4gICAgdGhpcy5oZWFkZXJQcmVzZW50ZXIgPSBuZXcgSGVhZGVyUHJlc2VudGVyKFxuICAgICAgdGhpcy5oZWFkZXJWaWV3LFxuICAgICAgdGhpcy5uYXZpZ2F0aW9uVmlld1xuICAgICk7XG4gICAgdGhpcy5iYWhhbkJha3VQcmVzZW50ZXIgPSBuZXcgQmFoYW5CYWt1UHJlc2VudGVyKFxuICAgICAgdGhpcy5iYWhhbkJha3VNb2RlbCxcbiAgICAgIHRoaXMuYmFoYW5CYWt1Vmlld1xuICAgICk7XG4gICAgdGhpcy5kYWlseVJlcG9ydFByZXNlbnRlciA9IG5ldyBEYWlseVJlcG9ydFByZXNlbnRlcihcbiAgICAgIHRoaXMuZGFpbHlSZXBvcnRNb2RlbCxcbiAgICAgIHRoaXMuZGFpbHlSZXBvcnRWaWV3XG4gICAgKTtcbiAgICB0aGlzLnJla2FwUHJlc2VudGVyID0gbmV3IFJla2FwUHJlc2VudGVyKFxuICAgICAgdGhpcy5iYWhhbkJha3VNb2RlbCxcbiAgICAgIHRoaXMuZGFpbHlSZXBvcnRNb2RlbCxcbiAgICAgIHRoaXMucmVrYXBWaWV3XG4gICAgKTtcblxuICAgIC8vIEJpbmQgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2dpblN1Y2Nlc3NcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uUHJlc2VudGVyLnNob3dQYWdlKFwiZGFzaGJvYXJkXCIpO1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uUHJlc2VudGVyLnNob3dEZWZhdWx0U2VjdGlvbigpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvZ291dFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLm5hdmlnYXRpb25QcmVzZW50ZXIuc2hvd1BhZ2UoXCJsb2dpblwiKTtcbiAgICB9KTtcblxuICAgIC8vIE9ubGluZS9PZmZsaW5lIGhhbmRsaW5nXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJCYWNrIG9ubGluZVwiKTtcbiAgICAgIGRiLnByb2Nlc3NTeW5jUXVldWUoKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkdvbmUgb2ZmbGluZVwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLm9wZW5EQigpO1xuICAgICAgY29uc29sZS5sb2coXCJEYXRhYmFzZSBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgZGF0YWJhc2U6XCIsIGVycm9yKTtcbiAgICAgIGFsZXJ0KFwiR2FnYWwgbWVuZ2luaXNpYWxpc2FzaSBkYXRhYmFzZVwiKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSBhcHAgd2hlbiBET00gaXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbiAgYXBwLmluaXQoKTtcbn0pO1xuXG4vLyBSZWdpc3RlciBTZXJ2aWNlIFdvcmtlclxuaWYgKFwic2VydmljZVdvcmtlclwiIGluIG5hdmlnYXRvcikge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyXG4gICAgICAucmVnaXN0ZXIoXCIvc3cuanNcIilcbiAgICAgIC50aGVuKChyZWdpc3RyYXRpb24pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsXCIpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOiBcIiwgZXJyKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cbiIsIi8vIERhdGFiYXNlIGNvbmZpZ3VyYXRpb25cbmV4cG9ydCBjb25zdCBEQl9TVE9SRVMgPSB7XG4gIGJhaGFuQmFrdVN0b2NrOiBcImJhaGFuX2Jha3Vfc3RvY2tcIixcbiAgYmFoYW5CYWt1VHJhbnNhY3Rpb25zOiBcImJhaGFuX2Jha3VfdHJhbnNhY3Rpb25zXCIsXG4gIGRhaWx5UmVwb3J0OiBcImRhaWx5X3JlcG9ydFwiLFxufTtcblxuLy8gT3BlbiBkYXRhYmFzZSBjb25uZWN0aW9uXG5leHBvcnQgY29uc3Qgb3BlbkRCID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihcIlByaW50aW5nREJcIiwgMSk7XG5cbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcblxuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cbiAgICAgIC8vIENyZWF0ZSBCYWhhbiBCYWt1IFN0b2NrIHN0b3JlXG4gICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoREJfU1RPUkVTLmJhaGFuQmFrdVN0b2NrKSkge1xuICAgICAgICBjb25zdCBzdG9ja1N0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoREJfU1RPUkVTLmJhaGFuQmFrdVN0b2NrLCB7XG4gICAgICAgICAga2V5UGF0aDogXCJpZFwiLFxuICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBzdG9ja1N0b3JlLmNyZWF0ZUluZGV4KFwiY2F0ZWdvcnlcIiwgXCJjYXRlZ29yeVwiKTtcbiAgICAgICAgc3RvY2tTdG9yZS5jcmVhdGVJbmRleChcInVwZGF0ZWRBdFwiLCBcInVwZGF0ZWRBdFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ3JlYXRlIEJhaGFuIEJha3UgVHJhbnNhY3Rpb25zIHN0b3JlXG4gICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoREJfU1RPUkVTLmJhaGFuQmFrdVRyYW5zYWN0aW9ucykpIHtcbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb25zU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShcbiAgICAgICAgICBEQl9TVE9SRVMuYmFoYW5CYWt1VHJhbnNhY3Rpb25zLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGtleVBhdGg6IFwiaWRcIixcbiAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0cmFuc2FjdGlvbnNTdG9yZS5jcmVhdGVJbmRleChcImNhdGVnb3J5XCIsIFwiY2F0ZWdvcnlcIik7XG4gICAgICAgIHRyYW5zYWN0aW9uc1N0b3JlLmNyZWF0ZUluZGV4KFwidHlwZVwiLCBcInR5cGVcIik7XG4gICAgICAgIHRyYW5zYWN0aW9uc1N0b3JlLmNyZWF0ZUluZGV4KFwidGltZXN0YW1wXCIsIFwidGltZXN0YW1wXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgRGFpbHkgUmVwb3J0IHN0b3JlXG4gICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoREJfU1RPUkVTLmRhaWx5UmVwb3J0KSkge1xuICAgICAgICBjb25zdCBkYWlseVJlcG9ydFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoREJfU1RPUkVTLmRhaWx5UmVwb3J0LCB7XG4gICAgICAgICAga2V5UGF0aDogXCJpZFwiLFxuICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBkYWlseVJlcG9ydFN0b3JlLmNyZWF0ZUluZGV4KFwidGFuZ2dhbFwiLCBcInRhbmdnYWxcIik7XG4gICAgICAgIGRhaWx5UmVwb3J0U3RvcmUuY3JlYXRlSW5kZXgoXCJzaGlmdFwiLCBcInNoaWZ0XCIpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufTtcblxuLy8gR2VuZXJpYyBhZGQgcmVjb3JkIGZ1bmN0aW9uXG5leHBvcnQgY29uc3QgYWRkUmVjb3JkID0gYXN5bmMgKHN0b3JlTmFtZSwgZGF0YSkgPT4ge1xuICBjb25zb2xlLmxvZygnQWRkaW5nIHJlY29yZCB0byBzdG9yZTonLCBzdG9yZU5hbWUsIGRhdGEpO1xuICBjb25zdCBkYiA9IGF3YWl0IG9wZW5EQigpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCBcInJlYWR3cml0ZVwiKTtcbiAgICBjb25zdCBzdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgXG4gICAgLy8gRW5zdXJlIHRhbmdnYWwgaXMgYSBEYXRlIG9iamVjdFxuICAgIGNvbnN0IHByb2Nlc3NlZERhdGEgPSB7XG4gICAgICAuLi5kYXRhLFxuICAgICAgdGFuZ2dhbDogZGF0YS50YW5nZ2FsID8gbmV3IERhdGUoZGF0YS50YW5nZ2FsKSA6IG5ldyBEYXRlKCksXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgIH07XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gc3RvcmUuYWRkKHByb2Nlc3NlZERhdGEpO1xuICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICB9KTtcbn07XG5cbi8vIEdlbmVyaWMgZ2V0IHJlY29yZHMgZnVuY3Rpb25cbmV4cG9ydCBjb25zdCBnZXRSZWNvcmRzID0gYXN5bmMgKHN0b3JlTmFtZSwgcXVlcnkgPSBudWxsKSA9PiB7XG4gIGNvbnN0IGRiID0gYXdhaXQgb3BlbkRCKCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgdHJhbnNhY3Rpb24gPSBkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIFwicmVhZG9ubHlcIik7XG4gICAgY29uc3Qgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBzdG9yZS5nZXRBbGwoKTtcblxuICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgbGV0IHJlc3VsdHMgPSByZXF1ZXN0LnJlc3VsdDtcbiAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIoKHJlY29yZCkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IGtleSBpbiBxdWVyeSkge1xuICAgICAgICAgICAgaWYgKHJlY29yZFtrZXldICE9PSBxdWVyeVtrZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgfTtcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gIH0pO1xufTtcblxuLy8gR2V0IHJlY29yZHMgYnkgZGF0ZSByYW5nZVxuZXhwb3J0IGNvbnN0IGdldFJlY29yZHNCeURhdGVSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWUsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkgPT4ge1xuICBjb25zdCBkYiA9IGF3YWl0IG9wZW5EQigpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCBcInJlYWRvbmx5XCIpO1xuICAgIGNvbnN0IHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICBjb25zdCByZXF1ZXN0ID0gc3RvcmUuZ2V0QWxsKCk7XG5cbiAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXF1ZXN0LnJlc3VsdC5maWx0ZXIoKHJlY29yZCkgPT4ge1xuICAgICAgICBjb25zdCByZWNvcmREYXRlID0gbmV3IERhdGUocmVjb3JkLnRhbmdnYWwpO1xuICAgICAgICByZXR1cm4gcmVjb3JkRGF0ZSA+PSBzdGFydERhdGUgJiYgcmVjb3JkRGF0ZSA8PSBlbmREYXRlO1xuICAgICAgfSk7XG4gICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgIH07XG4gICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICB9KTtcbn07XG5cbi8vIEdldCByZWNvcmRzIGJ5IGluZGV4XG5leHBvcnQgY29uc3QgZ2V0UmVjb3Jkc0J5SW5kZXggPSBhc3luYyAoc3RvcmVOYW1lLCBpbmRleE5hbWUsIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGRiID0gYXdhaXQgb3BlbkRCKCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgdHJhbnNhY3Rpb24gPSBkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuICAgIGNvbnN0IHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICBjb25zdCBpbmRleCA9IHN0b3JlLmluZGV4KGluZGV4TmFtZSk7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4LmdldEFsbCh2YWx1ZSk7XG5cbiAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgfSk7XG59O1xuXG4vLyBTeW5jIHF1ZXVlIG1hbmFnZW1lbnRcbmV4cG9ydCBjb25zdCBhZGRUb1N5bmNRdWV1ZSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gIGNvbnN0IHF1ZXVlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN5bmNRdWV1ZVwiKSB8fCBcIltdXCIpO1xuICBxdWV1ZS5wdXNoKHtcbiAgICBpZDogRGF0ZS5ub3coKSxcbiAgICBkYXRhLFxuICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICB9KTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzeW5jUXVldWVcIiwgSlNPTi5zdHJpbmdpZnkocXVldWUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcm9jZXNzU3luY1F1ZXVlID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoIW5hdmlnYXRvci5vbkxpbmUpIHJldHVybjtcblxuICBjb25zdCBxdWV1ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzeW5jUXVldWVcIikgfHwgXCJbXVwiKTtcbiAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIC8vIFByb2Nlc3MgZWFjaCBpdGVtIGluIHRoZSBxdWV1ZVxuICAvLyBUaGlzIGlzIHdoZXJlIHlvdSB3b3VsZCBpbXBsZW1lbnQgdGhlIGFjdHVhbCBzeW5jIGxvZ2ljIHdpdGggeW91ciBiYWNrZW5kXG4gIC8vIEZvciBub3csIHdlJ2xsIGp1c3QgY2xlYXIgdGhlIHF1ZXVlXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3luY1F1ZXVlXCIsIFwiW11cIik7XG59O1xuIiwiaW1wb3J0ICogYXMgZGIgZnJvbSBcIi4uL2RiLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWhhbkJha3VNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3RvcmVOYW1lcyA9IHtcbiAgICAgIHN0b2NrOiBkYi5EQl9TVE9SRVMuYmFoYW5CYWt1U3RvY2ssXG4gICAgICB0cmFuc2FjdGlvbnM6IGRiLkRCX1NUT1JFUy5iYWhhbkJha3VUcmFuc2FjdGlvbnMsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZVN0b2NrKGNhdGVnb3J5LCBkYXRhKSB7XG4gICAgLy8gRXh0cmFjdCB0YW5nZ2FsTGVuZ2thcCBmcm9tIGRhdGEgaWYgaXQgZXhpc3RzXG4gICAgY29uc3QgeyB0YW5nZ2FsTGVuZ2thcCwgLi4ucmVzdERhdGEgfSA9IGRhdGE7XG5cbiAgICBjb25zdCBzdG9ja0RhdGEgPSB7XG4gICAgICBjYXRlZ29yeSxcbiAgICAgIC4uLnJlc3REYXRhLFxuICAgICAgdXBkYXRlZEF0OiB0YW5nZ2FsTGVuZ2thcCB8fCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBDaGVjayBpZiBub21vciBhbHJlYWR5IGV4aXN0cyBmb3IgdGhlIGNhdGVnb3J5XG4gICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IGRiLmdldFJlY29yZHNCeUluZGV4KFxuICAgICAgICB0aGlzLnN0b3JlTmFtZXMuc3RvY2ssXG4gICAgICAgIFwibm9tb3JcIixcbiAgICAgICAgZGF0YS5ub21vcixcbiAgICAgICAgKHJlY29yZCkgPT4gcmVjb3JkLmNhdGVnb3J5ID09PSBjYXRlZ29yeVxuICAgICAgKTtcblxuICAgICAgaWYgKGV4aXN0aW5nICYmIGV4aXN0aW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBOb21vciAke2RhdGEubm9tb3J9IHN1ZGFoIGFkYSB1bnR1ayBrYXRlZ29yaSAke2NhdGVnb3J5fWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaWQgPSBhd2FpdCBkYi5hZGRSZWNvcmQodGhpcy5zdG9yZU5hbWVzLnN0b2NrLCBzdG9ja0RhdGEpO1xuICAgICAgYXdhaXQgZGIuYWRkVG9TeW5jUXVldWUoe1xuICAgICAgICB0eXBlOiBcImJhaGFuQmFrdVN0b2NrXCIsXG4gICAgICAgIGFjdGlvbjogXCJ1cGRhdGVcIixcbiAgICAgICAgZGF0YTogc3RvY2tEYXRhLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgR2FnYWwgbWVtcGVyYmFydWkgc3RvY2sgJHtjYXRlZ29yeX06ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRTdG9jayhjYXRlZ29yeSwgZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgc3RvY2s6JywgeyBjYXRlZ29yeSwgZGF0YSB9KTtcbiAgICBjb25zdCB0cmFuc2FjdGlvbkRhdGEgPSB7XG4gICAgICBjYXRlZ29yeSxcbiAgICAgIHR5cGU6IFwiaW5cIixcbiAgICAgIC4uLmRhdGEsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNpc2FTdG9jazogZGF0YS50b3RhbCB8fCAoZGF0YS5xdHlMYXN0TW9udGggKyBkYXRhLmp1bWxhaE1hc3VrKSB8fCAwLFxuICAgIH07XG4gICAgY29uc29sZS5sb2coJ1RyYW5zYWN0aW9uIGRhdGE6JywgdHJhbnNhY3Rpb25EYXRhKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBpZCA9IGF3YWl0IGRiLmFkZFJlY29yZChcbiAgICAgICAgdGhpcy5zdG9yZU5hbWVzLnRyYW5zYWN0aW9ucyxcbiAgICAgICAgdHJhbnNhY3Rpb25EYXRhXG4gICAgICApO1xuICAgICAgYXdhaXQgZGIuYWRkVG9TeW5jUXVldWUoe1xuICAgICAgICB0eXBlOiBcImJhaGFuQmFrdVRyYW5zYWN0aW9uc1wiLFxuICAgICAgICBhY3Rpb246IFwiYWRkXCIsXG4gICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uRGF0YSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGlkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdhZ2FsIG1lbmFtYmFoIHN0b2NrICR7Y2F0ZWdvcnl9OiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVkdWNlU3RvY2soY2F0ZWdvcnksIGRhdGEpIHtcbiAgICBjb25zdCB0cmFuc2FjdGlvbkRhdGEgPSB7XG4gICAgICBjYXRlZ29yeSxcbiAgICAgIHR5cGU6IFwib3V0XCIsXG4gICAgICAuLi5kYXRhLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBpZCA9IGF3YWl0IGRiLmFkZFJlY29yZChcbiAgICAgICAgdGhpcy5zdG9yZU5hbWVzLnRyYW5zYWN0aW9ucyxcbiAgICAgICAgdHJhbnNhY3Rpb25EYXRhXG4gICAgICApO1xuICAgICAgYXdhaXQgZGIuYWRkVG9TeW5jUXVldWUoe1xuICAgICAgICB0eXBlOiBcImJhaGFuQmFrdVRyYW5zYWN0aW9uc1wiLFxuICAgICAgICBhY3Rpb246IFwiYWRkXCIsXG4gICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uRGF0YSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGlkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdhZ2FsIG1lbmd1cmFuZ2kgc3RvY2sgJHtjYXRlZ29yeX06ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRTdG9ja0J5Q2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGRiLmdldFJlY29yZHNCeUluZGV4KFxuICAgICAgICB0aGlzLnN0b3JlTmFtZXMuc3RvY2ssXG4gICAgICAgIFwiY2F0ZWdvcnlcIixcbiAgICAgICAgY2F0ZWdvcnlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEdhZ2FsIG1lbmdhbWJpbCBkYXRhIHN0b2NrICR7Y2F0ZWdvcnl9OiAke2Vycm9yLm1lc3NhZ2V9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRUcmFuc2FjdGlvbnNCeURhdGVSYW5nZShjYXRlZ29yeSwgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBkYi5nZXRSZWNvcmRzQnlEYXRlUmFuZ2UoXG4gICAgICAgIHRoaXMuc3RvcmVOYW1lcy50cmFuc2FjdGlvbnMsXG4gICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgZW5kRGF0ZSxcbiAgICAgICAgKHJlY29yZCkgPT4gcmVjb3JkLmNhdGVnb3J5ID09PSBjYXRlZ29yeVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgR2FnYWwgbWVuZ2FtYmlsIGRhdGEgdHJhbnNha3NpICR7Y2F0ZWdvcnl9OiAke2Vycm9yLm1lc3NhZ2V9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRDdXJyZW50U3RvY2soY2F0ZWdvcnkpIHtcbiAgICB0cnkge1xuICAgICAgLy8gR2V0IGFsbCB0cmFuc2FjdGlvbnMgZm9yIHRoZSBzcGVjaWZpZWQgY2F0ZWdvcnlcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IGF3YWl0IGRiLmdldFJlY29yZHNCeUluZGV4KFxuICAgICAgICB0aGlzLnN0b3JlTmFtZXMudHJhbnNhY3Rpb25zLFxuICAgICAgICBcImNhdGVnb3J5XCIsXG4gICAgICAgIGNhdGVnb3J5XG4gICAgICApO1xuXG4gICAgICAvLyBHcm91cCB0cmFuc2FjdGlvbnMgYnkgcHJvZHVjdCAoamVuaXNLZXJ0YXMgJiB1a3VyYW4gY29tYmluYXRpb24pXG4gICAgICBjb25zdCBzdG9ja01hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgdHJhbnNhY3Rpb25zLmZvckVhY2godHJhbnNhY3Rpb24gPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBgJHt0cmFuc2FjdGlvbi5qZW5pc0tlcnRhc30tJHt0cmFuc2FjdGlvbi51a3VyYW59YDtcbiAgICAgICAgaWYgKCFzdG9ja01hcC5oYXMoa2V5KSkge1xuICAgICAgICAgIHN0b2NrTWFwLnNldChrZXksIHtcbiAgICAgICAgICAgIG5vbW9yOiB0cmFuc2FjdGlvbi5ub21vcixcbiAgICAgICAgICAgIGplbmlzS2VydGFzOiB0cmFuc2FjdGlvbi5qZW5pc0tlcnRhcyxcbiAgICAgICAgICAgIHVrdXJhbjogdHJhbnNhY3Rpb24udWt1cmFuLFxuICAgICAgICAgICAgdG90YWxNYXN1azogMCxcbiAgICAgICAgICAgIHRvdGFsS2VsdWFyOiAwLFxuICAgICAgICAgICAgdGFuZ2dhbDogdHJhbnNhY3Rpb24udGFuZ2dhbCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBzdG9ja01hcC5nZXQoa2V5KTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgbGF0ZXN0IGRhdGVcbiAgICAgICAgaWYgKG5ldyBEYXRlKHRyYW5zYWN0aW9uLnRhbmdnYWwpID4gbmV3IERhdGUoaXRlbS50YW5nZ2FsKSkge1xuICAgICAgICAgIGl0ZW0udGFuZ2dhbCA9IHRyYW5zYWN0aW9uLnRhbmdnYWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJhbnNhY3Rpb24udHlwZSA9PT0gXCJpblwiKSB7XG4gICAgICAgICAgLy8gVW50dWsgdHJhbnNha3NpIG1hc3VrLCB0YW1iYWhrYW4ganVtbGFoIG1hc3VrIGtlIHRvdGFsXG4gICAgICAgICAgY29uc3QganVtbGFoTWFzdWsgPSB0cmFuc2FjdGlvbi5qdW1sYWhNYXN1ayB8fCAwO1xuICAgICAgICAgIGl0ZW0udG90YWxNYXN1ayArPSBqdW1sYWhNYXN1aztcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBVcGRhdGUgdGFuZ2dhbCBqaWthIGluaSBhZGFsYWggdHJhbnNha3NpIHRlcmJhcnVcbiAgICAgICAgICBpZiAoIWl0ZW0ubGFzdFVwZGF0ZSB8fCBuZXcgRGF0ZSh0cmFuc2FjdGlvbi50YW5nZ2FsKSA+IG5ldyBEYXRlKGl0ZW0ubGFzdFVwZGF0ZSkpIHtcbiAgICAgICAgICAgIGl0ZW0ubGFzdFVwZGF0ZSA9IHRyYW5zYWN0aW9uLnRhbmdnYWw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zYWN0aW9uLnR5cGUgPT09IFwib3V0XCIpIHtcbiAgICAgICAgICAvLyBVbnR1ayB0cmFuc2Frc2kga2VsdWFyLCB0YW1iYWhrYW4gdG90YWwga2VsdWFyXG4gICAgICAgICAgY29uc3QgdG90YWxLZWx1YXJCYXJ1ID0gKHRyYW5zYWN0aW9uLnRvdGFsS2VsdWFyT2sgfHwgMCkgKyAodHJhbnNhY3Rpb24udG90YWxLZWx1YXJOZyB8fCAwKTtcbiAgICAgICAgICBpdGVtLnRvdGFsS2VsdWFyICs9IHRvdGFsS2VsdWFyQmFydTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhpdHVuZyBzaXNhIHN0b2NrIGJlcmRhc2Fya2FuIHRvdGFsIG1hc3VrIGRhbiBrZWx1YXJcbiAgICAgICAgaXRlbS5zaXNhU3RvY2sgPSBpdGVtLnRvdGFsTWFzdWsgLSBpdGVtLnRvdGFsS2VsdWFyO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENvbnZlcnQgbWFwIHRvIGFycmF5IGFuZCBzb3J0IGJ5IG5vbW9yXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShzdG9ja01hcC52YWx1ZXMoKSkuc29ydCgoYSwgYikgPT4gYS5ub21vciAtIGIubm9tb3IpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdhZ2FsIG1lbmdhbWJpbCBkYXRhIHN0b2NrICR7Y2F0ZWdvcnl9OiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0Q3VycmVudEJhbm5lclN0b2NrKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRTdG9jaygnYmFubmVyJyk7XG4gIH1cblxuICBhc3luYyBnZXRDdXJyZW50RGlnaXRhbFN0b2NrKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRTdG9jaygnZGlnaXRhbCcpO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q3VycmVudFByb2R1a3NpU3RvY2soKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudFN0b2NrKCdwcm9kdWtzaScpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkYiBmcm9tIFwiLi4vZGIuanNcIjtcblxuZXhwb3J0IGNsYXNzIERhaWx5UmVwb3J0TW9kZWwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN0b3JlTmFtZSA9IGRiLkRCX1NUT1JFUy5kYWlseVJlcG9ydDtcbiAgfVxuXG4gIGFzeW5jIGFkZChkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGlkID0gYXdhaXQgZGIuYWRkUmVjb3JkKHRoaXMuc3RvcmVOYW1lLCBkYXRhKTtcbiAgICAgIGF3YWl0IGRiLmFkZFRvU3luY1F1ZXVlKHtcbiAgICAgICAgdHlwZTogXCJkYWlseVJlcG9ydFwiLFxuICAgICAgICBhY3Rpb246IFwiYWRkXCIsXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2FnYWwgbWVueWltcGFuIGRhaWx5IHJlcG9ydDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRCeURhdGVSYW5nZShzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGRiLmdldFJlY29yZHNCeURhdGVSYW5nZSh0aGlzLnN0b3JlTmFtZSwgc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2FnYWwgbWVuZ2FtYmlsIGRhaWx5IHJlcG9ydDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBCYWhhbkJha3VQcmVzZW50ZXIge1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgdmlldykge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuXG4gICAgLy8gQmluZCBzdG9jayBmb3JtIGhhbmRsZXJzXG4gICAgdGhpcy5iaW5kU3RvY2tIYW5kbGVycygpO1xuXG4gICAgLy8gQmluZCBpbi9vdXQgZm9ybSBoYW5kbGVyc1xuICAgIHRoaXMuYmluZEluT3V0SGFuZGxlcnMoKTtcblxuICAgIC8vIEluaXRpYWwgbG9hZCBvZiBzdG9jayBkYXRhXG4gICAgdGhpcy5sb2FkQmFubmVyU3RvY2tEYXRhKCk7XG4gICAgdGhpcy5sb2FkRGlnaXRhbFN0b2NrRGF0YSgpO1xuICAgIHRoaXMubG9hZFByb2R1a3NpU3RvY2tEYXRhKCk7XG4gIH1cblxuICBhc3luYyBsb2FkQmFubmVyU3RvY2tEYXRhKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9ja0RhdGEgPSBhd2FpdCB0aGlzLm1vZGVsLmdldEN1cnJlbnRCYW5uZXJTdG9jaygpO1xuICAgICAgdGhpcy52aWV3LnVwZGF0ZVN0b2NrQmFubmVyRGlzcGxheShzdG9ja0RhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLnZpZXcuc2hvd0Vycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWREaWdpdGFsU3RvY2tEYXRhKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9ja0RhdGEgPSBhd2FpdCB0aGlzLm1vZGVsLmdldEN1cnJlbnREaWdpdGFsU3RvY2soKTtcbiAgICAgIHRoaXMudmlldy51cGRhdGVTdG9ja0RpZ2l0YWxEaXNwbGF5KHN0b2NrRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMudmlldy5zaG93RXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZFByb2R1a3NpU3RvY2tEYXRhKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9ja0RhdGEgPSBhd2FpdCB0aGlzLm1vZGVsLmdldEN1cnJlbnRQcm9kdWtzaVN0b2NrKCk7XG4gICAgICB0aGlzLnZpZXcudXBkYXRlU3RvY2tQcm9kdWtzaURpc3BsYXkoc3RvY2tEYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy52aWV3LnNob3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBiaW5kU3RvY2tIYW5kbGVycygpIHtcbiAgICBbXCJiYW5uZXJcIiwgXCJkaWdpdGFsXCIsIFwicHJvZHVrc2lcIl0uZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgIHRoaXMudmlldy5iaW5kU3RvY2tTdWJtaXQoY2F0ZWdvcnksIChkYXRhKSA9PlxuICAgICAgICB0aGlzLmhhbmRsZVN0b2NrU3VibWl0KGNhdGVnb3J5LCBkYXRhKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRJbk91dEhhbmRsZXJzKCkge1xuICAgIFtcImJhbm5lclwiLCBcImRpZ2l0YWxcIiwgXCJwcm9kdWtzaVwiXS5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xuICAgICAgdGhpcy52aWV3LmJpbmRJbk91dFN1Ym1pdChjYXRlZ29yeSwgXCJpblwiLCAoZGF0YSkgPT5cbiAgICAgICAgdGhpcy5oYW5kbGVJblN1Ym1pdChjYXRlZ29yeSwgZGF0YSlcbiAgICAgICk7XG4gICAgICB0aGlzLnZpZXcuYmluZEluT3V0U3VibWl0KGNhdGVnb3J5LCBcIm91dFwiLCAoZGF0YSkgPT5cbiAgICAgICAgdGhpcy5oYW5kbGVPdXRTdWJtaXQoY2F0ZWdvcnksIGRhdGEpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlU3RvY2tTdWJtaXQoY2F0ZWdvcnksIGZvcm1EYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMubW9kZWwudXBkYXRlU3RvY2soY2F0ZWdvcnksIGZvcm1EYXRhKTtcbiAgICAgIHRoaXMudmlldy5yZXNldEZvcm0oY2F0ZWdvcnkpO1xuICAgICAgdGhpcy52aWV3LnNob3dTdWNjZXNzKGBTdG9jayAke2NhdGVnb3J5fSBiZXJoYXNpbCBkaXBlcmJhcnVpIWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLnZpZXcuc2hvd0Vycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZUluU3VibWl0KGNhdGVnb3J5LCBmb3JtRGF0YSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZygnU2F2aW5nIGRhdGE6JywgeyBjYXRlZ29yeSwgZm9ybURhdGEgfSk7XG4gICAgICBhd2FpdCB0aGlzLm1vZGVsLmFkZFN0b2NrKGNhdGVnb3J5LCBmb3JtRGF0YSk7XG4gICAgICBcbiAgICAgIC8vIFJlZnJlc2ggc3RvY2sgZGlzcGxheSBpbW1lZGlhdGVseSBhZnRlciBzdWNjZXNzZnVsIHNhdmVcbiAgICAgIGlmIChjYXRlZ29yeSA9PT0gJ2Jhbm5lcicpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkQmFubmVyU3RvY2tEYXRhKCk7XG4gICAgICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSAnZGlnaXRhbCcpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGlnaXRhbFN0b2NrRGF0YSgpO1xuICAgICAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gJ3Byb2R1a3NpJykge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRQcm9kdWtzaVN0b2NrRGF0YSgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLnZpZXcucmVzZXRGb3JtKGNhdGVnb3J5LCBcImluXCIpO1xuICAgICAgdGhpcy52aWV3LnNob3dTdWNjZXNzKGBJbnB1dCAke2NhdGVnb3J5fSBiZXJoYXNpbCBkaXNpbXBhbiFgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gaGFuZGxlSW5TdWJtaXQ6JywgZXJyb3IpO1xuICAgICAgdGhpcy52aWV3LnNob3dFcnJvcihgR2FnYWwgbWVueWltcGFuIGRhdGE6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVPdXRTdWJtaXQoY2F0ZWdvcnksIGZvcm1EYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMubW9kZWwucmVkdWNlU3RvY2soY2F0ZWdvcnksIGZvcm1EYXRhKTtcbiAgICAgIHRoaXMudmlldy5yZXNldEZvcm0oY2F0ZWdvcnksIFwib3V0XCIpO1xuICAgICAgdGhpcy52aWV3LnNob3dTdWNjZXNzKGBPdXRwdXQgJHtjYXRlZ29yeX0gYmVyaGFzaWwgZGlzaW1wYW4hYCk7XG4gICAgICBpZiAoY2F0ZWdvcnkgPT09ICdiYW5uZXInKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZEJhbm5lclN0b2NrRGF0YSgpOyAvLyBSZWZyZXNoIGJhbm5lciBzdG9jayBkaXNwbGF5XG4gICAgICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSAnZGlnaXRhbCcpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGlnaXRhbFN0b2NrRGF0YSgpOyAvLyBSZWZyZXNoIGRpZ2l0YWwgc3RvY2sgZGlzcGxheVxuICAgICAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gJ3Byb2R1a3NpJykge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRQcm9kdWtzaVN0b2NrRGF0YSgpOyAvLyBSZWZyZXNoIHByb2R1a3NpIHN0b2NrIGRpc3BsYXlcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy52aWV3LnNob3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBEYWlseVJlcG9ydFByZXNlbnRlciB7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCB2aWV3KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy52aWV3LmJpbmRTdWJtaXQodGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBhc3luYyBoYW5kbGVTdWJtaXQoZm9ybURhdGEpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5tb2RlbC5hZGQoZm9ybURhdGEpO1xuICAgICAgdGhpcy52aWV3LnJlc2V0KCk7XG4gICAgICB0aGlzLnZpZXcuc2hvd1N1Y2Nlc3MoXCJEYWlseSByZXBvcnQgYmVyaGFzaWwgZGlzaW1wYW4hXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLnZpZXcuc2hvd0Vycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEhlYWRlclByZXNlbnRlciB7XG4gIGNvbnN0cnVjdG9yKHZpZXcsIG5hdmlnYXRpb25WaWV3KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLm5hdmlnYXRpb25WaWV3ID0gbmF2aWdhdGlvblZpZXc7XG5cbiAgICAvLyBCaW5kIG1lbnUgdG9nZ2xlIHRvIHNpZGViYXJcbiAgICB0aGlzLnZpZXcuYmluZE1lbnVUb2dnbGUoKCkgPT4ge1xuICAgICAgdGhpcy50b2dnbGVTaWRlYmFyKCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudmlldy5zZXRUaXRsZSh0aXRsZSk7XG4gIH1cblxuICB1cGRhdGVTeW5jU3RhdHVzKHN0YXR1cykge1xuICAgIHRoaXMudmlldy51cGRhdGVTeW5jU3RhdHVzKHN0YXR1cyk7XG4gIH1cblxuICB0b2dnbGVTaWRlYmFyKCkge1xuICAgIGlmICh0aGlzLm5hdmlnYXRpb25WaWV3KSB7XG4gICAgICB0aGlzLm5hdmlnYXRpb25WaWV3LnRvZ2dsZVNpZGViYXIoKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBMb2dpblByZXNlbnRlciB7XG4gIGNvbnN0cnVjdG9yKHZpZXcpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMudmlldy5iaW5kTG9naW4odGhpcy5oYW5kbGVMb2dpbi5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGhhbmRsZUxvZ2luKGNyZWRlbnRpYWxzKSB7XG4gICAgLy8gRm9yIGRlbW8gcHVycG9zZXMsIGFueSBsb2dpbiB3aWxsIHN1Y2NlZWRcbiAgICAvLyBJbiByZWFsIGFwcGxpY2F0aW9uLCB5b3Ugd291bGQgdmFsaWRhdGUgY3JlZGVudGlhbHMgaGVyZVxuICAgIHRoaXMub25Mb2dpblN1Y2Nlc3MoKTtcbiAgfVxuXG4gIG9uTG9naW5TdWNjZXNzKCkge1xuICAgIC8vIE5vdGlmeSB0aGUgQXBwIHByZXNlbnRlciBhYm91dCBzdWNjZXNzZnVsIGxvZ2luXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJsb2dpblN1Y2Nlc3NcIikpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgTmF2aWdhdGlvblByZXNlbnRlciB7XG4gIGNvbnN0cnVjdG9yKHZpZXcpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMudmlldy5iaW5kTmF2aWdhdGlvbih0aGlzLmhhbmRsZU5hdmlnYXRpb24uYmluZCh0aGlzKSk7XG4gICAgdGhpcy52aWV3LmJpbmRMb2dvdXQodGhpcy5oYW5kbGVMb2dvdXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBoYW5kbGVOYXZpZ2F0aW9uKHBhZ2VJZCkge1xuICAgIHRoaXMudmlldy5zaG93U2VjdGlvbihwYWdlSWQpO1xuICB9XG5cbiAgaGFuZGxlTG9nb3V0KCkge1xuICAgIC8vIE5vdGlmeSB0aGUgQXBwIHByZXNlbnRlciBhYm91dCBsb2dvdXRcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImxvZ291dFwiKSk7XG4gIH1cblxuICBzaG93UGFnZShwYWdlSWQpIHtcbiAgICB0aGlzLnZpZXcuc2hvd1BhZ2UocGFnZUlkKTtcbiAgfVxuXG4gIHNob3dEZWZhdWx0U2VjdGlvbigpIHtcbiAgICB0aGlzLnZpZXcuc2hvd1NlY3Rpb24oXCJiYWhhbi1iYWt1XCIpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUmVrYXBQcmVzZW50ZXIge1xuICBjb25zdHJ1Y3RvcihiYWhhbkJha3VNb2RlbCwgZGFpbHlSZXBvcnRNb2RlbCwgdmlldykge1xuICAgIHRoaXMuYmFoYW5CYWt1TW9kZWwgPSBiYWhhbkJha3VNb2RlbDtcbiAgICB0aGlzLmRhaWx5UmVwb3J0TW9kZWwgPSBkYWlseVJlcG9ydE1vZGVsO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy52aWV3LmJpbmRHZW5lcmF0ZVJla2FwKHRoaXMuaGFuZGxlR2VuZXJhdGVSZWthcC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZUdlbmVyYXRlUmVrYXAoeyB0aXBlLCBzdGFydERhdGUsIGVuZERhdGUgfSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtb2RlbCA9XG4gICAgICAgIHRpcGUgPT09IFwiYmFoYW4tYmFrdVwiID8gdGhpcy5iYWhhbkJha3VNb2RlbCA6IHRoaXMuZGFpbHlSZXBvcnRNb2RlbDtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBtb2RlbC5nZXRCeURhdGVSYW5nZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgICAgdGhpcy52aWV3LmRpc3BsYXlUYWJsZShkYXRhLCB0aXBlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy52aWV3LnNob3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBCYWhhbkJha3VWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdG9ja0Zvcm1zID0ge1xuICAgICAgYmFubmVyOiB0aGlzLmluaXRpYWxpemVTdG9ja0Zvcm0oXCJzdG9jay1iYW5uZXJcIiksXG4gICAgICBkaWdpdGFsOiB0aGlzLmluaXRpYWxpemVTdG9ja0Zvcm0oXCJzdG9jay1kaWdpdGFsXCIpLFxuICAgICAgcHJvZHVrc2k6IHRoaXMuaW5pdGlhbGl6ZVN0b2NrRm9ybShcInN0b2NrLXByb2R1a3NpXCIpLFxuICAgIH07XG5cbiAgICB0aGlzLmluT3V0Rm9ybXMgPSB7XG4gICAgICBiYW5uZXI6IHtcbiAgICAgICAgaW46IHRoaXMuaW5pdGlhbGl6ZUluT3V0Rm9ybShcImluLWJhbm5lclwiKSxcbiAgICAgICAgb3V0OiB0aGlzLmluaXRpYWxpemVJbk91dEZvcm0oXCJvdXQtYmFubmVyXCIpLFxuICAgICAgfSxcbiAgICAgIGRpZ2l0YWw6IHtcbiAgICAgICAgaW46IHRoaXMuaW5pdGlhbGl6ZUluT3V0Rm9ybShcImluLWRpZ2l0YWxcIiksXG4gICAgICAgIG91dDogdGhpcy5pbml0aWFsaXplSW5PdXRGb3JtKFwib3V0LWRpZ2l0YWxcIiksXG4gICAgICB9LFxuICAgICAgcHJvZHVrc2k6IHtcbiAgICAgICAgaW46IHRoaXMuaW5pdGlhbGl6ZUluT3V0Rm9ybShcImluLXByb2R1a3NpXCIpLFxuICAgICAgICBvdXQ6IHRoaXMuaW5pdGlhbGl6ZUluT3V0Rm9ybShcIm91dC1wcm9kdWtzaVwiKSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxpemVTdG9ja0Zvcm0oc2VjdGlvbklkKSB7XG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NlY3Rpb25JZH0tc2VjdGlvbmApO1xuICAgIGlmICghc2VjdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBGb3Igc3RvY2sgc2VjdGlvbnMsIHdlJ2xsIG9ubHkgc2hvdyByZXN1bHRzIHdpdGhvdXQgYSBmb3JtXG4gICAgaWYgKHNlY3Rpb25JZCA9PT0gXCJzdG9jay1iYW5uZXJcIiB8fCBzZWN0aW9uSWQgPT09IFwic3RvY2stZGlnaXRhbFwiIHx8IHNlY3Rpb25JZCA9PT0gXCJzdG9jay1wcm9kdWtzaVwiKSB7XG4gICAgICBpZiAoIXNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zdG9jay1yZXN1bHRzXCIpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByZXN1bHRzQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwic3RvY2stcmVzdWx0c1wiO1xuICAgICAgICByZXN1bHRzQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0cy10YWJsZVwiPlxuICAgICAgICAgICAgPGgzPkN1cnJlbnQgU3RvY2sgU3RhdHVzPC9oMz5cbiAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0aD5Oby48L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoPkplbmlzIEtlcnRhczwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGg+VWt1cmFuPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aD5Ub3RhbCBNYXN1azwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGg+VG90YWwgS2VsdWFyPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aD5TaXNhIFN0b2NrPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aD5UYW5nZ2FsIFVwZGF0ZTwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5IGlkPVwiJHtzZWN0aW9uSWR9LXJlc3VsdHNcIj48L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZChyZXN1bHRzQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdHNDb250YWluZXI6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zdG9jay1yZXN1bHRzXCIpLFxuICAgICAgICByZXN1bHRzQm9keTogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKGAjJHtzZWN0aW9uSWR9LXJlc3VsdHNgKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBGb3Igb3RoZXIgc2VjdGlvbnMsIGFkZCBmb3JtIGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICBpZiAoIXNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImZvcm1cIikpIHtcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICAgIGZvcm0uaWQgPSBgJHtzZWN0aW9uSWR9LWZvcm1gO1xuICAgICAgZm9ybS5jbGFzc05hbWUgPSBcInN0b2NrLWZvcm1cIjtcblxuICAgICAgY29uc3QgaXNEaWdpdGFsID0gc2VjdGlvbklkID09PSBcInN0b2NrLWRpZ2l0YWxcIjtcblxuICAgICAgZm9ybS5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS1ub21vclwiPk5vLjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBpZD1cIiR7c2VjdGlvbklkfS1ub21vclwiIG5hbWU9XCJub21vclwiIHJlcXVpcmVkIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tamVuaXMta2VydGFzXCI+SmVuaXMgS2VydGFzPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIiR7c2VjdGlvbklkfS1qZW5pcy1rZXJ0YXNcIiBuYW1lPVwiamVuaXNLZXJ0YXNcIiByZXF1aXJlZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtzZWN0aW9uSWR9LXVrdXJhblwiPlVrdXJhbjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCIke3NlY3Rpb25JZH0tdWt1cmFuXCIgbmFtZT1cInVrdXJhblwiIHJlcXVpcmVkIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tcXR5XCI+UXR5IFN0b2NrIChMZW1iYXIpPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiJHtzZWN0aW9uSWR9LXF0eVwiIG5hbWU9XCJxdHlcIiBtaW49XCIwXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS0ke2lzRGlnaXRhbCA/IFwiYWN0dWFsXCIgOiBcInNhdHVhblwifVwiPiR7XG4gICAgICAgIGlzRGlnaXRhbCA/IFwiQWN0dWFsXCIgOiBcIlNhdHVhblwiXG4gICAgICB9PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIiR7c2VjdGlvbklkfS0ke1xuICAgICAgICBpc0RpZ2l0YWwgPyBcImFjdHVhbFwiIDogXCJzYXR1YW5cIlxuICAgICAgfVwiIG5hbWU9XCIke2lzRGlnaXRhbCA/IFwiYWN0dWFsXCIgOiBcInNhdHVhblwifVwiIHJlcXVpcmVkIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tdGFuZ2dhbFwiPlRhbmdnYWw8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIiBuYW1lPVwidGFuZ2dhbFwiIHJlcXVpcmVkIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TaW1wYW48L2J1dHRvbj5cbiAgICAgIGA7XG4gICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBmb3JtOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLFxuICAgICAgbm9tb3I6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJub21vclwiXScpLFxuICAgICAgamVuaXNLZXJ0YXM6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJqZW5pc0tlcnRhc1wiXScpLFxuICAgICAgdWt1cmFuOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidWt1cmFuXCJdJyksXG4gICAgICBxdHk6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJxdHlcIl0nKSxcbiAgICAgIC4uLihzZWN0aW9uSWQgPT09IFwic3RvY2stZGlnaXRhbFwiXG4gICAgICAgID8geyBhY3R1YWw6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJhY3R1YWxcIl0nKSB9XG4gICAgICAgIDogeyBzYXR1YW46IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJzYXR1YW5cIl0nKSB9KSxcbiAgICAgIHRhbmdnYWw6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJ0YW5nZ2FsXCJdJyksXG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxpemVJbk91dEZvcm0oc2VjdGlvbklkKSB7XG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NlY3Rpb25JZH0tc2VjdGlvbmApO1xuICAgIGlmICghc2VjdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBUYW1iYWhrYW4gZm9ybSBqaWthIGJlbHVtIGFkYVxuICAgIGlmICghc2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSkge1xuICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgICAgZm9ybS5pZCA9IGAke3NlY3Rpb25JZH0tZm9ybWA7XG4gICAgICBmb3JtLmNsYXNzTmFtZSA9IFwiaW5vdXQtZm9ybVwiO1xuXG4gICAgICAvLyBLaHVzdXMgdW50dWsgZm9ybSBJbiBCYW5uZXIgZGFuIEluIERpZ2l0YWxcbiAgICAgIGlmIChzZWN0aW9uSWQgPT09IFwiaW4tYmFubmVyXCIgfHwgc2VjdGlvbklkID09PSBcImluLWRpZ2l0YWxcIikge1xuICAgICAgICBmb3JtLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS1ub21vclwiPk5vLjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiJHtzZWN0aW9uSWR9LW5vbW9yXCIgbmFtZT1cIm5vbW9yXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS1qZW5pcy1rZXJ0YXNcIj5KZW5pcyBLZXJ0YXM8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCIke3NlY3Rpb25JZH0tamVuaXMta2VydGFzXCIgbmFtZT1cImplbmlzS2VydGFzXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS11a3VyYW5cIj5Va3VyYW48L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCIke3NlY3Rpb25JZH0tdWt1cmFuXCIgbmFtZT1cInVrdXJhblwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tcXR5LWxhc3QtbW9udGhcIj5RdHkgTGFzdCBNb250aDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiJHtzZWN0aW9uSWR9LXF0eS1sYXN0LW1vbnRoXCIgbmFtZT1cInF0eUxhc3RNb250aFwiIG1pbj1cIjBcIiByZXF1aXJlZCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIj5UYW5nZ2FsPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIiBuYW1lPVwidGFuZ2dhbFwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tanVtbGFoLW1hc3VrXCI+SnVtbGFoIEtlcnRhcyBNYXN1azwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiJHtzZWN0aW9uSWR9LWp1bWxhaC1tYXN1a1wiIG5hbWU9XCJqdW1sYWhNYXN1a1wiIG1pbj1cIjBcIiByZXF1aXJlZCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWw+VG90YWw8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLWRpc3BsYXlcIiBpZD1cIiR7c2VjdGlvbklkfS10b3RhbFwiPjA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TaW1wYW48L2J1dHRvbj5cbiAgICAgICAgYDtcblxuICAgICAgICAvLyBUYW1iYWhrYW4gZXZlbnQgbGlzdGVuZXIgdW50dWsgbWVuZ2hpdHVuZyB0b3RhbFxuICAgICAgICBjb25zdCB1cGRhdGVUb3RhbCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBxdHlMYXN0TW9udGggPVxuICAgICAgICAgICAgTnVtYmVyKGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJxdHlMYXN0TW9udGhcIl0nKS52YWx1ZSkgfHwgMDtcbiAgICAgICAgICBjb25zdCBqdW1sYWhNYXN1ayA9XG4gICAgICAgICAgICBOdW1iZXIoZm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImp1bWxhaE1hc3VrXCJdJykudmFsdWUpIHx8IDA7XG4gICAgICAgICAgY29uc3QgdG90YWwgPSBxdHlMYXN0TW9udGggKyBqdW1sYWhNYXN1aztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzZWN0aW9uSWR9LXRvdGFsYCkudGV4dENvbnRlbnQgPSB0b3RhbDtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3JtXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicXR5TGFzdE1vbnRoXCJdJylcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVRvdGFsKTtcbiAgICAgICAgZm9ybVxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImp1bWxhaE1hc3VrXCJdJylcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVRvdGFsKTtcbiAgICAgIH1cbiAgICAgIC8vIEtodXN1cyB1bnR1ayBmb3JtIEluIFByb2R1a3NpXG4gICAgICBlbHNlIGlmIChzZWN0aW9uSWQgPT09IFwiaW4tcHJvZHVrc2lcIikge1xuICAgICAgICBmb3JtLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS1ub21vclwiPk5vLjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiJHtzZWN0aW9uSWR9LW5vbW9yXCIgbmFtZT1cIm5vbW9yXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS1qZW5pcy1rZXJ0YXNcIj5KZW5pcyBLZXJ0YXM8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCIke3NlY3Rpb25JZH0tamVuaXMta2VydGFzXCIgbmFtZT1cImplbmlzS2VydGFzXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS11a3VyYW5cIj5Va3VyYW48L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCIke3NlY3Rpb25JZH0tdWt1cmFuXCIgbmFtZT1cInVrdXJhblwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tcXR5LWxhc3QtbW9udGhcIj5RdHkgTGFzdCBNb250aDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiJHtzZWN0aW9uSWR9LXF0eS1sYXN0LW1vbnRoXCIgbmFtZT1cInF0eUxhc3RNb250aFwiIG1pbj1cIjBcIiByZXF1aXJlZCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIj5UYW5nZ2FsPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIiBuYW1lPVwidGFuZ2dhbFwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tanVtbGFoLW1hc3VrXCI+SnVtbGFoIEtlcnRhcyBNYXN1azwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiJHtzZWN0aW9uSWR9LWp1bWxhaC1tYXN1a1wiIG5hbWU9XCJqdW1sYWhNYXN1a1wiIG1pbj1cIjBcIiByZXF1aXJlZCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWw+VG90YWw8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLWRpc3BsYXlcIiBpZD1cIiR7c2VjdGlvbklkfS10b3RhbFwiPjA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS1yZW1hcmtcIj5SZW1hcms8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCIke3NlY3Rpb25JZH0tcmVtYXJrXCIgbmFtZT1cInJlbWFya1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2ltcGFuPC9idXR0b24+XG4gICAgICAgIGA7XG5cbiAgICAgICAgLy8gVGFtYmFoa2FuIGV2ZW50IGxpc3RlbmVyIHVudHVrIG1lbmdoaXR1bmcgdG90YWxcbiAgICAgICAgY29uc3QgdXBkYXRlVG90YWwgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcXR5TGFzdE1vbnRoID1cbiAgICAgICAgICAgIE51bWJlcihmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicXR5TGFzdE1vbnRoXCJdJykudmFsdWUpIHx8IDA7XG4gICAgICAgICAgY29uc3QganVtbGFoTWFzdWsgPVxuICAgICAgICAgICAgTnVtYmVyKGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJqdW1sYWhNYXN1a1wiXScpLnZhbHVlKSB8fCAwO1xuICAgICAgICAgIGNvbnN0IHRvdGFsID0gcXR5TGFzdE1vbnRoICsganVtbGFoTWFzdWs7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7c2VjdGlvbklkfS10b3RhbGApLnRleHRDb250ZW50ID0gdG90YWw7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9ybVxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInF0eUxhc3RNb250aFwiXScpXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVUb3RhbCk7XG4gICAgICAgIGZvcm1cbiAgICAgICAgICAucXVlcnlTZWxlY3RvcignW25hbWU9XCJqdW1sYWhNYXN1a1wiXScpXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVUb3RhbCk7XG4gICAgICB9XG4gICAgICAvLyBLaHVzdXMgdW50dWsgZm9ybSBPdXQgQmFubmVyLCBPdXQgRGlnaXRhbCwgZGFuIE91dCBQcm9kdWtzaVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIHNlY3Rpb25JZCA9PT0gXCJvdXQtYmFubmVyXCIgfHxcbiAgICAgICAgc2VjdGlvbklkID09PSBcIm91dC1kaWdpdGFsXCIgfHxcbiAgICAgICAgc2VjdGlvbklkID09PSBcIm91dC1wcm9kdWtzaVwiXG4gICAgICApIHtcbiAgICAgICAgZm9ybS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tbm9tb3JcIj5Oby48L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBpZD1cIiR7c2VjdGlvbklkfS1ub21vclwiIG5hbWU9XCJub21vclwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tamVuaXMta2VydGFzXCI+SmVuaXMgS2VydGFzPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiJHtzZWN0aW9uSWR9LWplbmlzLWtlcnRhc1wiIG5hbWU9XCJqZW5pc0tlcnRhc1wiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tdWt1cmFuXCI+VWt1cmFuPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiJHtzZWN0aW9uSWR9LXVrdXJhblwiIG5hbWU9XCJ1a3VyYW5cIiByZXF1aXJlZCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtzZWN0aW9uSWR9LXRvdGFsLW1hc3VrXCI+VG90YWwgS2VydGFzIE1hc3VrPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCIke3NlY3Rpb25JZH0tdG90YWwtbWFzdWtcIiBuYW1lPVwidG90YWxNYXN1a1wiIG1pbj1cIjBcIiByZXF1aXJlZCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIj5UYW5nZ2FsPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIiBuYW1lPVwidGFuZ2dhbFwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBoYWxmLXdpZHRoXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tdG90YWwta2VsdWFyLW9rXCI+VG90YWwgS2VsdWFyIChPSyk8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiJHtzZWN0aW9uSWR9LXRvdGFsLWtlbHVhci1va1wiIG5hbWU9XCJ0b3RhbEtlbHVhck9rXCIgbWluPVwiMFwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGhhbGYtd2lkdGhcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2VjdGlvbklkfS10b3RhbC1rZWx1YXItbmdcIj5Ub3RhbCBLZWx1YXIgKE5HKTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCIke3NlY3Rpb25JZH0tdG90YWwta2VsdWFyLW5nXCIgbmFtZT1cInRvdGFsS2VsdWFyTmdcIiBtaW49XCIwXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWw+VG90YWwgS2VsdWFyPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3RhbC1kaXNwbGF5XCIgaWQ9XCIke3NlY3Rpb25JZH0tdG90YWwta2VsdWFyXCI+MDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWw+U2lzYSBTdG9jazwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG90YWwtZGlzcGxheVwiIGlkPVwiJHtzZWN0aW9uSWR9LXNpc2Etc3RvY2tcIj4wPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2ltcGFuPC9idXR0b24+XG4gICAgICAgIGA7XG5cbiAgICAgICAgLy8gVGFtYmFoa2FuIGV2ZW50IGxpc3RlbmVyIHVudHVrIG1lbmdoaXR1bmcgdG90YWwgZGFuIHNpc2Egc3RvY2tcbiAgICAgICAgY29uc3QgdXBkYXRlVG90YWxzID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRvdGFsTWFzdWsgPVxuICAgICAgICAgICAgTnVtYmVyKGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJ0b3RhbE1hc3VrXCJdJykudmFsdWUpIHx8IDA7XG4gICAgICAgICAgY29uc3QgdG90YWxLZWx1YXJPayA9XG4gICAgICAgICAgICBOdW1iZXIoZm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInRvdGFsS2VsdWFyT2tcIl0nKS52YWx1ZSkgfHwgMDtcbiAgICAgICAgICBjb25zdCB0b3RhbEtlbHVhck5nID1cbiAgICAgICAgICAgIE51bWJlcihmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidG90YWxLZWx1YXJOZ1wiXScpLnZhbHVlKSB8fCAwO1xuXG4gICAgICAgICAgY29uc3QgdG90YWxLZWx1YXIgPSB0b3RhbEtlbHVhck9rICsgdG90YWxLZWx1YXJOZztcbiAgICAgICAgICBjb25zdCBzaXNhU3RvY2sgPSB0b3RhbE1hc3VrIC0gdG90YWxLZWx1YXI7XG5cbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzZWN0aW9uSWR9LXRvdGFsLWtlbHVhcmApLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIHRvdGFsS2VsdWFyO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NlY3Rpb25JZH0tc2lzYS1zdG9ja2ApLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIHNpc2FTdG9jaztcbiAgICAgICAgfTtcblxuICAgICAgICBmb3JtXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidG90YWxNYXN1a1wiXScpXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVUb3RhbHMpO1xuICAgICAgICBmb3JtXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidG90YWxLZWx1YXJPa1wiXScpXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVUb3RhbHMpO1xuICAgICAgICBmb3JtXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidG90YWxLZWx1YXJOZ1wiXScpXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVUb3RhbHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tamVuaXNcIj5KZW5pcyBCYWhhbjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIiR7c2VjdGlvbklkfS1qZW5pc1wiIG5hbWU9XCJqZW5pc1wiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0tanVtbGFoXCI+SnVtbGFoPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCIke3NlY3Rpb25JZH0tanVtbGFoXCIgbmFtZT1cImp1bWxhaFwiIG1pbj1cIjBcIiByZXF1aXJlZCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIj5UYW5nZ2FsPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiJHtzZWN0aW9uSWR9LXRhbmdnYWxcIiBuYW1lPVwidGFuZ2dhbFwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke3NlY3Rpb25JZH0ta2V0ZXJhbmdhblwiPktldGVyYW5nYW48L2xhYmVsPlxuICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiJHtzZWN0aW9uSWR9LWtldGVyYW5nYW5cIiBuYW1lPVwia2V0ZXJhbmdhblwiIHJvd3M9XCIzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TaW1wYW48L2J1dHRvbj5cbiAgICAgICAgYDtcbiAgICAgIH1cbiAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHVudHVrIGZvcm0gSW4gQmFubmVyIGRhbiBJbiBEaWdpdGFsXG4gICAgaWYgKHNlY3Rpb25JZCA9PT0gXCJpbi1iYW5uZXJcIiB8fCBzZWN0aW9uSWQgPT09IFwiaW4tZGlnaXRhbFwiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmb3JtOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLFxuICAgICAgICBub21vcjogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5vbW9yXCJdJyksXG4gICAgICAgIGplbmlzS2VydGFzOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiamVuaXNLZXJ0YXNcIl0nKSxcbiAgICAgICAgdWt1cmFuOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidWt1cmFuXCJdJyksXG4gICAgICAgIHF0eUxhc3RNb250aDogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInF0eUxhc3RNb250aFwiXScpLFxuICAgICAgICB0YW5nZ2FsOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidGFuZ2dhbFwiXScpLFxuICAgICAgICBqdW1sYWhNYXN1azogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImp1bWxhaE1hc3VrXCJdJyksXG4gICAgICAgIHRvdGFsOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoYCMke3NlY3Rpb25JZH0tdG90YWxgKSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHNlY3Rpb25JZCA9PT0gXCJvdXQtYmFubmVyXCIgfHxcbiAgICAgIHNlY3Rpb25JZCA9PT0gXCJvdXQtZGlnaXRhbFwiIHx8XG4gICAgICBzZWN0aW9uSWQgPT09IFwib3V0LXByb2R1a3NpXCJcbiAgICApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvcm06IHNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImZvcm1cIiksXG4gICAgICAgIG5vbW9yOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibm9tb3JcIl0nKSxcbiAgICAgICAgamVuaXNLZXJ0YXM6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJqZW5pc0tlcnRhc1wiXScpLFxuICAgICAgICB1a3VyYW46IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJ1a3VyYW5cIl0nKSxcbiAgICAgICAgdG90YWxNYXN1azogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInRvdGFsTWFzdWtcIl0nKSxcbiAgICAgICAgdGFuZ2dhbDogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInRhbmdnYWxcIl0nKSxcbiAgICAgICAgdG90YWxLZWx1YXJPazogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInRvdGFsS2VsdWFyT2tcIl0nKSxcbiAgICAgICAgdG90YWxLZWx1YXJOZzogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInRvdGFsS2VsdWFyTmdcIl0nKSxcbiAgICAgICAgdG90YWxLZWx1YXI6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcihgIyR7c2VjdGlvbklkfS10b3RhbC1rZWx1YXJgKSxcbiAgICAgICAgc2lzYVN0b2NrOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoYCMke3NlY3Rpb25JZH0tc2lzYS1zdG9ja2ApLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb25JZCA9PT0gXCJpbi1wcm9kdWtzaVwiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmb3JtOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLFxuICAgICAgICBub21vcjogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5vbW9yXCJdJyksXG4gICAgICAgIGplbmlzS2VydGFzOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiamVuaXNLZXJ0YXNcIl0nKSxcbiAgICAgICAgdWt1cmFuOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidWt1cmFuXCJdJyksXG4gICAgICAgIHF0eUxhc3RNb250aDogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInF0eUxhc3RNb250aFwiXScpLFxuICAgICAgICB0YW5nZ2FsOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwidGFuZ2dhbFwiXScpLFxuICAgICAgICBqdW1sYWhNYXN1azogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImp1bWxhaE1hc3VrXCJdJyksXG4gICAgICAgIHRvdGFsOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIjaW4tcHJvZHVrc2ktdG90YWxcIiksXG4gICAgICAgIHJlbWFyazogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInJlbWFya1wiXScpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9ybTogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSxcbiAgICAgIGplbmlzOiBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiamVuaXNcIl0nKSxcbiAgICAgIGp1bWxhaDogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImp1bWxhaFwiXScpLFxuICAgICAgdGFuZ2dhbDogc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInRhbmdnYWxcIl0nKSxcbiAgICAgIGtldGVyYW5nYW46IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJrZXRlcmFuZ2FuXCJdJyksXG4gICAgfTtcbiAgfVxuXG4gIGZvcm1hdFRpdGxlKHNlY3Rpb25JZCkge1xuICAgIHJldHVybiBzZWN0aW9uSWRcbiAgICAgIC5zcGxpdChcIi1cIilcbiAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgLmpvaW4oXCIgXCIpO1xuICB9XG5cbiAgYmluZFN0b2NrU3VibWl0KGNhdGVnb3J5LCBoYW5kbGVyKSB7XG4gICAgaWYgKGNhdGVnb3J5ID09PSBcImJhbm5lclwiIHx8IGNhdGVnb3J5ID09PSBcImRpZ2l0YWxcIiB8fCBjYXRlZ29yeSA9PT0gXCJwcm9kdWtzaVwiKSByZXR1cm47IC8vIFNraXAgYmluZGluZyBmb3IgZGlzcGxheS1vbmx5IHNlY3Rpb25zXG4gICAgXG4gICAgY29uc3QgZm9ybSA9IHRoaXMuc3RvY2tGb3Jtc1tjYXRlZ29yeV0/LmZvcm07XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGZvcm1FbGVtZW50cyA9IGZvcm0uZWxlbWVudHM7XG4gICAgICAgIGNvbnN0IGlzRGlnaXRhbCA9IGNhdGVnb3J5ID09PSBcImRpZ2l0YWxcIjtcblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgIG5vbW9yOiBOdW1iZXIoZm9ybUVsZW1lbnRzLm5vbW9yLnZhbHVlKSxcbiAgICAgICAgICBqZW5pc0tlcnRhczogZm9ybUVsZW1lbnRzLmplbmlzS2VydGFzLnZhbHVlLFxuICAgICAgICAgIHVrdXJhbjogZm9ybUVsZW1lbnRzLnVrdXJhbi52YWx1ZSxcbiAgICAgICAgICBxdHk6IE51bWJlcihmb3JtRWxlbWVudHMucXR5LnZhbHVlKSxcbiAgICAgICAgICBbaXNEaWdpdGFsID8gXCJhY3R1YWxcIiA6IFwic2F0dWFuXCJdOlxuICAgICAgICAgICAgZm9ybUVsZW1lbnRzW2lzRGlnaXRhbCA/IFwiYWN0dWFsXCIgOiBcInNhdHVhblwiXS52YWx1ZSxcbiAgICAgICAgICB0YW5nZ2FsTGVuZ2thcDogZm9ybUVsZW1lbnRzLnRhbmdnYWwudmFsdWUsXG4gICAgICAgIH07XG4gICAgICAgIGhhbmRsZXIoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBiaW5kSW5PdXRTdWJtaXQoaGFuZGxlcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBbXCJpbi1iYW5uZXJcIiwgXCJpbi1kaWdpdGFsXCIsIFwiaW4tcHJvZHVrc2lcIl0uZm9yRWFjaChmdW5jdGlvbihmb3JtVHlwZSkge1xuICAgICAgdmFyIGZvcm1FbGVtZW50cyA9IHNlbGYuaW5PdXRGb3Jtc1tmb3JtVHlwZS5zcGxpdCgnLScpWzFdXS5pbjtcbiAgICAgIGlmICghZm9ybUVsZW1lbnRzKSByZXR1cm47XG5cbiAgICAgIHZhciBmb3JtID0gZm9ybUVsZW1lbnRzLmZvcm07XG4gICAgICBpZiAoIWZvcm0pIHJldHVybjtcblxuICAgICAgZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHZhciBjYXRlZ29yeSA9IGZvcm1UeXBlLnNwbGl0KCctJylbMV07XG4gICAgICAgIHZhciBmb3JtRGF0YSA9IHtcbiAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgICAgICAgdHlwZTogZm9ybVR5cGUsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbm9tb3I6IE51bWJlcihmb3JtRWxlbWVudHMubm9tb3IudmFsdWUpLFxuICAgICAgICAgICAgamVuaXNLZXJ0YXM6IGZvcm1FbGVtZW50cy5qZW5pc0tlcnRhcy52YWx1ZSxcbiAgICAgICAgICAgIHVrdXJhbjogZm9ybUVsZW1lbnRzLnVrdXJhbi52YWx1ZSxcbiAgICAgICAgICAgIHF0eUxhc3RNb250aDogTnVtYmVyKGZvcm1FbGVtZW50cy5xdHlMYXN0TW9udGgudmFsdWUpLFxuICAgICAgICAgICAgdGFuZ2dhbDogZm9ybUVsZW1lbnRzLnRhbmdnYWwudmFsdWUsXG4gICAgICAgICAgICBqdW1sYWhNYXN1azogTnVtYmVyKGZvcm1FbGVtZW50cy5qdW1sYWhNYXN1ay52YWx1ZSksXG4gICAgICAgICAgICB0b3RhbDogTnVtYmVyKGZvcm1FbGVtZW50cy50b3RhbC50ZXh0Q29udGVudCksXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmb3JtVHlwZSA9PT0gXCJpbi1wcm9kdWtzaVwiICYmIGZvcm1FbGVtZW50cy5yZW1hcmspIHtcbiAgICAgICAgICBmb3JtRGF0YS5kYXRhLnJlbWFyayA9IGZvcm1FbGVtZW50cy5yZW1hcmsudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBoYW5kbGVyKGZvcm1EYXRhKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgICAgICBmb3JtRWxlbWVudHMudG90YWwudGV4dENvbnRlbnQgPSAnMCc7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc3VibWl0dGluZyBmb3JtOicsIGVycm9yKTtcbiAgICAgICAgICBzZWxmLnNob3dFcnJvcihcIkdhZ2FsIG1lbnlpbXBhbiBkYXRhOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy8gQmluZCB1bnR1ayBmb3JtIE91dCBCYW5uZXIsIE91dCBEaWdpdGFsLCBkYW4gT3V0IFByb2R1a3NpXG4gICAgW1wib3V0LWJhbm5lclwiLCBcIm91dC1kaWdpdGFsXCIsIFwib3V0LXByb2R1a3NpXCJdLmZvckVhY2goZnVuY3Rpb24oZm9ybVR5cGUpIHtcbiAgICAgIHZhciBmb3JtRWxlbWVudHMgPSBzZWxmLmluT3V0Rm9ybXNbZm9ybVR5cGUuc3BsaXQoJy0nKVsxXV0ub3V0O1xuICAgICAgaWYgKCFmb3JtRWxlbWVudHMpIHJldHVybjtcblxuICAgICAgdmFyIGZvcm0gPSBmb3JtRWxlbWVudHMuZm9ybTtcbiAgICAgIGlmICghZm9ybSkgcmV0dXJuO1xuXG4gICAgICBmb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdmFyIHRvdGFsS2VsdWFyID0gTnVtYmVyKGZvcm1FbGVtZW50cy50b3RhbEtlbHVhck9rLnZhbHVlKSArIE51bWJlcihmb3JtRWxlbWVudHMudG90YWxLZWx1YXJOZy52YWx1ZSk7XG4gICAgICAgIHZhciBzaXNhU3RvY2sgPSBOdW1iZXIoZm9ybUVsZW1lbnRzLnRvdGFsTWFzdWsudmFsdWUpIC0gdG90YWxLZWx1YXI7XG5cbiAgICAgICAgdmFyIGZvcm1EYXRhID0ge1xuICAgICAgICAgIHR5cGU6IGZvcm1UeXBlLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG5vbW9yOiBOdW1iZXIoZm9ybUVsZW1lbnRzLm5vbW9yLnZhbHVlKSxcbiAgICAgICAgICAgIGplbmlzS2VydGFzOiBmb3JtRWxlbWVudHMuamVuaXNLZXJ0YXMudmFsdWUsXG4gICAgICAgICAgICB1a3VyYW46IGZvcm1FbGVtZW50cy51a3VyYW4udmFsdWUsXG4gICAgICAgICAgICB0b3RhbE1hc3VrOiBOdW1iZXIoZm9ybUVsZW1lbnRzLnRvdGFsTWFzdWsudmFsdWUpLFxuICAgICAgICAgICAgdGFuZ2dhbDogZm9ybUVsZW1lbnRzLnRhbmdnYWwudmFsdWUsXG4gICAgICAgICAgICB0b3RhbEtlbHVhck9rOiBOdW1iZXIoZm9ybUVsZW1lbnRzLnRvdGFsS2VsdWFyT2sudmFsdWUpLFxuICAgICAgICAgICAgdG90YWxLZWx1YXJOZzogTnVtYmVyKGZvcm1FbGVtZW50cy50b3RhbEtlbHVhck5nLnZhbHVlKSxcbiAgICAgICAgICAgIHRvdGFsS2VsdWFyOiB0b3RhbEtlbHVhcixcbiAgICAgICAgICAgIHNpc2FTdG9jazogc2lzYVN0b2NrXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGhhbmRsZXIoZm9ybURhdGEpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHN1Ym1pdHRpbmcgZm9ybTonLCBlcnJvcik7XG4gICAgICAgICAgc2VsZi5zaG93RXJyb3IoXCJHYWdhbCBtZW55aW1wYW4gZGF0YTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0Rm9ybShjYXRlZ29yeSwgdHlwZSA9IG51bGwpIHtcbiAgICBpZiAodHlwZSA9PT0gbnVsbCkge1xuICAgICAgLy8gUmVzZXQgc3RvY2sgZm9ybVxuICAgICAgdGhpcy5zdG9ja0Zvcm1zW2NhdGVnb3J5XT8uZm9ybS5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZXNldCBpbi9vdXQgZm9ybVxuICAgICAgdGhpcy5pbk91dEZvcm1zW2NhdGVnb3J5XT8uW3R5cGVdPy5mb3JtLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgc2hvd1N1Y2Nlc3MobWVzc2FnZSkge1xuICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICB9XG5cbiAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICBhbGVydChtZXNzYWdlKTtcbiAgfVxuXG4gIHVwZGF0ZVN0b2NrQmFubmVyRGlzcGxheShkYXRhKSB7XG4gICAgY29uc3Qgc3RvY2tCYW5uZXIgPSB0aGlzLnN0b2NrRm9ybXMuYmFubmVyO1xuICAgIGlmICghc3RvY2tCYW5uZXI/LnJlc3VsdHNCb2R5KSByZXR1cm47XG5cbiAgICAvLyBDbGVhciBleGlzdGluZyByb3dzXG4gICAgc3RvY2tCYW5uZXIucmVzdWx0c0JvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAvLyBIYW5kbGUgZW1wdHkgZGF0YSBjYXNlXG4gICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCBlbXB0eVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICBlbXB0eVJvdy5pbm5lckhUTUwgPSAnPHRkIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPkJlbHVtIGFkYSBkYXRhIHN0b2NrPC90ZD4nO1xuICAgICAgc3RvY2tCYW5uZXIucmVzdWx0c0JvZHkuYXBwZW5kQ2hpbGQoZW1wdHlSb3cpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFkZCBuZXcgcm93cyBmcm9tIGRhdGFcbiAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgcm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPHRkPiR7aXRlbS5ub21vcn08L3RkPlxuICAgICAgICA8dGQ+JHtpdGVtLmplbmlzS2VydGFzfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2l0ZW0udWt1cmFufTwvdGQ+XG4gICAgICAgIDx0ZD4ke2l0ZW0udG90YWxNYXN1a308L3RkPlxuICAgICAgICA8dGQ+JHtpdGVtLnRvdGFsS2VsdWFyfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2l0ZW0uc2lzYVN0b2NrfTwvdGQ+XG4gICAgICAgIDx0ZD4ke25ldyBEYXRlKGl0ZW0udGFuZ2dhbCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9PC90ZD5cbiAgICAgIGA7XG4gICAgICBzdG9ja0Jhbm5lci5yZXN1bHRzQm9keS5hcHBlbmRDaGlsZChyb3cpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3RvY2tEaWdpdGFsRGlzcGxheShkYXRhKSB7XG4gICAgY29uc3Qgc3RvY2tEaWdpdGFsID0gdGhpcy5zdG9ja0Zvcm1zLmRpZ2l0YWw7XG4gICAgaWYgKCFzdG9ja0RpZ2l0YWw/LnJlc3VsdHNCb2R5KSByZXR1cm47XG5cbiAgICAvLyBDbGVhciBleGlzdGluZyByb3dzXG4gICAgc3RvY2tEaWdpdGFsLnJlc3VsdHNCb2R5LmlubmVySFRNTCA9ICcnO1xuXG4gICAgLy8gQWRkIG5ldyByb3dzIGZyb20gZGF0YVxuICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICByb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICA8dGQ+JHtpdGVtLm5vbW9yfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2l0ZW0uamVuaXNLZXJ0YXN9PC90ZD5cbiAgICAgICAgPHRkPiR7aXRlbS51a3VyYW59PC90ZD5cbiAgICAgICAgPHRkPiR7aXRlbS50b3RhbE1hc3VrfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2l0ZW0udG90YWxLZWx1YXJ9PC90ZD5cbiAgICAgICAgPHRkPiR7aXRlbS5zaXNhU3RvY2t9PC90ZD5cbiAgICAgICAgPHRkPiR7bmV3IERhdGUoaXRlbS50YW5nZ2FsKS50b0xvY2FsZURhdGVTdHJpbmcoKX08L3RkPlxuICAgICAgYDtcbiAgICAgIHN0b2NrRGlnaXRhbC5yZXN1bHRzQm9keS5hcHBlbmRDaGlsZChyb3cpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3RvY2tQcm9kdWtzaURpc3BsYXkoZGF0YSkge1xuICAgIGNvbnN0IHN0b2NrUHJvZHVrc2kgPSB0aGlzLnN0b2NrRm9ybXMucHJvZHVrc2k7XG4gICAgaWYgKCFzdG9ja1Byb2R1a3NpPy5yZXN1bHRzQm9keSkgcmV0dXJuO1xuXG4gICAgLy8gQ2xlYXIgZXhpc3Rpbmcgcm93c1xuICAgIHN0b2NrUHJvZHVrc2kucmVzdWx0c0JvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAvLyBBZGQgbmV3IHJvd3MgZnJvbSBkYXRhXG4gICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgIHJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDx0ZD4ke2l0ZW0ubm9tb3J9PC90ZD5cbiAgICAgICAgPHRkPiR7aXRlbS5qZW5pc0tlcnRhc308L3RkPlxuICAgICAgICA8dGQ+JHtpdGVtLnVrdXJhbn08L3RkPlxuICAgICAgICA8dGQ+JHtpdGVtLnRvdGFsTWFzdWt9PC90ZD5cbiAgICAgICAgPHRkPiR7aXRlbS50b3RhbEtlbHVhcn08L3RkPlxuICAgICAgICA8dGQ+JHtpdGVtLnNpc2FTdG9ja308L3RkPlxuICAgICAgICA8dGQ+JHtuZXcgRGF0ZShpdGVtLnRhbmdnYWwpLnRvTG9jYWxlRGF0ZVN0cmluZygpfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2l0ZW0ucmVtYXJrIHx8ICctJ308L3RkPlxuICAgICAgYDtcbiAgICAgIHN0b2NrUHJvZHVrc2kucmVzdWx0c0JvZHkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIERhaWx5UmVwb3J0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFpbHktcmVwb3J0LWZvcm1cIik7XG4gICAgdGhpcy50b3RhbFF0eU9rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbC1xdHktb2tcIik7XG4gICAgdGhpcy50b3RhbFF0eU5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbC1xdHktbmdcIik7XG4gICAgdGhpcy50b3RhbFF0eUFsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWwtcXR5LWFsbFwiKTtcblxuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IHF0eU9rSW5wdXQgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcihcIiNxdHktY2V0YWstb2tcIik7XG4gICAgY29uc3QgcXR5TmdJbnB1dCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKFwiI3F0eS1jZXRhay1uZ1wiKTtcblxuICAgIGNvbnN0IHVwZGF0ZVRvdGFscyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHF0eU9rID0gTnVtYmVyKHF0eU9rSW5wdXQudmFsdWUpIHx8IDA7XG4gICAgICBjb25zdCBxdHlOZyA9IE51bWJlcihxdHlOZ0lucHV0LnZhbHVlKSB8fCAwO1xuICAgICAgY29uc3QgdG90YWwgPSBxdHlPayArIHF0eU5nO1xuXG4gICAgICB0aGlzLnRvdGFsUXR5T2sudGV4dENvbnRlbnQgPSBxdHlPay50b0xvY2FsZVN0cmluZygpO1xuICAgICAgdGhpcy50b3RhbFF0eU5nLnRleHRDb250ZW50ID0gcXR5TmcudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIHRoaXMudG90YWxRdHlBbGwudGV4dENvbnRlbnQgPSB0b3RhbC50b0xvY2FsZVN0cmluZygpO1xuICAgIH07XG5cbiAgICBxdHlPa0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVUb3RhbHMpO1xuICAgIHF0eU5nSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVRvdGFscyk7XG5cbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmZvcm0pO1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgbm9tb3I6IE51bWJlcihmb3JtRGF0YS5nZXQoXCJub21vclwiKSksXG4gICAgICAgIHRhbmdnYWw6IGZvcm1EYXRhLmdldChcInRhbmdnYWxcIiksXG4gICAgICAgIHF0eVBvOiBOdW1iZXIoZm9ybURhdGEuZ2V0KFwicXR5LXBvXCIpKSxcbiAgICAgICAgc2F0dWFuOiBmb3JtRGF0YS5nZXQoXCJzYXR1YW5cIiksXG4gICAgICAgIGplbmlzQmFoYW46IGZvcm1EYXRhLmdldChcImplbmlzLWJhaGFuXCIpLFxuICAgICAgICBqZW5pc1Bla2VyamFhbjogZm9ybURhdGEuZ2V0KFwiamVuaXMtcGVrZXJqYWFuXCIpLFxuICAgICAgICBjbGllbnQ6IGZvcm1EYXRhLmdldChcImNsaWVudFwiKSxcbiAgICAgICAgc3Blc2lmaWthc2k6IGZvcm1EYXRhLmdldChcInNwZXNpZmlrYXNpXCIpLFxuICAgICAgICBxdHlDZXRha09rOiBOdW1iZXIoZm9ybURhdGEuZ2V0KFwicXR5LWNldGFrLW9rXCIpKSxcbiAgICAgICAgcXR5Q2V0YWtOZzogTnVtYmVyKGZvcm1EYXRhLmdldChcInF0eS1jZXRhay1uZ1wiKSksXG4gICAgICAgIHNhdHVhbkNldGFrOiBmb3JtRGF0YS5nZXQoXCJzYXR1YW4tY2V0YWtcIiksXG4gICAgICAgIHdha3R1U3RhcnQ6IGZvcm1EYXRhLmdldChcIndha3R1LXN0YXJ0XCIpLFxuICAgICAgICB3YWt0dUZpbmlzaDogZm9ybURhdGEuZ2V0KFwid2FrdHUtZmluaXNoXCIpLFxuICAgICAgICBub1NwazogZm9ybURhdGEuZ2V0KFwibm8tc3BrXCIpLFxuICAgICAgICBrZXRlcmFuZ2FuOiBmb3JtRGF0YS5nZXQoXCJrZXRlcmFuZ2FuXCIpLFxuICAgICAgICB0b3RhbFF0eUNldGFrT2s6IE51bWJlcih0aGlzLnRvdGFsUXR5T2sudGV4dENvbnRlbnQucmVwbGFjZSgvLC9nLCBcIlwiKSksXG4gICAgICAgIHRvdGFsUXR5Q2V0YWtOZzogTnVtYmVyKHRoaXMudG90YWxRdHlOZy50ZXh0Q29udGVudC5yZXBsYWNlKC8sL2csIFwiXCIpKSxcbiAgICAgICAgdG90YWxRdHlDZXRha0FsbDogTnVtYmVyKFxuICAgICAgICAgIHRoaXMudG90YWxRdHlBbGwudGV4dENvbnRlbnQucmVwbGFjZSgvLC9nLCBcIlwiKVxuICAgICAgICApLFxuICAgICAgfTtcblxuICAgICAgLy8gRGlzaW5pIGJpc2EgZGl0YW1iYWhrYW4ga29kZSB1bnR1ayBtZW55aW1wYW4gZGF0YSBrZSBzZXJ2ZXJcbiAgICAgIGNvbnNvbGUubG9nKFwiRm9ybSBzdWJtaXR0ZWQ6XCIsIGRhdGEpO1xuXG4gICAgICAvLyBSZXNldCBmb3JtIHNldGVsYWggc3VibWl0XG4gICAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgICAgIHVwZGF0ZVRvdGFscygpO1xuICAgIH0pO1xuICB9XG5cbiAgYmluZFN1Ym1pdChoYW5kbGVyKSB7XG4gICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGhhbmRsZXIoe1xuICAgICAgICB0YW5nZ2FsOiB0aGlzLnRhbmdnYWwudmFsdWUsXG4gICAgICAgIHNoaWZ0OiB0aGlzLnNoaWZ0LnZhbHVlLFxuICAgICAgICBqYW1KYWxhbjogTnVtYmVyKHRoaXMuamFtSmFsYW4udmFsdWUpLFxuICAgICAgICBqYW1CZXJoZW50aTogTnVtYmVyKHRoaXMuamFtQmVyaGVudGkudmFsdWUpLFxuICAgICAgICBoYXNpbFByb2R1a3NpOiBOdW1iZXIodGhpcy5oYXNpbFByb2R1a3NpLnZhbHVlKSxcbiAgICAgICAgY2F0YXRhbjogdGhpcy5jYXRhdGFuLnZhbHVlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgfVxuXG4gIHNob3dTdWNjZXNzKG1lc3NhZ2UpIHtcbiAgICBhbGVydChtZXNzYWdlKTtcbiAgfVxuXG4gIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgYWxlcnQobWVzc2FnZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBIZWFkZXJWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4taGVhZGVyXCIpO1xuICAgIHRoaXMubWVudVRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudS10b2dnbGVcIik7XG4gICAgdGhpcy5zeW5jU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzeW5jLXN0YXR1c1wiKTtcblxuICAgIC8vIEluaXRpYWxpemUgaGVhZGVyIGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICBpZiAoIXRoaXMuaGVhZGVyKSB7XG4gICAgICB0aGlzLmNyZWF0ZUhlYWRlcigpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgIGhlYWRlci5jbGFzc05hbWUgPSBcIm1haW4taGVhZGVyXCI7XG4gICAgaGVhZGVyLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiaW1hZ2VzL2xvZ29oZWFkZXIucG5nXCIgYWx0PVwiTG9nb1wiIHN0eWxlPVwiaGVpZ2h0OjYwcHg7IG1hcmdpbi1yaWdodDoxMHB4O1wiPlxuICAgICAgICA8bmF2IGNsYXNzPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxidXR0b24gaWQ9XCJtZW51LXRvZ2dsZVwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBtZW51XCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImJpIGJpLWxpc3QgZnMtNFwiPjwvaT5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGlkPVwic3luYy1zdGF0dXNcIiBjbGFzcz1cInN5bmMtc3RhdHVzIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmktY2xvdWQtY2hlY2sgZnMtNSBtZS0yXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICAvLyBJbnNlcnQgaGVhZGVyIGF0IHRoZSBiZWdpbm5pbmcgb2YgZGFzaGJvYXJkIHBhZ2VcbiAgICBjb25zdCBkYXNoYm9hcmRQYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoYm9hcmQtcGFnZVwiKTtcbiAgICBpZiAoZGFzaGJvYXJkUGFnZSkge1xuICAgICAgZGFzaGJvYXJkUGFnZS5pbnNlcnRCZWZvcmUoaGVhZGVyLCBkYXNoYm9hcmRQYWdlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSByZWZlcmVuY2VzXG4gICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgdGhpcy5tZW51VG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIjbWVudS10b2dnbGVcIik7XG4gICAgdGhpcy5zeW5jU3RhdHVzID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIjc3luYy1zdGF0dXNcIik7XG4gIH1cblxuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIGNvbnN0IGgxID0gdGhpcy5oZWFkZXIucXVlcnlTZWxlY3RvcihcImgxXCIpO1xuICAgIGlmIChoMSkge1xuICAgICAgaDEudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTeW5jU3RhdHVzKHN0YXR1cykge1xuICAgIGlmICh0aGlzLnN5bmNTdGF0dXMpIHtcbiAgICAgIHRoaXMuc3luY1N0YXR1cy50ZXh0Q29udGVudCA9IHN0YXR1cztcbiAgICB9XG4gIH1cblxuICBiaW5kTWVudVRvZ2dsZShoYW5kbGVyKSB7XG4gICAgaWYgKHRoaXMubWVudVRvZ2dsZSkge1xuICAgICAgdGhpcy5tZW51VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVyKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBMb2dpblZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLWZvcm1cIik7XG4gICAgdGhpcy5sb2dpblBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLXBhZ2VcIik7XG4gICAgdGhpcy5kYXNoYm9hcmRQYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoYm9hcmQtcGFnZVwiKTtcblxuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0IHVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybmFtZVwiKS52YWx1ZTtcbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcblxuICAgICAgLy8gVW50dWsgc2VtZW50YXJhLCBraXRhIGxhbmdzdW5nIHJlZGlyZWN0IGtlIGRhc2hib2FyZFxuICAgICAgLy8gTmFudGkgYmlzYSBkaXRhbWJhaGthbiB2YWxpZGFzaSB1c2VybmFtZSBkYW4gcGFzc3dvcmRcbiAgICAgIHRoaXMuc2hvd0Rhc2hib2FyZCgpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGxvZ291dFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb3V0LWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2hvd0xvZ2luKCk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93RGFzaGJvYXJkKCkge1xuICAgIHRoaXMubG9naW5QYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgdGhpcy5kYXNoYm9hcmRQYWdlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH1cblxuICBzaG93TG9naW4oKSB7XG4gICAgdGhpcy5kYXNoYm9hcmRQYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgdGhpcy5sb2dpblBhZ2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25WaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wYWdlcyA9IHtcbiAgICAgIGxvZ2luOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLXBhZ2VcIiksXG4gICAgICBkYXNoYm9hcmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFzaGJvYXJkLXBhZ2VcIiksXG4gICAgfTtcblxuICAgIHRoaXMuc2VjdGlvbnMgPSB7XG4gICAgICBcInN0b2NrLWJhbm5lclwiOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0b2NrLWJhbm5lci1zZWN0aW9uXCIpLFxuICAgICAgXCJzdG9jay1kaWdpdGFsXCI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RvY2stZGlnaXRhbC1zZWN0aW9uXCIpLFxuICAgICAgXCJzdG9jay1wcm9kdWtzaVwiOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0b2NrLXByb2R1a3NpLXNlY3Rpb25cIiksXG4gICAgICBcImluLWJhbm5lclwiOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluLWJhbm5lci1zZWN0aW9uXCIpLFxuICAgICAgXCJvdXQtYmFubmVyXCI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0LWJhbm5lci1zZWN0aW9uXCIpLFxuICAgICAgXCJpbi1kaWdpdGFsXCI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW4tZGlnaXRhbC1zZWN0aW9uXCIpLFxuICAgICAgXCJvdXQtZGlnaXRhbFwiOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dC1kaWdpdGFsLXNlY3Rpb25cIiksXG4gICAgICBcImluLXByb2R1a3NpXCI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW4tcHJvZHVrc2ktc2VjdGlvblwiKSxcbiAgICAgIFwib3V0LXByb2R1a3NpXCI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0LXByb2R1a3NpLXNlY3Rpb25cIiksXG4gICAgICBcImRhaWx5LXJlcG9ydFwiOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhaWx5LXJlcG9ydC1zZWN0aW9uXCIpLFxuICAgICAgcmVrYXA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVrYXAtc2VjdGlvblwiKSxcbiAgICB9O1xuXG4gICAgdGhpcy5zaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xuICAgIHRoaXMubG9nb3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXQtYnRuXCIpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5zZXR1cFN1Ym1lbnVUb2dnbGUoKTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbnVsbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgLy8gSGFuZGxlIG5hdmlnYXRpb24gbGlua3NcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYVtkYXRhLXBhZ2VdXCIpLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcGFnZSA9IGUudGFyZ2V0LmRhdGFzZXQucGFnZTtcbiAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2UpO1xuICAgICAgICAgIHRoaXMudXBkYXRlQWN0aXZlU3RhdGUoZS50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldHVwU3VibWVudVRvZ2dsZSgpIHtcbiAgICAvLyBIYW5kbGUgc3VibWVudSB0b2dnbGVzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tZW51LXRvZ2dsZVwiKS5mb3JFYWNoKCh0b2dnbGUpID0+IHtcbiAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IGV2ZW50IGJ1YmJsaW5nXG5cbiAgICAgICAgY29uc3QgbWVudUl0ZW0gPSB0b2dnbGUuY2xvc2VzdChcIi5oYXMtc3VibWVudVwiKTtcbiAgICAgICAgaWYgKG1lbnVJdGVtKSB7XG4gICAgICAgICAgLy8gQ2xvc2Ugb3RoZXIgb3BlbiBzdWJtZW51c1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaGFzLXN1Ym1lbnVcIikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IG1lbnVJdGVtICYmIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgY29uc3Qgc3VibWVudSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi5zdWJtZW51XCIpO1xuICAgICAgICAgICAgICBpZiAoc3VibWVudSkgc3VibWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gVG9nZ2xlIGN1cnJlbnQgc3VibWVudVxuICAgICAgICAgIG1lbnVJdGVtLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgY29uc3Qgc3VibWVudSA9IG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWVudVwiKTtcbiAgICAgICAgICBpZiAoc3VibWVudSkge1xuICAgICAgICAgICAgc3VibWVudS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBiaW5kTG9nb3V0KGhhbmRsZXIpIHtcbiAgICB0aGlzLmxvZ291dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZVNpZGViYXIoKSB7XG4gICAgaWYgKHRoaXMuc2lkZWJhcikge1xuICAgICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XG4gICAgfVxuICB9XG5cbiAgc2hvd1BhZ2UocGFnZUlkKSB7XG4gICAgLy8gSGlkZSBhbGwgc2VjdGlvbnMgZmlyc3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbnRlbnQtc2VjdGlvblwiKS5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcblxuICAgIC8vIFNob3cgdGhlIHNlbGVjdGVkIHNlY3Rpb25cbiAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGFnZUlkfS1zZWN0aW9uYCk7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgIHNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlSWQ7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQWN0aXZlU3RhdGUoY2xpY2tlZExpbmspIHtcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIGxpbmtzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYWluLW5hdiBhXCIpLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY2xpY2tlZCBsaW5rXG4gICAgY2xpY2tlZExpbmsuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuICAgIC8vIElmIGl0J3MgYSBzdWJtZW51IGl0ZW0sIG1ha2Ugc3VyZSB0aGUgcGFyZW50IG1lbnUgaXMgZXhwYW5kZWRcbiAgICBjb25zdCBzdWJtZW51ID0gY2xpY2tlZExpbmsuY2xvc2VzdChcIi5zdWJtZW51XCIpO1xuICAgIGlmIChzdWJtZW51KSB7XG4gICAgICBjb25zdCBwYXJlbnRNZW51ID0gc3VibWVudS5jbG9zZXN0KFwiLmhhcy1zdWJtZW51XCIpO1xuICAgICAgaWYgKHBhcmVudE1lbnUpIHtcbiAgICAgICAgcGFyZW50TWVudS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICBzdWJtZW51LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvd1NlY3Rpb24oc2VjdGlvbklkKSB7XG4gICAgLy8gSGlkZSBhbGwgc2VjdGlvbnMgZmlyc3RcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuc2VjdGlvbnMpLmZvckVhY2goKHNlY3Rpb24pID0+IHtcbiAgICAgIGlmIChzZWN0aW9uKSBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcblxuICAgIC8vIFNob3cgdGhlIHJlcXVlc3RlZCBzZWN0aW9uIGlmIGl0IGV4aXN0c1xuICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnNlY3Rpb25zW3NlY3Rpb25JZF07XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgIHNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKGBTZWN0aW9uICR7c2VjdGlvbklkfSBub3QgZm91bmRgKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSZWthcFZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdlbmVyYXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5lcmF0ZS1yZWthcFwiKTtcbiAgICB0aGlzLnRpcGVTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJla2FwLXRpcGVcIik7XG4gICAgdGhpcy5wZXJpb2RlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJla2FwLXBlcmlvZGVcIik7XG4gICAgdGhpcy50YWJsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtY29udGFpbmVyXCIpO1xuICB9XG5cbiAgYmluZEdlbmVyYXRlUmVrYXAoaGFuZGxlcikge1xuICAgIHRoaXMuZ2VuZXJhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHBlcmlvZGUgPSB0aGlzLnBlcmlvZGVJbnB1dC52YWx1ZTtcbiAgICAgIGlmICghcGVyaW9kZSkge1xuICAgICAgICB0aGlzLnNob3dFcnJvcihcIlBpbGloIHBlcmlvZGUgdGVybGViaWggZGFodWx1IVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBbeWVhciwgbW9udGhdID0gcGVyaW9kZS5zcGxpdChcIi1cIik7XG4gICAgICBoYW5kbGVyKHtcbiAgICAgICAgdGlwZTogdGhpcy50aXBlU2VsZWN0LnZhbHVlLFxuICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgMSksXG4gICAgICAgIGVuZERhdGU6IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAwKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZGlzcGxheVRhYmxlKGRhdGEsIHRpcGUpIHtcbiAgICBsZXQgaHRtbCA9IFwiXCI7XG5cbiAgICBpZiAodGlwZSA9PT0gXCJiYWhhbi1iYWt1XCIpIHtcbiAgICAgIGh0bWwgPSB0aGlzLmdlbmVyYXRlQmFoYW5CYWt1VGFibGUoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGh0bWwgPSB0aGlzLmdlbmVyYXRlRGFpbHlSZXBvcnRUYWJsZShkYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnRhYmxlQ29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gIH1cblxuICBnZW5lcmF0ZUJhaGFuQmFrdVRhYmxlKGRhdGEpIHtcbiAgICByZXR1cm4gYFxuICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlRhbmdnYWw8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkplbmlzIEJhaGFuPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5TdG9rIE1hc3VrPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5QZW1ha2FpYW48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlNpc2E8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAke2RhdGFcbiAgICAgICAgICAgICAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0pID0+IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtuZXcgRGF0ZShpdGVtLnRhbmdnYWwpLnRvTG9jYWxlRGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWQtSURcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtpdGVtLmplbmlzQmFoYW59PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtpdGVtLnN0b2tNYXN1a308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke2l0ZW0ucGVtYWthaWFufTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7aXRlbS5zaXNhfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5qb2luKFwiXCIpfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICBgO1xuICB9XG5cbiAgZ2VuZXJhdGVEYWlseVJlcG9ydFRhYmxlKGRhdGEpIHtcbiAgICByZXR1cm4gYFxuICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlRhbmdnYWw8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlNoaWZ0PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5KYW0gSmFsYW48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkphbSBCZXJoZW50aTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+SGFzaWwgUHJvZHVrc2k8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNhdGF0YW48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAke2RhdGFcbiAgICAgICAgICAgICAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0pID0+IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtuZXcgRGF0ZShpdGVtLnRhbmdnYWwpLnRvTG9jYWxlRGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWQtSURcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtpdGVtLnNoaWZ0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7aXRlbS5qYW1KYWxhbn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke2l0ZW0uamFtQmVyaGVudGl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtpdGVtLmhhc2lsUHJvZHVrc2l9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtpdGVtLmNhdGF0YW4gfHwgXCItXCJ9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCJcIil9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIGA7XG4gIH1cblxuICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydGllcyIsIl90b1Byb3BlcnR5S2V5Iiwia2V5IiwiX2NyZWF0ZUNsYXNzIiwiX3RvUHJpbWl0aXZlIiwiX3R5cGVvZiIsInRvUHJpbWl0aXZlIiwiU3RyaW5nIiwiTnVtYmVyIiwiQmFoYW5CYWt1TW9kZWwiLCJEYWlseVJlcG9ydE1vZGVsIiwiTG9naW5WaWV3IiwiTmF2aWdhdGlvblZpZXciLCJIZWFkZXJWaWV3IiwiQmFoYW5CYWt1VmlldyIsIkRhaWx5UmVwb3J0VmlldyIsIlJla2FwVmlldyIsIkxvZ2luUHJlc2VudGVyIiwiTmF2aWdhdGlvblByZXNlbnRlciIsIkhlYWRlclByZXNlbnRlciIsIkJhaGFuQmFrdVByZXNlbnRlciIsIkRhaWx5UmVwb3J0UHJlc2VudGVyIiwiUmVrYXBQcmVzZW50ZXIiLCJkYiIsIkFwcCIsImJhaGFuQmFrdU1vZGVsIiwiZGFpbHlSZXBvcnRNb2RlbCIsImxvZ2luVmlldyIsIm5hdmlnYXRpb25WaWV3IiwiaGVhZGVyVmlldyIsImJhaGFuQmFrdVZpZXciLCJkYWlseVJlcG9ydFZpZXciLCJyZWthcFZpZXciLCJsb2dpblByZXNlbnRlciIsIm5hdmlnYXRpb25QcmVzZW50ZXIiLCJoZWFkZXJQcmVzZW50ZXIiLCJiYWhhbkJha3VQcmVzZW50ZXIiLCJkYWlseVJlcG9ydFByZXNlbnRlciIsInJla2FwUHJlc2VudGVyIiwiYmluZEV2ZW50cyIsIl90aGlzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2hvd1BhZ2UiLCJzaG93RGVmYXVsdFNlY3Rpb24iLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwicHJvY2Vzc1N5bmNRdWV1ZSIsIl9pbml0IiwiX2NhbGxlZSIsIl90IiwiX2NvbnRleHQiLCJvcGVuREIiLCJlcnJvciIsImFsZXJ0IiwiaW5pdCIsImFwcCIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInJlZ2lzdHJhdGlvbiIsImVyciIsIm93bktleXMiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZmlsdGVyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicHVzaCIsIl9vYmplY3RTcHJlYWQiLCJmb3JFYWNoIiwiX2RlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJEQl9TVE9SRVMiLCJiYWhhbkJha3VTdG9jayIsImJhaGFuQmFrdVRyYW5zYWN0aW9ucyIsImRhaWx5UmVwb3J0IiwicmVqZWN0IiwicmVxdWVzdCIsImluZGV4ZWREQiIsIm9wZW4iLCJvbmVycm9yIiwib25zdWNjZXNzIiwicmVzdWx0Iiwib251cGdyYWRlbmVlZGVkIiwiZXZlbnQiLCJ0YXJnZXQiLCJvYmplY3RTdG9yZU5hbWVzIiwiY29udGFpbnMiLCJzdG9ja1N0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsImNyZWF0ZUluZGV4IiwidHJhbnNhY3Rpb25zU3RvcmUiLCJkYWlseVJlcG9ydFN0b3JlIiwiYWRkUmVjb3JkIiwiX3JlZiIsInN0b3JlTmFtZSIsImRhdGEiLCJ0cmFuc2FjdGlvbiIsInN0b3JlIiwib2JqZWN0U3RvcmUiLCJwcm9jZXNzZWREYXRhIiwidGFuZ2dhbCIsIkRhdGUiLCJ0aW1lc3RhbXAiLCJ0b0lTT1N0cmluZyIsImFkZCIsIl94IiwiX3gyIiwiZ2V0UmVjb3JkcyIsIl9yZWYyIiwiX2NhbGxlZTIiLCJxdWVyeSIsIl9hcmdzMiIsIl9jb250ZXh0MiIsInVuZGVmaW5lZCIsImdldEFsbCIsInJlc3VsdHMiLCJyZWNvcmQiLCJfeDMiLCJnZXRSZWNvcmRzQnlEYXRlUmFuZ2UiLCJfcmVmMyIsIl9jYWxsZWUzIiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsIl9jb250ZXh0MyIsInJlY29yZERhdGUiLCJfeDQiLCJfeDUiLCJfeDYiLCJnZXRSZWNvcmRzQnlJbmRleCIsIl9yZWY0IiwiX2NhbGxlZTQiLCJpbmRleE5hbWUiLCJfY29udGV4dDQiLCJpbmRleCIsIl94NyIsIl94OCIsIl94OSIsImFkZFRvU3luY1F1ZXVlIiwiX3JlZjUiLCJfY2FsbGVlNSIsInF1ZXVlIiwiX2NvbnRleHQ1IiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImlkIiwibm93Iiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIl94MCIsIl9yZWY2IiwiX2NhbGxlZTYiLCJfY29udGV4dDYiLCJvbkxpbmUiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsImluZGV4T2YiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImhhc093blByb3BlcnR5Iiwic3RvcmVOYW1lcyIsInN0b2NrIiwidHJhbnNhY3Rpb25zIiwiX3VwZGF0ZVN0b2NrIiwiY2F0ZWdvcnkiLCJ0YW5nZ2FsTGVuZ2thcCIsInJlc3REYXRhIiwic3RvY2tEYXRhIiwiZXhpc3RpbmciLCJfZXhjbHVkZWQiLCJ1cGRhdGVkQXQiLCJub21vciIsIkVycm9yIiwiY29uY2F0IiwidHlwZSIsImFjdGlvbiIsIm1lc3NhZ2UiLCJ1cGRhdGVTdG9jayIsIl9hZGRTdG9jayIsInRyYW5zYWN0aW9uRGF0YSIsIl90MiIsInNpc2FTdG9jayIsInRvdGFsIiwicXR5TGFzdE1vbnRoIiwianVtbGFoTWFzdWsiLCJhZGRTdG9jayIsIl9yZWR1Y2VTdG9jayIsIl90MyIsInJlZHVjZVN0b2NrIiwiX2dldFN0b2NrQnlDYXRlZ29yeSIsIl90NCIsImdldFN0b2NrQnlDYXRlZ29yeSIsIl9nZXRUcmFuc2FjdGlvbnNCeURhdGVSYW5nZSIsIl90NSIsImdldFRyYW5zYWN0aW9uc0J5RGF0ZVJhbmdlIiwiX2dldEN1cnJlbnRTdG9jayIsInN0b2NrTWFwIiwiX3Q2IiwiTWFwIiwiamVuaXNLZXJ0YXMiLCJ1a3VyYW4iLCJoYXMiLCJzZXQiLCJ0b3RhbE1hc3VrIiwidG90YWxLZWx1YXIiLCJpdGVtIiwiZ2V0IiwibGFzdFVwZGF0ZSIsInRvdGFsS2VsdWFyQmFydSIsInRvdGFsS2VsdWFyT2siLCJ0b3RhbEtlbHVhck5nIiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwic29ydCIsImIiLCJnZXRDdXJyZW50U3RvY2siLCJfeDEiLCJfZ2V0Q3VycmVudEJhbm5lclN0b2NrIiwiX2NhbGxlZTciLCJfY29udGV4dDciLCJnZXRDdXJyZW50QmFubmVyU3RvY2siLCJfZ2V0Q3VycmVudERpZ2l0YWxTdG9jayIsIl9jYWxsZWU4IiwiX2NvbnRleHQ4IiwiZ2V0Q3VycmVudERpZ2l0YWxTdG9jayIsIl9nZXRDdXJyZW50UHJvZHVrc2lTdG9jayIsIl9jYWxsZWU5IiwiX2NvbnRleHQ5IiwiZ2V0Q3VycmVudFByb2R1a3NpU3RvY2siLCJfYWRkIiwiX2dldEJ5RGF0ZVJhbmdlIiwiZ2V0QnlEYXRlUmFuZ2UiLCJtb2RlbCIsInZpZXciLCJiaW5kU3RvY2tIYW5kbGVycyIsImJpbmRJbk91dEhhbmRsZXJzIiwibG9hZEJhbm5lclN0b2NrRGF0YSIsImxvYWREaWdpdGFsU3RvY2tEYXRhIiwibG9hZFByb2R1a3NpU3RvY2tEYXRhIiwiX2xvYWRCYW5uZXJTdG9ja0RhdGEiLCJ1cGRhdGVTdG9ja0Jhbm5lckRpc3BsYXkiLCJzaG93RXJyb3IiLCJfbG9hZERpZ2l0YWxTdG9ja0RhdGEiLCJ1cGRhdGVTdG9ja0RpZ2l0YWxEaXNwbGF5IiwiX2xvYWRQcm9kdWtzaVN0b2NrRGF0YSIsInVwZGF0ZVN0b2NrUHJvZHVrc2lEaXNwbGF5IiwiYmluZFN0b2NrU3VibWl0IiwiaGFuZGxlU3RvY2tTdWJtaXQiLCJfdGhpczIiLCJiaW5kSW5PdXRTdWJtaXQiLCJoYW5kbGVJblN1Ym1pdCIsImhhbmRsZU91dFN1Ym1pdCIsIl9oYW5kbGVTdG9ja1N1Ym1pdCIsImZvcm1EYXRhIiwicmVzZXRGb3JtIiwic2hvd1N1Y2Nlc3MiLCJfaGFuZGxlSW5TdWJtaXQiLCJfaGFuZGxlT3V0U3VibWl0IiwiYmluZFN1Ym1pdCIsImhhbmRsZVN1Ym1pdCIsIl9oYW5kbGVTdWJtaXQiLCJyZXNldCIsImJpbmRNZW51VG9nZ2xlIiwidG9nZ2xlU2lkZWJhciIsInNldFRpdGxlIiwidGl0bGUiLCJ1cGRhdGVTeW5jU3RhdHVzIiwic3RhdHVzIiwiYmluZExvZ2luIiwiaGFuZGxlTG9naW4iLCJjcmVkZW50aWFscyIsIm9uTG9naW5TdWNjZXNzIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiYmluZE5hdmlnYXRpb24iLCJoYW5kbGVOYXZpZ2F0aW9uIiwiYmluZExvZ291dCIsImhhbmRsZUxvZ291dCIsInBhZ2VJZCIsInNob3dTZWN0aW9uIiwiYmluZEdlbmVyYXRlUmVrYXAiLCJoYW5kbGVHZW5lcmF0ZVJla2FwIiwiX2hhbmRsZUdlbmVyYXRlUmVrYXAiLCJ0aXBlIiwiZGlzcGxheVRhYmxlIiwic3RvY2tGb3JtcyIsImJhbm5lciIsImluaXRpYWxpemVTdG9ja0Zvcm0iLCJkaWdpdGFsIiwicHJvZHVrc2kiLCJpbk91dEZvcm1zIiwiaW5pdGlhbGl6ZUluT3V0Rm9ybSIsIm91dCIsInNlY3Rpb25JZCIsInNlY3Rpb24iLCJnZXRFbGVtZW50QnlJZCIsInF1ZXJ5U2VsZWN0b3IiLCJyZXN1bHRzQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwicmVzdWx0c0JvZHkiLCJmb3JtIiwiaXNEaWdpdGFsIiwicXR5IiwiYWN0dWFsIiwic2F0dWFuIiwidXBkYXRlVG90YWwiLCJ0ZXh0Q29udGVudCIsInVwZGF0ZVRvdGFscyIsInJlbWFyayIsImplbmlzIiwianVtbGFoIiwia2V0ZXJhbmdhbiIsImZvcm1hdFRpdGxlIiwic3BsaXQiLCJtYXAiLCJ3b3JkIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImpvaW4iLCJoYW5kbGVyIiwiX3RoaXMkc3RvY2tGb3JtcyRjYXRlIiwicHJldmVudERlZmF1bHQiLCJmb3JtRWxlbWVudHMiLCJlbGVtZW50cyIsInNlbGYiLCJmb3JtVHlwZSIsIm9uc3VibWl0Iiwic3RvcFByb3BhZ2F0aW9uIiwiX3RoaXMkc3RvY2tGb3JtcyRjYXRlMiIsIl90aGlzJGluT3V0Rm9ybXMkY2F0ZSIsInN0b2NrQmFubmVyIiwiZW1wdHlSb3ciLCJyb3ciLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJzdG9ja0RpZ2l0YWwiLCJzdG9ja1Byb2R1a3NpIiwidG90YWxRdHlPayIsInRvdGFsUXR5TmciLCJ0b3RhbFF0eUFsbCIsImluaXRpYWxpemVFdmVudExpc3RlbmVycyIsInF0eU9rSW5wdXQiLCJxdHlOZ0lucHV0IiwicXR5T2siLCJxdHlOZyIsInRvTG9jYWxlU3RyaW5nIiwiRm9ybURhdGEiLCJxdHlQbyIsImplbmlzQmFoYW4iLCJqZW5pc1Bla2VyamFhbiIsImNsaWVudCIsInNwZXNpZmlrYXNpIiwicXR5Q2V0YWtPayIsInF0eUNldGFrTmciLCJzYXR1YW5DZXRhayIsIndha3R1U3RhcnQiLCJ3YWt0dUZpbmlzaCIsIm5vU3BrIiwidG90YWxRdHlDZXRha09rIiwicmVwbGFjZSIsInRvdGFsUXR5Q2V0YWtOZyIsInRvdGFsUXR5Q2V0YWtBbGwiLCJzaGlmdCIsImphbUphbGFuIiwiamFtQmVyaGVudGkiLCJoYXNpbFByb2R1a3NpIiwiY2F0YXRhbiIsImhlYWRlciIsIm1lbnVUb2dnbGUiLCJzeW5jU3RhdHVzIiwiY3JlYXRlSGVhZGVyIiwiZGFzaGJvYXJkUGFnZSIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJoMSIsImxvZ2luUGFnZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJzaG93RGFzaGJvYXJkIiwic2hvd0xvZ2luIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicGFnZXMiLCJsb2dpbiIsImRhc2hib2FyZCIsInNlY3Rpb25zIiwicmVrYXAiLCJzaWRlYmFyIiwibG9nb3V0QnRuIiwic2V0dXBTdWJtZW51VG9nZ2xlIiwiY3VycmVudFBhZ2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGluayIsInBhZ2UiLCJkYXRhc2V0IiwidXBkYXRlQWN0aXZlU3RhdGUiLCJ0b2dnbGUiLCJtZW51SXRlbSIsImNsb3Nlc3QiLCJzdWJtZW51Iiwic3R5bGUiLCJkaXNwbGF5IiwiY2xpY2tlZExpbmsiLCJwYXJlbnRNZW51Iiwid2FybiIsImdlbmVyYXRlQnRuIiwidGlwZVNlbGVjdCIsInBlcmlvZGVJbnB1dCIsInRhYmxlQ29udGFpbmVyIiwicGVyaW9kZSIsIl9wZXJpb2RlJHNwbGl0IiwiX3BlcmlvZGUkc3BsaXQyIiwiX3NsaWNlZFRvQXJyYXkiLCJ5ZWFyIiwibW9udGgiLCJodG1sIiwiZ2VuZXJhdGVCYWhhbkJha3VUYWJsZSIsImdlbmVyYXRlRGFpbHlSZXBvcnRUYWJsZSIsInN0b2tNYXN1ayIsInBlbWFrYWlhbiIsInNpc2EiXSwic291cmNlUm9vdCI6IiJ9