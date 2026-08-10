/**
 * Automated CNC Cell portfolio
 * Static Three.js, classic-script implementation for GitHub Pages.
 * The local photographic floor is loaded asynchronously over a procedural
 * fallback; every interactive and fallback resume path works without a server.
 */
(function () {
  "use strict";

  var scriptStartedAt = performance.now();
  var startupDiagnostics = {
    firstRenderAt: 0,
    scriptToFirstRenderMs: 0,
    mainThreadTaskProxyMs: 0,
    longestStartupTaskMs: 0,
    rackCalls: 0,
    rackDurationMs: 0,
    rackValid: null,
    sweptCalls: 0,
    projectedCalls: 0,
    requestEntryCalls: 0,
    requestEntrySamples: 0,
    requestEntryFailedPhase: null,
    requestEntryFailureStage: "",
    proofScheduled: false,
    proofRunning: false,
    proofComplete: false,
    proofStartedAt: 0,
    proofDurationMs: 0,
    sweptValid: null,
    sweptIssueCount: null,
    shutterClearanceMm: null,
    projectedValid: null,
    requestEntryValid: null,
    projectedMinimumClearancePx: null
  };
  var exhaustiveProofRequested = false;
  var startupLongTaskObserver = null;
  var startupPaintObserver = null;
  var startupLayoutShiftObserver = null;
  var canvasRevealDiagnostics = {
    firstPaintMs: null,
    firstContentfulPaintMs: null,
    posterPaintMs: null,
    firstCanvasRenderCompletedAt: 0,
    firstCanvasRevealAt: 0,
    classApplications: 0,
    viewportBefore: null,
    viewportAfter: null,
    viewportMaxDeltaPx: 0,
    layoutShiftCount: 0,
    layoutShiftScore: 0,
    layoutShiftMax: 0
  };

  var THREE = window.THREE;
  var boot = document.getElementById("cr-boot");
  var bootMessage = document.getElementById("cr-boot-msg");
  var canvas = document.getElementById("viewport");
  var errorElement = document.getElementById("cr-error");
  var plate = document.getElementById("cr-plate");
  var plateTag = document.getElementById("cr-plate-tag");
  var plateTitle = document.getElementById("cr-plate-title");
  var plateBody = document.getElementById("cr-plate-body");
  var plateFoot = document.getElementById("cr-plate-foot");
  var closeButton = document.getElementById("cr-close");
  var templates = document.getElementById("cr-content");
  var dock = document.getElementById("cr-dock");
  var fullResumeTrigger = document.getElementById("cr-full-resume-trigger");
  var fullResumeDialog = document.getElementById("cr-full-resume");
  var fullResumeClose = document.getElementById("cr-full-resume-close");
  var fullResumeViewport = document.getElementById("cr-full-resume-viewport");
  var fullResumeBody = document.getElementById("cr-full-resume-body");
  var hint = document.getElementById("cr-hint");
  var fpsElement = document.getElementById("cr-fps");
  var cellStatus = document.getElementById("cr-cell-status");
  var safetyDatum = document.getElementById("cr-safety-datum");
  var safetyStatusElement = document.getElementById("cr-safety-status");
  var safetyValueElement = document.getElementById("cr-safety-value");
  var transferStatusElement = document.getElementById("cr-transfer-status");
  var transferInnerElement = document.getElementById("cr-transfer-inner");
  var transferOuterElement = document.getElementById("cr-transfer-outer");
  var transferRobotElement = document.getElementById("cr-transfer-robot");
  var fullResumeBuilt = false;
  var fullResumeReturnFocus = null;
  if (document.body) document.body.classList.remove("cr-canvas-ready");

  var STATIONS = [
    { id: "status", label: "OVERVIEW", detail: "Operator brief", key: "1", color: 0x42d392 },
    { id: "results", label: "IMPACT", detail: "Value created", key: "2", color: 0x51c8df },
    { id: "experience", label: "CAREER", detail: "2011 to now", key: "3", color: 0xf0b85b },
    { id: "principles", label: "PRINCIPLES", detail: "Operating standards", key: "4", color: 0x82aefc },
    { id: "outlook", label: "HORIZON", detail: "What is next", key: "5", color: 0xc49bff },
    { id: "toolbox", label: "SYSTEMS", detail: "Tools and proof", key: "6", color: 0xf08cad },
    { id: "contact", label: "CONNECT", detail: "Open channel", key: "7", color: 0xffcc58 }
  ];

  var STATE = {
    LIFT_CLEAR: 'LIFT CLEAR',
    INSERT: 'INSERT',
    AUTO: "AUTO",
    REQUESTED: "REQUESTED",
    SAFE_PARK: "SAFE PARK",
    BUFFER_DROP: "BUFFER DROP",
    BUFFER_CLEAR: "BUFFER CLEAR",
    CELL_TRANSIT: "CELL TRANSIT",
    RACK_APPROACH: "RACK APPROACH",
    UNHOOK: "UNHOOK",
    GRIP_VERIFY: "GRIP VERIFY",
    LOAD_SETTLE: "LOAD SETTLE",
    RETRACT: "RETRACT",
    TRANSFER_TRANSIT: "TRANSFER TRANSIT",
    BAY_INNER_OPEN: "BAY INNER OPEN",
    BAY_APPROACH: "BAY APPROACH",
    BAY_DEPOSIT: "BAY DEPOSIT",
    BAY_RELEASE: "BAY RELEASE",
    ROBOT_CLEAR: "ROBOT CLEAR",
    BAY_INNER_CLOSE: "BAY INNER CLOSE",
    OUTER_PRESENT: "OUTER PRESENT",
    OUTER_CLOSE: "OUTER CLOSE",
    BAY_REGRIP: "BAY REGRIP",
    BAY_GRIP_VERIFY: "BAY GRIP VERIFY",
    BAY_LOAD_SETTLE: "BAY LOAD SETTLE",
    PRESENT: "PRESENT",
    HELD: "HELD",
    RETURN: "RETURN",
    RETURN_TRANSIT: "RETURN TRANSIT",
    REHOOK: "REHOOK",
    RELEASE_SETTLE: "RELEASE SETTLE",
    RACK_WITHDRAW: "RACK WITHDRAW",
    HOME_TRANSIT: "HOME TRANSIT",
    HOME: "HOME",
    RESTORE_PART: "RESTORE PART",
    RESUME_TRANSIT: "RESUME TRANSIT",
    RESUME_CHECKPOINT: "RESUME CHECKPOINT"
  };

  var state = STATE.AUTO;
  // Rack fixture dimensions are explicit so visual clearances and TCP proofs
  // are checked against the same physical envelope used by the choreography.
  var RACK_STATION_PITCH_LOCAL = 0.72;
  var RACK_BOARD_WIDTH_LOCAL = 0.58;
  var RACK_BOARD_HEIGHT_LOCAL = 0.78;
  var RACK_TCP_TOLERANCE = 0.032;
  var RACK_SEAT_POSITION_TOLERANCE = 0.022;
  var RACK_SEAT_ANGLE_TOLERANCE = 0.09;
  var GRIP_BASE_GAP = 0.23;
  var GRIP_TRAVEL = 0.24;
  var GRIP_FINGER_WIDTH = 0.035;
  // One surveyed safety datum now owns the complete operator-side boundary.
  // The robot and rack live at negative Z; the operator/camera is positive Z.
  var FRONT_GUARD_Z = -2.3;
  var FRONT_GUARD_MIN_X = -3.27;
  var FRONT_GUARD_MAX_X = 2.39;
  var SIDE_GUARD_X = 3.85;
  var SIDE_GUARD_MIN_Z = -5.42;
  var GUARD_HEIGHT = 3.45;
  var GUARD_POST_RADIUS = 0.061;
  // Guarded-cell axis limits (rad/s). They track a mid-payload industrial
  // robot's rated motion rather than a collaborative/demo speed override.
  var SERVICE_BASE_SPEED = 3.5;
  var SERVICE_SHOULDER_SPEED = 3.25;
  var SERVICE_ELBOW_SPEED = 3.6;
  var SERVICE_WRIST_SPEED = 6.2;
  var SERVICE_ROLL_SPEED = 8.0;
  var SERVICE_GRIP_SPEED = 3.2;
  var stateEntered = 0;
  var activeRequest = null;
  var queuedRequest = null;
  var activeTraveler = null;
  var returnFocus = null;
  var hmiInspect = true;
  var hmiHover = null;
  var hmiPressed = null;
  var hmiPressHit = null;
  var hmiPressTimer = 0;
  var hmiPressPointerId = null;
  var hmiPressReleased = false;
  var hmiPressStartX = 0;
  var hmiPressStartY = 0;
  var sceneReady = false;
  var reducedMotion = false;
  var motionQuery = null;
  var reducedTimer = 0;

  var renderer = null;
  var scene = null;
  var camera = null;
  var backdrop = null;
  var baseCameraPosition = null;
  var baseCameraTarget = null;
  var inspectCameraPosition = null;
  var inspectCameraTarget = null;
  var cameraPositionScratch = null;
  var cameraTargetScratch = null;
  var cameraInspection = 0;
  var cameraInspectionTarget = 0;
  var hmiAssembly = null;
  var hmiTexture = null;
  var hmiCanvas = null;
  var hmiContext = null;
  var hmiInteractives = [];
  var travelers = [];
  var travelerRack = null;
  var transferBay = null;
  var transferDirection = "outbound";
  var safetyFault = false;
  var safetySensors = {
    outerLocked: true,
    outerPresented: false,
    innerOpen: false,
    innerLocked: true,
    robotClear: true,
    boardInBay: false,
    maintenanceGateLocked: true,
    estopHealthy: true
  };
  var robotRig = null;
  var machineRig = null;
  var workpiece = null;
  var rawWorkpiece = null;
  var finishedWorkpiece = null;
  var machiningSpray = null;
  var coolantJet = null;
  var chipSparks = null;
  var coolantMist = null;
  var ambientDust = null;
  var guardGlare = null;
  var shadowReceiver = null;
  var requestSceneRender = function () {};

  // The authored 14.4 s machine trajectory already contains an exact SAFE
  // plateau from phase 6.0 through 9.15. Treat 7.35 as the logical loop
  // origin: every AUTO loop therefore opens on 1.8 s of the validated hero
  // pose, while every existing machine/robot phase remains byte-for-byte in
  // the same physical order and duration.
  var AUTO_CYCLE_SECONDS = 14.4;
  var AUTO_SAFE_PHASE_START = 6.0;
  var AUTO_SAFE_PHASE_END = 9.15;
  var AUTO_HERO_PHASE_START = 7.35;
  var AUTO_HERO_PHASE_END = 9.15;
  var AUTO_HERO_DWELL_SECONDS = AUTO_HERO_PHASE_END - AUTO_HERO_PHASE_START;
  var productionClock = AUTO_HERO_PHASE_START;
  var autoHeroLoopCount = 1;
  var autoHeroCompletedDwells = 0;
  var autoHeroDwellActive = true;
  var autoHeroDwellEnteredAt = 0;
  var autoHeroLastDuration = 0;
  var autoHeroCurrentPoseError = 0;
  var autoHeroMaxPoseError = 0;
  var autoHeroLastMaxPoseError = 0;
  var autoHeroServiceResets = 0;
  var simulationClock = 0;
  var currentPose = null;
  var transitionPose = null;
  var transitionTarget = null;
  var activeStateDuration = Infinity;
  var savedProductionClock = 0;
  var requestEgressStartPhase = AUTO_HERO_PHASE_START;
  var requestEgressEndPhase = AUTO_HERO_PHASE_START;
  var requestEgressDuration = 0.12;
  var requestEgressProofValid = true;
  var requestEgressFailureStage = "";
  var requestEgressProofDurationMs = 0;
  var plannedFetchDurationMs = 0;
  var plannedFetchBreakdown = [];
  var interruptedPartHeld = false;
  var interruptedPartFinished = false;
  var interruptedAtCncMouth = false;
  var bufferedPart = false;

  try {
    motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = motionQuery.matches;
  } catch (ignore) {}

  function hideBoot() {
    if (boot) boot.classList.add("is-done");
  }

  function showError(message) {
    if (document.body) document.body.classList.remove("cr-canvas-ready");
    hideBoot();
    if (errorElement) {
      errorElement.hidden = false;
      errorElement.textContent = message;
    }
    if (window.console && console.error) console.error(message);
  }

  function stationMeta(id) {
    for (var i = 0; i < STATIONS.length; i++) {
      if (STATIONS[i].id === id) return STATIONS[i];
    }
    return null;
  }

  function stationIndex(id) {
    for (var i = 0; i < STATIONS.length; i++) {
      if (STATIONS[i].id === id) return i;
    }
    return -1;
  }

  function controllerMode() {
    if (
      safetyFault ||
      !safetySensors.estopHealthy ||
      !safetySensors.maintenanceGateLocked
    ) return "fault";
    if (state === STATE.AUTO) return "run";
    if (state === STATE.HELD) return "access";
    return "hold";
  }

  function statusValueNode(container, className) {
    if (!container) return null;
    var valueNode = container.querySelector("[data-status-value]");
    if (valueNode) return valueNode;
    valueNode = document.createElement("span");
    valueNode.className = className || "cr-status-value";
    valueNode.setAttribute("data-status-value", "");
    for (var childIndex = 0; childIndex < container.childNodes.length; childIndex++) {
      var child = container.childNodes[childIndex];
      if (child.nodeType === 3) child.nodeValue = "";
    }
    container.appendChild(valueNode);
    return valueNode;
  }

  function setCellStatus(label, value) {
    if (!cellStatus) return;
    var labelNode = cellStatus.querySelector("small");
    if (labelNode) labelNode.textContent = label;
    var valueNode = statusValueNode(cellStatus, "cr-led__value");
    if (valueNode) valueNode.textContent = value;
    cellStatus.setAttribute("data-mode", controllerMode());
  }

  function updateSafetyDom() {
    var mode = controllerMode();
    var innerValue = safetySensors.innerOpen
      ? "OPEN"
      : safetySensors.innerLocked ? "LOCKED" : "UNLOCKED";
    var outerValue = safetySensors.outerPresented
      ? "ENABLED"
      : safetySensors.outerLocked ? "LOCKED" : "UNLOCKED";
    var robotValue = safetySensors.robotClear ? "CLEAR" : "IN ENVELOPE";
    var transferValue = safetySensors.boardInBay
      ? safetySensors.outerPresented ? "OUTER ACCESS ENABLED" : "BOARD SECURED"
      : activeTraveler && activeTraveler.custody === "robot" ? "ROBOT CUSTODY" : "BAY READY";

    if (safetyStatusElement) {
      safetyStatusElement.setAttribute("data-safety-state", mode === "fault" ? "fault" : "proved");
      safetyStatusElement.setAttribute("data-mode", mode);
      safetyStatusElement.setAttribute(
        "aria-label",
        mode === "fault" ? "Safety circuit fault, cell stopped" : "Safety circuit proved"
      );
    }
    if (safetyValueElement) {
      safetyValueElement.textContent = mode === "fault"
        ? "SAFETY STOP"
        : mode === "access" ? "ACCESS PROVED" : mode === "hold" ? "CONTROLLED HOLD" : "GUARD LOCKED";
    }
    if (transferStatusElement) {
      transferStatusElement.setAttribute("data-transfer-state", transferValue.toLowerCase().replace(/\s+/g, "-"));
      transferStatusElement.setAttribute("data-mode", mode);
      transferStatusElement.setAttribute(
        "aria-label",
        transferValue + "; inner " + innerValue + "; outer " + outerValue + "; robot " + robotValue
      );
    }
    if (transferInnerElement) transferInnerElement.textContent = innerValue;
    if (transferOuterElement) transferOuterElement.textContent = outerValue;
    if (transferRobotElement) transferRobotElement.textContent = robotValue;
    if (transferStatusElement) {
      var transferSignals = transferStatusElement.querySelectorAll("[data-transfer-signal]");
      for (var signalIndex = 0; signalIndex < transferSignals.length; signalIndex++) {
        var signal = transferSignals[signalIndex];
        var signalName = signal.getAttribute("data-transfer-signal");
        var signalProved = signalName === "inner-lock"
          ? safetySensors.innerLocked && !safetySensors.innerOpen
          : signalName === "outer-access"
            ? safetySensors.outerLocked || safetySensors.outerPresented
            : safetySensors.robotClear;
        signal.setAttribute("data-mode", mode);
        signal.classList.toggle("is-fault", mode === "fault");
        signal.classList.toggle("is-access", signalName === "outer-access" && safetySensors.outerPresented);
        signal.classList.toggle("is-proven", mode !== "fault" && signalProved);
      }
    }
    if (safetyDatum) {
      safetyDatum.textContent = safetyFault ? "CAM-04A · SAFETY FAULT" : "CAM-04A · INTERLOCK PROVED";
      safetyDatum.setAttribute("data-safety", mode === "fault" ? "fault" : "proved");
      safetyDatum.textContent = mode === "fault" ? "CAM-04A / SAFETY FAULT" : "CAM-04A / INTERLOCK PROVED";
      safetyDatum.setAttribute("data-mode", mode);
      safetyDatum.setAttribute(
        "aria-label",
        "Transfer safety: inner " + innerValue + ", outer " + outerValue + ", robot " + robotValue
      );
    }
  }

  function setBodyState() {
    if (!document.body) return;
    var travelerHeld = state === STATE.HELD;
    var serviceBusy = state !== STATE.AUTO;
    document.body.classList.toggle("cr-hmi-inspect", hmiInspect);
    document.body.classList.toggle(
      "cr-requested",
      state !== STATE.AUTO || !!activeRequest || !!queuedRequest
    );
    document.body.classList.toggle(
      "cr-presenting",
      travelerHeld
    );
    if (canvas) canvas.setAttribute('aria-busy', serviceBusy ? 'true' : 'false');
    if (dock) {
      dock.setAttribute('aria-busy', serviceBusy ? 'true' : 'false');
      if (serviceBusy) {
        dock.setAttribute("inert", "");
        dock.setAttribute("aria-hidden", "true");
      } else {
        dock.removeAttribute("inert");
        dock.removeAttribute("aria-hidden");
      }
    }
  }

  function setDockState() {
    if (!dock) return;
    var buttons = dock.querySelectorAll("button[data-station]");
    for (var i = 0; i < buttons.length; i++) {
      var id = buttons[i].getAttribute("data-station");
      var isActive = id === activeRequest;
      var isQueued = id === queuedRequest;
      var stateCopy = buttons[i].querySelector(".cr-control-state");
      buttons[i].classList.toggle("is-active", isActive);
      buttons[i].classList.toggle("is-queued", isQueued);
      buttons[i].setAttribute("aria-expanded", isActive && state === STATE.HELD ? "true" : "false");
      buttons[i].setAttribute("aria-pressed", isActive || isQueued ? "true" : "false");
      buttons[i].setAttribute('aria-disabled', state === STATE.AUTO ? 'false' : 'true');
      buttons[i].disabled = state !== STATE.AUTO;
      if (stateCopy) {
        if (isQueued) stateCopy.textContent = "Queued";
        else if (isActive && state === STATE.HELD) stateCopy.textContent = "Held";
        else if (isActive && state !== STATE.AUTO) stateCopy.textContent = "Retrieving";
        else stateCopy.textContent = "Ready";
      }
    }
  }

  function buildFullResume() {
    if (fullResumeBuilt || !fullResumeBody || !templates) return fullResumeBuilt;
    var fragment = document.createDocumentFragment();

    for (var stationIndex = 0; stationIndex < STATIONS.length; stationIndex++) {
      var station = STATIONS[stationIndex];
      var source = templates.querySelector('[data-station="' + station.id + '"]');
      if (!source) continue;

      var section = document.createElement("section");
      var headingId = "cr-full-resume-section-" + station.id;
      section.className = "cr-full-resume__section";
      section.setAttribute("data-record", station.key);
      section.setAttribute("aria-labelledby", headingId);

      var sectionHeader = document.createElement("header");
      sectionHeader.className = "cr-full-resume__section-head";
      var record = document.createElement("span");
      record.textContent = "RECORD " + station.key.padStart(2, "0");
      var heading = document.createElement("h2");
      heading.id = headingId;
      heading.textContent = source.getAttribute("data-title") || station.label;
      var status = document.createElement("strong");
      status.textContent = "VERIFIED / ACTIVE";
      sectionHeader.appendChild(record);
      sectionHeader.appendChild(heading);
      sectionHeader.appendChild(status);

      var article = source.cloneNode(true);
      article.classList.add("cr-full-resume__record");
      article.removeAttribute("id");
      article.removeAttribute("data-station");
      article.removeAttribute("data-title");
      var clonedIds = article.querySelectorAll("[id]");
      for (var clonedIdIndex = 0; clonedIdIndex < clonedIds.length; clonedIdIndex++) {
        clonedIds[clonedIdIndex].removeAttribute("id");
      }

      section.appendChild(sectionHeader);
      section.appendChild(article);
      fragment.appendChild(section);
    }

    fullResumeBody.appendChild(fragment);
    fullResumeBuilt = fullResumeBody.children.length === STATIONS.length;
    return fullResumeBuilt;
  }

  function finalizeFullResumeClose() {
    if (fullResumeTrigger) fullResumeTrigger.setAttribute("aria-expanded", "false");
    if (document.body) document.body.classList.remove("cr-full-resume-open");
    var focusTarget = fullResumeReturnFocus || fullResumeTrigger;
    fullResumeReturnFocus = null;
    if (focusTarget && typeof focusTarget.focus === "function") {
      window.setTimeout(function () {
        try {
          focusTarget.focus({ preventScroll: true });
        } catch (ignore) {
          focusTarget.focus();
        }
      }, 0);
    }
  }

  function closeFullResume() {
    if (!fullResumeDialog || !fullResumeDialog.hasAttribute("open")) return;
    if (typeof fullResumeDialog.close === "function") {
      fullResumeDialog.close();
    } else {
      fullResumeDialog.removeAttribute("open");
      finalizeFullResumeClose();
    }
  }

  function openFullResume(source) {
    var openStartedAt = performance.now();
    if (!fullResumeDialog || !buildFullResume()) return;
    if (fullResumeDialog.hasAttribute("open")) return;
    fullResumeReturnFocus = source && typeof source.focus === "function" ? source : document.activeElement;
    if (fullResumeTrigger) fullResumeTrigger.setAttribute("aria-expanded", "true");
    if (document.body) document.body.classList.add("cr-full-resume-open");

    if (typeof fullResumeDialog.showModal === "function") {
      fullResumeDialog.showModal();
    } else {
      fullResumeDialog.setAttribute("open", "");
    }
    fullResumeDialog.setAttribute(
      "data-open-handler-ms",
      Math.max(0, performance.now() - openStartedAt).toFixed(2)
    );
    if (fullResumeViewport) fullResumeViewport.scrollTop = 0;
    window.setTimeout(function () {
      if (!fullResumeClose) return;
      try {
        fullResumeClose.focus({ preventScroll: true });
      } catch (ignore) {
        fullResumeClose.focus();
      }
    }, 0);
  }

  function fillPlate(id) {
    var meta = stationMeta(id);
    var template = templates && templates.querySelector('[data-station="' + id + '"]');
    if (!meta || !template || !plate) return false;
    if (plateTag) plateTag.textContent = "FENCE CLIPBOARD " + meta.key + " / " + meta.label;
    if (plateTitle) plateTitle.textContent = template.getAttribute("data-title") || meta.label;
    if (plateBody) plateBody.innerHTML = template.innerHTML;
    if (plateFoot) {
      plateFoot.textContent = "Secured in interlocked transfer bay - Close to begin verified return custody";
    }
    return true;
  }

  function revealPlate(id) {
    if (!fillPlate(id)) return;
    plate.classList.add("is-open");
    plate.setAttribute("aria-hidden", "false");
    if (hint) hint.classList.add("is-hidden");
    setDockState();
    window.setTimeout(function () {
      if (!closeButton) return;
      try {
        closeButton.focus({ preventScroll: true });
      } catch (ignore) {
        closeButton.focus();
      }
    }, 0);
  }

  function hidePlate(restoreFocus) {
    var wasOpen = plate && plate.classList.contains("is-open");
    // Static fallback closes directly from the plate. Restore its launch
    // target before aria-hidden changes, so focus never remains inside a
    // subtree that has just been removed from the accessibility tree.
    if (wasOpen && restoreFocus && returnFocus && typeof returnFocus.focus === "function") {
      try {
        returnFocus.focus({ preventScroll: true });
      } catch (ignore) {
        returnFocus.focus();
      }
    }
    if (plate) {
      plate.classList.remove("is-open");
      plate.setAttribute("aria-hidden", "true");
    }
    if (restoreFocus) returnFocus = null;
    setDockState();
  }

  function openStaticStation(id) {
    activeRequest = id;
    if (!fillPlate(id)) return;
    plate.classList.add("is-open");
    plate.setAttribute("aria-hidden", "false");
    if (hint) hint.classList.add("is-hidden");
    setDockState();
    if (closeButton) {
      window.setTimeout(function () {
        try {
          closeButton.focus({ preventScroll: true });
        } catch (ignore) {
          closeButton.focus();
        }
      }, 0);
    }
  }

  function closeStaticStation() {
    activeRequest = null;
    hidePlate(true);
    setDockState();
  }

  function rememberRequestFocus(source) {
    if (plate && plate.classList.contains("is-open")) return;
    if (source && typeof source.focus === "function") returnFocus = source;
    else returnFocus = document.activeElement;
  }

  function focusViewport() {
    if (!canvas) return;
    try {
      canvas.focus({ preventScroll: true });
    } catch (ignore) {
      canvas.focus();
    }
  }

  function focusViewportForAcceptedRequest(source) {
    var activeElement = document.activeElement;
    var activeDockControl = !!(
      dock &&
      activeElement &&
      typeof dock.contains === "function" &&
      dock.contains(activeElement)
    );
    var domSource = !!(source && typeof source.focus === "function");
    // DOM launchers retain the existing viewport handoff. A non-DOM HMI hit
    // does not steal focus from an unrelated control; pointer HMI requests
    // already pass the focused canvas, while an at-risk dock descendant is
    // always evacuated regardless of how the accepted request was sourced.
    if (!source || domSource || activeDockControl) focusViewport();
  }

  function setHmiInspect(next) {
    if (next && state !== STATE.AUTO) return;
    hmiInspect = !!next;
    cameraInspectionTarget = hmiInspect ? 1 : 0;
    if (reducedMotion && camera) {
      cameraInspection = cameraInspectionTarget;
      applyCameraPose();
    }
    hmiHover = null;
    updateHmiHitMode();
    drawHmi();
    setBodyState();
    requestSceneRender();
  }

  function productionPhaseHasHeldPart(phase) {
    return (phase >= 2 && phase < 4.55) || (phase >= 10.72 && phase < 12.7);
  }

  function requestStation(id, source) {
    var meta = stationMeta(id);
    if (!meta) return;

    if (!sceneReady) {
      rememberRequestFocus(source);
      openStaticStation(id);
      return;
    }

    if (state !== STATE.AUTO) {
      var busyMeta = stationMeta(activeRequest);
      setCellStatus("Busy", "Clipboard " + (busyMeta ? busyMeta.key : "--") + " already in process");
      drawHmi();
      requestSceneRender();
      return;
    }

    if (
      !safetySensors.outerLocked ||
      !safetySensors.innerLocked ||
      safetySensors.innerOpen ||
      safetySensors.boardInBay ||
      !safetySensors.maintenanceGateLocked ||
      !safetySensors.estopHealthy
    ) {
      safetyFault = true;
      setCellStatus("Safety fault", "Transfer bay is not proved empty and locked");
      setStacklight("fault");
      updateSafetyDom();
      requestSceneRender();
      return;
    }

    if (!validateStationReach(id)) {
      setCellStatus("Reach fault", "Clipboard " + meta.key + " lies outside the verified TCP envelope");
      requestSceneRender();
      return;
    }

    activeRequest = id;
    queuedRequest = null;
    savedProductionClock = productionClock;
    interruptedPartHeld = productionPhaseHasHeldPart(savedProductionClock);
    interruptedPartFinished = savedProductionClock >= 8.4;
    scene.updateMatrixWorld(true);
    robotRig.gripperTip.getWorldPosition(tempPosition);
    interruptedAtCncMouth = tempPosition.x > 2.05 && tempPosition.z < -4.95;
    configureRequestEgress(savedProductionClock);
    var requestProofStartedAt = performance.now();
    var requestProofPassed = validateRequestEgressSafety();
    requestEgressProofDurationMs = performance.now() - requestProofStartedAt;
    if (!requestProofPassed) {
      requestEgressProofValid = false;
      activeRequest = null;
      queuedRequest = null;
      safetyFault = true;
      setCellStatus("Safety fault", "No collision-free route from the live AUTO pose");
      setStacklight("fault");
      updateSafetyDom();
      drawHmi();
      requestSceneRender("request-egress-fault");
      return;
    }
    requestEgressProofValid = true;
    plannedFetchDurationMs = estimateOutboundFetchDuration() * 1000;
    rememberRequestFocus(source);
    safetyFault = false;
    transferDirection = "outbound";
    if (hmiInspect) setHmiInspect(false);
    // Suspend only the hero-dwell metrics while service owns the robot. The
    // saved production phase remains authoritative and is restored verbatim.
    autoHeroDwellActive = false;
    autoHeroDwellEnteredAt = 0;
    autoHeroCurrentPoseError = 0;
    autoHeroMaxPoseError = 0;
    bufferedPart = false;
    updateMachiningSpray(0, false);
    setStacklight("hold");
    setCellStatus(
      "Request",
      meta.key + (interruptedPartHeld ? " acknowledged - buffering held part" : " acknowledged - controlled stop")
    );
    // Move focus out of a dock button before REQUESTED makes the dock inert.
    // This runs only for a validated request that is actually starting; busy
    // or queued calls returned above and therefore cannot steal focus.
    focusViewportForAcceptedRequest(source);
    setState(STATE.REQUESTED);
  }

  function requestClose() {
    if (!sceneReady) {
      closeStaticStation();
      return;
    }
    if (state === STATE.HELD) {
      // The active Close/Ack control lives inside the plate that is about to
      // become aria-hidden. Transfer focus first, while it remains exposed.
      focusViewport();
      hidePlate(false);
      transferDirection = "return";
      setState(STATE.OUTER_CLOSE);
      return;
    }
  }

  if (dock) {
    dock.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-station]");
      if (button) requestStation(button.getAttribute("data-station"), button);
    });
  }
  if (closeButton) closeButton.addEventListener("click", requestClose);
  if (fullResumeTrigger) {
    fullResumeTrigger.addEventListener("click", function () {
      openFullResume(fullResumeTrigger);
    });
  }
  if (fullResumeClose) fullResumeClose.addEventListener("click", closeFullResume);
  if (fullResumeDialog) {
    fullResumeDialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeFullResume();
    });
    fullResumeDialog.addEventListener("close", finalizeFullResumeClose);
    fullResumeDialog.addEventListener("click", function (event) {
      if (event.target === fullResumeDialog) closeFullResume();
    });
  }

  document.addEventListener("keydown", function (event) {
    var tagName = event.target && event.target.tagName;
    if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") return;

    if (fullResumeDialog && fullResumeDialog.hasAttribute("open")) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeFullResume();
      }
      return;
    }

    if (event.key === "Escape") {
      requestClose();
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    for (var i = 0; i < STATIONS.length; i++) {
      if (event.key === STATIONS[i].key) {
        event.preventDefault();
        requestStation(STATIONS[i].id, document.activeElement);
        return;
      }
    }

    if (
      canvas &&
      document.activeElement === canvas &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      if (!hmiInspect) setHmiInspect(true);
    }
  });

  window.setTimeout(hideBoot, 2400);

  if (!THREE) {
    showError("Three.js failed to load. Resume clipboards remain available below.");
    return;
  }
  if (!canvas) {
    showError("3D viewport is unavailable. Resume clipboards remain available below.");
    return;
  }

  var debugFps = false;
  try {
    var diagnosticsQuery = new URLSearchParams(window.location.search);
    var debugRequested = diagnosticsQuery.get("debug") === "1";
    var qaRequested = diagnosticsQuery.get("qa") === "1";
    var proofQueryValue = diagnosticsQuery.get("proof");
    debugFps = debugRequested || qaRequested || proofQueryValue === "1";
    exhaustiveProofRequested =
      qaRequested ||
      proofQueryValue === "1" ||
      (debugRequested && proofQueryValue !== "0");
  } catch (ignore) {}
  if (fpsElement) fpsElement.hidden = !debugFps;

  function updatePaintTiming(entries) {
    for (var paintIndex = 0; paintIndex < entries.length; paintIndex++) {
      var paint = entries[paintIndex];
      if (paint.name === "first-paint") {
        canvasRevealDiagnostics.firstPaintMs = paint.startTime;
      } else if (paint.name === "first-contentful-paint") {
        canvasRevealDiagnostics.firstContentfulPaintMs = paint.startTime;
      }
    }
    canvasRevealDiagnostics.posterPaintMs =
      canvasRevealDiagnostics.firstContentfulPaintMs !== null
        ? canvasRevealDiagnostics.firstContentfulPaintMs
        : canvasRevealDiagnostics.firstPaintMs;
  }

  // Long Task entries are optional browser diagnostics. The zero-delay proxy
  // below remains available when the API is absent and captures how long the
  // initial script task prevented the event loop from yielding.
  if (debugFps && window.PerformanceObserver) {
    try {
      startupLongTaskObserver = new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        for (var entryIndex = 0; entryIndex < entries.length; entryIndex++) {
          var entry = entries[entryIndex];
          if (
            startupDiagnostics.firstRenderAt &&
            entry.startTime <= startupDiagnostics.firstRenderAt
          ) {
            startupDiagnostics.longestStartupTaskMs = Math.max(
              startupDiagnostics.longestStartupTaskMs,
              entry.duration
            );
          }
        }
        if (sceneReady) publishPerformanceTelemetry(performance.now(), "startup");
      });
      startupLongTaskObserver.observe({ type: "longtask", buffered: true });
    } catch (ignoreLongTaskObserver) {
      startupLongTaskObserver = null;
    }
  }
  if (debugFps && window.PerformanceObserver) {
    try {
      startupPaintObserver = new PerformanceObserver(function (list) {
        updatePaintTiming(list.getEntries());
        if (sceneReady) publishPerformanceTelemetry(performance.now(), "startup");
      });
      startupPaintObserver.observe({ type: "paint", buffered: true });
    } catch (ignorePaintObserver) {
      startupPaintObserver = null;
    }
    try {
      startupLayoutShiftObserver = new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        for (var shiftIndex = 0; shiftIndex < entries.length; shiftIndex++) {
          var shift = entries[shiftIndex];
          var revealAt = canvasRevealDiagnostics.firstCanvasRevealAt;
          if (
            !shift.hadRecentInput &&
            (!revealAt || shift.startTime <= revealAt + 1500)
          ) {
            canvasRevealDiagnostics.layoutShiftCount += 1;
            canvasRevealDiagnostics.layoutShiftScore += shift.value;
            canvasRevealDiagnostics.layoutShiftMax = Math.max(
              canvasRevealDiagnostics.layoutShiftMax,
              shift.value
            );
          }
        }
        if (sceneReady) publishPerformanceTelemetry(performance.now(), "startup");
      });
      startupLayoutShiftObserver.observe({ type: "layout-shift", buffered: true });
    } catch (ignoreLayoutShiftObserver) {
      startupLayoutShiftObserver = null;
    }
  }
  if (debugFps) {
    window.setTimeout(function () {
      startupDiagnostics.mainThreadTaskProxyMs = performance.now() - scriptStartedAt;
      if (sceneReady) publishPerformanceTelemetry(performance.now(), "startup");
    }, 0);
  }

  var width = window.innerWidth || 1280;
  var height = window.innerHeight || 720;
  var lowPower =
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);
  var useMsaa =
    !lowPower &&
    width * height <= 2600000 &&
    (window.devicePixelRatio || 1) <= 2.25;
  var dprCap = lowPower ? 1 : useMsaa ? 1.5 : 1.25;
  var nativeRenderDpr = Math.max(0.78, Math.min(window.devicePixelRatio || 1, dprCap));
  var renderDpr = nativeRenderDpr;
  // The governor has exactly two resolution states. A sub-.90 native display
  // never changes DPR, and every other display has one stable motion fallback.
  var adaptiveMotionDpr = Math.min(nativeRenderDpr, 0.9);
  var dynamicShadows =
    !lowPower &&
    width * height <= 2300000 &&
    (window.devicePixelRatio || 1) <= 2.25;

  function setTextureSRGB(texture) {
    if (!texture) return;
    if (THREE.SRGBColorSpace !== undefined && "colorSpace" in texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    } else if (THREE.sRGBEncoding !== undefined) {
      texture.encoding = THREE.sRGBEncoding;
    }
  }

  function makeTexture(draw, widthValue, heightValue) {
    var element = document.createElement("canvas");
    element.width = widthValue || 256;
    element.height = heightValue || widthValue || 256;
    draw(element.getContext("2d"), element.width, element.height);
    var texture = new THREE.CanvasTexture(element);
    setTextureSRGB(texture);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: useMsaa,
      alpha: false,
      powerPreference: lowPower ? "default" : "high-performance",
      preserveDrawingBuffer: false
    });
  } catch (error) {
    showError("WebGL could not start. Resume clipboards remain available below.");
    return;
  }

  renderer.setPixelRatio(renderDpr);
  renderer.setSize(width, height, false);
  renderer.shadowMap.enabled = dynamicShadows;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = dynamicShadows;
  if (THREE.SRGBColorSpace !== undefined && "outputColorSpace" in renderer) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } else if (THREE.sRGBEncoding !== undefined) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  if (THREE.ACESFilmicToneMapping !== undefined) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // Plate and modeled cell share one exposure below. Keeping this slightly
    // under unity protects the white machine panels and high-bay fixtures.
    renderer.toneMappingExposure = 0.9;
  }
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x12171a);
  // A shallow industrial haze softens distant proxy edges into the plate and
  // restores the depth cue that otherwise makes WebGL geometry look pasted on.
  scene.fog = new THREE.Fog(0x8d999b, 11.5, 31.5);

  camera = new THREE.PerspectiveCamera(43, width / height, 0.08, 70);
  scene.add(camera);
  baseCameraPosition = new THREE.Vector3();
  baseCameraTarget = new THREE.Vector3();
  inspectCameraPosition = new THREE.Vector3();
  inspectCameraTarget = new THREE.Vector3(4.62, 2.74, -3.08);
  cameraPositionScratch = new THREE.Vector3();
  cameraTargetScratch = new THREE.Vector3();

  function applyCameraPose() {
    if (!camera || !baseCameraPosition || !inspectCameraPosition) return;
    cameraPositionScratch.lerpVectors(baseCameraPosition, inspectCameraPosition, cameraInspection);
    cameraTargetScratch.lerpVectors(baseCameraTarget, inspectCameraTarget, cameraInspection);
    camera.position.copy(cameraPositionScratch);
    camera.lookAt(cameraTargetScratch);
  }

  function frameCamera() {
    var aspect = width / Math.max(1, height);
    if (aspect < 0.78) {
      // Portrait keeps the same right-biased path through rack, robot, bay,
      // and HMI, but moves the camera modestly closer and raises its aim. The
      // hero cell grows about 16-20% and settles onto previously empty floor;
      // the camera plate itself keeps its exact cover crop below.
      if (height <= 650) {
        camera.fov = 60.5;
        baseCameraPosition.set(1.78, 2.62, 9.78);
        baseCameraTarget.set(1.68, 2.54, -5.25);
      } else {
        camera.fov = 61;
        baseCameraPosition.set(1.88, 2.64, 10.05);
        baseCameraTarget.set(1.72, 2.6, -5.25);
      }
    } else if (aspect < 1.25) {
      camera.fov = 51;
      baseCameraPosition.set(0.55, 2.52, 8.2);
      baseCameraTarget.set(0.65, 2.18, -5.6);
    } else {
      camera.fov = 43;
      baseCameraPosition.set(0, 2.35, 7.15);
      baseCameraTarget.set(0.35, 2.12, -5.7);
    }
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    var verticalTangent = Math.tan((camera.fov * Math.PI / 180) * 0.5);
    var horizontalTangent = verticalTangent * aspect;
    var padX = Math.min(44, Math.max(18, width * 0.045));
    var padY = Math.min(36, Math.max(18, height * 0.035));
    var usableX = Math.max(0.58, 1 - padX * 2 / Math.max(1, width));
    var usableY = Math.max(0.58, 1 - padY * 2 / Math.max(1, height));
    // The foreground terminal is 1.40 x 1.85 units including its e-stop rail.
    // Fitting against both axes keeps the full HMI visible in portrait while
    // the two-column menu preserves 44px-class touch cells.
    var horizontalFit = 0.7 / Math.max(0.01, horizontalTangent * usableX);
    var verticalFit = 0.925 / Math.max(0.01, verticalTangent * usableY);
    var inspectDistance = Math.max(horizontalFit, verticalFit) * 1.025;
    inspectCameraPosition
      .copy(baseCameraPosition)
      .sub(inspectCameraTarget)
      .normalize()
      .multiplyScalar(inspectDistance)
      .add(inspectCameraTarget);
    applyCameraPose();
    updateBackdropScale();
    // HMI-04 is a fixed machine pendant. Camera changes inspect it from a new
    // viewpoint; they never rotate the installed enclosure toward the viewer.
  }

  function proceduralBackdropTexture() {
    return makeTexture(function (ctx, w, h) {
      var ceiling = ctx.createLinearGradient(0, 0, 0, h);
      ceiling.addColorStop(0, "#353b3e");
      ceiling.addColorStop(0.55, "#7c8284");
      ceiling.addColorStop(1, "#b6b8b5");
      ctx.fillStyle = ceiling;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#d7a80c";
      ctx.fillRect(0, 34, w, 28);
      ctx.fillStyle = "#2c3438";
      ctx.fillRect(0, 60, w, 8);
      ctx.fillStyle = "#4c5559";
      ctx.fillRect(0, 125, w, 10);

      ctx.fillStyle = "#192126";
      for (var x = 15; x < w * 0.44; x += 42) ctx.fillRect(x, 120, 4, 175);
      for (var y = 130; y < 300; y += 17) ctx.fillRect(0, y, w * 0.44, 2);

      ctx.fillStyle = "#aeb4b7";
      ctx.fillRect(w * 0.45, 95, w * 0.55, h * 0.56);
      ctx.fillStyle = "#1d2529";
      ctx.fillRect(w * 0.62, 145, w * 0.26, h * 0.31);
      ctx.fillStyle = "#31393e";
      ctx.fillRect(w * 0.45, h * 0.61, w * 0.55, h * 0.18);

      ctx.fillStyle = "#8a9092";
      ctx.fillRect(0, h * 0.67, w, h * 0.33);
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 2;
      for (var fy = h * 0.72; fy < h; fy += 38) {
        ctx.beginPath();
        ctx.moveTo(0, fy);
        ctx.lineTo(w, fy + 6);
        ctx.stroke();
      }
    }, 800, 450);
  }

  function applyBackdropCover(texture) {
    if (!texture || !camera) return;
    var imageAspect = 16 / 9;
    var viewportAspect = camera.aspect || imageAspect;
    var repeatX = 1;
    var repeatY = 1;
    var offsetX = 0;
    var offsetY = 0;

    if (viewportAspect > imageAspect) {
      repeatY = imageAspect / viewportAspect;
      offsetY = (1 - repeatY) * 0.5;
    } else if (viewportAspect < imageAspect) {
      repeatX = viewportAspect / imageAspect;
      // Preserve the CNC opening and HMI in narrow crops while retaining
      // enough of the left staging area to explain the complete cycle.
      offsetX = (1 - repeatX) * 0.65;
    }

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.offset.set(offsetX, offsetY);
    texture.needsUpdate = true;
  }

  function prefilterBackdropTexture(image) {
    var sourceWidth = image && (image.naturalWidth || image.videoWidth || image.width);
    var sourceHeight = image && (image.naturalHeight || image.videoHeight || image.height);
    if (!sourceWidth || !sourceHeight) return null;
    var economicalPlate = lowPower || reducedMotion;
    var maxWidth = economicalPlate ? 960 : 1280;
    var outputScale = Math.min(1, maxWidth / sourceWidth);
    var outputWidth = Math.max(2, Math.round(sourceWidth * outputScale));
    var outputHeight = Math.max(2, Math.round(sourceHeight * outputScale));
    var softScale = economicalPlate ? 0.58 : 0.68;
    var softWidth = Math.max(2, Math.round(outputWidth * softScale));
    var softHeight = Math.max(2, Math.round(outputHeight * softScale));
    var outputCanvas = document.createElement("canvas");
    var softCanvas = document.createElement("canvas");
    var softLayer = document.createElement("canvas");
    outputCanvas.width = outputWidth;
    outputCanvas.height = outputHeight;
    softCanvas.width = softWidth;
    softCanvas.height = softHeight;
    softLayer.width = outputWidth;
    softLayer.height = outputHeight;

    var outputContext = outputCanvas.getContext("2d", { alpha: false });
    var softContext = softCanvas.getContext("2d", { alpha: false });
    var layerContext = softLayer.getContext("2d", { alpha: true });
    if (!outputContext || !softContext || !layerContext) {
      outputCanvas.width = 1;
      outputCanvas.height = 1;
      softCanvas.width = 1;
      softCanvas.height = 1;
      softLayer.width = 1;
      softLayer.height = 1;
      return null;
    }

    // The base copy retains the exact camera-plate crop and a sharp floor
    // datum. A single down/up-sampled layer removes only the razor-frequency
    // detail in the distant fence and photographed machine; this is generated
    // once, so it adds no per-frame post-processing or extra scene draw call.
    outputContext.imageSmoothingEnabled = true;
    outputContext.imageSmoothingQuality = "high";
    outputContext.drawImage(image, 0, 0, outputWidth, outputHeight);
    softContext.imageSmoothingEnabled = true;
    softContext.imageSmoothingQuality = "high";
    softContext.drawImage(image, 0, 0, softWidth, softHeight);
    layerContext.imageSmoothingEnabled = true;
    layerContext.imageSmoothingQuality = "high";
    layerContext.drawImage(softCanvas, 0, 0, outputWidth, outputHeight);
    layerContext.globalCompositeOperation = "destination-in";
    var focusMask = layerContext.createLinearGradient(0, 0, 0, outputHeight);
    focusMask.addColorStop(0, "rgba(0,0,0,0.46)");
    focusMask.addColorStop(0.32, "rgba(0,0,0,0.42)");
    focusMask.addColorStop(0.58, "rgba(0,0,0,0.28)");
    focusMask.addColorStop(0.7, "rgba(0,0,0,0)");
    focusMask.addColorStop(1, "rgba(0,0,0,0)");
    layerContext.fillStyle = focusMask;
    layerContext.fillRect(0, 0, outputWidth, outputHeight);
    outputContext.drawImage(softLayer, 0, 0);

    // Cool aerial veiling is strongest around the remote machine plane and
    // fades completely before the floor/contact region. The restrained alpha
    // binds plate and geometry without lifting black levels or washing labels.
    var haze = outputContext.createLinearGradient(0, 0, 0, outputHeight);
    haze.addColorStop(0, "rgba(141,153,155,0.012)");
    haze.addColorStop(0.42, "rgba(141,153,155,0.032)");
    haze.addColorStop(0.66, "rgba(141,153,155,0.012)");
    haze.addColorStop(0.72, "rgba(141,153,155,0)");
    haze.addColorStop(1, "rgba(141,153,155,0)");
    outputContext.fillStyle = haze;
    outputContext.fillRect(0, 0, outputWidth, outputHeight);

    var texture = new THREE.CanvasTexture(outputCanvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.userData.prefilteredCameraPlate = true;
    setTextureSRGB(texture);

    // CanvasTexture retains only outputCanvas. Release the two transient pixel
    // stores immediately; the low-power/reduced-motion path also caps the live
    // plate at 960 px and performs no animated optical work.
    softCanvas.width = 1;
    softCanvas.height = 1;
    softLayer.width = 1;
    softLayer.height = 1;
    return texture;
  }

  function buildBackdrop() {
    var material = new THREE.MeshBasicMaterial({
      map: proceduralBackdropTexture(),
      // A nearly neutral cool multiplier places the plate under the same
      // overhead white balance as the geometry without obvious grading.
      color: 0xf4f8f7,
      toneMapped: true,
      depthTest: false,
      depthWrite: false,
      fog: false
    });
    applyBackdropCover(material.map);
    backdrop = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    backdrop.position.set(0, 0, -28);
    backdrop.frustumCulled = false;
    backdrop.renderOrder = -1000;
    camera.add(backdrop);
    updateBackdropScale();

    var loader = new THREE.TextureLoader();
    loader.load(
      "assets/cnc-cell-floor.webp",
      function (texture) {
        var filteredTexture = prefilterBackdropTexture(texture.image);
        var nextTexture = filteredTexture || texture;
        setTextureSRGB(nextTexture);
        nextTexture.generateMipmaps = false;
        nextTexture.minFilter = THREE.LinearFilter;
        nextTexture.magFilter = THREE.LinearFilter;
        applyBackdropCover(nextTexture);
        var previousTexture = material.map;
        material.map = nextTexture;
        material.needsUpdate = true;
        if (previousTexture && previousTexture !== nextTexture) previousTexture.dispose();
        if (filteredTexture && texture !== filteredTexture) texture.dispose();
        requestSceneRender();
      },
      undefined,
      function () {
        requestSceneRender();
      }
    );
  }

  function updateBackdropScale() {
    if (!backdrop || !camera) return;
    var distance = 28;
    var spanY = 2 * Math.tan((camera.fov * Math.PI / 180) * 0.5) * distance;
    var spanX = spanY * camera.aspect;
    backdrop.scale.set(spanX * 0.515, spanY * 0.515, 1);
    applyBackdropCover(backdrop.material.map);
  }

  frameCamera();

  function buildIndustrialEnvironment() {
    if (!THREE.WebGLCubeRenderTarget || !THREE.CubeCamera || !THREE.PMREMGenerator) return;
    var environmentScene = new THREE.Scene();
    environmentScene.background = new THREE.Color(0x555d60);
    var roomMaterials = [
      0x7f8789, 0x60686b, 0xd5d4c9, 0x343a3c, 0x8b9191, 0x777e80
    ].map(function (color) {
      return new THREE.MeshBasicMaterial({ color: color, side: THREE.BackSide });
    });
    environmentScene.add(new THREE.Mesh(new THREE.BoxGeometry(24, 18, 24), roomMaterials));

    function environmentPanel(widthValue, heightValue, position, target, color) {
      var material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        toneMapped: false
      });
      var panel = new THREE.Mesh(new THREE.PlaneGeometry(widthValue, heightValue), material);
      panel.position.set(position[0], position[1], position[2]);
      panel.lookAt(target[0], target[1], target[2]);
      environmentScene.add(panel);
      return panel;
    }

    // Three photographed high-bay strips create long, controlled highlights
    // across castings and powder coat instead of isolated point-light glints.
    var fixtureX = [-5.1, 0, 5.1];
    for (var lightIndex = 0; lightIndex < fixtureX.length; lightIndex++) {
      environmentPanel(
        4.4,
        0.62,
        [fixtureX[lightIndex], 7.8, -2.8 - Math.abs(lightIndex - 1) * 0.35],
        [fixtureX[lightIndex] * 0.35, 0, -3.8],
        0xf3faf8
      );
    }
    // Broad operator- and machine-side sources remain reflection-only. Their
    // rectangular PMREM lobes add gradients without adding a shadow direction.
    environmentPanel(6.8, 1.15, [0.2, 5.9, 8.6], [0.4, 2.0, -3.9], 0xcddfdd);
    environmentPanel(5.4, 1.35, [9.2, 4.5, -3.6], [2.6, 2.0, -4.4], 0xc1d7d9);
    environmentPanel(7.8, 2.8, [-8.8, 3.1, -4.6], [-0.2, 1.8, -4.0], 0x8d9697);

    var safetyReflection = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 0.55),
      new THREE.MeshBasicMaterial({ color: 0xb78108, side: THREE.DoubleSide, toneMapped: false })
    );
    safetyReflection.position.set(0, 4.8, -10.8);
    environmentScene.add(safetyReflection);

    var environmentSize = lowPower ? 64 : 128;
    var cubeTarget = new THREE.WebGLCubeRenderTarget(environmentSize);
    var cubeCamera = new THREE.CubeCamera(0.1, 50, cubeTarget);
    environmentScene.add(cubeCamera);
    cubeCamera.update(renderer, environmentScene);
    var pmrem = new THREE.PMREMGenerator(renderer);
    if (pmrem.compileCubemapShader) pmrem.compileCubemapShader();
    var environmentTarget = pmrem.fromCubemap(cubeTarget.texture);
    scene.environment = environmentTarget.texture;
    cubeTarget.dispose();
    pmrem.dispose();
    environmentScene.traverse(function (item) {
      if (item.geometry) item.geometry.dispose();
      if (item.material) {
        if (Array.isArray(item.material)) {
          for (var materialIndex = 0; materialIndex < item.material.length; materialIndex++) {
            item.material[materialIndex].dispose();
          }
        } else {
          item.material.dispose();
        }
      }
    });
  }

  buildIndustrialEnvironment();

  // Pale concrete contributes a real upward fill in the photographed cell;
  // using it as the hemisphere ground lobe prevents pitch-black undersides.
  var ambientLight = new THREE.HemisphereLight(0xf2f8f5, 0x858d89, 0.68);
  ambientLight.position.set(0, 7, -3.5);
  scene.add(ambientLight);

  // One neutral-cool high-bay direction drives every cast shadow. Normalized
  // light-ray vector (source to cell) is approximately +0.325,-0.779,-0.535.
  var keyLight = new THREE.DirectionalLight(0xf1f6ef, 1.95);
  keyLight.position.set(-4.0, 12.5, 3.8);
  keyLight.target.position.set(0.8, 1.0, -4.1);
  keyLight.castShadow = dynamicShadows;
  var keyShadowSize = dynamicShadows && width * height <= 1600000 ? 2048 : 1024;
  keyLight.shadow.mapSize.set(keyShadowSize, keyShadowSize);
  // These bounds are fitted to x -3.5..6.8, y 0..6.2, z -7..-1.5
  // in light space, with only a small safety margin for moving tooling.
  keyLight.shadow.camera.near = 7.35;
  keyLight.shadow.camera.far = 19.65;
  keyLight.shadow.camera.left = -5.45;
  keyLight.shadow.camera.right = 6.75;
  keyLight.shadow.camera.top = 7.9;
  keyLight.shadow.camera.bottom = -4.3;
  keyLight.shadow.camera.updateProjectionMatrix();
  keyLight.shadow.bias = -0.00022;
  keyLight.shadow.normalBias = 0.018;
  keyLight.shadow.radius = 1.8;
  scene.add(keyLight);
  scene.add(keyLight.target);

  // Low-energy machine fill follows the same overhead vector, so it cannot
  // introduce a contradictory second shadow/read direction.
  var machineLight = new THREE.DirectionalLight(0xcbe7ec, 0.26);
  machineLight.position.set(-2.2, 13.5, 2.1);
  machineLight.target.position.set(2.6, 2.0, -5.8);
  scene.add(machineLight);
  scene.add(machineLight.target);

  var workLight = new THREE.PointLight(0xdff4ff, 0.62, 8, 2);
  workLight.position.set(3.15, 3.75, -4.7);
  scene.add(workLight);

  var cavityLight = new THREE.SpotLight(0xd9f3ff, 2.4, 5.5, 0.62, 0.7, 2);
  cavityLight.position.set(3.45, 3.35, -5.35);
  cavityLight.target.position.set(3.1, 1.75, -6.25);
  scene.add(cavityLight);
  scene.add(cavityLight.target);

  var cavityBounce = new THREE.PointLight(0x8ecbd3, 0.22, 3.2, 2);
  cavityBounce.position.set(3.25, 2.0, -5.95);
  scene.add(cavityBounce);

  // A restrained cool practical separates the robot's yellow castings from
  // the warm machine and black safety mesh without flattening the whole cell.
  var robotRimLight = new THREE.SpotLight(0xc7efff, 0.56, 8, 0.52, 0.86, 2);
  robotRimLight.position.set(-1.3, 6.15, -1.35);
  robotRimLight.target.position.set(0.3, 2.35, -4.0);
  scene.add(robotRimLight);
  scene.add(robotRimLight.target);

  // Broad, non-shadowing practicals bind the modeled foreground to the plate:
  // warm energy arrives from the photographed yellow crane/high-bay side,
  // while a low cool lobe reads as light returned by the concrete slab. Their
  // cones are centered on rack/robot/load-lock, leaving the HMI phosphor and
  // paper's deliberately low emissive response in control of their legibility.
  var craneReflectionLight = new THREE.SpotLight(
    0xffcf95,
    lowPower ? 0.24 : 0.34,
    13,
    0.94,
    1,
    2
  );
  craneReflectionLight.position.set(-4.1, 7.9, -0.65);
  craneReflectionLight.target.position.set(-0.15, 1.7, -3.75);
  craneReflectionLight.castShadow = false;
  scene.add(craneReflectionLight);
  scene.add(craneReflectionLight.target);

  var concreteBounceLight = new THREE.SpotLight(
    0xd8eceb,
    lowPower ? 0.14 : 0.2,
    7.6,
    1.04,
    1,
    2
  );
  concreteBounceLight.position.set(0.35, 0.16, -1.72);
  concreteBounceLight.target.position.set(0.25, 2.15, -4.05);
  concreteBounceLight.castShadow = false;
  scene.add(concreteBounceLight);
  scene.add(concreteBounceLight.target);

  function lambert(color, options) {
    var params = { color: color };
    if (options) {
      for (var key in options) params[key] = options[key];
    }
    return new THREE.MeshLambertMaterial(params);
  }

  function standard(color, emissive, intensity, roughness, metalness, options) {
    var MaterialType = options && options.physical && THREE.MeshPhysicalMaterial
      ? THREE.MeshPhysicalMaterial
      : THREE.MeshStandardMaterial;
    var material = new MaterialType({
      color: color,
      emissive: emissive || 0x000000,
      emissiveIntensity: intensity || 0,
      roughness: roughness === undefined ? 0.52 : roughness,
      metalness: metalness === undefined ? 0.34 : metalness
    });
    material.envMapIntensity = options && options.envMapIntensity !== undefined
      ? options.envMapIntensity
      : 0.72;
    if (options && material.isMeshPhysicalMaterial) {
      material.clearcoat = options.clearcoat || 0;
      material.clearcoatRoughness = options.clearcoatRoughness === undefined
        ? 0.38
        : options.clearcoatRoughness;
    }
    return material;
  }

  var contactShadowTexture = makeTexture(function (ctx, w, h) {
    var gradient = ctx.createRadialGradient(w * 0.5, h * 0.5, 2, w * 0.5, h * 0.5, w * 0.48);
    gradient.addColorStop(0, "rgba(5,8,9,0.78)");
    gradient.addColorStop(0.28, "rgba(5,8,9,0.5)");
    gradient.addColorStop(0.62, "rgba(5,8,9,0.16)");
    gradient.addColorStop(1, "rgba(5,8,9,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }, 256, 256);

  var M = {
    yellow: standard(0xc78d05, 0x160d00, 0.012, 0.54, 0.05, {
      physical: true, clearcoat: 0.07, clearcoatRoughness: 0.76, envMapIntensity: 0.74
    }),
    yellowDark: standard(0x875503, 0x110900, 0.008, 0.6, 0.08, {
      physical: true, clearcoat: 0.04, clearcoatRoughness: 0.82, envMapIntensity: 0.66
    }),
    robotYellow: standard(0xbf8607, 0x120a00, 0.006, 0.72, 0.045, {
      physical: true, clearcoat: 0.045, clearcoatRoughness: 0.8, envMapIntensity: 0.76
    }),
    robotYellowDark: standard(0x7d4d03, 0x0b0600, 0.004, 0.78, 0.07, {
      physical: true, clearcoat: 0.025, clearcoatRoughness: 0.86, envMapIntensity: 0.67
    }),
    joint: standard(0x272f33, 0x000000, 0, 0.42, 0.62, { envMapIntensity: 0.86 }),
    cable: standard(0x101315, 0x000000, 0, 0.76, 0.04, { envMapIntensity: 0.4 }),
    robotCable: standard(0x111415, 0x000000, 0, 0.7, 0.015, { envMapIntensity: 0.32 }),
    robotToolPolymer: standard(0x202629, 0x000000, 0, 0.62, 0.08, { envMapIntensity: 0.48 }),
    steel: standard(0xaeb4b5, 0x000000, 0, 0.2, 0.92, { envMapIntensity: 1.18 }),
    brushed: standard(0x707a7e, 0x000000, 0, 0.31, 0.86, { envMapIntensity: 1.08 }),
    robotFlange: standard(0x969fa1, 0x000000, 0, 0.36, 0.9, { envMapIntensity: 1.12 }),
    robotFastener: standard(0xc1c6c5, 0x000000, 0, 0.2, 0.94, { envMapIntensity: 1.2 }),
    robotEdgeBurnish: standard(0x9b906f, 0x000000, 0, 0.4, 0.68, { envMapIntensity: 0.88 }),
    dark: standard(0x1c2225, 0x000000, 0, 0.55, 0.22, { envMapIntensity: 0.52 }),
    black: standard(0x080b0c, 0x000000, 0, 0.45, 0.18, { envMapIntensity: 0.42 }),
    machine: standard(0xaeb4b4, 0x000000, 0, 0.41, 0.12, {
      physical: true, clearcoat: 0.18, clearcoatRoughness: 0.58, envMapIntensity: 0.8
    }),
    machineDark: standard(0x30373a, 0x000000, 0, 0.48, 0.2, { envMapIntensity: 0.74 }),
    machineEdge: standard(0x465055, 0x000000, 0, 0.46, 0.48, { envMapIntensity: 0.86 }),
    burnished: standard(0xb8c0c0, 0x000000, 0, 0.24, 0.88, { envMapIntensity: 1.1 }),
    grease: standard(0x171b18, 0x030504, 0.012, 0.2, 0.08, {
      physical: true, clearcoat: 0.42, clearcoatRoughness: 0.24, envMapIntensity: 0.66
    }),
    robotGrease: standard(0x151812, 0x020301, 0.004, 0.24, 0.06, {
      physical: true, clearcoat: 0.5, clearcoatRoughness: 0.2, envMapIntensity: 0.6
    }),
    contactAo: standard(0x14191a, 0x000000, 0, 0.78, 0.16, { envMapIntensity: 0.24 }),
    jawPad: standard(0x171b1b, 0x000000, 0, 0.42, 0.02, {
      physical: true, clearcoat: 0.16, clearcoatRoughness: 0.34, envMapIntensity: 0.46
    }),
    robotJawPad: standard(0x111515, 0x000000, 0, 0.46, 0.01, {
      physical: true, clearcoat: 0.12, clearcoatRoughness: 0.3, envMapIntensity: 0.4
    }),
    cavity: new THREE.MeshStandardMaterial({
      color: 0x182227,
      roughness: 0.72,
      metalness: 0.24,
      transparent: true,
      opacity: 0.58,
      depthWrite: true,
      envMapIntensity: 0.36,
      fog: false
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x24434b,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
      roughness: 0.16,
      metalness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.2,
      side: THREE.DoubleSide
    }),
    guardGlass: new THREE.MeshPhysicalMaterial({
      color: 0x9fc3c5,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
      roughness: 0.22,
      metalness: 0.02,
      clearcoat: 0.28,
      clearcoatRoughness: 0.45,
      envMapIntensity: 0.72,
      side: THREE.DoubleSide
    }),
    white: standard(0xe4e7e5, 0x000000, 0, 0.52, 0.04, { envMapIntensity: 0.58 }),
    green: standard(0x174b2e, 0x22d47a, 0.72, 0.3, 0.18),
    amber: standard(0x6d4307, 0xffa51d, 0.85, 0.3, 0.18),
    red: standard(0x5d1712, 0xe2392d, 0.42, 0.3, 0.18),
    shadow: new THREE.MeshBasicMaterial({
      map: contactShadowTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      fog: false
    })
  };

  // Shared fine-grain powder-coat bump keeps large castings from reading as
  // perfectly smooth CG plastic while adding no image request or draw call.
  var powderCanvas = document.createElement("canvas");
  powderCanvas.width = powderCanvas.height = 64;
  var powderContext = powderCanvas.getContext("2d");
  var powderImage = powderContext.createImageData(64, 64);
  var powderSeed = 9137;
  for (var powderPixel = 0; powderPixel < powderImage.data.length; powderPixel += 4) {
    powderSeed = (powderSeed * 16807) % 2147483647;
    var powderValue = 116 + Math.floor((powderSeed / 2147483647) * 28);
    powderImage.data[powderPixel] = powderValue;
    powderImage.data[powderPixel + 1] = powderValue;
    powderImage.data[powderPixel + 2] = powderValue;
    powderImage.data[powderPixel + 3] = 255;
  }
  powderContext.putImageData(powderImage, 0, 0);
  var powderTexture = new THREE.CanvasTexture(powderCanvas);
  var powdercoatSourceTexture = null;
  var powdercoatAssignedTextures = [];

  function configureNonColorTexture(texture, repeatX, repeatY) {
    if (!texture) return texture;
    if (THREE.NoColorSpace !== undefined && "colorSpace" in texture) {
      texture.colorSpace = THREE.NoColorSpace;
    } else if (THREE.LinearEncoding !== undefined && "encoding" in texture) {
      texture.encoding = THREE.LinearEncoding;
    }
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX || 1, repeatY || repeatX || 1);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    if (renderer && renderer.capabilities && renderer.capabilities.getMaxAnisotropy) {
      texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    }
    texture.needsUpdate = true;
    return texture;
  }

  function applyPowdercoatTexture(sourceTexture) {
    if (!sourceTexture) return;
    for (var oldDetail = 0; oldDetail < powdercoatAssignedTextures.length; oldDetail++) {
      powdercoatAssignedTextures[oldDetail].dispose();
    }
    powdercoatAssignedTextures.length = 0;
    var profiles = [
      { material: M.yellow, repeat: 8, roughness: 0.82, bump: 0.007 },
      { material: M.yellowDark, repeat: 9, roughness: 0.86, bump: 0.006 },
      { material: M.robotYellow, repeat: 8.5, roughness: 0.76, bump: 0.0065 },
      { material: M.robotYellowDark, repeat: 9.5, roughness: 0.82, bump: 0.0055 },
      { material: M.machine, repeat: 5, roughness: 0.72, bump: 0.003 },
      { material: M.machineDark, repeat: 6, roughness: 0.8, bump: 0.0035 },
      { material: M.machineEdge, repeat: 10, roughness: 0.76, bump: 0.0028 }
    ];
    for (var profileIndex = 0; profileIndex < profiles.length; profileIndex++) {
      var profile = profiles[profileIndex];
      var detailTexture = configureNonColorTexture(
        sourceTexture.clone(),
        profile.repeat,
        profile.repeat
      );
      profile.material.roughness = profile.roughness;
      profile.material.roughnessMap = detailTexture;
      profile.material.bumpMap = detailTexture;
      profile.material.bumpScale = profile.bump;
      profile.material.needsUpdate = true;
      powdercoatAssignedTextures.push(detailTexture);
    }
  }

  // Immediate procedural fallback keeps all painted materials valid before the
  // external neutral roughness map arrives, and remains active on load error.
  configureNonColorTexture(powderTexture, 1, 1);
  applyPowdercoatTexture(powderTexture);
  new THREE.TextureLoader().load(
    "assets/industrial-powdercoat-roughness.webp",
    function (texture) {
      powdercoatSourceTexture = configureNonColorTexture(texture, 1, 1);
      applyPowdercoatTexture(powdercoatSourceTexture);
      requestSceneRender();
    },
    undefined,
    function () {
      requestSceneRender();
    }
  );

  // Directional micro-scratches belong only on brushed stock and guide faces.
  var brushedCanvas = document.createElement("canvas");
  brushedCanvas.width = brushedCanvas.height = 64;
  var brushedContext = brushedCanvas.getContext("2d");
  brushedContext.fillStyle = "#b9b9b9";
  brushedContext.fillRect(0, 0, 64, 64);
  for (var brushedLine = 0; brushedLine < 64; brushedLine += 2) {
    var brushedTone = 142 + (brushedLine * 17 % 38);
    brushedContext.fillStyle = "rgb(" + brushedTone + "," + brushedTone + "," + brushedTone + ")";
    brushedContext.fillRect(0, brushedLine, 64, 1);
  }
  var brushedTexture = configureNonColorTexture(new THREE.CanvasTexture(brushedCanvas), 2, 14);
  M.brushed.roughness = 0.5;
  M.brushed.roughnessMap = brushedTexture;
  M.brushed.bumpMap = brushedTexture;
  M.brushed.bumpScale = 0.0012;
  M.brushed.needsUpdate = true;
  M.robotFlange.roughnessMap = brushedTexture;
  M.robotFlange.bumpMap = brushedTexture;
  M.robotFlange.bumpScale = 0.0008;
  M.robotFlange.needsUpdate = true;
  M.robotEdgeBurnish.roughnessMap = brushedTexture;
  M.robotEdgeBurnish.bumpMap = brushedTexture;
  M.robotEdgeBurnish.bumpScale = 0.00055;
  M.robotEdgeBurnish.needsUpdate = true;

  // Polycarbonate stays optically clear through its working center. Dust only
  // builds along the lower capture rail and short wiped arcs sit where an
  // operator would reach; this map is clamped once across the full sheet so
  // the marks cannot tile into procedural-looking noise.
  var polyWipeCanvas = document.createElement("canvas");
  polyWipeCanvas.width = polyWipeCanvas.height = 256;
  var polyWipeContext = polyWipeCanvas.getContext("2d");
  polyWipeContext.fillStyle = "#666666";
  polyWipeContext.fillRect(0, 0, 256, 256);
  var lowerDust = polyWipeContext.createLinearGradient(0, 178, 0, 256);
  lowerDust.addColorStop(0, "rgba(102,102,102,0)");
  lowerDust.addColorStop(0.55, "rgba(186,186,186,0.34)");
  lowerDust.addColorStop(1, "rgba(232,232,232,0.78)");
  polyWipeContext.fillStyle = lowerDust;
  polyWipeContext.fillRect(0, 176, 256, 80);
  polyWipeContext.strokeStyle = "rgba(196,196,196,0.48)";
  polyWipeContext.lineCap = "round";
  polyWipeContext.lineWidth = 9;
  polyWipeContext.beginPath();
  polyWipeContext.arc(46, 154, 25, -1.18, 1.04);
  polyWipeContext.stroke();
  polyWipeContext.lineWidth = 6;
  polyWipeContext.beginPath();
  polyWipeContext.arc(214, 148, 17, 0.12, 2.72);
  polyWipeContext.stroke();
  var polyWipeTexture = new THREE.CanvasTexture(polyWipeCanvas);
  if (THREE.NoColorSpace !== undefined && "colorSpace" in polyWipeTexture) {
    polyWipeTexture.colorSpace = THREE.NoColorSpace;
  } else if (THREE.LinearEncoding !== undefined && "encoding" in polyWipeTexture) {
    polyWipeTexture.encoding = THREE.LinearEncoding;
  }
  polyWipeTexture.wrapS = polyWipeTexture.wrapT = THREE.ClampToEdgeWrapping;
  polyWipeTexture.generateMipmaps = true;
  polyWipeTexture.minFilter = THREE.LinearMipmapLinearFilter;
  polyWipeTexture.magFilter = THREE.LinearFilter;
  if (renderer && renderer.capabilities && renderer.capabilities.getMaxAnisotropy) {
    polyWipeTexture.anisotropy = Math.min(2, renderer.capabilities.getMaxAnisotropy());
  }
  polyWipeTexture.needsUpdate = true;
  M.guardGlass.roughness = 0.44;
  M.guardGlass.roughnessMap = polyWipeTexture;
  M.guardGlass.ior = 1.585;
  M.guardGlass.thickness = 0.035;
  M.guardGlass.reflectivity = 0.34;
  M.guardGlass.clearcoat = 0.56;
  M.guardGlass.clearcoatRoughness = 0.32;
  M.guardGlass.envMapIntensity = 0.84;
  M.guardGlass.needsUpdate = true;
  M.polyEdge = M.guardGlass.clone();
  M.polyEdge.color.setHex(0x6b9fa2);
  M.polyEdge.opacity = 0.34;
  M.polyEdge.roughness = 0.3;
  M.polyEdge.reflectivity = 0.48;
  M.polyEdge.clearcoat = 0.64;
  M.polyEdge.envMapIntensity = 0.98;
  M.polyEdge.roughnessMap = null;
  M.polyEdge.needsUpdate = true;
  // The exposed top edge is optically present but cannot become a continuous
  // cyan light bar. A quieter neutral edge lets the broken warm fixture image
  // below carry the photographed high-bay/crane direction.
  M.polyUpperEdge = M.polyEdge.clone();
  M.polyUpperEdge.color.setHex(0x89908a);
  M.polyUpperEdge.opacity = 0.2;
  M.polyUpperEdge.roughness = 0.4;
  M.polyUpperEdge.reflectivity = 0.34;
  M.polyUpperEdge.clearcoat = 0.42;
  M.polyUpperEdge.envMapIntensity = 0.64;
  M.polyUpperEdge.needsUpdate = true;

  var guardGlareTexture = makeTexture(function (ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    // Three uneven fixture/crane spans read as one broad reflection band, but
    // their short gaps, different temperatures, and unequal peaks prevent the
    // pane from acquiring a synthetic continuous highlight.
    var bandSegments = [
      { x0: 10, x1: 91, y: 19, height: 26, alpha: 0.16, color: "255,249,226" },
      { x0: 105, x1: 171, y: 17, height: 31, alpha: 0.23, color: "255,232,174" },
      { x0: 188, x1: 244, y: 24, height: 22, alpha: 0.13, color: "255,246,219" }
    ];
    for (var bandIndex = 0; bandIndex < bandSegments.length; bandIndex++) {
      var segment = bandSegments[bandIndex];
      var segmentFade = ctx.createLinearGradient(segment.x0, 0, segment.x1, 0);
      segmentFade.addColorStop(0, "rgba(" + segment.color + ",0)");
      segmentFade.addColorStop(0.2, "rgba(" + segment.color + "," + segment.alpha * 0.72 + ")");
      segmentFade.addColorStop(0.54, "rgba(" + segment.color + "," + segment.alpha + ")");
      segmentFade.addColorStop(0.82, "rgba(" + segment.color + "," + segment.alpha * 0.48 + ")");
      segmentFade.addColorStop(1, "rgba(" + segment.color + ",0)");
      ctx.fillStyle = segmentFade;
      ctx.fillRect(segment.x0, segment.y, segment.x1 - segment.x0, segment.height);
    }
    var glareVertical = ctx.createLinearGradient(0, 0, 0, h);
    glareVertical.addColorStop(0, "rgba(255,255,255,0)");
    glareVertical.addColorStop(0.25, "rgba(255,255,255,0.62)");
    glareVertical.addColorStop(0.53, "rgba(255,255,255,1)");
    glareVertical.addColorStop(0.82, "rgba(255,255,255,0.34)");
    glareVertical.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = glareVertical;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
  }, 256, 64);
  var guardGlareMaterial = new THREE.MeshBasicMaterial({
    map: guardGlareTexture,
    color: 0xfff0c8,
    transparent: true,
    opacity: 0.055,
    depthWrite: false,
    depthTest: true,
    toneMapped: false,
    fog: false,
    side: THREE.DoubleSide
  });

  var geometryCache = {};

  function boxGeometry(x, y, z) {
    var key = "b|" + x + "|" + y + "|" + z;
    if (!geometryCache[key]) geometryCache[key] = new THREE.BoxGeometry(x, y, z);
    return geometryCache[key];
  }

  function cylinderGeometry(radius, heightValue, segments) {
    var key = "c|" + radius + "|" + heightValue + "|" + segments;
    if (!geometryCache[key]) {
      geometryCache[key] = new THREE.CylinderGeometry(radius, radius, heightValue, segments || 16);
    }
    return geometryCache[key];
  }

  function sphereGeometry(radius, segments) {
    var key = "s|" + radius + "|" + segments;
    if (!geometryCache[key]) {
      geometryCache[key] = new THREE.SphereGeometry(radius, segments || 16, 10);
    }
    return geometryCache[key];
  }

  function roundedBoxGeometry(x, y, z, radius) {
    if (!THREE.ExtrudeGeometry || !THREE.Shape) return boxGeometry(x, y, z);
    var edge = Math.min(radius || 0.045, x * 0.22, y * 0.22, z * 0.42);
    var key = "rb|" + x + "|" + y + "|" + z + "|" + edge;
    if (geometryCache[key]) return geometryCache[key];

    var halfX = Math.max(edge * 1.2, x * 0.5 - edge);
    var halfY = Math.max(edge * 1.2, y * 0.5 - edge);
    var corner = edge * 0.55;
    var shape = new THREE.Shape();
    shape.moveTo(-halfX, -halfY + corner);
    shape.lineTo(-halfX, halfY - corner);
    shape.quadraticCurveTo(-halfX, halfY, -halfX + corner, halfY);
    shape.lineTo(halfX - corner, halfY);
    shape.quadraticCurveTo(halfX, halfY, halfX, halfY - corner);
    shape.lineTo(halfX, -halfY + corner);
    shape.quadraticCurveTo(halfX, -halfY, halfX - corner, -halfY);
    shape.lineTo(-halfX + corner, -halfY);
    shape.quadraticCurveTo(-halfX, -halfY, -halfX, -halfY + corner);

    var geometry = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.001, z - edge * 2),
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: edge,
      bevelThickness: edge,
      curveSegments: 2
    });
    geometry.center();
    geometry.computeVertexNormals();
    geometryCache[key] = geometry;
    return geometry;
  }

  function capsuleGeometry(widthValue, heightValue, depthValue) {
    var key = "cap|" + widthValue + "|" + heightValue + "|" + depthValue;
    if (geometryCache[key]) return geometryCache[key];
    if (!THREE.CapsuleGeometry) return roundedBoxGeometry(widthValue, heightValue, depthValue, 0.12);
    var radius = Math.max(0.04, Math.min(widthValue, depthValue) * 0.5);
    var length = Math.max(0.02, heightValue - radius * 2);
    var geometry = new THREE.CapsuleGeometry(radius, length, 5, 12);
    geometry.scale(widthValue / (radius * 2), 1, depthValue / (radius * 2));
    geometryCache[key] = geometry;
    return geometry;
  }

  // Low-poly chamfered cast link with six longitudinal rings. Shared vertices
  // produce a soft manufactured highlight while the octagonal cross-section
  // retains visible parting flats and avoids a generic capsule silhouette.
  function taperedCastGeometry(lengthValue, baseWidth, midWidth, topWidth, baseDepth, midDepth, topDepth) {
    var key = "cast|" + [lengthValue, baseWidth, midWidth, topWidth, baseDepth, midDepth, topDepth].join("|");
    if (geometryCache[key]) return geometryCache[key];
    var profiles = [
      [0, baseWidth * 0.9, baseDepth * 0.9],
      [0.07, baseWidth, baseDepth],
      [0.4, midWidth * 1.025, midDepth * 1.025],
      [0.74, midWidth, midDepth],
      [0.94, topWidth * 0.96, topDepth * 0.96],
      [1, topWidth, topDepth]
    ];
    var positions = [];
    var uvs = [];
    var indices = [];
    var ringSize = 9;
    for (var ringIndex = 0; ringIndex < profiles.length; ringIndex++) {
      var profile = profiles[ringIndex];
      var halfX = profile[1] * 0.5;
      var halfZ = profile[2] * 0.5;
      var chamfer = Math.min(profile[1], profile[2]) * 0.16;
      var ring = [
        [-halfX + chamfer, -halfZ],
        [halfX - chamfer, -halfZ],
        [halfX, -halfZ + chamfer],
        [halfX, halfZ - chamfer],
        [halfX - chamfer, halfZ],
        [-halfX + chamfer, halfZ],
        [-halfX, halfZ - chamfer],
        [-halfX, -halfZ + chamfer]
      ];
      for (var sideIndex = 0; sideIndex < ringSize; sideIndex++) {
        var point = ring[sideIndex % 8];
        positions.push(point[0], profile[0] * lengthValue, point[1]);
        uvs.push(sideIndex / 8, profile[0]);
      }
    }
    for (var linkRing = 0; linkRing < profiles.length - 1; linkRing++) {
      for (var linkSide = 0; linkSide < 8; linkSide++) {
        var lower = linkRing * ringSize + linkSide;
        var upper = (linkRing + 1) * ringSize + linkSide;
        indices.push(lower, upper, upper + 1, lower, upper + 1, lower + 1);
      }
    }
    var bottomCenter = positions.length / 3;
    positions.push(0, 0, 0);
    uvs.push(0.5, 0.5);
    var topCenter = positions.length / 3;
    positions.push(0, lengthValue, 0);
    uvs.push(0.5, 0.5);
    var topRingStart = (profiles.length - 1) * ringSize;
    for (var capSide = 0; capSide < 8; capSide++) {
      indices.push(bottomCenter, capSide, capSide + 1);
      indices.push(topCenter, topRingStart + capSide + 1, topRingStart + capSide);
    }
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    geometryCache[key] = geometry;
    return geometry;
  }

  function taperedCast(lengthValue, baseWidth, midWidth, topWidth, baseDepth, midDepth, topDepth, material, px, py, pz, parent) {
    var mesh = new THREE.Mesh(
      taperedCastGeometry(lengthValue, baseWidth, midWidth, topWidth, baseDepth, midDepth, topDepth),
      material
    );
    mesh.position.set(px || 0, py || 0, pz || 0);
    (parent || scene).add(mesh);
    return applyMeshShadows(mesh, material);
  }

  function applyMeshShadows(mesh, material) {
    if (!mesh || !dynamicShadows || !material) return mesh;
    var lit = !!(
      material.isMeshStandardMaterial ||
      material.isMeshPhysicalMaterial ||
      material.isMeshLambertMaterial
    );
    // Thin polycarbonate/glass should transmit the high-bay shadow field, not
    // behave like an opaque gray receiver or cast a solid rectangle.
    if (lit && !material.transparent) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    } else if (material.transparent) {
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    }
    return mesh;
  }

  function box(x, y, z, material, px, py, pz, parent) {
    var mesh = new THREE.Mesh(boxGeometry(x, y, z), material);
    mesh.position.set(px || 0, py || 0, pz || 0);
    (parent || scene).add(mesh);
    return applyMeshShadows(mesh, material);
  }

  function roundedBox(x, y, z, radius, material, px, py, pz, parent) {
    var mesh = new THREE.Mesh(roundedBoxGeometry(x, y, z, radius), material);
    mesh.position.set(px || 0, py || 0, pz || 0);
    (parent || scene).add(mesh);
    return applyMeshShadows(mesh, material);
  }

  function capsule(widthValue, heightValue, depthValue, material, px, py, pz, parent) {
    var mesh = new THREE.Mesh(capsuleGeometry(widthValue, heightValue, depthValue), material);
    mesh.position.set(px || 0, py || 0, pz || 0);
    (parent || scene).add(mesh);
    return applyMeshShadows(mesh, material);
  }

  function cylinder(radius, heightValue, material, px, py, pz, parent, rx, ry, rz, segments) {
    var mesh = new THREE.Mesh(cylinderGeometry(radius, heightValue, segments || 16), material);
    mesh.position.set(px || 0, py || 0, pz || 0);
    mesh.rotation.set(rx || 0, ry || 0, rz || 0);
    (parent || scene).add(mesh);
    return applyMeshShadows(mesh, material);
  }

  function sphere(radius, material, px, py, pz, parent) {
    var mesh = new THREE.Mesh(sphereGeometry(radius, 16), material);
    mesh.position.set(px || 0, py || 0, pz || 0);
    (parent || scene).add(mesh);
    return applyMeshShadows(mesh, material);
  }

  function horizontalPlane(widthValue, depthValue, material, x, y, z, parent) {
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(widthValue, depthValue), material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, y, z);
    (parent || scene).add(mesh);
    return applyMeshShadows(mesh, material);
  }

  function instanceBoxes(items, material, parent) {
    if (!items.length) return null;
    if (!THREE.InstancedMesh) {
      for (var f = 0; f < items.length; f++) {
        var itemFallback = items[f];
        box(
          itemFallback[3],
          itemFallback[4],
          itemFallback[5],
          material,
          itemFallback[0],
          itemFallback[1],
          itemFallback[2],
          parent
        );
      }
      return null;
    }
    var mesh = new THREE.InstancedMesh(boxGeometry(1, 1, 1), material, items.length);
    var dummy = new THREE.Object3D();
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      dummy.position.set(item[0], item[1], item[2]);
      dummy.scale.set(item[3], item[4], item[5]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    parent.add(mesh);
    applyMeshShadows(mesh, material);
    return mesh;
  }

  function instanceCylinders(items, material, parent, segments) {
    if (!items.length) return null;
    if (!THREE.InstancedMesh) {
      for (var fallbackIndex = 0; fallbackIndex < items.length; fallbackIndex++) {
        var fallback = items[fallbackIndex];
        cylinder(
          fallback[3], fallback[4], material,
          fallback[0], fallback[1], fallback[2], parent,
          fallback[5] || 0, fallback[6] || 0, fallback[7] || 0,
          segments || 18
        );
      }
      return null;
    }
    var mesh = new THREE.InstancedMesh(cylinderGeometry(1, 1, segments || 18), material, items.length);
    var dummy = new THREE.Object3D();
    for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
      var item = items[itemIndex];
      dummy.position.set(item[0], item[1], item[2]);
      dummy.rotation.set(item[5] || 0, item[6] || 0, item[7] || 0);
      dummy.scale.set(item[3], item[4], item[3]);
      dummy.updateMatrix();
      mesh.setMatrixAt(itemIndex, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    parent.add(mesh);
    applyMeshShadows(mesh, material);
    return mesh;
  }

  // Exact-geometry batching for repeated rack hardware. Unlike instanceBoxes,
  // this preserves the rounded/chamfered source mesh instead of substituting a
  // unit box, so batching has no visible silhouette cost.
  function instanceFixedGeometry(geometry, material, transforms, parent) {
    if (!geometry || !transforms || !transforms.length) return null;
    if (!THREE.InstancedMesh) {
      for (var fallbackIndex = 0; fallbackIndex < transforms.length; fallbackIndex++) {
        var fallback = transforms[fallbackIndex];
        var fallbackMesh = new THREE.Mesh(geometry, material);
        fallbackMesh.position.set(fallback[0], fallback[1], fallback[2]);
        fallbackMesh.rotation.set(fallback[3] || 0, fallback[4] || 0, fallback[5] || 0);
        parent.add(fallbackMesh);
        applyMeshShadows(fallbackMesh, material);
      }
      return null;
    }
    var mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
    var dummy = new THREE.Object3D();
    for (var transformIndex = 0; transformIndex < transforms.length; transformIndex++) {
      var transform = transforms[transformIndex];
      dummy.position.set(transform[0], transform[1], transform[2]);
      dummy.rotation.set(transform[3] || 0, transform[4] || 0, transform[5] || 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(transformIndex, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.computeBoundingBox) mesh.computeBoundingBox();
    if (mesh.computeBoundingSphere) mesh.computeBoundingSphere();
    parent.add(mesh);
    applyMeshShadows(mesh, material);
    return mesh;
  }

  function addContactShadow(x, z, widthValue, depthValue, opacity, parent) {
    var material = M.shadow.clone();
    material.opacity = opacity === undefined ? 0.72 : opacity;
    return horizontalPlane(widthValue, depthValue, material, x, 0.018, z, parent);
  }

  function makeLabelTexture(lines, foreground, background, widthValue, heightValue) {
    return makeTexture(function (ctx, w, h) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = foreground;
      ctx.lineWidth = 5;
      ctx.strokeRect(4, 4, w - 8, h - 8);
      ctx.fillStyle = foreground;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "700 28px ui-monospace, monospace";
      for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], w * 0.5, h * (i + 1) / (lines.length + 1));
      }
    }, widthValue || 256, heightValue || 128);
  }

  function labelPlane(texture, widthValue, heightValue, x, y, z, parent) {
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
      transparent: true,
      fog: false
    });
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(widthValue, heightValue), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function buildGuardPanel(parent, x1, z1, x2, z2, heightValue) {
    var dx = x2 - x1;
    var dz = z2 - z1;
    var length = Math.sqrt(dx * dx + dz * dz);
    var angle = -Math.atan2(dz, dx);
    var panel = roundedBox(
      Math.max(0.12, length - 0.14),
      heightValue - 0.34,
      0.035,
      0.012,
      M.guardGlass,
      (x1 + x2) * 0.5,
      heightValue * 0.5 + 0.12,
      (z1 + z2) * 0.5,
      parent
    );
    panel.rotation.y = angle;
    // A denser optical edge makes the 35 mm polycarbonate sheet thickness
    // legible without turning the clear span into another opaque frame.
    roundedBox(0.045, heightValue - 0.34, 0.07, 0.014, M.polyEdge, x1, heightValue * 0.5 + 0.12, z1, parent);
    roundedBox(0.045, heightValue - 0.34, 0.07, 0.014, M.polyEdge, x2, heightValue * 0.5 + 0.12, z2, parent);
    var upperPolyEdge = roundedBox(
      Math.max(0.12, length - 0.14), 0.028, 0.07, 0.008, M.polyUpperEdge,
      (x1 + x2) * 0.5, heightValue - 0.075, (z1 + z2) * 0.5, parent
    );
    var lowerPolyEdge = roundedBox(
      Math.max(0.12, length - 0.14), 0.028, 0.07, 0.008, M.polyEdge,
      (x1 + x2) * 0.5, 0.315, (z1 + z2) * 0.5, parent
    );
    upperPolyEdge.rotation.y = angle;
    lowerPolyEdge.rotation.y = angle;
    var topRail = roundedBox(length, 0.075, 0.075, 0.02, M.machineEdge, (x1 + x2) * 0.5, heightValue, (z1 + z2) * 0.5, parent);
    var bottomRail = roundedBox(length, 0.065, 0.075, 0.02, M.machineEdge, (x1 + x2) * 0.5, 0.24, (z1 + z2) * 0.5, parent);
    topRail.rotation.y = angle;
    bottomRail.rotation.y = angle;
  }

  function buildGuardGlare(parent, x1, z1, x2, z2, heightValue) {
    var dx = x2 - x1;
    var dz = z2 - z1;
    var length = Math.sqrt(dx * dx + dz * dz);
    var angle = -Math.atan2(dz, dx);
    guardGlare = new THREE.Mesh(
      new THREE.PlaneGeometry(Math.min(2.65, length * 0.48), 0.42),
      guardGlareMaterial
    );
    guardGlare.rotation.set(0, angle, -0.072);
    guardGlare.renderOrder = 3;
    guardGlare.userData = {
      x1: x1,
      z1: z1,
      dx: dx,
      dz: dz,
      angle: angle,
      y: heightValue * 0.73
    };
    parent.add(guardGlare);
    updateGuardGlare(0);
  }

  function updateGuardGlare(clockValue) {
    if (!guardGlare || !camera) return;
    var data = guardGlare.userData;
    // The reflection belongs to one photographed overhead strip. It remains
    // spatially anchored instead of sweeping theatrically across the guard;
    // only the physically expected grazing-angle energy changes with camera.
    var along = 0.48;
    var nx = Math.sin(data.angle);
    var nz = Math.cos(data.angle);
    guardGlare.position.set(
      data.x1 + data.dx * along + nx * 0.026,
      data.y,
      data.z1 + data.dz * along + nz * 0.026
    );
    var viewX = camera.position.x - guardGlare.position.x;
    var viewZ = camera.position.z - guardGlare.position.z;
    var viewLength = Math.max(0.001, Math.sqrt(viewX * viewX + viewZ * viewZ));
    var facing = Math.abs((viewX * nx + viewZ * nz) / viewLength);
    var grazing = 1 - Math.min(1, facing);
    guardGlare.material.opacity = 0.045 + grazing * grazing * 0.065;
  }

  function buildSafetyPerimeter(parent) {
    var guard = new THREE.Group();
    parent.add(guard);

    // A single coplanar sheet replaces the former rack mesh plus two slightly
    // skewed glass layers. The cassette bank sits visibly behind this surveyed
    // operator-side datum, so depth and occlusion agree from every camera crop.
    buildGuardPanel(
      guard,
      FRONT_GUARD_MIN_X,
      FRONT_GUARD_Z,
      FRONT_GUARD_MAX_X,
      FRONT_GUARD_Z,
      GUARD_HEIGHT
    );
    buildGuardGlare(
      guard,
      FRONT_GUARD_MIN_X,
      FRONT_GUARD_Z,
      FRONT_GUARD_MAX_X,
      FRONT_GUARD_Z,
      GUARD_HEIGHT
    );
    // The machine-side return is orthogonal to the front datum. Moving it out
    // of the robot/CNC diagonal removes the physically impossible end-post
    // crossing while retaining a continuous cabinet-to-machine perimeter.
    buildGuardPanel(
      guard,
      SIDE_GUARD_X,
      FRONT_GUARD_Z,
      SIDE_GUARD_X,
      SIDE_GUARD_MIN_Z,
      GUARD_HEIGHT
    );

    var posts = [
      [FRONT_GUARD_MIN_X, FRONT_GUARD_Z],
      [FRONT_GUARD_MAX_X, FRONT_GUARD_Z],
      [SIDE_GUARD_X, FRONT_GUARD_Z],
      [SIDE_GUARD_X, SIDE_GUARD_MIN_Z]
    ];
    for (var postIndex = 0; postIndex < posts.length; postIndex++) {
      roundedBox(0.085, 3.55, 0.085, 0.022, M.machineEdge, posts[postIndex][0], 1.78, posts[postIndex][1], guard);
      roundedBox(0.34, 0.07, 0.32, 0.022, M.machineEdge, posts[postIndex][0], 0.06, posts[postIndex][1], guard);
      for (var anchorSide = -1; anchorSide <= 1; anchorSide += 2) {
        cylinder(0.021, 0.035, M.steel, posts[postIndex][0] + anchorSide * 0.11, 0.105, posts[postIndex][1], guard, 0, 0, 0, 10);
      }
      addContactShadow(posts[postIndex][0], posts[postIndex][1], 0.42, 0.38, 0.5, guard);
    }

    // TB-04 is a steel load-lock cabinet, not another transparent guard panel.
    // It is aligned behind the operator document plate and away from the robot
    // silhouette; the cell-side shutter and operator tray remain independent.
    transferBay = {
      group: new THREE.Group(),
      innerShutter: new THREE.Group(),
      outerHatch: new THREE.Group(),
      carrier: new THREE.Group(),
      innerClosedY: 0.7,
      // Raised far enough that the open jaw/tool swept envelope retains at
      // least 100 mm beneath the shutter lower edge during bay entry.
      innerOpenY: 1.82,
      outerTravel: 0.72
    };
    transferBay.group.position.set(3.12, 1.45, -2.25);
    guard.add(transferBay.group);
    addContactShadow(2.58, -2.23, 0.56, 0.5, 0.64, guard);
    addContactShadow(3.66, -2.23, 0.56, 0.5, 0.64, guard);

    // Continuous powder-coated shell and black cavity liners establish depth.
    // The opaque operator cabinet keeps its depth, but its central cell-side
    // throat is relieved ahead of the shutter. The moving wrist enters that
    // engineered aperture instead of clipping the former full-depth side box.
    roundedBox(1.46, 0.13, 0.82, 0.035, M.machineEdge, 0, 1.4, 0.13, transferBay.group);
    roundedBox(1.46, 0.13, 0.82, 0.035, M.machineEdge, 0, 0, 0.13, transferBay.group);
    roundedBox(0.12, 1.5, 0.82, 0.03, M.machineDark, -0.67, 0.7, 0.13, transferBay.group);
    roundedBox(0.12, 1.5, 0.82, 0.03, M.machineDark, 0.67, 0.7, 0.13, transferBay.group);
    roundedBox(0.045, 1.08, 0.58, 0.014, M.black, -0.56, 0.7, 0.15, transferBay.group);
    roundedBox(0.045, 1.08, 0.58, 0.014, M.black, 0.56, 0.7, 0.15, transferBay.group);
    roundedBox(1.12, 0.045, 0.58, 0.014, M.black, 0, 1.23, 0.15, transferBay.group);
    roundedBox(1.12, 0.045, 0.58, 0.014, M.black, 0, 0.17, 0.15, transferBay.group);

    // Thick operator-side frame, compressible gasket, exposed fasteners.
    roundedBox(1.34, 0.1, 0.11, 0.025, M.machineEdge, 0, 1.3, 0.53, transferBay.group);
    roundedBox(1.34, 0.1, 0.11, 0.025, M.machineEdge, 0, 0.1, 0.53, transferBay.group);
    roundedBox(0.1, 1.3, 0.11, 0.025, M.machineEdge, -0.62, 0.7, 0.53, transferBay.group);
    roundedBox(0.1, 1.3, 0.11, 0.025, M.machineEdge, 0.62, 0.7, 0.53, transferBay.group);
    roundedBox(1.14, 0.025, 0.025, 0.008, M.cable, 0, 1.245, 0.595, transferBay.group);
    roundedBox(1.14, 0.025, 0.025, 0.008, M.cable, 0, 0.155, 0.595, transferBay.group);
    roundedBox(0.025, 1.07, 0.025, 0.008, M.cable, -0.565, 0.7, 0.595, transferBay.group);
    roundedBox(0.025, 1.07, 0.025, 0.008, M.cable, 0.565, 0.7, 0.595, transferBay.group);
    for (var frameFastener = 0; frameFastener < 8; frameFastener++) {
      var fastenerX = frameFastener < 4 ? -0.62 + frameFastener * 0.415 : (frameFastener % 2 ? 0.62 : -0.62);
      var fastenerY = frameFastener < 4 ? 1.3 : 0.29 + Math.floor((frameFastener - 4) / 2) * 0.82;
      cylinder(0.033, 0.01, M.contactAo, fastenerX, fastenerY, 0.585, transferBay.group, Math.PI / 2, 0, 0, 10);
      cylinder(0.018, 0.018, M.steel, fastenerX, fastenerY, 0.6, transferBay.group, Math.PI / 2, 0, 0, 8);
    }

    // The inner shutter is a separate, solid yellow-edged safety barrier. Its
    // overhead housing makes the vertical load path and travel legible.
    roundedBox(1.2, 0.72, 0.24, 0.035, M.machineDark, 0, 1.72, -0.53, transferBay.group);
    roundedBox(1.08, 0.055, 0.27, 0.018, M.yellowDark, 0, 1.37, -0.53, transferBay.group);
    transferBay.innerShutter.position.set(0, transferBay.innerClosedY, -0.53);
    transferBay.group.add(transferBay.innerShutter);
    roundedBox(1.08, 1.02, 0.085, 0.028, M.yellowDark, 0, 0, 0, transferBay.innerShutter);
    roundedBox(0.94, 0.88, 0.06, 0.022, M.machineDark, 0, 0, 0.05, transferBay.innerShutter);
    roundedBox(1.0, 0.055, 0.1, 0.018, M.yellow, 0, -0.47, 0.08, transferBay.innerShutter);
    labelPlane(
      makeLabelTexture(["CELL SIDE", "INNER LOCK"], "#121719", "#d89a08", 250, 100),
      0.44,
      0.17,
      0,
      -0.33,
      0.085,
      transferBay.innerShutter
    );

    // A single pulled document tray replaces the former stacked glass doors.
    // Its opaque backplane always sits directly behind the clipboard, masking
    // the photographed CNC/HMI while the operator is reading the DOM plate.
    transferBay.group.add(transferBay.outerHatch);
    transferBay.outerHatch.add(transferBay.carrier);
    transferBay.carrier.position.set(0, 0.7, -0.42);
    roundedBox(1.16, 1.12, 0.075, 0.028, M.machineDark, 0, 0, -0.06, transferBay.carrier);
    roundedBox(1.04, 1.0, 0.035, 0.018, M.dark, 0, 0, -0.015, transferBay.carrier);
    roundedBox(0.055, 1.04, 0.08, 0.018, M.brushed, -0.55, 0, 0.015, transferBay.carrier);
    roundedBox(0.055, 1.04, 0.08, 0.018, M.brushed, 0.55, 0, 0.015, transferBay.carrier);
    roundedBox(1.14, 0.07, 0.08, 0.02, M.brushed, 0, -0.54, 0.35, transferBay.carrier);
    roundedBox(1.04, 0.055, 0.76, 0.018, M.brushed, 0, -0.52, 0.36, transferBay.carrier);
    roundedBox(0.07, 0.07, 0.9, 0.018, M.steel, -0.52, -0.48, 0.39, transferBay.carrier);
    roundedBox(0.07, 0.07, 0.9, 0.018, M.steel, 0.52, -0.48, 0.39, transferBay.carrier);
    roundedBox(0.035, 0.022, 0.78, 0.008, M.burnished, -0.52, -0.435, 0.39, transferBay.carrier);
    roundedBox(0.035, 0.022, 0.78, 0.008, M.burnished, 0.52, -0.435, 0.39, transferBay.carrier);
    roundedBox(0.18, 0.28, 0.1, 0.025, M.yellowDark, 0.49, 0.1, 0.04, transferBay.carrier);
    roundedBox(0.07, 0.17, 0.08, 0.02, M.joint, 0.49, 0.1, 0.1, transferBay.carrier);
    cylinder(0.045, 0.018, M.grease, 0.49, 0.1, 0.145, transferBay.carrier, Math.PI / 2, 0, 0, 16);
    var carrierHandle = roundedBox(0.48, 0.07, 0.11, 0.025, M.steel, 0, -0.42, 0.94, transferBay.outerHatch);
    // The handle is too small and high to produce a distinct readable floor
    // shadow; the tray/backplane mass remains a live caster.
    carrierHandle.castShadow = false;

    // Fixed slide rails and pedestal legs carry the tray load directly to the
    // slab; gussets and a cross-tie prevent the cabinet from reading as floating.
    roundedBox(0.075, 0.075, 0.96, 0.018, M.steel, -0.53, 0.17, 0.01, transferBay.group);
    roundedBox(0.075, 0.075, 0.96, 0.018, M.steel, 0.53, 0.17, 0.01, transferBay.group);
    roundedBox(0.13, 1.38, 0.16, 0.028, M.machineEdge, -0.54, -0.71, 0.02, transferBay.group);
    roundedBox(0.13, 1.38, 0.16, 0.028, M.machineEdge, 0.54, -0.71, 0.02, transferBay.group);
    roundedBox(1.16, 0.11, 0.15, 0.025, M.machineEdge, 0, -1.02, 0.02, transferBay.group);
    var leftGusset = roundedBox(0.1, 0.56, 0.18, 0.025, M.machineEdge, -0.43, -0.23, 0.02, transferBay.group);
    leftGusset.rotation.z = -0.52;
    var rightGusset = roundedBox(0.1, 0.56, 0.18, 0.025, M.machineEdge, 0.43, -0.23, 0.02, transferBay.group);
    rightGusset.rotation.z = 0.52;
    roundedBox(0.19, 0.075, 0.19, 0.018, M.contactAo, -0.54, -0.035, 0.02, transferBay.group);
    roundedBox(0.19, 0.075, 0.19, 0.018, M.contactAo, 0.54, -0.035, 0.02, transferBay.group);
    for (var cabinetFoot = -1; cabinetFoot <= 1; cabinetFoot += 2) {
      roundedBox(0.42, 0.075, 0.4, 0.022, M.machineEdge, cabinetFoot * 0.54, -1.39, 0.02, transferBay.group);
      cylinder(0.024, 0.04, M.steel, cabinetFoot * 0.54 - 0.12, -1.335, -0.08, transferBay.group, 0, 0, 0, 10);
      cylinder(0.024, 0.04, M.steel, cabinetFoot * 0.54 + 0.12, -1.335, 0.12, transferBay.group, 0, 0, 0, 10);
    }

    // Gate hardware and monitored latch on the machine-side panel.
    cylinder(0.036, 1.05, M.steel, 2.65, 2.2, -4.42, guard, 0, 0, 0, 14);
    cylinder(0.036, 1.05, M.steel, 2.65, 0.92, -4.42, guard, 0, 0, 0, 14);
    roundedBox(0.2, 0.34, 0.14, 0.035, M.yellowDark, 3.0, 1.72, -3.72, guard);
    roundedBox(0.1, 0.19, 0.08, 0.025, M.joint, 2.93, 1.72, -3.62, guard);

    // Operator-side mushroom stop is independent of the stacklight material.
    roundedBox(0.25, 0.34, 0.16, 0.04, M.yellow, -0.78, 0.42, 0.58, transferBay.group);
    cylinder(0.085, 0.09, M.red, -0.78, 0.56, 0.7, transferBay.group, Math.PI / 2, 0, 0, 20);
    labelPlane(
      makeLabelTexture(["TB-04", "INTERLOCKED LOAD LOCK"], "#121719", "#e2aa0a", 360, 120),
      0.74,
      0.25,
      0,
      1.17,
      0.605,
      transferBay.group
    );
  }

  function buildMachineProxy() {
    var group = new THREE.Group();
    scene.add(group);

    // The photograph already contains a convincing gantry. Modeling another
    // solid beam over it created the most obvious "game prop" silhouette, so
    // only the service drops that participate in the foreground cell remain.
    addCable(group, [[-1.22, 6.1, -6.8], [-1.2, 5.42, -6.48], [-1.14, 4.78, -5.92]], 0);
    addCable(group, [[3.18, 6.08, -6.82], [3.16, 5.34, -6.42], [3.1, 4.64, -5.72]], 0);
    cylinder(0.045, 0.28, M.yellowDark, -1.14, 4.68, -5.92, group, 0, 0, 0, 14);
    cylinder(0.045, 0.28, M.yellowDark, 3.1, 4.54, -5.72, group, 0, 0, 0, 14);

    // The photograph remains the realism anchor. Only moving/occluding pieces
    // are modeled here so the robot can genuinely pass behind the CNC face.
    addContactShadow(3.76, -6.05, 3.65, 1.28, 0.3, group);
    box(2.78, 2.35, 0.18, M.cavity, 3.76, 2.27, -6.68, group);
    roundedBox(3.06, 0.25, 1.05, 0.042, M.machineDark, 3.76, 0.69, -6.18, group);
    roundedBox(0.16, 2.68, 0.37, 0.032, M.machineEdge, 2.35, 2.22, -5.62, group);
    roundedBox(0.16, 2.68, 0.37, 0.032, M.machineEdge, 5.15, 2.22, -5.62, group);
    roundedBox(2.96, 0.16, 0.37, 0.032, M.machineEdge, 3.75, 3.55, -5.62, group);
    roundedBox(2.96, 0.13, 0.37, 0.028, M.machineEdge, 3.75, 0.9, -5.62, group);
    box(2.72, 0.05, 0.07, M.cable, 3.75, 3.41, -5.38, group);
    box(2.72, 0.045, 0.07, M.cable, 3.75, 1.01, -5.38, group);

    // Chip pan, coolant gutter, and fasteners break up the black cavity with
    // details that have recognizable manufacturing purpose.
    var chipPan = roundedBox(2.36, 0.11, 0.88, 0.033, M.brushed, 3.73, 1.07, -6.03, group);
    chipPan.rotation.x = -0.035;
    box(2.24, 0.04, 0.045, M.cable, 3.73, 1.15, -5.59, group);
    for (var frameBolt = 0; frameBolt < 6; frameBolt++) {
      cylinder(0.023, 0.016, M.steel, 2.43 + frameBolt * 0.52, 3.49, -5.39, group, Math.PI / 2, 0, 0, 10);
    }

    var door = new THREE.Group();
    door.position.set(1.52, 0, 0);
    group.add(door);
    roundedBox(2.34, 2.4, 0.17, 0.052, M.machineDark, 3.72, 2.27, -5.45, door);
    roundedBox(1.88, 1.68, 0.045, 0.042, M.cable, 3.72, 2.4, -5.32, door);
    roundedBox(1.74, 1.54, 0.035, 0.034, M.glass, 3.72, 2.4, -5.285, door);
    box(1.98, 0.05, 0.07, M.steel, 3.72, 3.25, -5.245, door);
    box(0.05, 1.82, 0.07, M.steel, 4.72, 2.39, -5.245, door);
    roundedBox(0.065, 2.0, 0.085, 0.023, M.steel, 4.84, 2.27, -5.22, door);
    cylinder(0.042, 0.43, M.steel, 4.87, 2.23, -5.15, door);
    labelPlane(
      makeLabelTexture(["CAUTION", "AUTO DOOR"], "#171b1c", "#e6a80b", 260, 110),
      0.58,
      0.24,
      2.82,
      1.14,
      -5.335,
      door
    );

    var spindle = new THREE.Group();
    spindle.position.set(3.07, 2.02, -6.23);
    group.add(spindle);
    cylinder(0.38, 0.3, M.joint, 0, 0, 0, spindle, Math.PI / 2, 0, 0, 20);
    cylinder(0.25, 0.35, M.steel, 0, 0, 0.12, spindle, Math.PI / 2, 0, 0, 20);
    for (var jaw = 0; jaw < 3; jaw++) {
      var angle = jaw * Math.PI * 2 / 3;
      var jawMesh = box(0.12, 0.28, 0.1, M.brushed, Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0.35, spindle);
      jawMesh.rotation.z = angle;
    }

    var tower = new THREE.Group();
    tower.position.set(6.52, 4.66, -5.82);
    group.add(tower);
    cylinder(0.04, 0.34, M.machineEdge, 0, -0.22, 0, tower, 0, 0, 0, 14);
    cylinder(0.094, 0.045, M.joint, 0, 0.22, 0, tower, 0, 0, 0, 16);
    var towerRed = M.red.clone();
    var towerAmber = M.amber.clone();
    var towerGreen = M.green.clone();
    cylinder(0.085, 0.13, towerRed, 0, 0.14, 0, tower, 0, 0, 0, 18);
    cylinder(0.085, 0.13, towerAmber, 0, 0, 0, tower, 0, 0, 0, 18);
    cylinder(0.085, 0.13, towerGreen, 0, -0.14, 0, tower, 0, 0, 0, 18);

    travelerRack = new THREE.Group();
    // Seven physical clipboards hang on the inside face of the guarded fence:
    // four above, three below. The robot remains inside the cell and pulls
    // each board normal to the mesh; it never reaches into the viewer aisle.
    travelerRack.position.set(-1.75, 1.33, -2.45);
    travelerRack.scale.setScalar(0.72);
    group.add(travelerRack);
    instanceFixedGeometry(
      roundedBoxGeometry(4.1, 0.085, 0.1, 0.025),
      M.machineEdge,
      [[0, 1.55, 0.16], [0, -1.55, 0.16]],
      travelerRack
    );
    // Preserve the authored rack transform while extending only its load path
    // to grade. Local y=-1.847 maps to the photographed floor at world y=0.
    instanceFixedGeometry(
      roundedBoxGeometry(0.1, 3.36, 0.1, 0.025),
      M.yellow,
      [[-2.05, -0.08, 0.16], [2.05, -0.08, 0.16]],
      travelerRack
    );
    instanceFixedGeometry(
      roundedBoxGeometry(0.56, 0.08, 0.5, 0.025),
      M.machineEdge,
      [[-2.05, -1.807, 0.04], [2.05, -1.807, 0.04]],
      travelerRack
    );
    // Rear mounting rails carry the seven cassette loads into two secondary
    // uprights without crossing any board face or robot approach centerline.
    instanceFixedGeometry(
      roundedBoxGeometry(3.42, 0.06, 0.065, 0.018),
      M.machineEdge,
      [[0, 0.95, 0.095], [0, 0, 0.095], [0, -0.95, 0.095]],
      travelerRack
    );
    instanceFixedGeometry(
      roundedBoxGeometry(0.065, 3.32, 0.065, 0.018),
      M.machineEdge,
      [[-1.55, -0.08, 0.095], [1.55, -0.08, 0.095]],
      travelerRack
    );
    instanceFixedGeometry(
      roundedBoxGeometry(0.42, 0.08, 0.42, 0.022),
      M.machineEdge,
      [[-1.55, -1.807, 0.04], [1.55, -1.807, 0.04]],
      travelerRack
    );
    instanceFixedGeometry(
      cylinderGeometry(0.028, 0.026, 10),
      M.steel,
      [
        [-1.68, -1.755, 0.04], [-1.42, -1.755, 0.04],
        [1.68, -1.755, 0.04], [1.42, -1.755, 0.04]
      ],
      travelerRack
    );
    instanceFixedGeometry(
      cylinderGeometry(0.034, 0.03, 12),
      M.steel,
      [
        [-2.22, -1.755, 0.24], [-1.88, -1.755, 0.24],
        [2.22, -1.755, 0.24], [1.88, -1.755, 0.24]
      ],
      travelerRack
    );
    // Corner markers echo the photographed fence posts while leaving most of
    // the perimeter as non-competing charcoal powder coat.
    instanceFixedGeometry(
      roundedBoxGeometry(0.18, 0.18, 0.115, 0.03),
      M.yellow,
      [
        [-1.74, 1.55, 0.165], [1.74, 1.55, 0.165],
        [-1.74, -1.55, 0.165], [1.74, -1.55, 0.165]
      ],
      travelerRack
    );
    // Four load brackets tie the cassette bank to the single world-space
    // polycarbonate datum built below. The old dense local wire grid was a
    // second, offset guard plane that produced moire and false intersections.
    instanceFixedGeometry(
      roundedBoxGeometry(0.16, 0.12, 0.12, 0.025),
      M.machineEdge,
      [
        [-1.55, -1.2, 0.2], [-1.55, 1.2, 0.2],
        [1.55, -1.2, 0.2], [1.55, 1.2, 0.2]
      ],
      travelerRack
    );

    buildTravelers();
    // Rack shadows live in machine/world space: placing them inside the scaled,
    // elevated rack group would lift the decals more than a metre above grade.
    addContactShadow(-3.23, -2.42, 0.5, 0.42, 0.58, group);
    addContactShadow(-0.27, -2.42, 0.5, 0.42, 0.58, group);
    addContactShadow(-2.87, -2.42, 0.38, 0.34, 0.5, group);
    addContactShadow(-0.63, -2.42, 0.38, 0.34, 0.5, group);
    buildSafetyPerimeter(group);
    buildHmi();
    buildMachiningSpray(group);

    machineRig = {
      group: group,
      door: door,
      spindle: spindle,
      towerGreen: towerGreen,
      towerAmber: towerAmber,
      towerRed: towerRed,
      doorTravel: 1.52,
      doorOpen: 1
    };
  }

  function drawTravelerFace(ctx, meta, x, y, w, h) {
    var hex = "#" + ("000000" + meta.color.toString(16)).slice(-6);
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#f3f0e7";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#141c20";
    ctx.fillRect(0, 0, w, 48);
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, 12, h);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 15px ui-monospace, monospace";
    ctx.fillText("RACK " + meta.key + " / CLIPBOARD", 24, 30);
    ctx.fillStyle = "#162126";
    ctx.font = "800 25px system-ui, sans-serif";
    ctx.fillText(meta.label, 24, 91);
    ctx.fillStyle = "#5a666b";
    ctx.font = "600 14px system-ui, sans-serif";
    ctx.fillText(meta.detail, 24, 117);
    // The old nine 3px source rules projected below two screen pixels behind
    // the guard and shimmered. Identity/header/footer remain; only those
    // non-semantic interior hairlines are omitted from this wide-camera LOD.
    ctx.fillStyle = hex;
    ctx.fillRect(24, h - 62, w - 48, 32);
    ctx.fillStyle = "#10171a";
    ctx.font = "800 12px ui-monospace, monospace";
    ctx.fillText("FENCE COPY / CELL 04", 33, h - 42);
    ctx.restore();
  }

  function buildTravelerFaceAtlas() {
    var atlasWidth = 1024;
    var atlasHeight = 1024;
    var cellWidth = 240;
    var cellHeight = 320;
    var canvas = document.createElement("canvas");
    canvas.width = atlasWidth;
    canvas.height = atlasHeight;
    var ctx = canvas.getContext("2d", { alpha: false });
    // Paper-colored gutters prevent dark mip bleed between station cells.
    ctx.fillStyle = "#f3f0e7";
    ctx.fillRect(0, 0, atlasWidth, atlasHeight);
    var rects = {};
    for (var station = 0; station < STATIONS.length; station++) {
      var meta = STATIONS[station];
      var tileX = station % 4 * 256;
      var tileY = Math.floor(station / 4) * 512;
      var cellX = tileX + 8;
      var cellY = tileY + 96;
      drawTravelerFace(ctx, meta, cellX, cellY, cellWidth, cellHeight);
      rects[meta.id] = Object.freeze({
        stationIndex: station,
        u0: cellX / atlasWidth,
        u1: (cellX + cellWidth) / atlasWidth,
        v0: 1 - (cellY + cellHeight) / atlasHeight,
        v1: 1 - cellY / atlasHeight
      });
    }
    var ids = Object.keys(rects);
    if (ids.length !== STATIONS.length) throw new Error("Traveler atlas must map exactly seven stations");
    for (var proofIndex = 0; proofIndex < STATIONS.length; proofIndex++) {
      var proofMeta = STATIONS[proofIndex];
      if (!rects[proofMeta.id] || rects[proofMeta.id].stationIndex !== proofIndex) {
        throw new Error("Traveler atlas station mapping mismatch: " + proofMeta.id);
      }
    }
    var texture = tuneRackTexture(new THREE.CanvasTexture(canvas));
    setTextureSRGB(texture);
    texture.userData.stationIds = STATIONS.map(function (meta) { return meta.id; });
    texture.needsUpdate = true;
    return { texture: texture, rects: Object.freeze(rects) };
  }

  function applyAtlasRect(geometry, rect) {
    var uv = geometry && geometry.getAttribute("uv");
    if (!uv || !rect) return geometry;
    for (var uvIndex = 0; uvIndex < uv.count; uvIndex++) {
      var sourceU = uv.getX(uvIndex);
      var sourceV = uv.getY(uvIndex);
      uv.setXY(
        uvIndex,
        rect.u0 + sourceU * (rect.u1 - rect.u0),
        rect.v0 + sourceV * (rect.v1 - rect.v0)
      );
    }
    uv.needsUpdate = true;
    return geometry;
  }

  function tuneRackTexture(texture) {
    if (!texture) return texture;
    texture.generateMipmaps = true;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter =
      THREE.LinearMipmapLinearFilter || THREE.LinearMipMapLinearFilter || THREE.LinearFilter;
    if (renderer && renderer.capabilities && renderer.capabilities.getMaxAnisotropy) {
      texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    }
    texture.needsUpdate = true;
    return texture;
  }

  function cassetteLabelTexture(meta) {
    return tuneRackTexture(makeTexture(function (ctx, w, h) {
      var hex = "#" + ("000000" + meta.color.toString(16)).slice(-6);
      ctx.fillStyle = "#20282b";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, 14, h);
      ctx.strokeStyle = "#798386";
      ctx.lineWidth = 4;
      ctx.strokeRect(3, 3, w - 6, h - 6);
      ctx.fillStyle = "#f2f4f2";
      ctx.font = "900 42px ui-monospace, monospace";
      ctx.fillText("0" + meta.key, 28, 51);
      ctx.fillStyle = "#aeb8b9";
      ctx.font = "800 17px ui-monospace, monospace";
      ctx.fillText("FIXTURE / " + meta.label, 92, 38);
      ctx.fillStyle = "#7f8b8d";
      ctx.font = "700 13px ui-monospace, monospace";
      ctx.fillText("DOC CASSETTE", 92, 61);
    }, 320, 88));
  }

  function setCassetteOccupied(traveler, occupied) {
    if (!traveler) return;
    traveler.cassetteOccupied = !!occupied;
    if (traveler.occupancyFlag) {
      traveler.occupancyFlag.rotation.z = occupied ? 0 : -Math.PI / 2;
      traveler.occupancyFlag.userData.occupied = !!occupied;
    }
  }

  function buildTravelers() {
    var cardMaterial = standard(0x8a6037, 0x000000, 0, 0.72, 0.05, {
      envMapIntensity: 0.42
    });
    var faceAtlas = buildTravelerFaceAtlas();
    var faceMaterial = new THREE.MeshStandardMaterial({
      map: faceAtlas.texture,
      emissive: 0xffffff,
      emissiveMap: faceAtlas.texture,
      emissiveIntensity: 0.075,
      roughness: 0.9,
      metalness: 0,
      envMapIntensity: 0.2,
      fog: true
    });
    var cassetteBatches = {
      sideRails: [],
      lowerRails: [],
      contactPads: [],
      hookRears: [],
      hookSaddles: [],
      hookNoses: [],
      stopShoulders: [],
      stopPins: []
    };
    for (var i = 0; i < STATIONS.length; i++) {
      var meta = STATIONS[i];
      var group = new THREE.Group();
      var topRow = i < 4;
      var column = topRow ? i : i - 4;
      var homeX = topRow
        ? (column - 1.5) * RACK_STATION_PITCH_LOCAL
        : (column - 1) * RACK_STATION_PITCH_LOCAL;
      var homeY = topRow ? 0.5 : -0.5;

      // Fixed open-center cassette remains on the guard when its numbered
      // clipboard leaves. Side rails and lower load rail sit operator-side of
      // the board, while the center stays clear for the robot approach.
      var cassette = new THREE.Group();
      cassette.position.set(homeX, homeY, 0);
      travelerRack.add(cassette);
      cassetteBatches.sideRails.push(
        [homeX - 0.32, homeY - 0.01, 0.09],
        [homeX + 0.32, homeY - 0.01, 0.09]
      );
      cassetteBatches.lowerRails.push([homeX, homeY - 0.425, 0.09]);
      cassetteBatches.contactPads.push(
        [homeX - 0.19, homeY - 0.402, 0.035],
        [homeX + 0.19, homeY - 0.402, 0.035]
      );

      // Two formed top hooks: rear strap, over-edge saddle, and short front
      // nose. They retain the backer but leave the center coupler unobstructed.
      for (var hookSide = -1; hookSide <= 1; hookSide += 2) {
        cassetteBatches.hookRears.push([homeX + hookSide * 0.19, homeY + 0.38, 0.005]);
        cassetteBatches.hookSaddles.push([homeX + hookSide * 0.19, homeY + 0.405, 0.03]);
        cassetteBatches.hookNoses.push([homeX + hookSide * 0.19, homeY + 0.373, 0.078]);
      }
      // Shouldered lower stops end at the backer plane rather than passing
      // through the clipboard as the former locating pins did.
      for (var stopSide = -1; stopSide <= 1; stopSide += 2) {
        cassetteBatches.stopShoulders.push([
          homeX + stopSide * 0.2, homeY - 0.411, -0.046, Math.PI / 2, 0, 0
        ]);
        cassetteBatches.stopPins.push([
          homeX + stopSide * 0.2, homeY - 0.411, 0.001, Math.PI / 2, 0, 0
        ]);
      }

      var cassetteTexture = cassetteLabelTexture(meta);
      var cassettePlateMaterial = new THREE.MeshStandardMaterial({
        map: cassetteTexture,
        emissive: 0x111918,
        emissiveMap: cassetteTexture,
        emissiveIntensity: 0.035,
        roughness: 0.66,
        metalness: 0.2,
        envMapIntensity: 0.5
      });
      var cassettePlate = new THREE.Mesh(new THREE.PlaneGeometry(0.27, 0.075), cassettePlateMaterial);
      cassettePlate.position.set(0, -0.47, 0.108);
      cassettePlate.receiveShadow = dynamicShadows;
      cassette.add(cassettePlate);

      var occupancyFlag = new THREE.Group();
      occupancyFlag.position.set(0.315, 0.31, 0.106);
      cassette.add(occupancyFlag);
      roundedBox(0.042, 0.14, 0.018, 0.008, M.machineEdge, 0, -0.07, 0, occupancyFlag);
      roundedBox(0.036, 0.045, 0.021, 0.008, M.yellow, 0, -0.122, 0.002, occupancyFlag);
      cylinder(0.026, 0.018, M.steel, 0, 0, 0, occupancyFlag, Math.PI / 2, 0, 0, 10);

      group.position.set(homeX, homeY, 0.045);
      travelerRack.add(group);

      // Thin phenolic backer, paper face, and spring clip replace the former
      // 22 mm slab while keeping the group origin and pickup coupler unchanged.
      roundedBox(
        RACK_BOARD_WIDTH_LOCAL,
        RACK_BOARD_HEIGHT_LOCAL,
        0.012,
        0.018,
        cardMaterial,
        0,
        0,
        0,
        group
      );
      var faceGeometry = applyAtlasRect(
        new THREE.PlaneGeometry(0.526, 0.69),
        faceAtlas.rects[meta.id]
      );
      var face = new THREE.Mesh(faceGeometry, faceMaterial);
      face.position.set(0, -0.018, 0.0075);
      face.receiveShadow = dynamicShadows;
      face.userData = { hmiAction: 'station', stationId: meta.id, enabled: true };
      group.add(face);
      hmiInteractives.push(face);
      roundedBox(0.21, 0.052, 0.018, 0.012, M.burnished, 0, 0.348, 0.018, group);
      roundedBox(0.145, 0.11, 0.014, 0.018, M.brushed, 0, 0.421, -0.004, group);
      roundedBox(0.14, 0.1, 0.06, 0.025, M.joint, 0, 0.45, -0.04, group);
      instanceCylinders([
        [0, 0.386, 0.006, 0.024, 0.18, 0, 0, Math.PI / 2],
        [0, 0.498, -0.038, 0.018, 0.13, 0, 0, Math.PI / 2]
      ], M.steel, group, 14);
      var tabMaterial = standard(meta.color, 0x000000, 0, 0.58, 0.04, { envMapIntensity: 0.45 });
      roundedBox(0.035, 0.11, 0.02, 0.008, tabMaterial, 0.255, 0.3, 0.014, group);

      var traveler = {
        id: meta.id,
        group: group,
        cassette: cassette,
        occupancyFlag: occupancyFlag,
        cassetteOccupied: true,
        homePosition: new THREE.Vector3(homeX, homeY, 0.045),
        homeQuaternion: group.quaternion.clone(),
        restowStartPosition: new THREE.Vector3(),
        restowStartQuaternion: new THREE.Quaternion(),
        attached: false,
        custody: "rack"
      };
      travelers.push(traveler);
      setCassetteOccupied(traveler, true);
    }

    // Eight instanced draws replace 105 individual cassette hardware draws.
    // The batches live directly in rack space; traveler groups and every
    // authored home/TCP transform remain independent and unchanged.
    instanceFixedGeometry(
      roundedBoxGeometry(0.035, 0.86, 0.045, 0.012),
      M.machineEdge,
      cassetteBatches.sideRails,
      travelerRack
    );
    instanceFixedGeometry(
      roundedBoxGeometry(0.67, 0.045, 0.05, 0.012),
      M.machineEdge,
      cassetteBatches.lowerRails,
      travelerRack
    );
    instanceFixedGeometry(
      roundedBoxGeometry(0.16, 0.035, 0.04, 0.01),
      M.contactAo,
      cassetteBatches.contactPads,
      travelerRack
    );
    instanceFixedGeometry(
      roundedBoxGeometry(0.04, 0.12, 0.04, 0.012),
      M.steel,
      cassetteBatches.hookRears,
      travelerRack
    );
    instanceFixedGeometry(
      roundedBoxGeometry(0.04, 0.035, 0.11, 0.01),
      M.burnished,
      cassetteBatches.hookSaddles,
      travelerRack
    );
    instanceFixedGeometry(
      roundedBoxGeometry(0.04, 0.065, 0.022, 0.008),
      M.steel,
      cassetteBatches.hookNoses,
      travelerRack
    );
    instanceFixedGeometry(
      cylinderGeometry(0.035, 0.018, 12),
      M.machineEdge,
      cassetteBatches.stopShoulders,
      travelerRack
    );
    instanceFixedGeometry(
      cylinderGeometry(0.021, 0.076, 12),
      M.steel,
      cassetteBatches.stopPins,
      travelerRack
    );
  }

  function buildHmi() {
    hmiCanvas = document.createElement("canvas");
    var hmiSampleSize = lowPower ? 768 : 1024;
    hmiCanvas.width = hmiSampleSize;
    hmiCanvas.height = hmiSampleSize;
    hmiContext = hmiCanvas.getContext("2d", { alpha: false });
    hmiTexture = new THREE.CanvasTexture(hmiCanvas);
    setTextureSRGB(hmiTexture);
    hmiTexture.generateMipmaps = true;
    hmiTexture.magFilter = THREE.LinearFilter;
    hmiTexture.minFilter =
      THREE.LinearMipmapLinearFilter || THREE.LinearMipMapLinearFilter || THREE.LinearFilter;
    if (renderer && renderer.capabilities && renderer.capabilities.getMaxAnisotropy) {
      hmiTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    }

    hmiAssembly = new THREE.Group();
    hmiAssembly.position.set(4.62, 2.74, -3.08);
    hmiAssembly.scale.set(1.04, 1.04, 1.04);
    hmiAssembly.rotation.set(0.035, -0.424, 0);
    scene.add(hmiAssembly);

    // Fixed pendant: deep rear shell, compressed gasket, inset bezel, and
    // serviceable corner fasteners surround the emissive operator display.
    roundedBox(1.2, 1.26, 0.18, 0.055, M.machineDark, 0, 0, -0.005, hmiAssembly);
    roundedBox(1.1, 1.12, 0.045, 0.026, M.cable, 0, 0, 0.075, hmiAssembly);
    roundedBox(1.055, 1.055, 0.026, 0.021, M.black, 0, 0, 0.096, hmiAssembly);
    var pendantFasteners = [
      [-0.55, 0.57, 0.107, 0.018, 0.018, Math.PI / 2, 0, 0],
      [0.55, 0.57, 0.107, 0.018, 0.018, Math.PI / 2, 0, 0],
      [-0.55, -0.57, 0.107, 0.018, 0.018, Math.PI / 2, 0, 0],
      [0.55, -0.57, 0.107, 0.018, 0.018, Math.PI / 2, 0, 0]
    ];
    instanceCylinders(pendantFasteners, M.steel, hmiAssembly, 10);
    // Rear casting, VESA boss, and articulated support keep the screen from
    // reading as a floating gray card when the camera pulls back.
    roundedBox(0.7, 0.72, 0.12, 0.045, M.machineEdge, 0, 0, -0.13, hmiAssembly);
    cylinder(0.075, 0.13, M.joint, -0.42, -0.4, -0.2, hmiAssembly, Math.PI / 2, 0, 0, 18);
    roundedBox(0.085, 0.48, 0.085, 0.022, M.machineEdge, -0.42, -0.64, -0.25, hmiAssembly);
    cylinder(0.09, 0.1, M.joint, -0.42, -0.89, -0.25, hmiAssembly, Math.PI / 2, 0, 0, 18);
    var screenMaterial = new THREE.MeshBasicMaterial({
      map: hmiTexture,
      toneMapped: false,
      fog: false
    });
    var screen = new THREE.Mesh(new THREE.PlaneGeometry(0.98, 0.98), screenMaterial);
    screen.position.z = 0.114;
    hmiAssembly.add(screen);

    var reflectionTexture = makeTexture(function (ctx, w, h) {
      var reflection = ctx.createLinearGradient(w * 0.14, 0, w * 0.39, h);
      reflection.addColorStop(0, "rgba(255,255,255,0)");
      reflection.addColorStop(0.38, "rgba(255,255,255,0)");
      reflection.addColorStop(0.48, "rgba(255,255,255,0.18)");
      reflection.addColorStop(0.56, "rgba(255,255,255,0.045)");
      reflection.addColorStop(0.66, "rgba(255,255,255,0)");
      reflection.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = reflection;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(190,226,232,0.11)";
      ctx.lineWidth = Math.max(1, w * 0.006);
      ctx.strokeRect(w * 0.012, h * 0.012, w * 0.976, h * 0.976);
    }, 256, 256);
    var reflection = new THREE.Mesh(
      new THREE.PlaneGeometry(0.972, 0.972),
      new THREE.MeshBasicMaterial({
        map: reflectionTexture,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
        toneMapped: false,
        fog: false
      })
    );
    reflection.material.opacity = 0.24;
    reflection.position.z = 0.121;
    hmiAssembly.add(reflection);

    var launcherMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
      colorWrite: false
    });
    // A slightly forgiving hit plane keeps the physical HMI at a 44px-class
    // touch target even on short 320px phone viewports.
    var launcher = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 1.12), launcherMaterial);
    launcher.position.z = 0.125;
    launcher.userData = { hmiAction: "inspect", enabled: true };
    hmiAssembly.add(launcher);
    hmiInteractives.push(launcher);

    for (var i = 0; i < STATIONS.length; i++) {
      var columnIndex = i < 4 ? 0 : 1;
      var rowIndex = i < 4 ? i : i - 4;
      var cellCenterX = 198 + columnIndex * 370;
      var cellCenterY = 266 + rowIndex * 120;
      var localX = (cellCenterX / 768 - 0.5) * 0.98;
      var localY = 0.49 - cellCenterY / 768 * 0.98;
      var row = new THREE.Mesh(new THREE.PlaneGeometry(0.434, 0.151), launcherMaterial.clone());
      row.position.set(localX, localY, 0.135);
      row.userData = {
        hmiAction: "station",
        stationId: STATIONS[i].id,
        enabled: false
      };
      hmiAssembly.add(row);
      hmiInteractives.push(row);
    }

    var back = new THREE.Mesh(new THREE.PlaneGeometry(0.245, 0.072), launcherMaterial.clone());
    back.position.set(0.332, 0.265, 0.14);
    back.userData = { hmiAction: "back", enabled: false };
    hmiAssembly.add(back);
    hmiInteractives.push(back);

    // Separate collar, actuator, cable gland, and strain relief make the lower
    // pendant rail read as serviceable hardware rather than a decorative bar.
    cylinder(0.084, 0.038, M.joint, 0.4, -0.67, 0.071, hmiAssembly, Math.PI / 2, 0, 0, 18);
    cylinder(0.068, 0.028, M.yellow, 0.4, -0.67, 0.098, hmiAssembly, Math.PI / 2, 0, 0, 18);
    cylinder(0.049, 0.052, M.red, 0.4, -0.67, 0.136, hmiAssembly, Math.PI / 2, 0, 0, 18);
    roundedBox(0.58, 0.075, 0.085, 0.026, M.machineEdge, 0, -0.67, 0.045, hmiAssembly);
    cylinder(0.018, 0.02, M.steel, -0.245, -0.67, 0.09, hmiAssembly, Math.PI / 2, 0, 0, 10);
    cylinder(0.018, 0.02, M.steel, 0.245, -0.67, 0.09, hmiAssembly, Math.PI / 2, 0, 0, 10);
    cylinder(0.056, 0.1, M.joint, 0, -0.69, -0.075, hmiAssembly, 0, 0, 0, 16);
    cylinder(0.036, 0.18, M.cable, 0, -0.8, -0.075, hmiAssembly, 0, 0, 0, 12);
    labelPlane(
      makeLabelTexture(["E-STOP"], "#1a1d1e", "#d7a20b", 180, 72),
      0.18,
      0.07,
      0.2,
      -0.67,
      0.096,
      hmiAssembly
    );
    drawHmi();
  }

  function drawHmi() {
    if (!hmiContext || !hmiTexture) return;
    var ctx = hmiContext;
    var w = hmiCanvas.width;
    var h = hmiCanvas.height;
    var mode = controllerMode();
    var accent = mode === "fault" ? "#e45950" : mode === "access" ? "#4fc8d0" : mode === "hold" ? "#e2ad43" : "#50cf91";
    var accentDark = mode === "fault" ? "#351a1a" : mode === "access" ? "#123138" : mode === "hold" ? "#352b18" : "#123128";
    var modeLabel = mode === "fault" ? "SAFETY STOP" : mode === "access" ? "OUTER ACCESS" : mode === "hold" ? "AUTO HOLD" : "AUTO RUN";
    var stripCopy = mode === "fault"
      ? "ALARM  SAFETY CIRCUIT NOT PROVED / RESET REQUIRED"
      : mode === "access"
        ? "ACCESS  INNER LOCK PROVED / ROBOT CLEAR / OUTER ENABLED"
        : mode === "hold"
          ? "STATUS  AUTO HOLD / TRANSFER ACTIVE / OUTER LOCKED"
          : "STATUS  INTERLOCKS PROVED / CELL CYCLING / REQUESTS ENABLED";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#071014";
    ctx.fillRect(0, 0, w, h);
    ctx.scale(w / 768, h / 768);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    // Fixed PLC hierarchy: controller identity, mode, safety, then the active
    // command page. The same header never jumps between interaction states.
    ctx.fillStyle = "#0d181d";
    ctx.fillRect(0, 0, 768, 96);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 768, 5);
    ctx.fillStyle = "#eef4f3";
    ctx.font = "850 28px ui-monospace, monospace";
    ctx.fillText("MC-04 / HMI-04", 28, 42);
    ctx.fillStyle = "#869ba1";
    ctx.font = "700 14px ui-monospace, monospace";
    ctx.fillText("DOCUMENT TRANSFER CONTROL / LOCAL PENDANT", 28, 71);
    ctx.fillStyle = accentDark;
    ctx.fillRect(548, 18, 192, 64);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(548, 18, 192, 64);
    ctx.textAlign = "center";
    ctx.fillStyle = accent;
    ctx.font = "900 20px ui-monospace, monospace";
    ctx.fillText(modeLabel, 644, 47);
    ctx.fillStyle = "#c5d0d1";
    ctx.font = "700 11px ui-monospace, monospace";
    ctx.fillText(mode === "fault" ? "RESET REQUIRED" : "SAFETY PROVED", 644, 68);
    ctx.textAlign = "left";

    ctx.fillStyle = accentDark;
    ctx.fillRect(0, 96, 768, 44);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 96, 8, 44);
    ctx.font = "800 15px ui-monospace, monospace";
    ctx.fillText(stripCopy, 24, 124);

    if (mode === "run" && !hmiInspect) {
      var openPressed = hmiPressed === "__inspect";
      var openHover = hmiHover === "__inspect";
      ctx.fillStyle = "#81959b";
      ctx.font = "700 16px ui-monospace, monospace";
      ctx.fillText("PRIMARY ACTION / DOCUMENT SERVICE", 28, 176);
      ctx.fillStyle = "#0e1c21";
      ctx.fillRect(28, 194, 712, 420);
      ctx.strokeStyle = "#294047";
      ctx.lineWidth = 2;
      ctx.strokeRect(28, 194, 712, 420);
      ctx.fillStyle = openPressed ? accent : openHover ? "#193a31" : "#132d27";
      ctx.fillRect(64, 232, 640, 168);
      ctx.strokeStyle = accent;
      ctx.lineWidth = openPressed ? 5 : 3;
      ctx.strokeRect(64, 232, 640, 168);
      ctx.fillStyle = openPressed ? "#071512" : "#f2f7f5";
      ctx.font = "950 57px system-ui, sans-serif";
      ctx.fillText("OPEN", 96, 302);
      ctx.font = "900 31px ui-monospace, monospace";
      ctx.fillText("DOCUMENT INDEX", 96, 351);
      ctx.fillStyle = openPressed ? "#153126" : "#85a098";
      ctx.font = "750 16px ui-monospace, monospace";
      ctx.fillText(openPressed ? "INPUT ACKNOWLEDGED" : "TOUCH PANEL / PRESS 1-7 DIRECT", 96, 382);
      ctx.fillStyle = "#102127";
      ctx.fillRect(64, 424, 304, 116);
      ctx.fillRect(384, 424, 320, 116);
      ctx.fillStyle = accent;
      ctx.font = "900 34px ui-monospace, monospace";
      ctx.fillText("07", 86, 472);
      ctx.fillStyle = "#e1e9e8";
      ctx.font = "800 17px ui-monospace, monospace";
      ctx.fillText("INDEXED REQUESTS", 86, 505);
      ctx.fillStyle = "#e1e9e8";
      ctx.font = "800 18px ui-monospace, monospace";
      ctx.fillText("ROBOT SERVICE READY", 408, 473);
      ctx.fillStyle = "#819399";
      ctx.font = "650 15px ui-monospace, monospace";
      ctx.fillText("ONE OWNER / SAFE QUEUE", 408, 505);
      ctx.fillStyle = "#71858b";
      ctx.font = "650 15px ui-monospace, monospace";
      ctx.fillText("SELECTING A FILE INITIATES A CONTROLLED AUTO HOLD", 64, 580);
    } else if (mode === "run") {
      ctx.fillStyle = "#81959b";
      ctx.font = "700 16px ui-monospace, monospace";
      ctx.fillText("REQUEST INDEX / SELECT ONE CONTROLLED COPY", 28, 178);
      var backPressed = hmiPressed === "__back";
      ctx.fillStyle = backPressed ? accent : hmiHover === "__back" ? "#193a31" : "#132a25";
      ctx.fillRect(548, 148, 192, 56);
      ctx.strokeStyle = accent;
      ctx.lineWidth = backPressed ? 4 : 2;
      ctx.strokeRect(548, 148, 192, 56);
      ctx.fillStyle = backPressed ? "#071512" : "#e4f5ee";
      ctx.font = "850 17px ui-monospace, monospace";
      ctx.fillText(backPressed ? "ACK / BACK" : "< BACK / AUTO", 566, 183);
      for (var i = 0; i < STATIONS.length; i++) {
        var station = STATIONS[i];
        var column = i < 4 ? 0 : 1;
        var rowNumber = i < 4 ? i : i - 4;
        var x = 28 + column * 370;
        var y = 212 + rowNumber * 120;
        var isHover = hmiHover === station.id;
        var isActive = activeRequest === station.id;
        var isQueued = queuedRequest === station.id;
        var isPressed = hmiPressed === station.id;
        var isInverse = isPressed || isActive || isQueued;
        var hex = "#" + ("000000" + station.color.toString(16)).slice(-6);
        ctx.fillStyle = isInverse ? hex : isHover ? "#172b31" : "#101d22";
        ctx.fillRect(x, y, 340, 108);
        ctx.fillStyle = isInverse ? "#081013" : hex;
        ctx.fillRect(x, y, 9, 108);
        ctx.strokeStyle = isInverse || isHover ? hex : "#2a3c42";
        ctx.lineWidth = isInverse ? 4 : isHover ? 2 : 1;
        ctx.strokeRect(x, y, 340, 108);
        ctx.fillStyle = isInverse ? "#071013" : "#edf3f2";
        ctx.font = "850 21px ui-monospace, monospace";
        ctx.fillText("0" + station.key + "  " + station.label, x + 24, y + 38);
        ctx.fillStyle = isInverse ? "#152225" : "#8ea0a5";
        ctx.font = "650 16px system-ui, sans-serif";
        ctx.fillText(station.detail, x + 24, y + 67);
        ctx.fillStyle = isInverse ? "#071013" : hex;
        ctx.font = "850 14px ui-monospace, monospace";
        ctx.fillText(isPressed ? "INPUT ACKNOWLEDGED" : isActive ? state : isQueued ? "QUEUED" : "REQUEST", x + 24, y + 94);
      }
      ctx.fillStyle = "#71858b";
      ctx.font = "650 15px ui-monospace, monospace";
      ctx.fillText("DIRECT KEYS 1-7 / ONE REQUEST OWNER / SAFE CHECKPOINT", 28, 716);
    } else {
      var serviceMeta = stationMeta(activeRequest);
      ctx.fillStyle = accentDark;
      ctx.fillRect(28, 174, 712, 520);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(28, 174, 712, 520);
      ctx.fillStyle = accent;
      ctx.font = "850 18px ui-monospace, monospace";
      ctx.fillText(mode === "fault" ? "CATEGORY 0 / SAFETY CIRCUIT" : mode === "access" ? "TRANSFER TB-04 / OPERATOR SIDE" : "CONTROLLED SERVICE SEQUENCE", 64, 219);

      if (mode === "fault") {
        ctx.fillStyle = "#f6ece9";
        ctx.font = "950 53px system-ui, sans-serif";
        ctx.fillText("SAFETY STOP", 64, 300);
        ctx.fillStyle = accent;
        ctx.font = "850 24px ui-monospace, monospace";
        ctx.fillText("MOTION INHIBITED / RESET REQUIRED", 64, 352);
        ctx.fillStyle = "#d0aaa6";
        ctx.font = "650 19px system-ui, sans-serif";
        ctx.fillText("Guard, E-stop, or transfer proof is not valid.", 64, 408);
        ctx.fillText("Operator requests remain locked until the safety chain is proved.", 64, 442);
      } else if (mode === "access") {
        ctx.fillStyle = "#edf7f7";
        ctx.font = "950 50px system-ui, sans-serif";
        ctx.fillText("OUTER ACCESS", 64, 294);
        ctx.fillStyle = accent;
        ctx.font = "950 48px system-ui, sans-serif";
        ctx.fillText("ENABLED", 64, 350);
        ctx.fillStyle = "#10272c";
        ctx.fillRect(64, 394, 300, 118);
        ctx.fillRect(384, 394, 300, 118);
        ctx.fillStyle = "#a8bec1";
        ctx.font = "700 15px ui-monospace, monospace";
        ctx.fillText("INNER SHUTTER", 86, 429);
        ctx.fillText("ROBOT ENVELOPE", 406, 429);
        ctx.fillStyle = accent;
        ctx.font = "900 27px ui-monospace, monospace";
        ctx.fillText(safetySensors.innerLocked && !safetySensors.innerOpen ? "LOCK PROVED" : "NOT PROVED", 86, 476);
        ctx.fillText(safetySensors.robotClear ? "CLEAR" : "NOT CLEAR", 406, 476);
        ctx.fillStyle = "#b6cbce";
        ctx.font = "700 18px ui-monospace, monospace";
        ctx.fillText("CLOSE / ACK AT DOCUMENT TRAY TO RETURN CUSTODY", 64, 572);
      } else {
        ctx.fillStyle = "#f5f0e4";
        ctx.font = "950 52px system-ui, sans-serif";
        ctx.fillText("AUTO HOLD", 64, 292);
        ctx.fillStyle = accent;
        ctx.font = "900 31px ui-monospace, monospace";
        ctx.fillText("TRANSFER ACTIVE", 64, 344);
        ctx.fillStyle = "#f0e7d3";
        ctx.font = "850 25px ui-monospace, monospace";
        ctx.fillText(state, 64, 398);
        ctx.fillStyle = "#b9aa87";
        ctx.font = "700 18px ui-monospace, monospace";
        ctx.fillText(serviceMeta ? "DOCUMENT 0" + serviceMeta.key + " / " + serviceMeta.label : "CONTROLLED ROBOT SEQUENCE", 64, 442);
        ctx.fillText("OUTER ACCESS LOCKED WHILE THE ROBOT OWNS TRANSFER", 64, 494);
        ctx.fillStyle = "#15231f";
        ctx.fillRect(64, 538, 620, 76);
        ctx.fillStyle = accent;
        ctx.font = "800 17px ui-monospace, monospace";
        ctx.fillText("INPUT LOCKED / WAIT FOR PROVED TRANSFER STATE", 88, 584);
      }
    }

    ctx.fillStyle = "#17262c";
    ctx.fillRect(0, 738, 768, 30);
    ctx.fillStyle = "#789096";
    ctx.font = "700 13px ui-monospace, monospace";
    ctx.fillText("RMCFARLIN / MC-04 / HMI-04 / CONTROLLED COPY", 22, 758);
    ctx.textAlign = "right";
    ctx.fillStyle = accent;
    ctx.fillText("I:" + (safetySensors.innerLocked ? "LOCK" : safetySensors.innerOpen ? "OPEN" : "UNLK") + "  O:" + (safetySensors.outerPresented ? "ACCESS" : safetySensors.outerLocked ? "LOCK" : "UNLK") + "  R:" + (safetySensors.robotClear ? "CLEAR" : "BAY"), 746, 758);
    ctx.textAlign = "left";
    hmiTexture.needsUpdate = true;
  }

  function updateHmiHitMode() {
    var auto = state === STATE.AUTO;
    for (var i = 0; i < hmiInteractives.length; i++) {
      var action = hmiInteractives[i].userData.hmiAction;
      hmiInteractives[i].userData.enabled = action === "inspect"
        ? auto && !hmiInspect
        : action === "back"
          ? auto && hmiInspect
          : action === "station" && auto && hmiInspect;
    }
    if (hmiPressHit && !hmiPressHit.userData.enabled) cancelHmiPress();
  }

  function addCable(parent, points, offset) {
    if (!THREE.TubeGeometry || !THREE.CatmullRomCurve3) return;
    var shifted = [];
    for (var i = 0; i < points.length; i++) {
      shifted.push(new THREE.Vector3(points[i][0] + offset, points[i][1], points[i][2]));
    }
    var curve = new THREE.CatmullRomCurve3(shifted);
    var cable = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.025, 6, false), M.robotCable);
    parent.add(cable);
    applyMeshShadows(cable, M.robotCable);
    return cable;
  }

  function buildRobot() {
    var root = new THREE.Group();
    root.position.set(0.3, 0, -4.0);
    scene.add(root);
    addContactShadow(0, 0, 1.04, 0.86, 0.8, root);

    cylinder(0.72, 0.14, M.joint, 0, 0.09, 0, root, 0, 0, 0, 32);
    cylinder(0.62, 0.12, M.steel, 0, 0.19, 0, root, 0, 0, 0, 32);
    cylinder(0.5, 0.63, M.yellowDark, 0, 0.53, 0, root, 0, 0, 0, 28);
    cylinder(0.44, 0.035, M.joint, 0, 0.855, 0, root, 0, 0, 0, 28);
    var boltItems = [];
    for (var bolt = 0; bolt < 10; bolt++) {
      var angle = bolt / 10 * Math.PI * 2;
      boltItems.push([Math.cos(angle) * 0.58, 0.19, Math.sin(angle) * 0.58, 0.07, 0.06, 0.07]);
    }
    instanceBoxes(boltItems, M.robotFastener, root);

    var baseAxis = new THREE.Group();
    baseAxis.position.set(0, 0.78, 0);
    root.add(baseAxis);
    cylinder(0.43, 0.38, M.yellow, 0, 0.18, 0, baseAxis, 0, 0, 0, 28);
    // J1 reducer is a shallow stack with a seated flange instead of the former
    // oversized dark coin. Its bolt circle is recessed into the top cover.
    cylinder(0.405, 0.07, M.machineEdge, 0, 0.395, 0, baseAxis, 0, 0, 0, 28);
    cylinder(0.35, 0.055, M.yellowDark, 0, 0.455, 0, baseAxis, 0, 0, 0, 28);
    cylinder(0.285, 0.026, M.joint, 0, 0.493, 0, baseAxis, 0, 0, 0, 24);
    var baseGreaseRing = new THREE.Mesh(new THREE.TorusGeometry(0.344, 0.009, 6, 28), M.robotGrease);
    baseGreaseRing.position.y = 0.484;
    baseGreaseRing.rotation.x = Math.PI / 2;
    baseAxis.add(baseGreaseRing);
    applyMeshShadows(baseGreaseRing, M.robotGrease);
    var baseBoltRecesses = [];
    var baseBoltHeads = [];
    for (var baseBolt = 0; baseBolt < 8; baseBolt++) {
      var baseBoltAngle = baseBolt / 8 * Math.PI * 2;
      var baseBoltX = Math.cos(baseBoltAngle) * 0.225;
      var baseBoltZ = Math.sin(baseBoltAngle) * 0.225;
      baseBoltRecesses.push([baseBoltX, 0.505, baseBoltZ, 0.022, 0.012, 0, 0, 0]);
      baseBoltHeads.push([baseBoltX, 0.513, baseBoltZ, 0.012, 0.009, 0, 0, 0]);
    }
    instanceCylinders(baseBoltRecesses, M.contactAo, baseAxis, 10);
    instanceCylinders(baseBoltHeads, M.robotFastener, baseAxis, 10);
    roundedBox(0.34, 0.32, 0.42, 0.07, M.yellowDark, -0.18, 0.3, 0, baseAxis);

    var shoulder = new THREE.Group();
    shoulder.position.set(0, 0.43, 0);
    baseAxis.add(shoulder);
    // J2 motor/reducer depth reads through stepped castings, a narrow bearing
    // land, and real recessed fasteners; the dark material is no longer the
    // dominant camera-facing silhouette.
    cylinder(0.305, 0.48, M.joint, 0, 0, -0.08, shoulder, Math.PI / 2, 0, 0, 28);
    cylinder(0.287, 0.52, M.yellow, 0, 0, 0.03, shoulder, Math.PI / 2, 0, 0, 28);
    cylinder(0.255, 0.075, M.yellowDark, 0, 0, 0.295, shoulder, Math.PI / 2, 0, 0, 26);
    cylinder(0.224, 0.045, M.machineEdge, 0, 0, 0.35, shoulder, Math.PI / 2, 0, 0, 24);
    cylinder(0.184, 0.018, M.contactAo, 0, 0, 0.381, shoulder, Math.PI / 2, 0, 0, 22);
    cylinder(0.09, 0.012, M.steel, 0, 0, 0.414, shoulder, Math.PI / 2, 0, 0, 18);
    roundedBox(0.26, 0.34, 0.21, 0.065, M.yellowDark, -0.22, -0.02, -0.29, shoulder);
    var shoulderGreaseRing = new THREE.Mesh(new THREE.TorusGeometry(0.221, 0.009, 6, 28), M.robotGrease);
    shoulderGreaseRing.position.z = 0.382;
    shoulder.add(shoulderGreaseRing);
    applyMeshShadows(shoulderGreaseRing, M.robotGrease);
    var shoulderBoltRecesses = [];
    var shoulderBoltHeads = [];
    for (var shoulderBolt = 0; shoulderBolt < 8; shoulderBolt++) {
      var shoulderBoltAngle = shoulderBolt / 8 * Math.PI * 2;
      var shoulderBoltX = Math.cos(shoulderBoltAngle) * 0.145;
      var shoulderBoltY = Math.sin(shoulderBoltAngle) * 0.145;
      shoulderBoltRecesses.push([shoulderBoltX, shoulderBoltY, 0.394, 0.021, 0.014, Math.PI / 2, 0, 0]);
      shoulderBoltHeads.push([shoulderBoltX, shoulderBoltY, 0.406, 0.011, 0.012, Math.PI / 2, 0, 0]);
    }
    instanceCylinders(shoulderBoltRecesses, M.contactAo, shoulder, 10);
    instanceCylinders(shoulderBoltHeads, M.robotFastener, shoulder, 10);

    var arm1 = new THREE.Group();
    shoulder.add(arm1);
    // A six-profile chamfered casting replaces the slab/capsule proxy. The
    // envelope is slightly smaller than the old link, retaining all clearance.
    taperedCast(1.4, 0.46, 0.36, 0.3, 0.5, 0.4, 0.34, M.yellow, 0, 0.04, 0, arm1);
    roundedBox(0.11, 0.58, 0.46, 0.045, M.yellowDark, 0.175, 0.79, 0, arm1);
    roundedBox(0.36, 0.15, 0.48, 0.048, M.yellow, 0, 0.18, 0, arm1);
    roundedBox(0.31, 0.016, 0.014, 0.005, M.contactAo, 0, 0.52, 0.231, arm1);
    roundedBox(0.15, 0.28, 0.014, 0.016, M.contactAo, 0.095, 0.94, 0.229, arm1);
    roundedBox(0.126, 0.252, 0.009, 0.014, M.yellowDark, 0.095, 0.94, 0.239, arm1);
    roundedBox(0.02, 0.62, 0.012, 0.004, M.robotEdgeBurnish, -0.205, 0.72, 0.228, arm1);
    roundedBox(0.34, 0.026, 0.017, 0.006, M.yellowDark, 0, 0.34, 0.237, arm1);
    roundedBox(0.275, 0.024, 0.017, 0.006, M.yellowDark, 0, 1.16, 0.207, arm1);
    addCable(arm1, [[-0.24, 0.03, 0.26], [-0.31, 0.65, 0.28], [-0.24, 1.35, 0.25]], -0.035);
    addCable(arm1, [[-0.24, 0.03, 0.26], [-0.31, 0.65, 0.28], [-0.24, 1.35, 0.25]], 0.035);
    instanceBoxes([
      [-0.275, 0.28, 0.265, 0.15, 0.045, 0.105],
      [-0.305, 0.78, 0.28, 0.15, 0.045, 0.105],
      [-0.255, 1.24, 0.255, 0.15, 0.045, 0.105]
    ], M.machineEdge, arm1);
    roundedBox(0.15, 0.13, 0.13, 0.025, M.joint, -0.245, 0.09, 0.245, arm1);
    roundedBox(0.15, 0.13, 0.13, 0.025, M.joint, -0.235, 1.36, 0.235, arm1);

    var elbow = new THREE.Group();
    elbow.position.set(0, 1.48, 0);
    arm1.add(elbow);
    cylinder(0.27, 0.44, M.joint, 0, 0, -0.07, elbow, Math.PI / 2, 0, 0, 26);
    cylinder(0.252, 0.5, M.yellow, 0, 0, 0.02, elbow, Math.PI / 2, 0, 0, 26);
    cylinder(0.224, 0.07, M.yellowDark, 0, 0, 0.275, elbow, Math.PI / 2, 0, 0, 24);
    cylinder(0.195, 0.04, M.machineEdge, 0, 0, 0.33, elbow, Math.PI / 2, 0, 0, 22);
    cylinder(0.158, 0.016, M.contactAo, 0, 0, 0.357, elbow, Math.PI / 2, 0, 0, 20);
    cylinder(0.075, 0.012, M.steel, 0, 0, 0.388, elbow, Math.PI / 2, 0, 0, 16);
    roundedBox(0.22, 0.3, 0.19, 0.055, M.yellowDark, 0.19, -0.025, -0.265, elbow);
    var elbowGreaseRing = new THREE.Mesh(new THREE.TorusGeometry(0.192, 0.008, 6, 26), M.robotGrease);
    elbowGreaseRing.position.z = 0.358;
    elbow.add(elbowGreaseRing);
    applyMeshShadows(elbowGreaseRing, M.robotGrease);
    var elbowBoltRecesses = [];
    var elbowBoltHeads = [];
    for (var elbowBolt = 0; elbowBolt < 8; elbowBolt++) {
      var elbowBoltAngle = elbowBolt / 8 * Math.PI * 2;
      var elbowBoltX = Math.cos(elbowBoltAngle) * 0.124;
      var elbowBoltY = Math.sin(elbowBoltAngle) * 0.124;
      elbowBoltRecesses.push([elbowBoltX, elbowBoltY, 0.37, 0.019, 0.013, Math.PI / 2, 0, 0]);
      elbowBoltHeads.push([elbowBoltX, elbowBoltY, 0.381, 0.01, 0.01, Math.PI / 2, 0, 0]);
    }
    instanceCylinders(elbowBoltRecesses, M.contactAo, elbow, 10);
    instanceCylinders(elbowBoltHeads, M.robotFastener, elbow, 10);

    var arm2 = new THREE.Group();
    elbow.add(arm2);
    taperedCast(1.18, 0.36, 0.27, 0.2, 0.4, 0.31, 0.24, M.yellow, 0, 0.04, 0, arm2);
    roundedBox(0.085, 0.5, 0.36, 0.038, M.yellowDark, -0.145, 0.66, 0, arm2);
    roundedBox(0.3, 0.14, 0.4, 0.042, M.yellow, 0, 0.16, 0, arm2);
    roundedBox(0.25, 0.014, 0.013, 0.004, M.contactAo, 0, 0.47, 0.201, arm2);
    roundedBox(0.13, 0.24, 0.013, 0.014, M.contactAo, -0.075, 0.78, 0.184, arm2);
    roundedBox(0.108, 0.214, 0.008, 0.012, M.yellowDark, -0.075, 0.78, 0.193, arm2);
    roundedBox(0.018, 0.48, 0.012, 0.004, M.robotEdgeBurnish, 0.15, 0.62, 0.194, arm2);
    roundedBox(0.26, 0.024, 0.016, 0.006, M.yellowDark, 0, 0.34, 0.207, arm2);
    roundedBox(0.205, 0.022, 0.016, 0.006, M.yellowDark, 0, 0.98, 0.171, arm2);
    var forearmTransition = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.17, 0.18, 18, 1, false),
      M.yellowDark
    );
    forearmTransition.position.y = 1.17;
    arm2.add(forearmTransition);
    applyMeshShadows(forearmTransition, M.yellowDark);
    var forearmTransitionSeam = new THREE.Mesh(new THREE.TorusGeometry(0.196, 0.008, 6, 24), M.robotGrease);
    forearmTransitionSeam.position.y = 1.255;
    forearmTransitionSeam.rotation.x = Math.PI / 2;
    arm2.add(forearmTransitionSeam);
    applyMeshShadows(forearmTransitionSeam, M.robotGrease);
    addCable(arm2, [[0.2, 0.03, 0.22], [0.25, 0.6, 0.24], [0.19, 1.2, 0.2]], -0.025);
    addCable(arm2, [[0.2, 0.03, 0.22], [0.25, 0.6, 0.24], [0.19, 1.2, 0.2]], 0.035);
    instanceBoxes([
      [0.205, 0.25, 0.225, 0.13, 0.04, 0.095],
      [0.245, 0.67, 0.238, 0.13, 0.04, 0.095],
      [0.205, 1.08, 0.207, 0.13, 0.04, 0.095]
    ], M.machineEdge, arm2);
    roundedBox(0.135, 0.12, 0.12, 0.023, M.joint, 0.19, 0.09, 0.205, arm2);
    roundedBox(0.135, 0.12, 0.12, 0.023, M.joint, 0.19, 1.18, 0.19, arm2);

    // J4 forearm roll cartridge: concentric cast housings, bearing seam, and
    // fastener face all live on the forearm axis and rotate with that axis.
    var j4Roll = new THREE.Group();
    j4Roll.position.set(0, 1.28, 0);
    arm2.add(j4Roll);
    cylinder(0.205, 0.16, M.yellowDark, 0, 0, 0, j4Roll, 0, 0, 0, 26);
    cylinder(0.17, 0.1, M.yellow, 0, 0.085, 0, j4Roll, 0, 0, 0, 24);
    // J4 is compressed toward the forearm so J5 and J6 no longer collapse
    // into it. All four steps remain inside the former 300 mm cartridge.
    cylinder(0.158, 0.018, M.contactAo, 0, 0.128, 0, j4Roll, 0, 0, 0, 24);
    cylinder(0.138, 0.016, M.robotFlange, 0, 0.145, 0, j4Roll, 0, 0, 0, 22);
    var j4Seam = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.011, 6, 24), M.robotGrease);
    j4Seam.position.y = 0.036;
    j4Seam.rotation.x = Math.PI / 2;
    j4Roll.add(j4Seam);
    applyMeshShadows(j4Seam, M.robotGrease);
    var j4Screws = [];
    for (var j4Screw = 0; j4Screw < 6; j4Screw++) {
      var j4Angle = j4Screw / 6 * Math.PI * 2;
      j4Screws.push([
        Math.cos(j4Angle) * 0.12,
        0.155,
        Math.sin(j4Angle) * 0.12,
        0.014,
        0.016,
        0,
        0,
        0
      ]);
    }
    instanceCylinders(j4Screws, M.robotFastener, j4Roll, 10);

    // J5 offset pitch yoke. Keeping the original `wrist` bone preserves every
    // pose/IK call while the visible yellow cheeks rotate with its pitch axis.
    var wrist = new THREE.Group();
    wrist.position.set(0, 0, 0);
    j4Roll.add(wrist);
    // The former constant-section yoke boxes are replaced in-place by small
    // six-profile cast cheeks and a tapered bridge. Their widest profiles are
    // equal to the old boxes, so every conservative wrist sweep stays valid.
    taperedCast(0.29, 0.13, 0.126, 0.12, 0.34, 0.331, 0.31, M.yellow, -0.105, -0.065, 0, wrist);
    taperedCast(0.29, 0.13, 0.126, 0.12, 0.34, 0.331, 0.31, M.yellow, 0.205, -0.065, 0, wrist);
    taperedCast(0.07, 0.31, 0.29, 0.265, 0.3, 0.28, 0.25, M.yellowDark, 0.05, 0.08, 0, wrist);
    // Flush access covers and their narrow recesses are service features, not
    // decoration; both remain behind the old cheek's front surface.
    roundedBox(0.084, 0.155, 0.007, 0.008, M.contactAo, -0.105, 0.075, 0.164, wrist);
    roundedBox(0.068, 0.137, 0.005, 0.007, M.yellowDark, -0.105, 0.075, 0.1675, wrist);
    roundedBox(0.084, 0.155, 0.007, 0.008, M.contactAo, 0.205, 0.075, 0.164, wrist);
    roundedBox(0.068, 0.137, 0.005, 0.007, M.yellowDark, 0.205, 0.075, 0.1675, wrist);
    cylinder(0.132, 0.009, M.contactAo, 0.05, 0.075, 0.177, wrist, Math.PI / 2, 0, 0, 20);
    cylinder(0.12, 0.036, M.robotFlange, 0.05, 0.075, 0.184, wrist, Math.PI / 2, 0, 0, 18);
    cylinder(0.12, 0.028, M.joint, 0.05, 0.075, -0.18, wrist, Math.PI / 2, 0, 0, 18);
    var j5Screws = [];
    for (var j5Screw = 0; j5Screw < 6; j5Screw++) {
      var j5Angle = j5Screw / 6 * Math.PI * 2;
      j5Screws.push([
        0.05 + Math.cos(j5Angle) * 0.084,
        0.075 + Math.sin(j5Angle) * 0.084,
        0.197,
        0.009,
        0.009,
        Math.PI / 2,
        0,
        0
      ]);
    }
    instanceCylinders(j5Screws, M.robotFastener, wrist, 8);

    // J6 rotating tool flange remains the existing `wristRoll` bone, now with
    // a real flange, cap-screw circle, and a compact pneumatic gripper body.
    var wristRoll = new THREE.Group();
    // The yoke is visibly offset, while the commanded TCP stays centered on
    // the analytical tool axis used by reach and clipboard-seat validation.
    wristRoll.position.set(0, 0.18, 0);
    wrist.add(wristRoll);
    cylinder(0.14, 0.07, M.joint, 0, 0.035, 0, wristRoll, 0, 0, 0, 24);
    cylinder(0.086, 0.016, M.contactAo, 0, 0.086, 0, wristRoll, 0, 0, 0, 20);
    cylinder(0.128, 0.032, M.robotFlange, 0, 0.124, 0, wristRoll, 0, 0, 0, 22);
    cylinder(0.105, 0.012, M.robotEdgeBurnish, 0, 0.146, 0, wristRoll, 0, 0, 0, 20);
    var flangeScrews = [];
    for (var flangeScrew = 0; flangeScrew < 6; flangeScrew++) {
      var flangeAngle = flangeScrew / 6 * Math.PI * 2;
      flangeScrews.push([
        Math.cos(flangeAngle) * 0.075,
        0.151,
        Math.sin(flangeAngle) * 0.075,
        0.01,
        0.012,
        0,
        0,
        0
      ]);
    }
    instanceCylinders(flangeScrews, M.robotFastener, wristRoll, 8);

    // Compact tapered pneumatic body preserves the former 700 x 180 x 300 mm
    // tool envelope while giving the terminal chain a manufactured casting.
    taperedCast(0.1, 0.7, 0.66, 0.61, 0.3, 0.285, 0.255, M.machineEdge, 0, 0.19, 0, wristRoll);
    taperedCast(0.07, 0.56, 0.525, 0.47, 0.22, 0.21, 0.18, M.robotToolPolymer, 0, 0.27, 0, wristRoll);
    cylinder(0.018, 0.62, M.steel, 0, 0.22, -0.075, wristRoll, 0, 0, Math.PI / 2, 12);
    cylinder(0.018, 0.62, M.steel, 0, 0.22, 0.075, wristRoll, 0, 0, Math.PI / 2, 12);
    cylinder(0.032, 0.06, M.yellowDark, 0.16, 0.19, -0.16, wristRoll, Math.PI / 2, 0, 0, 12);

    var leftFinger = new THREE.Group();
    var rightFinger = new THREE.Group();
    leftFinger.position.set(-0.22, 0.28, 0);
    rightFinger.position.set(0.22, 0.28, 0);
    wristRoll.add(leftFinger);
    wristRoll.add(rightFinger);
    roundedBox(GRIP_FINGER_WIDTH, 0.3, 0.11, 0.014, M.steel, 0, 0.13, 0, leftFinger);
    roundedBox(GRIP_FINGER_WIDTH, 0.3, 0.11, 0.014, M.steel, 0, 0.13, 0, rightFinger);
    roundedBox(0.055, 0.075, 0.14, 0.018, M.robotJawPad, 0.018, 0.285, 0, leftFinger);
    roundedBox(0.055, 0.075, 0.14, 0.018, M.robotJawPad, -0.018, 0.285, 0, rightFinger);

    // Protected dress pack loops from the forearm into J5 with two clamps.
    addCable(j4Roll, [[-0.18, -0.04, 0.15], [-0.25, 0.13, 0.19], [-0.15, 0.32, 0.14]], 0);
    roundedBox(0.08, 0.04, 0.2, 0.015, M.machineEdge, -0.19, 0.04, 0.14, j4Roll);
    roundedBox(0.08, 0.04, 0.18, 0.015, M.machineEdge, -0.16, 0.27, 0.13, j4Roll);

    var gripperTip = new THREE.Group();
    gripperTip.position.set(0, 0.57, 0);
    wristRoll.add(gripperTip);

    var label = makeLabelTexture(["R-01", "6 AXIS"], "#121719", "#f0b713", 230, 120);
    var labelMesh = labelPlane(label, 0.45, 0.24, 0, 0.55, 0.251, arm1);
    labelMesh.rotation.y = 0;
    labelPlane(
      makeLabelTexture(["J2 LUBE", "5000 h"], "#d8aa20", "#202628", 240, 100),
      0.24,
      0.1,
      -0.09,
      0.28,
      0.272,
      arm1
    );

    // Robot-only material remap keeps the rack, HMI, cabinet, and machine on
    // their established profiles while all cast housings share one controlled
    // powder response and exposed tool steel shares one brushed direction.
    root.traverse(function (object) {
      if (!object.isMesh || !object.material) return;
      if (object.material === M.yellow) object.material = M.robotYellow;
      else if (object.material === M.yellowDark) object.material = M.robotYellowDark;
      else if (object.material === M.steel) object.material = M.robotFlange;
      else if (object.material === M.cable) object.material = M.robotCable;
      else if (object.material === M.jawPad) object.material = M.robotJawPad;
    });

    robotRig = {
      root: root,
      baseAxis: baseAxis,
      shoulder: shoulder,
      elbow: elbow,
      arm2: arm2,
      j4Roll: j4Roll,
      wrist: wrist,
      wristRoll: wristRoll,
      leftFinger: leftFinger,
      rightFinger: rightFinger,
      gripperTip: gripperTip,
      shoulderWorld: new THREE.Vector3(0.3, 1.21, -4.0),
      upperLength: 1.48,
      foreLength: 1.28,
      toolLength: 0.75
    };
  }

  function buildStaging() {
    var raw = new THREE.Group();
    raw.position.set(-2.7, 0, -4.65);
    scene.add(raw);
    addContactShadow(0, 0, 2.4, 1.5, 0.42, raw);
    roundedBox(2.2, 0.16, 1.25, 0.045, M.brushed, 0, 0.82, 0, raw);
    var legs = [
      [-0.9, 0.4, -0.48, 0.11, 0.8, 0.11],
      [0.9, 0.4, -0.48, 0.11, 0.8, 0.11],
      [-0.9, 0.4, 0.48, 0.11, 0.8, 0.11],
      [0.9, 0.4, 0.48, 0.11, 0.8, 0.11]
    ];
    instanceBoxes(legs, M.machineEdge, raw);
    box(1.82, 0.075, 0.075, M.machineEdge, 0, 0.35, -0.48, raw);
    box(1.82, 0.075, 0.075, M.machineEdge, 0, 0.35, 0.48, raw);
    instanceCylinders([
      [-0.78, 1.09, -0.31, 0.17, 0.34, 0, 0, Math.PI / 2],
      [-0.38, 1.09, -0.31, 0.19, 0.38, 0, 0, Math.PI / 2],
      [0.06, 1.09, -0.31, 0.16, 0.32, 0, 0, Math.PI / 2],
      [0.44, 1.09, -0.31, 0.2, 0.4, 0, 0, Math.PI / 2],
      [0.82, 1.09, -0.31, 0.15, 0.3, 0, 0, Math.PI / 2],
      [-0.62, 1.09, 0.25, 0.16, 0.32, 0, 0, Math.PI / 2],
      [-0.18, 1.09, 0.25, 0.2, 0.4, 0, 0, Math.PI / 2],
      [0.3, 1.09, 0.25, 0.17, 0.34, 0, 0, Math.PI / 2],
      [0.72, 1.09, 0.25, 0.18, 0.36, 0, 0, Math.PI / 2]
    ], M.steel, raw, 22);

    var finished = new THREE.Group();
    finished.position.set(-2.25, 0, -2.95);
    scene.add(finished);
    addContactShadow(0, 0, 2.0, 1.25, 0.38, finished);
    roundedBox(1.8, 0.14, 1.0, 0.04, M.machineEdge, 0, 0.62, 0, finished);
    instanceBoxes([
      [-0.7, 0.31, -0.35, 0.1, 0.62, 0.1],
      [0.7, 0.31, -0.35, 0.1, 0.62, 0.1],
      [-0.7, 0.31, 0.35, 0.1, 0.62, 0.1],
      [0.7, 0.31, 0.35, 0.1, 0.62, 0.1]
    ], M.machineEdge, finished);
    box(1.42, 0.06, 0.06, M.machineEdge, 0, 0.28, -0.35, finished);
    instanceCylinders([
      [-0.56, 0.82, -0.22, 0.13, 0.28, 0, 0, Math.PI / 2],
      [-0.18, 0.82, -0.22, 0.13, 0.28, 0, 0, Math.PI / 2],
      [0.2, 0.82, -0.22, 0.13, 0.28, 0, 0, Math.PI / 2],
      [0.58, 0.82, -0.22, 0.13, 0.28, 0, 0, Math.PI / 2]
    ], M.brushed, finished, 20);

    var bufferNest = new THREE.Group();
    bufferNest.position.set(-0.55, 0, -3.1);
    scene.add(bufferNest);
    addContactShadow(0, 0, 0.95, 0.7, 0.34, bufferNest);
    box(0.76, 0.1, 0.54, M.machineEdge, 0, 0.72, 0, bufferNest);
    instanceBoxes([
      [-0.29, 0.35, -0.2, 0.07, 0.7, 0.07],
      [0.29, 0.35, -0.2, 0.07, 0.7, 0.07],
      [-0.29, 0.35, 0.2, 0.07, 0.7, 0.07],
      [0.29, 0.35, 0.2, 0.07, 0.7, 0.07]
    ], M.machineEdge, bufferNest);
    box(0.48, 0.05, 0.08, M.yellowDark, 0, 0.81, -0.12, bufferNest);
    box(0.48, 0.05, 0.08, M.yellowDark, 0, 0.81, 0.12, bufferNest);
    labelPlane(makeLabelTexture(["PART", "BUFFER"], "#171b1d", "#f0b713", 220, 120), 0.34, 0.18, 0, 0.62, 0.276, bufferNest);

    workpiece = new THREE.Group();
    scene.add(workpiece);
    rawWorkpiece = new THREE.Group();
    finishedWorkpiece = new THREE.Group();
    workpiece.add(rawWorkpiece);
    workpiece.add(finishedWorkpiece);

    // Raw stock is deliberately plain; the unloaded part has a stepped turned
    // profile, a bright shoulder, and a visible center bore.
    cylinder(0.235, 0.5, M.steel, 0, 0, 0, rawWorkpiece, 0, 0, Math.PI / 2, 24);
    cylinder(0.215, 0.29, M.brushed, -0.105, 0, 0, finishedWorkpiece, 0, 0, Math.PI / 2, 28);
    cylinder(0.155, 0.19, M.steel, 0.135, 0, 0, finishedWorkpiece, 0, 0, Math.PI / 2, 28);
    cylinder(0.105, 0.055, M.brushed, 0.255, 0, 0, finishedWorkpiece, 0, 0, Math.PI / 2, 28);
    cylinder(0.067, 0.062, M.cable, 0.288, 0, 0, finishedWorkpiece, 0, 0, Math.PI / 2, 24);
    var finishRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.018, 8, 28), M.steel);
    finishRing.position.x = 0.236;
    finishRing.rotation.y = Math.PI / 2;
    finishedWorkpiece.add(finishRing);
    applyMeshShadows(finishRing, M.steel);
    finishedWorkpiece.visible = false;
  }

  function buildSceneFinishing() {
    if (dynamicShadows && THREE.ShadowMaterial) {
      var shadowMaterial = new THREE.ShadowMaterial({
        color: 0x151a1b,
        transparent: true,
        opacity: 0.32,
        depthWrite: false
      });
      // One receiver follows the photographed slab plane. Its material writes
      // only shadow alpha, preserving the photograph's bright concrete values.
      shadowReceiver = horizontalPlane(13.6, 9.6, shadowMaterial, 1.15, 0.006, -4.55, scene);
      shadowReceiver.receiveShadow = true;
      shadowReceiver.renderOrder = -2;
    }

    // Sparse, barely visible particulates add parallax and depth without a
    // costly post-processing pass or a theatrical "fog machine" effect.
    var dustCount = lowPower ? 24 : 72;
    var dustPositions = new Float32Array(dustCount * 3);
    var seed = 1847;
    function randomDust() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }
    for (var dustIndex = 0; dustIndex < dustCount; dustIndex++) {
      dustPositions[dustIndex * 3] = -6.2 + randomDust() * 12.4;
      dustPositions[dustIndex * 3 + 1] = 0.45 + randomDust() * 4.7;
      dustPositions[dustIndex * 3 + 2] = -2.1 - randomDust() * 8.4;
    }
    var dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    ambientDust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: 0xfff3d2,
        size: lowPower ? 0.018 : 0.025,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: true
      })
    );
    ambientDust.frustumCulled = true;
    scene.add(ambientDust);
  }

  function buildMachiningSpray(parent) {
    machiningSpray = new THREE.Group();
    machiningSpray.position.set(3.08, 2.0, -6.05);
    machiningSpray.visible = false;
    parent.add(machiningSpray);

    var jetGeometry = new THREE.BufferGeometry();
    jetGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(18), 3));
    coolantJet = new THREE.LineSegments(
      jetGeometry,
      new THREE.LineBasicMaterial({
        color: 0xa7eff4,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false
      })
    );
    machiningSpray.add(coolantJet);

    var sparkCount = lowPower ? 10 : 22;
    var sparkGeometry = new THREE.BufferGeometry();
    sparkGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(sparkCount * 3), 3));
    chipSparks = new THREE.Points(
      sparkGeometry,
      new THREE.PointsMaterial({
        color: 0xffc56b,
        size: lowPower ? 0.026 : 0.035,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false
      })
    );
    machiningSpray.add(chipSparks);

    var mistCount = lowPower ? 10 : 26;
    var mistGeometry = new THREE.BufferGeometry();
    mistGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(mistCount * 3), 3));
    coolantMist = new THREE.Points(
      mistGeometry,
      new THREE.PointsMaterial({
        color: 0xc9f5f3,
        size: lowPower ? 0.065 : 0.09,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: true
      })
    );
    machiningSpray.add(coolantMist);
  }

  var HOME_POSE = {
    // Low elbow-up controller stow: upper arm travels camera-right, forearm
    // folds camera-left, then J5/tool break right again. J6 roll turns the
    // parallel jaws into depth so the complete terminal chain reads below the
    // top rail instead of becoming a vertical mast behind it.
    base: 0.14,
    shoulder: -1.32,
    elbow: 1.9,
    wrist: -1.95,
    roll: 1.28,
    grip: 0.2
  };
  var SAFE_POSE = {
    // Attract pose: shoulder-to-elbow rises cleanly, the forearm descends
    // toward the load lock, then J5 folds the tool back toward cell center.
    // The three alternating diagonals form a contained S at thumbnail scale.
    base: -0.3,
    shoulder: -1.2,
    elbow: -0.8,
    wrist: -2.4,
    roll: 1.0,
    grip: 0.2
  };

  function poseCopy(pose) {
    return {
      base: pose.base,
      shoulder: pose.shoulder,
      elbow: pose.elbow,
      wrist: pose.wrist,
      roll: pose.roll,
      grip: pose.grip
    };
  }

  function reachForTarget(target) {
    var origin = robotRig.shoulderWorld;
    var dx = target.x - origin.x;
    var dz = target.z - origin.z;
    var radial = Math.sqrt(dx * dx + dz * dz);
    var planarX = Math.max(0.16, radial - robotRig.toolLength);
    var planarY = target.y - origin.y;
    var distance = Math.sqrt(planarX * planarX + planarY * planarY);
    return {
      planarX: planarX,
      planarY: planarY,
      distance: distance,
      minimum: Math.abs(robotRig.upperLength - robotRig.foreLength) + 0.035,
      maximum: robotRig.upperLength + robotRig.foreLength - 0.035
    };
  }

  function targetIsReachable(target) {
    if (!robotRig || !target) return false;
    var reach = reachForTarget(target);
    return reach.distance >= reach.minimum && reach.distance <= reach.maximum;
  }

  function validateStationReach(id) {
    if (!robotRig || stationIndex(id) < 0) return false;
    var targets = [
      travelerTarget(id, "approach"),
      travelerTarget(id, "seat"),
      travelerTarget(id, "lift"),
      travelerTarget(id, "clear"),
      TRANSFER_TCP,
      TRANSFER_CLEAR
    ];
    for (var targetIndex = 0; targetIndex < targets.length; targetIndex++) {
      if (!targetIsReachable(targets[targetIndex])) {
        if (window.console && console.error) {
          console.error("TCP reach validation failed for clipboard " + id + " waypoint " + targetIndex);
        }
        return false;
      }
    }
    return true;
  }

  function validateRackFixture() {
    if (!robotRig || !travelerRack || travelers.length !== STATIONS.length) {
      if (window.console && console.error) {
        console.error("Rack fixture proof unavailable: scene assemblies are incomplete");
      }
      return false;
    }

    var issues = [];
    var expectedHomes = [
      [-1.08, 0.5, 0.045],
      [-0.36, 0.5, 0.045],
      [0.36, 0.5, 0.045],
      [1.08, 0.5, 0.045],
      [-0.72, -0.5, 0.045],
      [0, -0.5, 0.045],
      [0.72, -0.5, 0.045]
    ];
    var rackScale = Math.abs(travelerRack.scale.x);
    var stationPitch = RACK_STATION_PITCH_LOCAL * rackScale;
    var boardWidth = RACK_BOARD_WIDTH_LOCAL * rackScale;
    var adjacentBoardNearEdge = stationPitch - boardWidth * 0.5;
    var openJawCenter = GRIP_BASE_GAP + 0.22 * GRIP_TRAVEL;
    var openToolOuterEdge = openJawCenter + GRIP_FINGER_WIDTH * 0.5;
    var adjacentClearance = adjacentBoardNearEdge - openToolOuterEdge;
    var footBottomY = travelerRack.position.y + travelerRack.scale.y * -1.847;
    var boardBackPlane = 0.045 - 0.012 * 0.5;
    var lowerStopFront = 0.001 + 0.076 * 0.5;
    var hookLiftMargin = 0.16 - 0.065 * Math.abs(travelerRack.scale.y);
    var waypointModes = ["approach", "seat", "lift", "clear"];
    var expectedOffsets = {
      approach: new THREE.Vector3(0, 0, -0.44),
      seat: new THREE.Vector3(0, 0, 0),
      lift: new THREE.Vector3(0, 0.16, 0),
      clear: new THREE.Vector3(0, 0.16, -0.52)
    };
    var reachableWaypoints = 0;

    if (adjacentClearance < 0.006) {
      issues.push("open gripper-to-adjacent-board clearance is below 6 mm");
    }
    if (Math.abs(footBottomY) > 0.003) {
      issues.push("rack feet do not resolve to the floor datum");
    }
    if (Math.abs(boardBackPlane - lowerStopFront) > 0.001) {
      issues.push("lower stops do not terminate at the board back plane");
    }
    if (hookLiftMargin < 0.1) {
      issues.push("lift waypoint does not clear the formed hook noses");
    }

    for (var station = 0; station < travelers.length; station++) {
      var traveler = travelers[station];
      var expectedHome = new THREE.Vector3(
        expectedHomes[station][0],
        expectedHomes[station][1],
        expectedHomes[station][2]
      );
      if (traveler.homePosition.distanceTo(expectedHome) > 0.000001) {
        issues.push("station " + STATIONS[station].key + " home position changed");
      }
      if (!traveler.cassette || !traveler.occupancyFlag) {
        issues.push("station " + STATIONS[station].key + " lacks persistent cassette proof hardware");
      }

      var expectedSeat = expectedHome.clone();
      expectedSeat.y += 0.45;
      expectedSeat.z -= 0.065;
      travelerRack.localToWorld(expectedSeat);
      for (var modeIndex = 0; modeIndex < waypointModes.length; modeIndex++) {
        var mode = waypointModes[modeIndex];
        var waypoint = travelerTarget(traveler.id, mode);
        var expectedWaypoint = expectedSeat.clone().add(expectedOffsets[mode]);
        if (waypoint.distanceTo(expectedWaypoint) > 0.000001) {
          issues.push("station " + STATIONS[station].key + " " + mode + " TCP output changed");
        }
        if (!targetIsReachable(waypoint)) {
          issues.push("station " + STATIONS[station].key + " " + mode + " TCP is unreachable");
        } else {
          reachableWaypoints++;
        }
      }
    }

    var valid = issues.length === 0;
    if (window.console) {
      if (console.assert) {
        console.assert(valid, "Rack fixture static proof failed", issues);
      }
      if (valid && console.info) {
        console.info(
          "Rack fixture proof: 7/7 homes, " +
          reachableWaypoints +
          "/28 TCP waypoints, " +
          Math.round(adjacentClearance * 1000) +
          " mm minimum adjacent clearance"
        );
      } else if (!valid && console.error) {
        console.error("Rack fixture static proof failed", issues);
      }
    }
    return valid;
  }

  function poseForTarget(target, gripValue) {
    var origin = robotRig.shoulderWorld;
    var dx = target.x - origin.x;
    var dz = target.z - origin.z;
    var radial = Math.sqrt(dx * dx + dz * dz);
    var planarX = Math.max(0.16, radial - robotRig.toolLength);
    var planarY = target.y - origin.y;
    var l1 = robotRig.upperLength;
    var l2 = robotRig.foreLength;
    var rawD = (planarX * planarX + planarY * planarY - l1 * l1 - l2 * l2) / (2 * l1 * l2);
    if ((rawD < -1 || rawD > 1) && window.console && console.error) {
      console.error("Robot TCP target is outside the physical two-link envelope", target);
    }
    var d = Math.max(-0.98, Math.min(0.98, rawD));
    var elbow = Math.acos(d);
    var shoulderFromX =
      Math.atan2(planarY, planarX) -
      Math.atan2(l2 * Math.sin(elbow), l1 + l2 * Math.cos(elbow));
    var shoulder = shoulderFromX - Math.PI / 2;
    return {
      base: Math.atan2(-dz, dx),
      shoulder: shoulder,
      elbow: elbow,
      wrist: -Math.PI / 2 - shoulder - elbow,
      roll: 0,
      grip: gripValue === undefined ? 0.2 : gripValue
    };
  }

  function travelerTarget(id, mode) {
    var index = Math.max(0, stationIndex(id));
    var traveler = travelers[index];
    var target = traveler.homePosition.clone();
    target.y += 0.45;
    target.z -= 0.065;
    travelerRack.localToWorld(target);
    if (mode === "approach") target.z += 0.42;
    if (mode === "clear") {
      target.y += 0.16;
      target.z += 0.34;
    }
    if (mode === 'lift') target.y += 0.16;
    // Existing approach/clear offsets were authored for the old rear rack.
    // Mirror them into the guarded side so motion always stays behind mesh.
    if (mode === 'approach' || mode === 'clear') target.z -= 0.86;
    return target;
  }

  function servicePoseFor(nextState) {
    if (!activeRequest) return poseCopy(SAFE_POSE);
    if (nextState === STATE.REQUESTED) {
      return requestEgressPoseAt(1);
    }
    if (nextState === STATE.SAFE_PARK) {
      return interruptedPartHeld
        ? poseForTarget(CELL_TRANSIT, 0.02)
        : poseCopy(SAFE_POSE);
    }
    if (nextState === STATE.BUFFER_DROP) return poseForTarget(BUFFER_NEST, 0.02);
    if (nextState === STATE.BUFFER_CLEAR) {
      return poseForTarget(
        CELL_TRANSIT,
        transferDirection === "return" && bufferedPart ? 0.02 : 0.22
      );
    }
    if (nextState === STATE.HOME) return poseCopy(HOME_POSE);
    if (nextState === STATE.CELL_TRANSIT) {
      return poseForTarget(CELL_TRANSIT, 0.22);
    }
    if (nextState === STATE.RACK_APPROACH) {
      return poseForTarget(travelerTarget(activeRequest, "approach"), 0.22);
    }
    if (nextState === STATE.LIFT_CLEAR) {
      return poseForTarget(travelerTarget(activeRequest, 'lift'), 0.02);
    }
    if (nextState === STATE.INSERT) {
      return poseForTarget(travelerTarget(activeRequest, "clear"), 0.02);
    }
    if (nextState === STATE.UNHOOK) {
      return poseForTarget(travelerTarget(activeRequest, "seat"), 0.22);
    }
    if (
      nextState === STATE.GRIP_VERIFY ||
      nextState === STATE.LOAD_SETTLE ||
      nextState === STATE.REHOOK
    ) {
      return poseForTarget(travelerTarget(activeRequest, "seat"), 0.02);
    }
    if (nextState === STATE.RELEASE_SETTLE) {
      return poseForTarget(travelerTarget(activeRequest, "seat"), 0.22);
    }
    if (nextState === STATE.RACK_WITHDRAW) {
      return poseForTarget(travelerTarget(activeRequest, "approach"), 0.22);
    }
    if (nextState === STATE.RETRACT) {
      return poseForTarget(travelerTarget(activeRequest, "clear"), 0.02);
    }
    if (
      nextState === STATE.TRANSFER_TRANSIT ||
      nextState === STATE.RETURN_TRANSIT
    ) {
      return poseForTarget(CELL_TRANSIT, 0.02);
    }
    if (nextState === STATE.HOME_TRANSIT) {
      return poseForTarget(CELL_TRANSIT, 0.22);
    }
    if (
      nextState === STATE.ROBOT_CLEAR ||
      nextState === STATE.OUTER_PRESENT ||
      nextState === STATE.OUTER_CLOSE ||
      nextState === STATE.HELD
    ) {
      return poseForTarget(TRANSFER_CLEAR, 0.22);
    }
    if (nextState === STATE.BAY_INNER_OPEN || nextState === STATE.BAY_APPROACH) {
      return poseForTarget(
        TRANSFER_CLEAR,
        transferDirection === "outbound" && activeTraveler && activeTraveler.attached
          ? 0.02
          : 0.22
      );
    }
    if (nextState === STATE.BAY_INNER_CLOSE) {
      return poseForTarget(
        TRANSFER_CLEAR,
        activeTraveler && activeTraveler.attached ? 0.02 : 0.22
      );
    }
    if (
      nextState === STATE.BAY_DEPOSIT ||
      nextState === STATE.BAY_GRIP_VERIFY ||
      nextState === STATE.BAY_LOAD_SETTLE
    ) {
      return poseForTarget(TRANSFER_TCP, 0.02);
    }
    if (nextState === STATE.BAY_RELEASE || nextState === STATE.BAY_REGRIP) {
      return poseForTarget(TRANSFER_TCP, 0.22);
    }
    if (nextState === STATE.PRESENT) {
      return poseForTarget(TRANSFER_CLEAR, 0.22);
    }
    if (nextState === STATE.RETURN) {
      return poseForTarget(TRANSFER_CLEAR, 0.02);
    }
    if (nextState === STATE.RESTORE_PART) return poseForTarget(BUFFER_NEST, 0.02);
    if (nextState === STATE.RESUME_TRANSIT) {
      var safeResumePose = poseCopy(SAFE_POSE);
      if (bufferedPart) safeResumePose.grip = 0.02;
      return safeResumePose;
    }
    if (nextState === STATE.RESUME_CHECKPOINT) return requestEgressPoseAt(0);
    return poseCopy(HOME_POSE);
  }

  function applyPose(pose) {
    if (!robotRig || !pose) return;
    robotRig.baseAxis.rotation.y = pose.base;
    robotRig.shoulder.rotation.z = pose.shoulder;
    robotRig.elbow.rotation.z = pose.elbow;
    // The authored roll channel drives a restrained J4 forearm contribution
    // and the full J6 flange rotation; both housings remain on their axes.
    if (robotRig.j4Roll) robotRig.j4Roll.rotation.y = pose.roll * 0.35;
    robotRig.wrist.rotation.z = pose.wrist;
    robotRig.wristRoll.rotation.y = pose.roll;
    // Jaw centers span the scaled clipboard width: open clears both edges,
    // closed lands the pads on the board rather than intersecting its face.
    var gap = GRIP_BASE_GAP + pose.grip * GRIP_TRAVEL;
    robotRig.leftFinger.position.x = -gap;
    robotRig.rightFinger.position.x = gap;
    currentPose = poseCopy(pose);
  }

  function interpolatePose(from, to, amount) {
    var t = smootherstep(amount);
    return {
      base: from.base + angularDelta(from.base, to.base) * t,
      shoulder: lerp(from.shoulder, to.shoulder, t),
      elbow: lerp(from.elbow, to.elbow, t),
      wrist: lerp(from.wrist, to.wrist, t),
      roll: from.roll + angularDelta(from.roll, to.roll) * t,
      grip: lerp(from.grip, to.grip, t)
    };
  }

  function selectedTraveler() {
    for (var i = 0; i < travelers.length; i++) {
      if (travelers[i].id === activeRequest) return travelers[i];
    }
    return null;
  }

  function tcpSeatError(id) {
    if (!robotRig || !id) return Infinity;
    scene.updateMatrixWorld(true);
    var tcp = new THREE.Vector3();
    robotRig.gripperTip.getWorldPosition(tcp);
    return tcp.distanceTo(travelerTarget(id, "seat"));
  }

  function travelerHomePoseError(traveler) {
    if (!traveler || !travelerRack) {
      return { position: Infinity, angle: Infinity };
    }
    scene.updateMatrixWorld(true);
    var currentPosition = new THREE.Vector3();
    var currentQuaternion = new THREE.Quaternion();
    var expectedPosition = traveler.homePosition.clone();
    var expectedQuaternion = new THREE.Quaternion();
    var rackQuaternion = new THREE.Quaternion();
    traveler.group.getWorldPosition(currentPosition);
    traveler.group.getWorldQuaternion(currentQuaternion);
    travelerRack.localToWorld(expectedPosition);
    travelerRack.getWorldQuaternion(rackQuaternion);
    expectedQuaternion.copy(rackQuaternion).multiply(traveler.homeQuaternion);
    var quaternionDot = Math.abs(currentQuaternion.dot(expectedQuaternion));
    return {
      position: currentPosition.distanceTo(expectedPosition),
      angle: 2 * Math.acos(clamp(quaternionDot, -1, 1))
    };
  }

  function attachSelectedTraveler() {
    if (!robotRig || activeTraveler) return false;
    var traveler = selectedTraveler();
    if (!traveler || tcpSeatError(traveler.id) > RACK_TCP_TOLERANCE) {
      if (window.console && console.error) {
        console.error("Grip verify rejected: TCP is not seated on the clipboard centerline");
      }
      return false;
    }
    scene.updateMatrixWorld(true);
    robotRig.gripperTip.attach(traveler.group);
    traveler.attached = true;
    traveler.custody = "robot";
    activeTraveler = traveler;
    setCassetteOccupied(traveler, false);
    return true;
  }

  function beginRestowTraveler() {
    var poseProof = activeTraveler
      ? travelerHomePoseError(activeTraveler)
      : { position: Infinity, angle: Infinity };
    if (
      !activeTraveler ||
      !activeTraveler.attached ||
      tcpSeatError(activeTraveler.id) > RACK_TCP_TOLERANCE ||
      poseProof.position > RACK_SEAT_POSITION_TOLERANCE ||
      poseProof.angle > RACK_SEAT_ANGLE_TOLERANCE
    ) {
      if (window.console && console.error) {
        console.error(
          "Release rejected: cassette seat proof failed",
          poseProof.position,
          poseProof.angle
        );
      }
      return false;
    }
    scene.updateMatrixWorld(true);
    travelerRack.attach(activeTraveler.group);
    // The board is already inside a tightly proved contact envelope. Resolve
    // that final compliant travel onto both hooks/stops before jaws begin to
    // open, eliminating the old interpolation through fixed hardware.
    activeTraveler.group.position.copy(activeTraveler.homePosition);
    activeTraveler.group.quaternion.copy(activeTraveler.homeQuaternion);
    activeTraveler.group.scale.set(1, 1, 1);
    activeTraveler.restowStartPosition.copy(activeTraveler.homePosition);
    activeTraveler.restowStartQuaternion.copy(activeTraveler.homeQuaternion);
    activeTraveler.attached = false;
    activeTraveler.custody = "rack-settling";
    return true;
  }

  function updateRestowTraveler(amount) {
    if (!activeTraveler || activeTraveler.attached) return;
    var t = smootherstep(amount);
    activeTraveler.group.position.lerpVectors(
      activeTraveler.restowStartPosition,
      activeTraveler.homePosition,
      t
    );
    activeTraveler.group.quaternion.slerpQuaternions(
      activeTraveler.restowStartQuaternion,
      activeTraveler.homeQuaternion,
      t
    );
  }

  function finishRestowTraveler() {
    if (!activeTraveler) return false;
    if (activeTraveler.attached && !beginRestowTraveler()) return false;
    activeTraveler.group.position.copy(activeTraveler.homePosition);
    activeTraveler.group.quaternion.copy(activeTraveler.homeQuaternion);
    activeTraveler.group.scale.set(1, 1, 1);
    activeTraveler.custody = "rack";
    setCassetteOccupied(activeTraveler, true);
    activeTraveler = null;
    return true;
  }

  function transferTcpError() {
    if (!robotRig || !TRANSFER_TCP) return Infinity;
    scene.updateMatrixWorld(true);
    var tcp = new THREE.Vector3();
    robotRig.gripperTip.getWorldPosition(tcp);
    return tcp.distanceTo(TRANSFER_TCP);
  }

  function releaseTravelerToBay() {
    if (
      !transferBay ||
      !activeTraveler ||
      !activeTraveler.attached ||
      activeTraveler.custody !== "robot" ||
      !safetySensors.outerLocked ||
      !safetySensors.innerOpen ||
      safetySensors.innerLocked ||
      transferTcpError() > 0.055
    ) return false;
    scene.updateMatrixWorld(true);
    transferBay.carrier.attach(activeTraveler.group);
    activeTraveler.attached = false;
    activeTraveler.custody = "bay";
    safetySensors.boardInBay = true;
    return true;
  }

  function regripTravelerFromBay() {
    if (
      !transferBay ||
      !activeTraveler ||
      activeTraveler.custody !== "bay" ||
      !safetySensors.boardInBay ||
      !safetySensors.outerLocked ||
      !safetySensors.innerOpen ||
      safetySensors.innerLocked ||
      transferTcpError() > 0.055
    ) return false;
    scene.updateMatrixWorld(true);
    robotRig.gripperTip.attach(activeTraveler.group);
    activeTraveler.attached = true;
    activeTraveler.custody = "robot";
    safetySensors.boardInBay = false;
    return true;
  }

  function heldSafetyInvariant() {
    return !!(
      activeTraveler &&
      activeTraveler.custody === "bay" &&
      safetySensors.boardInBay &&
      safetySensors.robotClear &&
      safetySensors.innerLocked &&
      !safetySensors.innerOpen &&
      !safetySensors.outerLocked &&
      safetySensors.outerPresented &&
      safetySensors.maintenanceGateLocked &&
      safetySensors.estopHealthy
    );
  }

  function updateTransferHardware(progress) {
    if (!transferBay) return;
    var amount = smootherstep(progress);
    if (state === STATE.BAY_INNER_OPEN) {
      transferBay.innerShutter.position.y = lerp(
        transferBay.innerClosedY,
        transferBay.innerOpenY,
        amount
      );
    } else if (state === STATE.BAY_INNER_CLOSE) {
      transferBay.innerShutter.position.y = lerp(
        transferBay.innerOpenY,
        transferBay.innerClosedY,
        amount
      );
    } else if (state === STATE.OUTER_PRESENT) {
      transferBay.outerHatch.position.z = transferBay.outerTravel * amount;
    } else if (state === STATE.OUTER_CLOSE) {
      transferBay.outerHatch.position.z = transferBay.outerTravel * (1 - amount);
    }
  }

  function setStacklight(mode) {
    if (!machineRig) return;
    machineRig.towerGreen.emissiveIntensity = mode === "run" ? 0.92 : 0.08;
    machineRig.towerAmber.emissiveIntensity = mode === "hold" || mode === "access" ? 1.15 : 0.08;
    machineRig.towerRed.emissiveIntensity = mode === "fault" ? 1.45 : 0.06;
  }

  function holdSafetyFault(message) {
    safetyFault = true;
    activeStateDuration = Infinity;
    transitionPose = poseCopy(currentPose || SAFE_POSE);
    transitionTarget = poseCopy(transitionPose);
    setCellStatus("Safety fault", message);
    setStacklight("fault");
    updateSafetyDom();
    drawHmi();
    recordCycleFault(message);
    requestSceneRender("safety-fault");
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function smoothstep(value) {
    var x = clamp(value, 0, 1);
    return x * x * (3 - 2 * x);
  }

  // Quintic S-curve: zero velocity and acceleration at each state boundary.
  // It reads as a restrained controller move instead of a web tween.
  function smootherstep(value) {
    var x = clamp(value, 0, 1);
    return x * x * x * (x * (x * 6 - 15) + 10);
  }

  function lerp(a, b, amount) {
    return a + (b - a) * amount;
  }

  function angularDelta(from, to) {
    return Math.atan2(Math.sin(to - from), Math.cos(to - from));
  }

  function autoPhaseAtLoopTime(loopTime) {
    var wrapped = loopTime % AUTO_CYCLE_SECONDS;
    if (wrapped < 0) wrapped += AUTO_CYCLE_SECONDS;
    return (AUTO_HERO_PHASE_START + wrapped) % AUTO_CYCLE_SECONDS;
  }

  function isAutoHeroDwellPhase(phase) {
    return phase >= AUTO_HERO_PHASE_START && phase < AUTO_HERO_PHASE_END;
  }

  function crossedAutoPhase(previous, next, threshold) {
    return next >= previous
      ? previous < threshold && next >= threshold
      : threshold > previous || threshold <= next;
  }

  function autoHeroPoseError(pose) {
    if (!pose) return Infinity;
    return Math.max(
      Math.abs(angularDelta(SAFE_POSE.base, pose.base)),
      Math.abs(pose.shoulder - SAFE_POSE.shoulder),
      Math.abs(pose.elbow - SAFE_POSE.elbow),
      Math.abs(pose.wrist - SAFE_POSE.wrist),
      Math.abs(angularDelta(SAFE_POSE.roll, pose.roll)),
      Math.abs(pose.grip - SAFE_POSE.grip)
    );
  }

  function resetAutoHeroDwellTracking(phase, afterService) {
    autoHeroDwellActive = isAutoHeroDwellPhase(phase);
    autoHeroCurrentPoseError = autoHeroDwellActive
      ? autoHeroPoseError(currentPose)
      : 0;
    autoHeroMaxPoseError = autoHeroCurrentPoseError;
    autoHeroDwellEnteredAt = autoHeroDwellActive
      ? simulationClock - Math.max(0, phase - AUTO_HERO_PHASE_START)
      : 0;
    if (afterService) autoHeroServiceResets += 1;
  }

  function boundedStateDuration(nominal, from, to) {
    if (!isFinite(nominal) || !from || !to) return nominal;
    // Peak velocity for smootherstep is 1.875x average velocity.
    var peakFactor = 1.875;
    var required = 0;
    // These remain below the rated axis speeds of a guarded industrial arm,
    // but remove the former collaborative-speed bottleneck. The analytic
    // smootherstep path and swept-volume gates remain authoritative.
    required = Math.max(required, peakFactor * Math.abs(angularDelta(from.base, to.base)) / SERVICE_BASE_SPEED);
    required = Math.max(required, peakFactor * Math.abs(to.shoulder - from.shoulder) / SERVICE_SHOULDER_SPEED);
    required = Math.max(required, peakFactor * Math.abs(to.elbow - from.elbow) / SERVICE_ELBOW_SPEED);
    required = Math.max(required, peakFactor * Math.abs(to.wrist - from.wrist) / SERVICE_WRIST_SPEED);
    required = Math.max(required, peakFactor * Math.abs(angularDelta(from.roll, to.roll)) / SERVICE_ROLL_SPEED);
    required = Math.max(required, peakFactor * Math.abs(to.grip - from.grip) / SERVICE_GRIP_SPEED);
    return Math.max(nominal, required);
  }

  function stateDuration(currentState) {
    if (currentState === STATE.REQUESTED) return requestEgressDuration;
    if (currentState === STATE.SAFE_PARK) return interruptedPartHeld ? 0.24 : 0.12;
    if (currentState === STATE.BUFFER_DROP) return 0.34;
    if (currentState === STATE.BUFFER_CLEAR) return 0.34;
    if (currentState === STATE.CELL_TRANSIT) return 0.42;
    if (currentState === STATE.RACK_APPROACH) return 0.46;
    if (currentState === STATE.UNHOOK) return 0.26;
    if (currentState === STATE.GRIP_VERIFY) return 0.16;
    if (currentState === STATE.LOAD_SETTLE) return 0.12;
    if (currentState === STATE.LIFT_CLEAR) return 0.28;
    if (currentState === STATE.RETRACT) return 0.32;
    if (currentState === STATE.TRANSFER_TRANSIT) return 0.42;
    if (currentState === STATE.BAY_INNER_OPEN) return 0.28;
    if (currentState === STATE.BAY_APPROACH) return 0.08;
    if (currentState === STATE.BAY_DEPOSIT) return 0.36;
    if (currentState === STATE.BAY_RELEASE) return 0.16;
    if (currentState === STATE.ROBOT_CLEAR) return 0.36;
    if (currentState === STATE.BAY_INNER_CLOSE) return 0.28;
    if (currentState === STATE.OUTER_PRESENT) return 0.32;
    if (currentState === STATE.OUTER_CLOSE) return 0.42;
    if (currentState === STATE.BAY_REGRIP) return 0.68;
    if (currentState === STATE.BAY_GRIP_VERIFY) return 0.32;
    if (currentState === STATE.BAY_LOAD_SETTLE) return 0.25;
    if (currentState === STATE.PRESENT) return 1.28;
    if (currentState === STATE.RETURN) return 1.06;
    if (currentState === STATE.RETURN_TRANSIT) return 0.78;
    if (currentState === STATE.INSERT) return 0.52;
    if (currentState === STATE.REHOOK) return 0.46;
    if (currentState === STATE.RELEASE_SETTLE) return 0.3;
    if (currentState === STATE.RACK_WITHDRAW) return 0.52;
    if (currentState === STATE.HOME_TRANSIT) return 0.68;
    if (currentState === STATE.HOME) return 0.88;
    if (currentState === STATE.RESTORE_PART) return 0.72;
    if (currentState === STATE.RESUME_TRANSIT) return 0.42;
    if (currentState === STATE.RESUME_CHECKPOINT) return requestEgressDuration;
    return Infinity;
  }

  function estimateOutboundFetchDuration() {
    var estimatedStates = [STATE.REQUESTED];
    if (interruptedPartHeld) {
      estimatedStates.push(STATE.SAFE_PARK, STATE.BUFFER_DROP, STATE.BUFFER_CLEAR);
    } else {
      estimatedStates.push(STATE.CELL_TRANSIT);
    }
    estimatedStates.push(
      STATE.RACK_APPROACH,
      STATE.UNHOOK,
      STATE.GRIP_VERIFY,
      STATE.LOAD_SETTLE,
      STATE.LIFT_CLEAR,
      STATE.RETRACT,
      STATE.TRANSFER_TRANSIT,
      STATE.BAY_INNER_OPEN,
      STATE.BAY_DEPOSIT,
      STATE.BAY_RELEASE,
      STATE.ROBOT_CLEAR,
      STATE.BAY_INNER_CLOSE,
      STATE.OUTER_PRESENT
    );
    var fromPose = poseCopy(currentPose || requestEgressPoseAt(0));
    var total = 0;
    plannedFetchBreakdown = [];
    for (var estimatedIndex = 0; estimatedIndex < estimatedStates.length; estimatedIndex++) {
      var estimatedState = estimatedStates[estimatedIndex];
      var toPose = estimatedState === STATE.BAY_INNER_OPEN
        ? poseForTarget(TRANSFER_CLEAR, 0.02)
        : servicePoseFor(estimatedState);
      var estimatedDuration = boundedStateDuration(
        stateDuration(estimatedState),
        fromPose,
        toPose
      );
      total += estimatedDuration;
      plannedFetchBreakdown.push({
        state: estimatedState,
        durationMs: Math.round(estimatedDuration * 1000)
      });
      fromPose = poseCopy(toPose);
    }
    return total;
  }

  function updateStateStatus() {
    if (state === STATE.LIFT_CLEAR) {
      setCellStatus('Robot', 'Lifting clipboard clear of twin hooks');
      return;
    }
    if (state === STATE.INSERT) {
      setCellStatus('Robot', 'Inserting raised clipboard behind guard');
      return;
    }
    var meta = stationMeta(activeRequest);
    var key = meta ? meta.key : "--";
    if (state === STATE.AUTO) setCellStatus("Cycle", "Running");
    else if (state === STATE.REQUESTED) {
      setCellStatus("Request", key + (interruptedPartHeld ? " acknowledged - buffering held part" : " acknowledged - motion stopping"));
    }
    else if (state === STATE.SAFE_PARK) setCellStatus("Robot", "Safe park");
    else if (state === STATE.BUFFER_DROP) setCellStatus("Robot", "Placing interrupted workpiece in buffer nest");
    else if (state === STATE.BUFFER_CLEAR) setCellStatus("Robot", "Clearing buffer through guarded transit");
    else if (state === STATE.CELL_TRANSIT) setCellStatus("Robot", "Routing behind front guard");
    else if (state === STATE.RACK_APPROACH) setCellStatus("Robot", "Approaching fence clipboard " + key);
    else if (state === STATE.UNHOOK) setCellStatus("Robot", "Seating TCP at clipboard " + key);
    else if (state === STATE.GRIP_VERIFY) setCellStatus("Gripper", "Closing jaws and verifying clipboard " + key);
    else if (state === STATE.LOAD_SETTLE) setCellStatus("Gripper", "Load verified - settling before lift");
    else if (state === STATE.RETRACT) setCellStatus("Robot", "Clearing fence rack");
    else if (state === STATE.TRANSFER_TRANSIT) setCellStatus("Robot", "Routing clipboard behind guarded perimeter");
    else if (state === STATE.BAY_INNER_OPEN) setCellStatus("Transfer", "Outer locked - opening inner shutter");
    else if (state === STATE.BAY_APPROACH) setCellStatus("Robot", "Transfer envelope approach");
    else if (state === STATE.BAY_DEPOSIT) setCellStatus("Transfer", "Depositing clipboard cell-side");
    else if (state === STATE.BAY_RELEASE) setCellStatus("Transfer", "Outer locked - releasing clipboard to carrier");
    else if (state === STATE.ROBOT_CLEAR) setCellStatus("Robot", "Retracting from transfer envelope");
    else if (state === STATE.BAY_INNER_CLOSE) setCellStatus("Transfer", "Closing and proving inner shutter");
    else if (state === STATE.OUTER_PRESENT) setCellStatus("Transfer", "Inner locked - presenting outer tray");
    else if (state === STATE.OUTER_CLOSE) setCellStatus("Transfer", "Closing and locking outer hatch");
    else if (state === STATE.BAY_REGRIP) setCellStatus("Robot", "Re-entering open inner transfer side");
    else if (state === STATE.BAY_GRIP_VERIFY) setCellStatus("Gripper", "Verifying transfer-bay custody");
    else if (state === STATE.BAY_LOAD_SETTLE) setCellStatus("Gripper", "Bay load verified - settling");
    else if (state === STATE.PRESENT) setCellStatus("Robot", "Presenting clipboard " + key);
    else if (state === STATE.HELD) setCellStatus("Clipboard", key + " held for review");
    else if (state === STATE.RETURN) setCellStatus("Robot", "Returning clipboard " + key);
    else if (state === STATE.RETURN_TRANSIT) setCellStatus("Robot", "Routing return load behind front guard");
    else if (state === STATE.REHOOK) setCellStatus("Robot", "Rehooking numbered clipboard");
    else if (state === STATE.RELEASE_SETTLE) setCellStatus("Gripper", "Released at hooks - load settling");
    else if (state === STATE.RACK_WITHDRAW) setCellStatus("Robot", "Withdrawing normal to cassette face");
    else if (state === STATE.HOME_TRANSIT) setCellStatus("Robot", "Clearing rack before home rotation");
    else if (state === STATE.HOME) setCellStatus("Robot", "Returning home");
    else if (state === STATE.RESTORE_PART) setCellStatus("Robot", "Restoring buffered workpiece");
    else if (state === STATE.RESUME_TRANSIT) setCellStatus("Robot", "Routing to interrupted production checkpoint");
    else if (state === STATE.RESUME_CHECKPOINT) setCellStatus("Cycle", "Resuming interrupted checkpoint");
  }

  function setState(nextState) {
    if (nextState === STATE.HELD && !heldSafetyInvariant()) {
      holdSafetyFault("HELD blocked: transfer envelope is not fully isolated");
      return;
    }
    if (nextState === STATE.REQUESTED && state === STATE.AUTO) {
      recordCycleStart();
    }
    state = nextState;
    stateEntered = simulationClock;
    transitionPose = poseCopy(currentPose || HOME_POSE);
    transitionTarget = servicePoseFor(nextState);
    activeStateDuration = boundedStateDuration(
      stateDuration(nextState),
      transitionPose,
      transitionTarget
    );
    if (state === STATE.BAY_INNER_OPEN) {
      if (!safetySensors.outerLocked) {
        holdSafetyFault("Inner shutter unlock blocked until outer lock is proved");
        return;
      }
      safetySensors.innerLocked = false;
    }
    if (state === STATE.BAY_DEPOSIT || state === STATE.BAY_REGRIP) {
      safetySensors.robotClear = false;
    }
    if (state === STATE.OUTER_PRESENT) {
      if (
        !safetySensors.innerLocked ||
        safetySensors.innerOpen ||
        !safetySensors.robotClear ||
        !safetySensors.boardInBay
      ) {
        holdSafetyFault("Outer presentation blocked until inner lock and robot-clear proofs");
        return;
      }
      safetySensors.outerLocked = false;
    }
    setStacklight(controllerMode());
    setBodyState();
    setDockState();
    updateHmiHitMode();
    updateStateStatus();
    updateSafetyDom();
    drawHmi();
    requestSceneRender("state:" + nextState);
    scheduleReducedAdvance();

    if (state === STATE.HELD) {
      recordFetchCompletion();
      applyPose(servicePoseFor(STATE.HELD));
      revealPlate(activeRequest);
    }
  }

  function scheduleReducedAdvance() {
    if (reducedTimer) {
      window.clearTimeout(reducedTimer);
      reducedTimer = 0;
    }
    if (!reducedMotion || state === STATE.AUTO || state === STATE.HELD) return;
    reducedTimer = window.setTimeout(function () {
      reducedTimer = 0;
      if (document.hidden) {
        return;
      }
      applyPose(transitionTarget || servicePoseFor(state));
      updateTransferHardware(1);
      if (state === STATE.RELEASE_SETTLE && activeTraveler && !activeTraveler.attached) {
        updateRestowTraveler(1);
      }
      if (state === STATE.BUFFER_DROP && interruptedPartHeld) {
        stageInterruptedPartInBuffer();
      }
      if ((state === STATE.RESTORE_PART || state === STATE.RESUME_CHECKPOINT) && bufferedPart && workpiece) {
        scene.updateMatrixWorld(true);
        robotRig.gripperTip.getWorldPosition(tempPosition);
        robotRig.gripperTip.getWorldQuaternion(tempQuaternion);
        workpiece.position.copy(tempPosition);
        workpiece.quaternion.copy(tempQuaternion);
        setWorkpieceFinished(interruptedPartFinished);
      }
      advanceServiceState();
      requestSceneRender();
    }, Math.min(900, Math.max(240, activeStateDuration * 600)));
  }

  function stageInterruptedPartInBuffer() {
    if (!workpiece || !interruptedPartHeld) return;
    bufferedPart = true;
    workpiece.visible = true;
    scene.updateMatrixWorld(true);
    robotRig.gripperTip.getWorldPosition(tempPosition);
    robotRig.gripperTip.getWorldQuaternion(tempQuaternion);
    workpiece.position.copy(BUFFER_NEST);
    workpiece.quaternion.copy(tempQuaternion);
    setWorkpieceFinished(interruptedPartFinished);
  }

  function advanceServiceState() {
    if (state === STATE.REQUESTED) {
      setState(interruptedPartHeld ? STATE.SAFE_PARK : STATE.CELL_TRANSIT);
    }
    else if (state === STATE.SAFE_PARK) {
      setState(interruptedPartHeld ? STATE.BUFFER_DROP : STATE.CELL_TRANSIT);
    }
    else if (state === STATE.BUFFER_DROP) {
      stageInterruptedPartInBuffer();
      setState(STATE.BUFFER_CLEAR);
    }
    else if (state === STATE.BUFFER_CLEAR) {
      setState(transferDirection === "return" ? STATE.RESUME_TRANSIT : STATE.RACK_APPROACH);
    }
    else if (state === STATE.CELL_TRANSIT) setState(STATE.RACK_APPROACH);
    else if (state === STATE.RACK_APPROACH) setState(STATE.UNHOOK);
    else if (state === STATE.UNHOOK) setState(STATE.GRIP_VERIFY);
    else if (state === STATE.GRIP_VERIFY) {
      if (!attachSelectedTraveler()) {
        holdSafetyFault("Grip verify stopped before clipboard attach");
        return;
      }
      setState(STATE.LOAD_SETTLE);
    } else if (state === STATE.LOAD_SETTLE) setState(STATE.LIFT_CLEAR);
    else if (state === STATE.LIFT_CLEAR) {
      setState(transferDirection === "return" ? STATE.REHOOK : STATE.RETRACT);
    }
    else if (state === STATE.RETRACT) {
      transferDirection = "outbound";
      setState(STATE.TRANSFER_TRANSIT);
    }
    else if (state === STATE.TRANSFER_TRANSIT) {
      safetySensors.robotClear = true;
      setState(STATE.BAY_INNER_OPEN);
    }
    else if (state === STATE.BAY_INNER_OPEN) {
      safetySensors.innerOpen = true;
      // The robot is already at the proved bay-clear pose when the shutter
      // finishes opening; BAY_APPROACH duplicated that exact pose and added a
      // visible dead wait. Enter the guarded deposit directly.
      setState(transferDirection === "outbound" ? STATE.BAY_DEPOSIT : STATE.BAY_REGRIP);
    }
    else if (state === STATE.BAY_APPROACH) setState(STATE.BAY_DEPOSIT);
    else if (state === STATE.BAY_DEPOSIT) setState(STATE.BAY_RELEASE);
    else if (state === STATE.BAY_RELEASE) {
      if (!releaseTravelerToBay()) {
        holdSafetyFault("Clipboard release blocked: bay custody proof failed");
        return;
      }
      setState(STATE.ROBOT_CLEAR);
    }
    else if (state === STATE.ROBOT_CLEAR) {
      safetySensors.robotClear = true;
      setState(STATE.BAY_INNER_CLOSE);
    }
    else if (state === STATE.BAY_INNER_CLOSE) {
      safetySensors.innerOpen = false;
      safetySensors.innerLocked = true;
      setState(transferDirection === "outbound" ? STATE.OUTER_PRESENT : STATE.RETURN_TRANSIT);
    }
    else if (state === STATE.OUTER_PRESENT) {
      safetySensors.outerPresented = true;
      setState(STATE.HELD);
    }
    else if (state === STATE.OUTER_CLOSE) {
      safetySensors.outerPresented = false;
      safetySensors.outerLocked = true;
      setState(STATE.BAY_INNER_OPEN);
    }
    else if (state === STATE.BAY_REGRIP) setState(STATE.BAY_GRIP_VERIFY);
    else if (state === STATE.BAY_GRIP_VERIFY) {
      if (!regripTravelerFromBay()) {
        holdSafetyFault("Clipboard regrip blocked: bay TCP/custody proof failed");
        return;
      }
      setState(STATE.BAY_LOAD_SETTLE);
    }
    else if (state === STATE.BAY_LOAD_SETTLE) setState(STATE.RETURN);
    else if (state === STATE.RETURN) {
      safetySensors.robotClear = true;
      setState(STATE.BAY_INNER_CLOSE);
    }
    else if (state === STATE.RETURN_TRANSIT) setState(STATE.INSERT);
    else if (state === STATE.INSERT) setState(STATE.LIFT_CLEAR);
    else if (state === STATE.REHOOK) {
      if (!beginRestowTraveler()) {
        holdSafetyFault("Rack release stopped before clipboard detach");
        return;
      }
      setState(STATE.RELEASE_SETTLE);
    } else if (state === STATE.RELEASE_SETTLE) {
      if (!finishRestowTraveler()) {
        holdSafetyFault("Rack release stopped before occupancy proof");
        return;
      }
      setState(STATE.RACK_WITHDRAW);
    } else if (state === STATE.RACK_WITHDRAW) {
      setState(STATE.HOME_TRANSIT);
    } else if (state === STATE.HOME_TRANSIT) {
      setState(bufferedPart ? STATE.RESTORE_PART : STATE.RESUME_TRANSIT);
    } else if (state === STATE.HOME) {
      setState(bufferedPart ? STATE.RESTORE_PART : STATE.RESUME_TRANSIT);
    } else if (state === STATE.RESTORE_PART) {
      if (bufferedPart && workpiece) {
        scene.updateMatrixWorld(true);
        robotRig.gripperTip.getWorldPosition(tempPosition);
        robotRig.gripperTip.getWorldQuaternion(tempQuaternion);
        workpiece.position.copy(tempPosition);
        workpiece.quaternion.copy(tempQuaternion);
        setWorkpieceFinished(interruptedPartFinished);
      }
      setState(STATE.BUFFER_CLEAR);
    } else if (state === STATE.RESUME_TRANSIT) {
      setState(STATE.RESUME_CHECKPOINT);
    } else if (state === STATE.RESUME_CHECKPOINT) finishServiceCycle();
  }

  function finishServiceCycle() {
    // Normal choreography proves/restows during RELEASE_SETTLE, so the active
    // pointer is usually already cleared here. Only perform the legacy final
    // safeguard when a traveler remains; rackCustodyProved verifies all seven.
    var restowComplete = activeTraveler ? finishRestowTraveler() : true;
    var nextRequest = queuedRequest;
    var focusTarget = returnFocus;
    activeRequest = null;
    queuedRequest = null;
    hmiInspect = true;
    cameraInspectionTarget = 0;
    productionClock = savedProductionClock;
    bufferedPart = false;
    interruptedPartHeld = false;
    interruptedAtCncMouth = false;
    safetyFault = false;
    safetySensors.boardInBay = false;
    safetySensors.outerPresented = false;
    safetySensors.outerLocked = true;
    safetySensors.innerOpen = false;
    safetySensors.innerLocked = true;
    safetySensors.robotClear = true;
    if (transferBay) {
      transferBay.outerHatch.position.z = 0;
      transferBay.innerShutter.position.y = transferBay.innerClosedY;
    }
    recordCycleCompletion(restowComplete);
    applyPose(productionPoseAt(productionClock));
    // Resume the exact interrupted production phase, but restart dwell
    // accounting so time spent in service can never contaminate the next
    // logical AUTO hero hold. If service interrupted the hold, only its
    // unconsumed phase time remains; otherwise the next loop arms normally.
    resetAutoHeroDwellTracking(productionClock, true);
    setState(STATE.AUTO);
    if (nextRequest) {
      window.setTimeout(function () {
        requestStation(nextRequest, focusTarget || canvas);
      }, reducedMotion ? 160 : 40);
    } else {
      returnFocus = null;
      if (focusTarget && typeof focusTarget.focus === "function") {
        window.setTimeout(function () {
          try {
            focusTarget.focus({ preventScroll: true });
          } catch (ignore) {
            focusTarget.focus();
          }
        }, reducedMotion ? 0 : 40);
      }
    }
  }

  var RAW_PICK = new THREE.Vector3(-2.7, 1.12, -4.35);
  var CNC_PICK = new THREE.Vector3(3.04, 2.02, -5.92);
  var CNC_CLEAR = new THREE.Vector3(2.72, 2.08, -4.72);
  // High, compact, cell-side routing points. They are motion waypoints only;
  // every authored rack, machine, and transfer TCP remains unchanged.
  var CELL_TRANSIT = new THREE.Vector3(0.0, 3.0, -4.9);
  var CNC_GUARD_CLEAR = new THREE.Vector3(2.15, 2.66, -4.92);
  // AUTO alone uses a lower rear transit before returning to the authored
  // stow. Service CELL_TRANSIT and every clipboard/transfer endpoint stay put.
  var AUTO_HOME_CLEAR = new THREE.Vector3(0.0, 2.5, -4.9);
  var FINISHED_DROP = new THREE.Vector3(-2.25, 0.93, -2.95);
  var BUFFER_NEST = new THREE.Vector3(-0.55, 1.07, -3.1);
  var TRANSFER_TCP = new THREE.Vector3(3.12, 2.15, -2.67);
  var TRANSFER_CLEAR = new THREE.Vector3(2.08, 2.52, -3.72);
  var tempPosition = new THREE.Vector3();
  var tempQuaternion = new THREE.Quaternion();

  function setWorkpieceFinished(isFinished) {
    if (rawWorkpiece) rawWorkpiece.visible = !isFinished;
    if (finishedWorkpiece) finishedWorkpiece.visible = isFinished;
  }

  function productionPoseAt(phase) {
    var pickOpen = poseForTarget(RAW_PICK, 0.22);
    var pickClosed = poseForTarget(RAW_PICK, 0.02);
    var cncGuardOpen = poseForTarget(CNC_GUARD_CLEAR, 0.22);
    var cncGuardClosed = poseForTarget(CNC_GUARD_CLEAR, 0.02);
    var cncOpen = poseForTarget(CNC_PICK, 0.22);
    var cncClosed = poseForTarget(CNC_PICK, 0.02);
    var finishedClosed = poseForTarget(FINISHED_DROP, 0.02);
    var finishedOpen = poseForTarget(FINISHED_DROP, 0.22);
    var cellTransitOpen = poseForTarget(AUTO_HOME_CLEAR, 0.22);

    if (phase < 1.0) return interpolatePose(HOME_POSE, pickOpen, phase / 1.0);
    if (phase < 2.0) return interpolatePose(pickOpen, pickClosed, (phase - 1.0) / 1.0);
    if (phase < 3.05) return interpolatePose(pickClosed, cncGuardClosed, (phase - 2.0) / 1.05);
    if (phase < 4.45) return interpolatePose(cncGuardClosed, cncClosed, (phase - 3.05) / 1.4);
    if (phase < 5.0) return interpolatePose(cncClosed, cncOpen, (phase - 4.45) / 0.55);
    if (phase < 5.5) return interpolatePose(cncOpen, cncGuardOpen, (phase - 5.0) / 0.5);
    if (phase < 6.0) return interpolatePose(cncGuardOpen, SAFE_POSE, (phase - 5.5) / 0.5);
    if (phase < 9.15) return poseCopy(SAFE_POSE);
    if (phase < 9.7) return interpolatePose(SAFE_POSE, cncGuardOpen, (phase - 9.15) / 0.55);
    if (phase < 10.25) return interpolatePose(cncGuardOpen, cncOpen, (phase - 9.7) / 0.55);
    if (phase < 10.75) return interpolatePose(cncOpen, cncClosed, (phase - 10.25) / 0.5);
    if (phase < 11.35) return interpolatePose(cncClosed, cncGuardClosed, (phase - 10.75) / 0.6);
    if (phase < 12.65) return interpolatePose(cncGuardClosed, finishedClosed, (phase - 11.35) / 1.3);
    if (phase < 13.18) return interpolatePose(finishedClosed, finishedOpen, (phase - 12.65) / 0.53);
    if (phase < 13.78) return interpolatePose(finishedOpen, cellTransitOpen, (phase - 13.18) / 0.6);
    return interpolatePose(cellTransitOpen, HOME_POSE, (phase - 13.78) / 0.62);
  }

  function requestSafePhaseFor(phase) {
    if (phase < AUTO_SAFE_PHASE_START) return AUTO_SAFE_PHASE_START;
    if (phase > AUTO_SAFE_PHASE_END) return AUTO_SAFE_PHASE_END;
    return phase;
  }

  function requestEgressPoseAt(amount) {
    var t = smootherstep(clamp(amount, 0, 1));
    var phase = lerp(requestEgressStartPhase, requestEgressEndPhase, t);
    var pose = productionPoseAt(phase);
    if (interruptedPartHeld) pose.grip = 0.02;
    return pose;
  }

  function configureRequestEgress(phase) {
    requestEgressStartPhase = phase;
    requestEgressEndPhase = requestSafePhaseFor(phase);
    var sampleCount = Math.max(
      1,
      Math.ceil(Math.abs(requestEgressEndPhase - requestEgressStartPhase) * 18)
    );
    var previous = requestEgressPoseAt(0);
    var travel = { base: 0, shoulder: 0, elbow: 0, wrist: 0, roll: 0, grip: 0 };
    for (var sampleIndex = 1; sampleIndex <= sampleCount; sampleIndex++) {
      var next = requestEgressPoseAt(sampleIndex / sampleCount);
      travel.base += Math.abs(angularDelta(previous.base, next.base));
      travel.shoulder += Math.abs(next.shoulder - previous.shoulder);
      travel.elbow += Math.abs(next.elbow - previous.elbow);
      travel.wrist += Math.abs(next.wrist - previous.wrist);
      travel.roll += Math.abs(angularDelta(previous.roll, next.roll));
      travel.grip += Math.abs(next.grip - previous.grip);
      previous = next;
    }
    // Overall smootherstep reaches 1.875x average speed. Sum each axis' real
    // path variation so a multi-segment production egress cannot shortcut or
    // exceed the same guarded-service speed envelope.
    var peakFactor = 1.875;
    requestEgressDuration = Math.max(
      0.12,
      peakFactor * travel.base / SERVICE_BASE_SPEED,
      peakFactor * travel.shoulder / SERVICE_SHOULDER_SPEED,
      peakFactor * travel.elbow / SERVICE_ELBOW_SPEED,
      peakFactor * travel.wrist / SERVICE_WRIST_SPEED,
      peakFactor * travel.roll / SERVICE_ROLL_SPEED,
      peakFactor * travel.grip / SERVICE_GRIP_SPEED
    );
  }

  function validateRequestEgressSafety() {
    if (!robotRig) return false;
    var savedPose = poseCopy(currentPose || productionPoseAt(requestEgressStartPhase));
    var shoulderPoint = new THREE.Vector3();
    var elbowPoint = new THREE.Vector3();
    var j4Point = new THREE.Vector3();
    var wristPoint = new THREE.Vector3();
    var tcpPoint = new THREE.Vector3();
    var leftJawPoint = new THREE.Vector3();
    var rightJawPoint = new THREE.Vector3();
    var samplePoint = new THREE.Vector3();
    var valid = true;
    requestEgressFailureStage = "";
    var padding = 0.006;
    var posts = [
      [FRONT_GUARD_MIN_X, FRONT_GUARD_Z, GUARD_POST_RADIUS],
      [FRONT_GUARD_MAX_X, FRONT_GUARD_Z, GUARD_POST_RADIUS],
      [SIDE_GUARD_X, FRONT_GUARD_Z, GUARD_POST_RADIUS],
      [SIDE_GUARD_X, SIDE_GUARD_MIN_Z, GUARD_POST_RADIUS]
    ];

    function pointIsClear(point, radius) {
      if (
        point.x + radius >= FRONT_GUARD_MIN_X &&
        point.x - radius <= FRONT_GUARD_MAX_X &&
        point.y + radius >= 0.24 &&
        point.y - radius <= GUARD_HEIGHT &&
        point.z + radius > FRONT_GUARD_Z + padding
      ) return false;
      if (
        point.z + radius >= SIDE_GUARD_MIN_Z &&
        point.z - radius <= FRONT_GUARD_Z &&
        point.y + radius >= 0.24 &&
        point.y - radius <= GUARD_HEIGHT &&
        point.x + radius > SIDE_GUARD_X + padding
      ) return false;
      for (var postIndex = 0; postIndex < posts.length; postIndex++) {
        var post = posts[postIndex];
        if (point.y + radius < 0 || point.y - radius > 3.55) continue;
        var dx = point.x - post[0];
        var dz = point.z - post[1];
        if (Math.sqrt(dx * dx + dz * dz) - radius - post[2] < padding) return false;
      }
      return true;
    }

    function segmentIsClear(start, end, radius) {
      for (var segmentSample = 0; segmentSample <= 16; segmentSample++) {
        samplePoint.lerpVectors(start, end, segmentSample / 16);
        if (!pointIsClear(samplePoint, radius)) return false;
      }
      return true;
    }

    function poseIsClear(pose) {
      applyPose(pose);
      robotRig.root.updateMatrixWorld(true);
      robotRig.shoulder.getWorldPosition(shoulderPoint);
      robotRig.elbow.getWorldPosition(elbowPoint);
      robotRig.j4Roll.getWorldPosition(j4Point);
      robotRig.wristRoll.getWorldPosition(wristPoint);
      robotRig.gripperTip.getWorldPosition(tcpPoint);
      robotRig.leftFinger.getWorldPosition(leftJawPoint);
      robotRig.rightFinger.getWorldPosition(rightJawPoint);
      return (
        segmentIsClear(shoulderPoint, elbowPoint, 0.27) &&
        segmentIsClear(elbowPoint, j4Point, 0.23) &&
        segmentIsClear(j4Point, wristPoint, 0.21) &&
        segmentIsClear(wristPoint, tcpPoint, 0.11) &&
        pointIsClear(leftJawPoint, 0.085) &&
        pointIsClear(rightJawPoint, 0.085)
      );
    }

    function sweepIsClear(fromPose, toPose) {
      for (var sweepSample = 0; sweepSample <= 48; sweepSample++) {
        if (!poseIsClear(interpolatePose(fromPose, toPose, sweepSample / 48))) return false;
      }
      return true;
    }

    var egressSamples = Math.max(
      48,
      Math.ceil(Math.abs(requestEgressEndPhase - requestEgressStartPhase) * 24)
    );
    for (var egressSample = 0; egressSample <= egressSamples && valid; egressSample++) {
      valid = poseIsClear(requestEgressPoseAt(egressSample / egressSamples));
      if (!valid) requestEgressFailureStage = "production egress";
    }
    var safePose = requestEgressPoseAt(1);
    if (valid && interruptedPartHeld) {
      var transitClosedPose = poseForTarget(CELL_TRANSIT, 0.02);
      var bufferPose = poseForTarget(BUFFER_NEST, 0.02);
      valid = sweepIsClear(safePose, transitClosedPose);
      if (!valid) requestEgressFailureStage = "safe to closed cell transit";
      if (valid) {
        valid = sweepIsClear(transitClosedPose, bufferPose);
        if (!valid) requestEgressFailureStage = "cell transit to buffer";
      }
      if (valid) {
        valid = sweepIsClear(bufferPose, poseForTarget(CELL_TRANSIT, 0.22));
        if (!valid) requestEgressFailureStage = "buffer to cell transit";
      }
    } else if (valid) {
      valid = sweepIsClear(safePose, poseForTarget(CELL_TRANSIT, 0.22));
      if (!valid) requestEgressFailureStage = "safe to cell transit";
    }
    applyPose(savedPose);
    robotRig.root.updateMatrixWorld(true);
    return valid;
  }

  function validateAllRequestEgressEntries() {
    var savedPose = poseCopy(currentPose || HOME_POSE);
    var savedHeld = interruptedPartHeld;
    var savedFinished = interruptedPartFinished;
    var savedAtMouth = interruptedAtCncMouth;
    var savedStart = requestEgressStartPhase;
    var savedEnd = requestEgressEndPhase;
    var savedDuration = requestEgressDuration;
    var savedProof = requestEgressProofValid;
    var valid = true;
    var tested = 0;
    for (var sampleIndex = 0; sampleIndex <= 288 && valid; sampleIndex++) {
      var phase = AUTO_CYCLE_SECONDS * sampleIndex / 288;
      interruptedPartHeld = productionPhaseHasHeldPart(phase);
      interruptedPartFinished = phase >= 8.4;
      interruptedAtCncMouth = phase >= 3.05 && phase < 5.5;
      configureRequestEgress(phase);
      valid = validateRequestEgressSafety();
      tested += 1;
      if (!valid) {
        startupDiagnostics.requestEntryFailedPhase = phase;
        startupDiagnostics.requestEntryFailureStage = requestEgressFailureStage;
      }
    }
    interruptedPartHeld = savedHeld;
    interruptedPartFinished = savedFinished;
    interruptedAtCncMouth = savedAtMouth;
    requestEgressStartPhase = savedStart;
    requestEgressEndPhase = savedEnd;
    requestEgressDuration = savedDuration;
    requestEgressProofValid = savedProof;
    applyPose(savedPose);
    robotRig.root.updateMatrixWorld(true);
    startupDiagnostics.requestEntrySamples = tested;
    if (window.console) {
      if (console.assert) console.assert(valid, "AUTO-to-service request entry proof failed");
      if (valid && console.info) {
        console.info("AUTO-to-service request entry proof: " + tested + " live phases clear");
      }
    }
    return valid;
  }

  function pointAabbDistanceSquared(point, bounds) {
    var dx = Math.max(bounds.minX - point.x, 0, point.x - bounds.maxX);
    var dy = Math.max(bounds.minY - point.y, 0, point.y - bounds.maxY);
    var dz = Math.max(bounds.minZ - point.z, 0, point.z - bounds.maxZ);
    return dx * dx + dy * dy + dz * dz;
  }

  function validateSweptSafetyEnvelope() {
    if (!robotRig || !transferBay) return false;
    var issues = [];
    var heroDwellPoseError = 0;
    var savedPose = poseCopy(currentPose || HOME_POSE);
    var savedRequest = activeRequest;
    var point = new THREE.Vector3();
    var samplePoint = new THREE.Vector3();
    var segmentStart = new THREE.Vector3();
    var segmentEnd = new THREE.Vector3();
    var probePoints = {
      shoulder: new THREE.Vector3(),
      elbow: new THREE.Vector3(),
      j4: new THREE.Vector3(),
      wrist: new THREE.Vector3(),
      tcp: new THREE.Vector3(),
      leftJaw: new THREE.Vector3(),
      rightJaw: new THREE.Vector3()
    };
    var posts = [
      [FRONT_GUARD_MIN_X, FRONT_GUARD_Z, GUARD_POST_RADIUS, "front-left post"],
      [FRONT_GUARD_MAX_X, FRONT_GUARD_Z, GUARD_POST_RADIUS, "front-right post"],
      [SIDE_GUARD_X, FRONT_GUARD_Z, GUARD_POST_RADIUS, "cabinet-front post"],
      [SIDE_GUARD_X, SIDE_GUARD_MIN_Z, GUARD_POST_RADIUS, "machine-return post"],
      [-3.226, -2.335, 0.055, "rack-left post"],
      [-0.274, -2.335, 0.055, "rack-right post"],
      [-2.866, -2.382, 0.045, "rack-left support"],
      [-0.634, -2.382, 0.045, "rack-right support"]
    ];
    // The cell-side throat is open behind z=-2.53. These four boxes are the
    // actual shortened opaque shell members built in buildSafetyPerimeter().
    var cabinetShell = [
      { minX: 2.39, maxX: 3.85, minY: 2.785, maxY: 2.915, minZ: -2.53, maxZ: -1.71, name: "cabinet top" },
      { minX: 2.39, maxX: 3.85, minY: 1.385, maxY: 1.515, minZ: -2.53, maxZ: -1.71, name: "cabinet sill" },
      { minX: 2.39, maxX: 2.51, minY: 1.4, maxY: 2.9, minZ: -2.53, maxZ: -1.71, name: "cabinet left jamb" },
      { minX: 3.73, maxX: 3.85, minY: 1.4, maxY: 2.9, minZ: -2.53, maxZ: -1.71, name: "cabinet right jamb" }
    ];

    function addIssue(pathLabel, bodyLabel, obstacleLabel, clearance) {
      if (issues.length >= 24) return;
      issues.push(
        pathLabel + " / " + bodyLabel + " intersects " + obstacleLabel +
        " by " + Math.max(0, Math.round(-clearance * 1000)) + " mm"
      );
    }

    function checkPoint(pathLabel, bodyLabel, probe, radius) {
      var panelPadding = 0.006;
      if (
        probe.x + radius >= FRONT_GUARD_MIN_X &&
        probe.x - radius <= FRONT_GUARD_MAX_X &&
        probe.y + radius >= 0.24 &&
        probe.y - radius <= GUARD_HEIGHT &&
        probe.z + radius > FRONT_GUARD_Z + panelPadding
      ) {
        addIssue(
          pathLabel,
          bodyLabel,
          "front polycarbonate datum",
          FRONT_GUARD_Z + panelPadding - (probe.z + radius)
        );
      }
      if (
        probe.z + radius >= SIDE_GUARD_MIN_Z &&
        probe.z - radius <= FRONT_GUARD_Z &&
        probe.y + radius >= 0.24 &&
        probe.y - radius <= GUARD_HEIGHT &&
        probe.x + radius > SIDE_GUARD_X + panelPadding
      ) {
        addIssue(
          pathLabel,
          bodyLabel,
          "machine-side polycarbonate",
          SIDE_GUARD_X + panelPadding - (probe.x + radius)
        );
      }
      for (var postIndex = 0; postIndex < posts.length; postIndex++) {
        var post = posts[postIndex];
        if (probe.y + radius < 0 || probe.y - radius > 3.55) continue;
        var postDistance = Math.sqrt(
          Math.pow(probe.x - post[0], 2) + Math.pow(probe.z - post[1], 2)
        );
        var postClearance = postDistance - radius - post[2];
        if (postClearance < panelPadding) {
          addIssue(pathLabel, bodyLabel, post[3], postClearance - panelPadding);
        }
      }
      for (var shellIndex = 0; shellIndex < cabinetShell.length; shellIndex++) {
        var shell = cabinetShell[shellIndex];
        var shellDistance = Math.sqrt(pointAabbDistanceSquared(probe, shell));
        var shellClearance = shellDistance - radius;
        if (shellClearance < panelPadding) {
          addIssue(pathLabel, bodyLabel, shell.name, shellClearance - panelPadding);
        }
      }
    }

    function checkSegment(pathLabel, bodyLabel, start, end, radius) {
      for (var segmentSample = 0; segmentSample <= 16; segmentSample++) {
        samplePoint.lerpVectors(start, end, segmentSample / 16);
        checkPoint(pathLabel, bodyLabel, samplePoint, radius);
      }
    }

    function checkPose(pathLabel, pose) {
      applyPose(pose);
      robotRig.root.updateMatrixWorld(true);
      robotRig.shoulder.getWorldPosition(probePoints.shoulder);
      robotRig.elbow.getWorldPosition(probePoints.elbow);
      robotRig.j4Roll.getWorldPosition(probePoints.j4);
      robotRig.wristRoll.getWorldPosition(probePoints.wrist);
      robotRig.gripperTip.getWorldPosition(probePoints.tcp);
      robotRig.leftFinger.getWorldPosition(probePoints.leftJaw);
      robotRig.rightFinger.getWorldPosition(probePoints.rightJaw);
      checkSegment(pathLabel, "upper arm", probePoints.shoulder, probePoints.elbow, 0.27);
      checkSegment(pathLabel, "forearm/dress pack", probePoints.elbow, probePoints.j4, 0.23);
      checkSegment(pathLabel, "wrist", probePoints.j4, probePoints.wrist, 0.21);
      checkSegment(pathLabel, "tool", probePoints.wrist, probePoints.tcp, 0.11);
      checkPoint(pathLabel, "left jaw", probePoints.leftJaw, 0.085);
      checkPoint(pathLabel, "right jaw", probePoints.rightJaw, 0.085);
    }

    function checkSweep(pathLabel, fromPose, toPose) {
      for (var sweepSample = 0; sweepSample <= 48; sweepSample++) {
        checkPose(pathLabel, interpolatePose(fromPose, toPose, sweepSample / 48));
        if (issues.length >= 24) return;
      }
    }

    if (!targetIsReachable(CELL_TRANSIT)) issues.push("CELL_TRANSIT is outside the reach envelope");
    if (!targetIsReachable(CNC_GUARD_CLEAR)) issues.push("CNC_GUARD_CLEAR is outside the reach envelope");

    // Sample the complete repeating AUTO path in its live logical order. Loop
    // time zero is the SAFE hero hold; rotating phase order does not omit or
    // duplicate any of the existing guarded CNC/finished-part trajectory.
    if (AUTO_HERO_DWELL_SECONDS < 1.5 || AUTO_HERO_DWELL_SECONDS > 2.0) {
      issues.push("AUTO hero dwell is outside the 1.5-2.0 s validated window");
    }
    for (var productionSample = 0; productionSample <= 288 && issues.length < 24; productionSample++) {
      var productionLoopTime = AUTO_CYCLE_SECONDS * productionSample / 288;
      var productionPhase = autoPhaseAtLoopTime(productionLoopTime);
      var productionPose = productionPoseAt(productionPhase);
      if (productionLoopTime <= AUTO_HERO_DWELL_SECONDS + 0.000001) {
        heroDwellPoseError = Math.max(
          heroDwellPoseError,
          autoHeroPoseError(productionPose)
        );
      }
      checkPose(
        "AUTO t+" + productionLoopTime.toFixed(2) + " / phase " + productionPhase.toFixed(2),
        productionPose
      );
    }
    if (heroDwellPoseError > 0.000001) {
      issues.push("AUTO hero dwell departs SAFE pose by " + heroDwellPoseError.toFixed(6) + " rad");
    }

    // Prove every station through outbound custody, isolated HELD, and the
    // exact reverse restow path. Endpoints remain the established TCP outputs.
    for (var station = 0; station < STATIONS.length && issues.length < 24; station++) {
      activeRequest = STATIONS[station].id;
      var open = 0.22;
      var closed = 0.02;
      var approachOpen = poseForTarget(travelerTarget(activeRequest, "approach"), open);
      var seatOpen = poseForTarget(travelerTarget(activeRequest, "seat"), open);
      var seatClosed = poseForTarget(travelerTarget(activeRequest, "seat"), closed);
      var liftClosed = poseForTarget(travelerTarget(activeRequest, "lift"), closed);
      var clearClosed = poseForTarget(travelerTarget(activeRequest, "clear"), closed);
      var transitOpen = poseForTarget(CELL_TRANSIT, open);
      var transitClosed = poseForTarget(CELL_TRANSIT, closed);
      var bayClearOpen = poseForTarget(TRANSFER_CLEAR, open);
      var bayClearClosed = poseForTarget(TRANSFER_CLEAR, closed);
      var bayTcpOpen = poseForTarget(TRANSFER_TCP, open);
      var bayTcpClosed = poseForTarget(TRANSFER_TCP, closed);
      var stationLabel = "station " + STATIONS[station].key + " ";
      var sweeps = [
        [SAFE_POSE, transitOpen, "safe to cell transit"],
        [transitOpen, approachOpen, "cell transit to rack approach"],
        [approachOpen, seatOpen, "normal rack seat"],
        [seatOpen, seatClosed, "jaw close"],
        [seatClosed, liftClosed, "hook lift"],
        [liftClosed, clearClosed, "rack retract"],
        [clearClosed, transitClosed, "rack clear to cell transit"],
        [transitClosed, bayClearClosed, "cell transit to bay clear"],
        [bayClearClosed, bayTcpClosed, "bay deposit"],
        [bayTcpClosed, bayTcpOpen, "bay release"],
        [bayTcpOpen, bayClearOpen, "bay retract to HELD"],
        [bayClearOpen, bayTcpOpen, "return bay approach"],
        [bayTcpOpen, bayTcpClosed, "return jaw close"],
        [bayTcpClosed, bayClearClosed, "return bay retract"],
        [bayClearClosed, transitClosed, "return to cell transit"],
        [transitClosed, clearClosed, "cell transit to rack clear"],
        [clearClosed, liftClosed, "restow align"],
        [liftClosed, seatClosed, "restow seat"],
        [seatClosed, seatOpen, "rack release"],
        [seatOpen, approachOpen, "normal rack withdraw"],
        [approachOpen, transitOpen, "rack to home transit"],
        [transitOpen, HOME_POSE, "home return"]
      ];
      for (var sweepIndex = 0; sweepIndex < sweeps.length && issues.length < 24; sweepIndex++) {
        checkSweep(
          stationLabel + sweeps[sweepIndex][2],
          sweeps[sweepIndex][0],
          sweeps[sweepIndex][1]
        );
      }
    }

    // Open shutter proof uses the actual moving jaw roots at the deposit pose.
    applyPose(poseForTarget(TRANSFER_TCP, 0.22));
    robotRig.root.updateMatrixWorld(true);
    robotRig.leftFinger.getWorldPosition(point);
    var highestJawY = point.y + 0.085;
    robotRig.rightFinger.getWorldPosition(point);
    highestJawY = Math.max(highestJawY, point.y + 0.085);
    var shutterLowerEdge = transferBay.group.position.y + transferBay.innerOpenY - 0.51;
    var shutterClearance = shutterLowerEdge - highestJawY;
    if (shutterClearance < 0.1) {
      issues.push(
        "open shutter-to-jaw clearance is " +
        Math.round(shutterClearance * 1000) +
        " mm; 100 mm required"
      );
    }

    activeRequest = savedRequest;
    applyPose(savedPose);
    robotRig.root.updateMatrixWorld(true);
    var valid = issues.length === 0;
    startupDiagnostics.sweptIssueCount = issues.length;
    startupDiagnostics.shutterClearanceMm = shutterClearance * 1000;
    if (window.console) {
      if (console.assert) console.assert(valid, "Robot swept safety proof failed", issues);
      if (valid && console.info) {
        console.info(
          "Robot swept safety proof: AUTO + 7 outbound/return paths; " +
          Math.round(shutterClearance * 1000) +
          " mm open-shutter clearance"
        );
      } else if (!valid && console.error) {
        console.error("Robot swept safety proof failed", issues);
      }
    }
    return valid;
  }

  function validateProjectedAutoClearance() {
    if (!robotRig || !robotRig.arm2) return false;
    var proofWidth = 1420;
    var proofHeight = 982;
    var requiredClearance = 60;
    var proofCamera = new THREE.PerspectiveCamera(
      43,
      proofWidth / proofHeight,
      0.08,
      70
    );
    proofCamera.position.set(0, 2.35, 7.15);
    proofCamera.lookAt(new THREE.Vector3(0.35, 2.12, -5.7));
    proofCamera.updateProjectionMatrix();
    proofCamera.updateMatrixWorld(true);

    // Compare against the lower visible edge of the unchanged 75 mm top rail,
    // not its centerline. Both the front span and machine-side return are
    // sampled because the production TCP works on both sides of the cabinet.
    var railProfile = [];
    var railStart = new THREE.Vector3();
    var railEnd = new THREE.Vector3();
    var railPoint = new THREE.Vector3();
    var railNdc = new THREE.Vector3();
    function appendRailProfile(x1, z1, x2, z2) {
      railStart.set(x1, GUARD_HEIGHT - 0.0375, z1);
      railEnd.set(x2, GUARD_HEIGHT - 0.0375, z2);
      for (var railSample = 0; railSample <= 128; railSample++) {
        railPoint.lerpVectors(railStart, railEnd, railSample / 128);
        railNdc.copy(railPoint).project(proofCamera);
        railProfile.push({
          x: (railNdc.x + 1) * proofWidth * 0.5,
          y: (1 - railNdc.y) * proofHeight * 0.5
        });
      }
    }
    appendRailProfile(
      FRONT_GUARD_MIN_X,
      FRONT_GUARD_Z,
      FRONT_GUARD_MAX_X,
      FRONT_GUARD_Z
    );
    appendRailProfile(
      SIDE_GUARD_X,
      FRONT_GUARD_Z,
      SIDE_GUARD_X,
      SIDE_GUARD_MIN_Z
    );

    var railLookup = new Float32Array(proofWidth + 1);
    for (var lookupX = 0; lookupX <= proofWidth; lookupX++) {
      var lookupY = railProfile[0].y;
      var lookupDistance = Infinity;
      for (var lookupRail = 0; lookupRail < railProfile.length; lookupRail++) {
        var candidateDistance = Math.abs(railProfile[lookupRail].x - lookupX);
        if (candidateDistance < lookupDistance) {
          lookupDistance = candidateDistance;
          lookupY = railProfile[lookupRail].y;
        }
      }
      railLookup[lookupX] = lookupY;
    }

    function railYAt(screenX) {
      return railLookup[Math.round(clamp(screenX, 0, proofWidth))];
    }

    var savedPose = poseCopy(currentPose || HOME_POSE);
    var localCorner = new THREE.Vector3();
    var worldCorner = new THREE.Vector3();
    var projectedCorner = new THREE.Vector3();
    var instanceMatrix = new THREE.Matrix4();
    var combinedMatrix = new THREE.Matrix4();
    var minimumClearance = Infinity;
    var minimumPhase = 0;
    var minimumPart = "terminal chain";
    var heroDwellPoseError = 0;

    function inspectBounds(bounds, matrix, phase, partName) {
      for (var cornerIndex = 0; cornerIndex < 8; cornerIndex++) {
        localCorner.set(
          cornerIndex & 1 ? bounds.max.x : bounds.min.x,
          cornerIndex & 2 ? bounds.max.y : bounds.min.y,
          cornerIndex & 4 ? bounds.max.z : bounds.min.z
        );
        worldCorner.copy(localCorner).applyMatrix4(matrix);
        projectedCorner.copy(worldCorner).project(proofCamera);
        var screenX = (projectedCorner.x + 1) * proofWidth * 0.5;
        var screenY = (1 - projectedCorner.y) * proofHeight * 0.5;
        var clearance = screenY - railYAt(screenX);
        if (clearance < minimumClearance) {
          minimumClearance = clearance;
          minimumPhase = phase;
          minimumPart = partName;
        }
      }
    }

    function inspectAutoMesh(mesh, phase) {
      if (!mesh || !mesh.isMesh || mesh.visible === false || !mesh.geometry) return;
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
      var bounds = mesh.geometry.boundingBox;
      if (!bounds) return;
      var partName = mesh.name || (mesh.parent && mesh.parent.type) || mesh.type;
      if (mesh.isInstancedMesh && mesh.getMatrixAt) {
        for (var instanceIndex = 0; instanceIndex < mesh.count; instanceIndex++) {
          mesh.getMatrixAt(instanceIndex, instanceMatrix);
          combinedMatrix.multiplyMatrices(mesh.matrixWorld, instanceMatrix);
          inspectBounds(bounds, combinedMatrix, phase, partName + " instance " + instanceIndex);
        }
      } else {
        inspectBounds(bounds, mesh.matrixWorld, phase, partName);
      }
    }

    for (var autoSample = 0; autoSample <= 576; autoSample++) {
      var loopTime = AUTO_CYCLE_SECONDS * autoSample / 576;
      var phase = autoPhaseAtLoopTime(loopTime);
      var pose = productionPoseAt(phase);
      if (loopTime <= AUTO_HERO_DWELL_SECONDS + 0.000001) {
        heroDwellPoseError = Math.max(heroDwellPoseError, autoHeroPoseError(pose));
      }
      applyPose(pose);
      robotRig.root.updateMatrixWorld(true);
      robotRig.arm2.traverse(function (object) {
        inspectAutoMesh(object, phase);
      });
    }

    applyPose(savedPose);
    robotRig.root.updateMatrixWorld(true);
    var valid =
      minimumClearance >= requiredClearance &&
      AUTO_HERO_DWELL_SECONDS >= 1.5 &&
      AUTO_HERO_DWELL_SECONDS <= 2.0 &&
      heroDwellPoseError <= 0.000001;
    startupDiagnostics.projectedMinimumClearancePx = minimumClearance;
    if (window.console) {
      if (console.assert) {
        console.assert(
          valid,
          "AUTO projected guard-rail clearance failed",
          minimumClearance,
          minimumPhase,
          minimumPart
        );
      }
      if (valid && console.info) {
        console.info(
          "AUTO projection proof: 577 poses, " +
          Math.round(minimumClearance) +
          " px minimum below top rail at phase " +
          minimumPhase.toFixed(2) +
          "; hero dwell " +
          AUTO_HERO_DWELL_SECONDS.toFixed(2) +
          " s / pose error " +
          heroDwellPoseError.toFixed(6) +
          " rad"
        );
      } else if (!valid && console.error) {
        console.error(
          "AUTO projected guard-rail clearance failed: " +
          Math.round(minimumClearance) +
          " px at phase " +
          minimumPhase.toFixed(2) +
          " / " +
          minimumPart
        );
      }
    }
    return valid;
  }

  function updateProduction(delta) {
    var previousPhase = productionClock;
    productionClock = (productionClock + delta) % AUTO_CYCLE_SECONDS;
    var phase = productionClock;

    if (crossedAutoPhase(previousPhase, phase, AUTO_HERO_PHASE_START)) {
      autoHeroLoopCount += 1;
      autoHeroDwellActive = true;
      // Backdate the threshold crossing within this frame so telemetry reports
      // the authored hold, not a frame-cadence-shortened approximation.
      autoHeroDwellEnteredAt =
        simulationClock - Math.max(0, phase - AUTO_HERO_PHASE_START);
      autoHeroCurrentPoseError = 0;
      autoHeroMaxPoseError = 0;
    }

    var heroDwellNow = isAutoHeroDwellPhase(phase);
    var pose = productionPoseAt(phase);
    applyPose(pose);
    autoHeroCurrentPoseError = heroDwellNow ? autoHeroPoseError(currentPose) : 0;
    if (heroDwellNow) {
      autoHeroMaxPoseError = Math.max(
        autoHeroMaxPoseError,
        autoHeroCurrentPoseError
      );
    } else if (autoHeroDwellActive) {
      autoHeroLastDuration = Math.max(
        0,
        simulationClock -
          Math.max(0, phase - AUTO_HERO_PHASE_END) -
          autoHeroDwellEnteredAt
      );
      autoHeroLastMaxPoseError = autoHeroMaxPoseError;
      autoHeroCompletedDwells += 1;
      autoHeroDwellActive = false;
    }
    scene.updateMatrixWorld(true);

    var doorOpen = 1;
    // Interlocked sequence: arm clears at 6.0, then the door closes; the
    // spindle cannot run until fully closed. Door is fully open before the
    // unload approach begins at 9.15.
    if (phase >= 6.5 && phase < 8.4) doorOpen = 0;
    else if (phase >= 6.0 && phase < 6.5) doorOpen = 1 - smoothstep((phase - 6.0) / 0.5);
    else if (phase >= 8.4 && phase < 9.0) doorOpen = smoothstep((phase - 8.4) / 0.6);
    machineRig.door.position.x = doorOpen * machineRig.doorTravel;
    machineRig.doorOpen = doorOpen;

    var machining = phase >= 6.55 && phase < 8.4;
    machineRig.spindle.rotation.z += machining ? delta * 24 : delta * 0.8;
    setStacklight("run");
    updateMachiningSpray(phase, machining);

    if (!workpiece) return;
    workpiece.visible = phase < 13.95;
    setWorkpieceFinished(phase >= 8.4);

    if (phase < 1.0) {
      workpiece.position.set(
        lerp(-3.35, RAW_PICK.x, smoothstep(phase)),
        RAW_PICK.y,
        RAW_PICK.z
      );
      workpiece.quaternion.identity();
    } else if (phase < 2.0) {
      workpiece.position.copy(RAW_PICK);
      workpiece.quaternion.identity();
    } else if (phase < 4.55) {
      robotRig.gripperTip.getWorldPosition(tempPosition);
      robotRig.gripperTip.getWorldQuaternion(tempQuaternion);
      workpiece.position.copy(tempPosition);
      workpiece.quaternion.copy(tempQuaternion);
    } else if (phase < 9.55) {
      workpiece.position.copy(CNC_PICK);
      workpiece.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
    } else if (phase < 10.72) {
      workpiece.position.copy(CNC_PICK);
      workpiece.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
    } else if (phase < 12.7) {
      robotRig.gripperTip.getWorldPosition(tempPosition);
      robotRig.gripperTip.getWorldQuaternion(tempQuaternion);
      workpiece.position.copy(tempPosition);
      workpiece.quaternion.copy(tempQuaternion);
    } else {
      workpiece.position.copy(FINISHED_DROP);
      workpiece.quaternion.identity();
    }
  }

  function updateMachiningSpray(phase, visible) {
    if (!machiningSpray) return;
    machiningSpray.visible = visible;
    if (!visible) return;
    var effectClock = phase + simulationClock * 0.8;
    var jetAttribute = coolantJet.geometry.getAttribute("position");
    for (var jet = 0; jet < 3; jet++) {
      var jetOffset = (jet - 1) * 0.075;
      var jetPulse = Math.sin(effectClock * 17 + jet * 2.1) * 0.018;
      jetAttribute.array[jet * 6] = -0.18 + jetOffset;
      jetAttribute.array[jet * 6 + 1] = 0.34;
      jetAttribute.array[jet * 6 + 2] = -0.08;
      jetAttribute.array[jet * 6 + 3] = jetOffset + jetPulse;
      jetAttribute.array[jet * 6 + 4] = -0.06;
      jetAttribute.array[jet * 6 + 5] = 0.18;
    }
    jetAttribute.needsUpdate = true;

    var sparkAttribute = chipSparks.geometry.getAttribute("position");
    for (var spark = 0; spark < sparkAttribute.count; spark++) {
      var sparkSeed = spark * 1.731;
      var sparkLife = (effectClock * 3.8 + sparkSeed) % 1;
      var sparkArc = Math.sin(sparkSeed * 4.1);
      sparkAttribute.array[spark * 3] = sparkArc * 0.34 * sparkLife;
      sparkAttribute.array[spark * 3 + 1] = 0.42 * sparkLife - 0.48 * sparkLife * sparkLife;
      sparkAttribute.array[spark * 3 + 2] = (0.2 + Math.cos(sparkSeed) * 0.12) * sparkLife;
    }
    sparkAttribute.needsUpdate = true;

    var mistAttribute = coolantMist.geometry.getAttribute("position");
    for (var mist = 0; mist < mistAttribute.count; mist++) {
      var mistSeed = mist * 2.317;
      var mistLife = (effectClock * 1.35 + mistSeed) % 1;
      mistAttribute.array[mist * 3] = Math.sin(mistSeed) * 0.38 * mistLife;
      mistAttribute.array[mist * 3 + 1] = 0.08 + 0.3 * mistLife;
      mistAttribute.array[mist * 3 + 2] = 0.08 + 0.32 * mistLife;
    }
    mistAttribute.needsUpdate = true;
  }

  function updateService(delta) {
    if (state === STATE.AUTO) {
      updateProduction(delta);
      return;
    }

    if (state === STATE.HELD) {
      applyPose(servicePoseFor(STATE.HELD));
      return;
    }

    var duration = activeStateDuration;
    var elapsed = simulationClock - stateEntered;
    var progress = clamp(elapsed / duration, 0, 1);
    // A request can arrive at any point in AUTO. Follow the already-proved
    // production trajectory to its nearest SAFE boundary instead of blending
    // directly across the guard from an arbitrary live pose.
    applyPose(
      state === STATE.REQUESTED
        ? requestEgressPoseAt(progress)
        : state === STATE.RESUME_CHECKPOINT
          ? requestEgressPoseAt(1 - progress)
        : interpolatePose(transitionPose, transitionTarget, progress)
    );
    updateTransferHardware(progress);

    if (state === STATE.RELEASE_SETTLE && activeTraveler && !activeTraveler.attached) {
      updateRestowTraveler(progress);
    }

    if (
      interruptedPartHeld &&
      workpiece &&
      (state === STATE.REQUESTED || state === STATE.SAFE_PARK || state === STATE.BUFFER_DROP)
    ) {
      robotRig.gripperTip.getWorldPosition(tempPosition);
      robotRig.gripperTip.getWorldQuaternion(tempQuaternion);
      workpiece.position.copy(tempPosition);
      workpiece.quaternion.copy(tempQuaternion);
      setWorkpieceFinished(interruptedPartFinished);
    }
    // Attachment changes only at the exact rack target in
    // advanceServiceState: no early grip, floating board, or early release.
    if (state === STATE.RESUME_CHECKPOINT && bufferedPart && workpiece) {
      robotRig.gripperTip.getWorldPosition(tempPosition);
      robotRig.gripperTip.getWorldQuaternion(tempQuaternion);
      workpiece.position.copy(tempPosition);
      workpiece.quaternion.copy(tempQuaternion);
      setWorkpieceFinished(interruptedPartFinished);
    }
    if (elapsed >= duration) advanceServiceState();
  }

  var raycaster = new THREE.Raycaster();
  var pointer = new THREE.Vector2(-10, -10);
  var pointerDirty = true;
  var hoverElapsed = 0;
  var HMI_PRESS_ACK_MS = 100;

  function updatePointer(event) {
    var rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    pointerDirty = true;
    // Pointer raycasts are frame-coalesced. In settled HELD this explicitly
    // wakes one WebGL frame; during motion the pending rAF absorbs the request.
    requestSceneRender("pointer");
  }

  function enabledHmiHit() {
    raycaster.setFromCamera(pointer, camera);
    var hits = raycaster.intersectObjects(hmiInteractives, false);
    for (var i = 0; i < hits.length; i++) {
      if (hits[i].object.userData.enabled) return hits[i].object;
    }
    return null;
  }

  function hmiPressKey(hit) {
    if (!hit) return null;
    if (hit.userData.hmiAction === "station") return hit.userData.stationId;
    if (hit.userData.hmiAction === "inspect") return "__inspect";
    if (hit.userData.hmiAction === "back") return "__back";
    return null;
  }

  function cancelHmiPress(skipRedraw) {
    var hadPress = !!(hmiPressHit || hmiPressed || hmiPressTimer);
    if (hmiPressTimer) window.clearTimeout(hmiPressTimer);
    hmiPressTimer = 0;
    hmiPressHit = null;
    hmiPressed = null;
    hmiPressPointerId = null;
    hmiPressReleased = false;
    if (hadPress && !skipRedraw) {
      drawHmi();
      requestSceneRender();
    }
  }

  function activateHmiPress() {
    var hit = hmiPressHit;
    var enabled = hit && hit.userData.enabled;
    cancelHmiPress(true);
    if (!enabled) {
      drawHmi();
      requestSceneRender();
      return;
    }
    if (hit.userData.hmiAction === "inspect") {
      setHmiInspect(true);
    } else if (hit.userData.hmiAction === "back") {
      setHmiInspect(false);
    } else if (hit.userData.hmiAction === "station") {
      requestStation(hit.userData.stationId, canvas);
    }
  }

  function beginHmiPress(event) {
    cancelHmiPress();
    updatePointer(event);
    try {
      canvas.focus({ preventScroll: true });
    } catch (ignore) {
      canvas.focus();
    }
    var hit = enabledHmiHit();
    if (!hit) return;
    hmiPressHit = hit;
    hmiPressed = hmiPressKey(hit);
    hmiPressPointerId = event.pointerId;
    hmiPressReleased = false;
    hmiPressStartX = event.clientX;
    hmiPressStartY = event.clientY;
    drawHmi();
    requestSceneRender();
    if (reducedMotion) {
      activateHmiPress();
    } else {
      hmiPressTimer = window.setTimeout(activateHmiPress, HMI_PRESS_ACK_MS);
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch (ignoreCapture) {}
    }
    event.preventDefault();
  }

  function releaseHmiPress(event) {
    if (!hmiPressHit || event.pointerId !== hmiPressPointerId) return;
    updatePointer(event);
    if (enabledHmiHit() !== hmiPressHit) {
      cancelHmiPress();
      return;
    }
    hmiPressReleased = true;
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch (ignoreRelease) {}
    event.preventDefault();
  }

  function trackHmiPointer(event) {
    updatePointer(event);
    if (
      hmiPressHit &&
      event.pointerId === hmiPressPointerId &&
      Math.sqrt(
        Math.pow(event.clientX - hmiPressStartX, 2) +
        Math.pow(event.clientY - hmiPressStartY, 2)
      ) > 18 &&
      enabledHmiHit() !== hmiPressHit
    ) cancelHmiPress();
  }

  function updateHover(delta) {
    hoverElapsed += delta;
    if (!pointerDirty && hoverElapsed < 0.08) return;
    pointerDirty = false;
    hoverElapsed = 0;
    var hit = enabledHmiHit();
    var next = hit && hit.userData.stationId
      ? hit.userData.stationId
      : hit && hit.userData.hmiAction === "back"
        ? "__back"
        : hit && hit.userData.hmiAction === "inspect" ? "__inspect" : null;
    var interactive = !!hit;
    if (next !== hmiHover) {
      hmiHover = next;
      drawHmi();
      requestSceneRender();
    }
    canvas.style.cursor = interactive ? "pointer" : "default";
  }

  canvas.addEventListener("pointermove", trackHmiPointer, { passive: true });
  canvas.addEventListener("pointerdown", beginHmiPress);
  canvas.addEventListener("pointerup", releaseHmiPress);
  canvas.addEventListener("pointercancel", function () {
    cancelHmiPress();
  });
  canvas.addEventListener("lostpointercapture", function () {
    if (hmiPressHit && !hmiPressReleased) cancelHmiPress();
  });
  canvas.addEventListener("pointerleave", function () {
    if (hmiPressHit && !hmiPressReleased) cancelHmiPress();
    pointer.set(-10, -10);
    pointerDirty = true;
    hmiHover = null;
    canvas.style.cursor = "default";
    drawHmi();
    requestSceneRender();
  });

  function runRackStartupSanity() {
    var startedAt = performance.now();
    startupDiagnostics.rackCalls += 1;
    startupDiagnostics.rackValid = validateRackFixture();
    startupDiagnostics.rackDurationMs = performance.now() - startedAt;
    return startupDiagnostics.rackValid;
  }

  function runExhaustiveSafetyProofs() {
    if (
      !exhaustiveProofRequested ||
      startupDiagnostics.proofRunning ||
      startupDiagnostics.proofComplete
    ) return;
    startupDiagnostics.proofRunning = true;
    startupDiagnostics.proofStartedAt = performance.now();
    try {
      startupDiagnostics.sweptCalls += 1;
      startupDiagnostics.sweptValid = validateSweptSafetyEnvelope();
      startupDiagnostics.projectedCalls += 1;
      startupDiagnostics.projectedValid = validateProjectedAutoClearance();
      startupDiagnostics.requestEntryCalls += 1;
      startupDiagnostics.requestEntryValid = validateAllRequestEgressEntries();
    } catch (proofError) {
      startupDiagnostics.sweptValid = startupDiagnostics.sweptValid === true;
      startupDiagnostics.projectedValid = startupDiagnostics.projectedValid === true;
      startupDiagnostics.requestEntryValid = startupDiagnostics.requestEntryValid === true;
      if (window.console && console.error) {
        console.error("Exhaustive robot safety proof failed to complete", proofError);
      }
    } finally {
      startupDiagnostics.proofDurationMs =
        performance.now() - startupDiagnostics.proofStartedAt;
      startupDiagnostics.proofRunning = false;
      startupDiagnostics.proofComplete = true;
      requestSceneRender("safety-proof");
      publishPerformanceTelemetry(performance.now(), "proof");
    }
  }

  function scheduleExhaustiveSafetyProofs() {
    if (!exhaustiveProofRequested || startupDiagnostics.proofScheduled) return;
    startupDiagnostics.proofScheduled = true;
    // Register after the initial renderer submission. The extra rAF boundary
    // guarantees a presentable frame before an idle/timeout callback begins
    // the intentionally exhaustive, main-thread-only Three.js traversal.
    window.requestAnimationFrame(function () {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(runExhaustiveSafetyProofs, { timeout: 1500 });
      } else {
        window.setTimeout(runExhaustiveSafetyProofs, 0);
      }
    });
  }

  try {
    if (bootMessage) bootMessage.textContent = "Loading floor optics - homing six-axis robot";
    buildBackdrop();
    buildMachineProxy();
    buildRobot();
    buildStaging();
    buildSceneFinishing();
    applyPose(SAFE_POSE);
    // This small seven-station fixture proof remains a synchronous production
    // sanity check. Full all-station sweeps/projections are scheduled only for
    // explicit QA after the first frame; live requests retain their reach/TCP,
    // custody, guard, rack-seat, and shutter-clearance validators unchanged.
    runRackStartupSanity();
    updateHmiHitMode();
  } catch (error) {
    showError("The CNC scene could not be built. Resume clipboards remain available below.");
    return;
  }

  sceneReady = true;
  setBodyState();
  setDockState();
  setCellStatus("Cycle", "Running");
  updateSafetyDom();

  var framePending = false;
  var frameRequestId = 0;
  var frameExecuting = false;
  var renderDirty = true;
  var renderLoopSleeping = false;
  var renderLoopSleepStartedAt = 0;
  var wakePending = false;
  var wakeRequestedAt = 0;
  var wakeReason = "initial";
  var wakeLatencyLast = 0;
  var wakeLatencyMax = 0;
  var wakeLatencyTotal = 0;
  var wakeLatencyCount = 0;
  var canvasFramesTotal = 0;
  var idleCanvasFramesTotal = 0;
  var idleFrameBuckets = new Uint16Array(60);
  var idleFrameBucketEpochs = new Int32Array(60);
  for (var idleBucketIndex = 0; idleBucketIndex < idleFrameBucketEpochs.length; idleBucketIndex++) {
    idleFrameBucketEpochs[idleBucketIndex] = -1;
  }
  var RENDER_COST_CAPACITY = 120;
  var renderCostSamples = new Float32Array(RENDER_COST_CAPACITY);
  var renderCostSampleIndex = 0;
  var renderCostSampleCount = 0;
  var renderCostLast = 0;
  var cycleMetrics = {
    active: false,
    started: 0,
    completed: 0,
    failed: 0,
    startedAt: 0,
    fetchStartedAt: 0,
    fetchCompleted: 0,
    lastFetchDurationMs: 0,
    lastDurationMs: 0,
    lastValid: true,
    lastFault: ""
  };
  var lastTime = performance.now();
  var PERF_SAMPLE_CAPACITY = 180;
  var PERF_BASELINE_SECONDS = 3.2;
  var PERF_EVALUATION_SECONDS = 0.8;
  var PERF_MOTION_SECONDS = 2.0;
  var PERF_SETTLED_SECONDS = 6.0;
  var PERF_DOWN_COOLDOWN_MS = 4500;
  var PERF_UP_COOLDOWN_MS = 6500;
  var PERF_MOTION_POOR_WINDOWS = 3;
  var PERF_SETTLED_HEALTHY_WINDOWS = 5;
  var PERF_TARGET_FRAME_MS = 1000 / 60;
  var PERF_MOTION_P50_MS = 18.5;
  var PERF_MOTION_P95_MS = 26;
  var PERF_SETTLED_BASE_P50_MS = 17.2;
  var PERF_SETTLED_BASE_P95_MS = 22.5;
  var perfFrameTimes = new Float32Array(PERF_SAMPLE_CAPACITY);
  var perfSampleIndex = 0;
  var perfSampleCount = 0;
  var perfEvaluationElapsed = 0;
  var perfBaselineElapsed = 0;
  var perfMotionElapsed = 0;
  var perfSettledElapsed = 0;
  var perfPoorWindows = 0;
  var perfHealthyWindows = 0;
  var perfCooldownUntil = 0;
  var perfLastAdjustment = "native baseline";
  var perfStats = { p50: 0, p95: 0 };
  var perfBaselineCadenceMs = PERF_TARGET_FRAME_MS;
  var perfSettledHealthyP50Ms = PERF_SETTLED_BASE_P50_MS;
  var perfSettledHealthyP95Ms = PERF_SETTLED_BASE_P95_MS;
  var perfBaseline = {
    complete: false,
    samples: 0,
    durationMs: 0,
    p50: 0,
    p95: 0,
    dpr: nativeRenderDpr
  };

  function scheduleFrame() {
    if (framePending || frameExecuting || document.hidden) return;
    framePending = true;
    frameRequestId = window.requestAnimationFrame(animate);
  }

  function markRenderWake(reason) {
    if (!renderLoopSleeping || wakePending || document.hidden) return;
    wakePending = true;
    wakeRequestedAt = performance.now();
    wakeReason = reason || "scene";
    // A settled HELD interval must not appear as one giant physics step when
    // an input wakes the canvas. State transitions begin from this fresh time.
    lastTime = wakeRequestedAt;
    renderLoopSleeping = false;
  }

  requestSceneRender = function (reason) {
    renderDirty = true;
    markRenderWake(reason);
    scheduleFrame();
  };

  function recordCycleStart() {
    if (!debugFps) return;
    cycleMetrics.active = true;
    cycleMetrics.started += 1;
    cycleMetrics.startedAt = performance.now();
    cycleMetrics.fetchStartedAt = cycleMetrics.startedAt;
    cycleMetrics.lastFault = "";
  }

  function recordFetchCompletion() {
    if (!debugFps || !cycleMetrics.fetchStartedAt) return;
    cycleMetrics.fetchCompleted += 1;
    cycleMetrics.lastFetchDurationMs = performance.now() - cycleMetrics.fetchStartedAt;
  }

  function rackCustodyProved() {
    if (travelers.length !== STATIONS.length) return false;
    for (var travelerIndex = 0; travelerIndex < travelers.length; travelerIndex++) {
      var traveler = travelers[travelerIndex];
      if (
        !traveler ||
        traveler.custody !== "rack" ||
        !traveler.cassetteOccupied ||
        traveler.attached
      ) return false;
    }
    return true;
  }

  function recordCycleCompletion(restowComplete) {
    if (!debugFps) return;
    var valid = !!(
      restowComplete &&
      rackCustodyProved() &&
      !safetyFault &&
      !safetySensors.boardInBay &&
      safetySensors.outerLocked &&
      !safetySensors.outerPresented &&
      safetySensors.innerLocked &&
      !safetySensors.innerOpen &&
      safetySensors.robotClear
    );
    cycleMetrics.completed += 1;
    if (!valid) cycleMetrics.failed += 1;
    cycleMetrics.lastValid = valid;
    cycleMetrics.lastDurationMs = cycleMetrics.startedAt
      ? performance.now() - cycleMetrics.startedAt
      : 0;
    cycleMetrics.active = false;
  }

  function recordCycleFault(message) {
    if (!debugFps) return;
    cycleMetrics.lastFault = String(message || "safety fault");
    cycleMetrics.lastValid = false;
    if (cycleMetrics.active) {
      cycleMetrics.failed += 1;
      cycleMetrics.active = false;
      cycleMetrics.lastDurationMs = cycleMetrics.startedAt
        ? performance.now() - cycleMetrics.startedAt
        : 0;
    }
  }

  function resetPerformanceWindow(resetBaseline) {
    perfSampleIndex = 0;
    perfSampleCount = 0;
    perfEvaluationElapsed = 0;
    perfPoorWindows = 0;
    perfHealthyWindows = 0;
    perfStats = { p50: 0, p95: 0 };
    if (resetBaseline) {
      perfBaselineElapsed = 0;
      perfBaseline.complete = false;
      perfBaseline.samples = 0;
      perfBaseline.durationMs = 0;
      perfBaseline.p50 = 0;
      perfBaseline.p95 = 0;
      perfBaseline.dpr = nativeRenderDpr;
      perfBaselineCadenceMs = PERF_TARGET_FRAME_MS;
      perfSettledHealthyP50Ms = PERF_SETTLED_BASE_P50_MS;
      perfSettledHealthyP95Ms = PERF_SETTLED_BASE_P95_MS;
      perfLastAdjustment = "native baseline";
    }
  }

  function recordFrameTime(frameMs) {
    if (!isFinite(frameMs) || frameMs < 1 || frameMs > 250) return 0;
    var sampledFrameMs = Math.min(100, frameMs);
    perfFrameTimes[perfSampleIndex] = sampledFrameMs;
    perfSampleIndex = (perfSampleIndex + 1) % PERF_SAMPLE_CAPACITY;
    perfSampleCount = Math.min(PERF_SAMPLE_CAPACITY, perfSampleCount + 1);
    return sampledFrameMs;
  }

  function frameTimePercentiles() {
    if (!perfSampleCount) return { p50: 0, p95: 0 };
    var sorted = new Float32Array(perfSampleCount);
    for (var sample = 0; sample < perfSampleCount; sample++) {
      sorted[sample] = perfFrameTimes[sample];
    }
    sorted.sort();
    return {
      p50: sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * 0.5))],
      p95: sorted[Math.min(sorted.length - 1, Math.ceil((sorted.length - 1) * 0.95))]
    };
  }

  function recordWakeLatency(now) {
    if (!wakePending) return;
    var latency = Math.max(0, now - wakeRequestedAt);
    wakePending = false;
    wakeLatencyLast = latency;
    wakeLatencyMax = Math.max(wakeLatencyMax, latency);
    wakeLatencyTotal += latency;
    wakeLatencyCount += 1;
  }

  function recordIdleCanvasFrame(now) {
    var epochSecond = Math.floor(now / 1000);
    var bucketIndex = epochSecond % idleFrameBuckets.length;
    if (idleFrameBucketEpochs[bucketIndex] !== epochSecond) {
      idleFrameBucketEpochs[bucketIndex] = epochSecond;
      idleFrameBuckets[bucketIndex] = 0;
    }
    idleFrameBuckets[bucketIndex] = Math.min(65535, idleFrameBuckets[bucketIndex] + 1);
  }

  function idleCanvasFramesLastMinute(now) {
    var currentSecond = Math.floor(now / 1000);
    var total = 0;
    for (var bucketIndex = 0; bucketIndex < idleFrameBuckets.length; bucketIndex++) {
      var age = currentSecond - idleFrameBucketEpochs[bucketIndex];
      if (age >= 0 && age < 60) total += idleFrameBuckets[bucketIndex];
    }
    return total;
  }

  function recordRenderCost(costMs) {
    if (!debugFps) return;
    renderCostLast = costMs;
    renderCostSamples[renderCostSampleIndex] = Math.min(100, Math.max(0, costMs));
    renderCostSampleIndex = (renderCostSampleIndex + 1) % RENDER_COST_CAPACITY;
    renderCostSampleCount = Math.min(RENDER_COST_CAPACITY, renderCostSampleCount + 1);
  }

  function renderCostPercentiles() {
    if (!renderCostSampleCount) return { p50: 0, p95: 0 };
    var sorted = new Float32Array(renderCostSampleCount);
    for (var sampleIndex = 0; sampleIndex < renderCostSampleCount; sampleIndex++) {
      sorted[sampleIndex] = renderCostSamples[sampleIndex];
    }
    sorted.sort();
    return {
      p50: sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * 0.5))],
      p95: sorted[Math.min(sorted.length - 1, Math.ceil((sorted.length - 1) * 0.95))]
    };
  }

  function renderLoopMotionActive() {
    if (reducedMotion || document.hidden) return false;
    if (Math.abs(cameraInspectionTarget - cameraInspection) > 0.0005) return true;
    if (hmiPressHit && hmiPressTimer) return true;
    if (state === STATE.AUTO) return true;
    if (state === STATE.HELD) return false;
    // A held safety fault has an infinite duration and a frozen pose. Normal
    // service states retain their full-rate, simulation-clock-driven motion.
    return isFinite(activeStateDuration);
  }

  function viewportRectSnapshot() {
    if (!canvas || !canvas.getBoundingClientRect) return null;
    var rect = canvas.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    };
  }

  function applyCanvasReadyClass(renderCompletedAt) {
    if (!document.body || canvasRevealDiagnostics.firstCanvasRevealAt) return;
    canvasRevealDiagnostics.firstCanvasRenderCompletedAt = renderCompletedAt;
    canvasRevealDiagnostics.viewportBefore = viewportRectSnapshot();
    if (!document.body.classList.contains("cr-canvas-ready")) {
      document.body.classList.add("cr-canvas-ready");
      canvasRevealDiagnostics.classApplications += 1;
    }
    canvasRevealDiagnostics.firstCanvasRevealAt = performance.now();
    canvasRevealDiagnostics.viewportAfter = viewportRectSnapshot();
    var before = canvasRevealDiagnostics.viewportBefore;
    var after = canvasRevealDiagnostics.viewportAfter;
    if (before && after) {
      canvasRevealDiagnostics.viewportMaxDeltaPx = Math.max(
        Math.abs(after.x - before.x),
        Math.abs(after.y - before.y),
        Math.abs(after.width - before.width),
        Math.abs(after.height - before.height)
      );
    }
    if (performance.mark) {
      try {
        performance.mark("cr-first-canvas-ready");
      } catch (ignoreCanvasMark) {}
    }
  }

  function renderSceneFrame(now, idleFrame) {
    var renderStartedAt = performance.now();
    renderer.render(scene, camera);
    var renderFinishedAt = performance.now();
    recordRenderCost(renderFinishedAt - renderStartedAt);
    if (!startupDiagnostics.firstRenderAt) {
      startupDiagnostics.firstRenderAt = renderFinishedAt;
      startupDiagnostics.scriptToFirstRenderMs = renderFinishedAt - scriptStartedAt;
      applyCanvasReadyClass(renderFinishedAt);
    }
    if (!debugFps) return;
    canvasFramesTotal += 1;
    if (idleFrame) {
      idleCanvasFramesTotal += 1;
      recordIdleCanvasFrame(now);
    }
  }

  function adaptiveMotionActive() {
    return renderLoopMotionActive();
  }

  function publishPerformanceTelemetry(now, mode) {
    if (!debugFps) return;
    if (performance.getEntriesByType) {
      updatePaintTiming(performance.getEntriesByType("paint"));
    }
    var p50 = perfStats.p50 || 0;
    var p95 = perfStats.p95 || 0;
    var fps = p50 > 0 ? 1000 / p50 : 0;
    var renderCostStats = renderCostPercentiles();
    var heldInvariantProved = state !== STATE.HELD || heldSafetyInvariant();
    var projectedClearance =
      typeof startupDiagnostics.projectedMinimumClearancePx === "number" &&
      isFinite(startupDiagnostics.projectedMinimumClearancePx)
        ? Number(startupDiagnostics.projectedMinimumClearancePx.toFixed(2))
        : null;
    var shutterClearance =
      typeof startupDiagnostics.shutterClearanceMm === "number" &&
      isFinite(startupDiagnostics.shutterClearanceMm)
        ? Number(startupDiagnostics.shutterClearanceMm.toFixed(2))
        : null;
    var viewportBeforeCopy = canvasRevealDiagnostics.viewportBefore
      ? Object.freeze({
          x: Number(canvasRevealDiagnostics.viewportBefore.x.toFixed(2)),
          y: Number(canvasRevealDiagnostics.viewportBefore.y.toFixed(2)),
          width: Number(canvasRevealDiagnostics.viewportBefore.width.toFixed(2)),
          height: Number(canvasRevealDiagnostics.viewportBefore.height.toFixed(2))
        })
      : null;
    var viewportAfterCopy = canvasRevealDiagnostics.viewportAfter
      ? Object.freeze({
          x: Number(canvasRevealDiagnostics.viewportAfter.x.toFixed(2)),
          y: Number(canvasRevealDiagnostics.viewportAfter.y.toFixed(2)),
          width: Number(canvasRevealDiagnostics.viewportAfter.width.toFixed(2)),
          height: Number(canvasRevealDiagnostics.viewportAfter.height.toFixed(2))
        })
      : null;
    var posterToCanvasMs =
      canvasRevealDiagnostics.posterPaintMs !== null &&
      canvasRevealDiagnostics.firstCanvasRevealAt
        ? canvasRevealDiagnostics.firstCanvasRevealAt - canvasRevealDiagnostics.posterPaintMs
        : null;
    if (fpsElement) {
      var modeLabel = renderLoopSleeping
        ? "IDLE"
        : mode === "baseline" ? "BASE" : mode === "settled" ? "SETTLED" : mode === "reduced-motion" ? "REDUCED" : "MOTION";
      fpsElement.textContent =
        (fps ? Math.round(fps) : "--") + " FPS" +
        " · p95 " + (p95 ? Math.round(p95) : "--") + "ms" +
        " · DPR " + renderDpr.toFixed(2) +
        " · " + modeLabel;
    }
    var baselineCopy = Object.freeze({
      complete: perfBaseline.complete,
      samples: perfBaseline.samples,
      durationMs: Math.round(perfBaseline.durationMs),
      p50Ms: Number(perfBaseline.p50.toFixed(2)),
      p95Ms: Number(perfBaseline.p95.toFixed(2)),
      cadenceMs: Number(perfBaselineCadenceMs.toFixed(2)),
      cadenceHz: Number((1000 / perfBaselineCadenceMs).toFixed(1)),
      dpr: Number(perfBaseline.dpr.toFixed(2))
    });
    var telemetrySnapshot = Object.freeze({
      targetFps: 60,
      mode: mode,
      motionActive: adaptiveMotionActive(),
      samples: perfSampleCount,
      p50Ms: Number(p50.toFixed(2)),
      p95Ms: Number(p95.toFixed(2)),
      estimatedFps: Number(fps.toFixed(1)),
      dpr: Object.freeze({
        native: Number(nativeRenderDpr.toFixed(2)),
        active: Number(renderDpr.toFixed(2)),
        settled: Number(nativeRenderDpr.toFixed(2)),
        motion: Number(adaptiveMotionDpr.toFixed(2)),
        floor: Number(adaptiveMotionDpr.toFixed(2)),
        cap: Number(dprCap.toFixed(2))
      }),
      baseline: baselineCopy,
      autoHeroDwell: Object.freeze({
        phaseStart: AUTO_HERO_PHASE_START,
        phaseEnd: AUTO_HERO_PHASE_END,
        configuredDurationSeconds: Number(AUTO_HERO_DWELL_SECONDS.toFixed(3)),
        active: autoHeroDwellActive,
        elapsedSeconds: Number(
          (autoHeroDwellActive
            ? Math.max(0, simulationClock - autoHeroDwellEnteredAt)
            : 0
          ).toFixed(3)
        ),
        lastDurationSeconds: Number(autoHeroLastDuration.toFixed(3)),
        currentPoseErrorRadians: Number(autoHeroCurrentPoseError.toFixed(6)),
        maxPoseErrorRadians: Number(
          (autoHeroDwellActive
            ? autoHeroMaxPoseError
            : autoHeroLastMaxPoseError
          ).toFixed(6)
        ),
        loopCount: autoHeroLoopCount,
        completedDwells: autoHeroCompletedDwells,
        serviceResets: autoHeroServiceResets
      }),
      startup: Object.freeze({
        diagnosticsMode: exhaustiveProofRequested ? "exhaustive-qa" : "normal",
        scriptToFirstRenderMs: Number(startupDiagnostics.scriptToFirstRenderMs.toFixed(2)),
        mainThreadTaskProxyMs: Number(startupDiagnostics.mainThreadTaskProxyMs.toFixed(2)),
        longestStartupTaskMs: Number(startupDiagnostics.longestStartupTaskMs.toFixed(2)),
        longestTaskOrProxyMs: Number(Math.max(
          startupDiagnostics.longestStartupTaskMs,
          startupDiagnostics.mainThreadTaskProxyMs
        ).toFixed(2)),
        firstRenderBeforeExhaustive:
          !!startupDiagnostics.firstRenderAt &&
          (!startupDiagnostics.proofStartedAt ||
            startupDiagnostics.firstRenderAt <= startupDiagnostics.proofStartedAt),
        canvasReveal: Object.freeze({
          navigationToFirstPaintMs:
            canvasRevealDiagnostics.firstPaintMs === null
              ? null
              : Number(canvasRevealDiagnostics.firstPaintMs.toFixed(2)),
          navigationToFcpMs:
            canvasRevealDiagnostics.firstContentfulPaintMs === null
              ? null
              : Number(canvasRevealDiagnostics.firstContentfulPaintMs.toFixed(2)),
          navigationToPosterMs:
            canvasRevealDiagnostics.posterPaintMs === null
              ? null
              : Number(canvasRevealDiagnostics.posterPaintMs.toFixed(2)),
          posterFcpToFirstCanvasRevealMs:
            posterToCanvasMs === null ? null : Number(posterToCanvasMs.toFixed(2)),
          posterObservedBeforeCanvas:
            canvasRevealDiagnostics.posterPaintMs === null
              ? null
              : canvasRevealDiagnostics.posterPaintMs <=
                canvasRevealDiagnostics.firstCanvasRevealAt,
          firstCanvasRenderCompletedAtMs: Number(
            canvasRevealDiagnostics.firstCanvasRenderCompletedAt.toFixed(2)
          ),
          firstCanvasRevealAtMs: Number(
            canvasRevealDiagnostics.firstCanvasRevealAt.toFixed(2)
          ),
          classApplications: canvasRevealDiagnostics.classApplications,
          classPresent: !!(
            document.body && document.body.classList.contains("cr-canvas-ready")
          ),
          viewportBefore: viewportBeforeCopy,
          viewportAfter: viewportAfterCopy,
          viewportMaxDeltaPx: Number(
            canvasRevealDiagnostics.viewportMaxDeltaPx.toFixed(2)
          ),
          layoutShiftCount: canvasRevealDiagnostics.layoutShiftCount,
          layoutShiftScore: Number(canvasRevealDiagnostics.layoutShiftScore.toFixed(5)),
          layoutShiftMax: Number(canvasRevealDiagnostics.layoutShiftMax.toFixed(5))
        }),
        rackSanity: Object.freeze({
          calls: startupDiagnostics.rackCalls,
          valid: startupDiagnostics.rackValid,
          durationMs: Number(startupDiagnostics.rackDurationMs.toFixed(2)),
          stations: STATIONS.length
        }),
        exhaustiveProof: Object.freeze({
          requested: exhaustiveProofRequested,
          scheduled: startupDiagnostics.proofScheduled,
          running: startupDiagnostics.proofRunning,
          complete: startupDiagnostics.proofComplete,
          durationMs: Number(startupDiagnostics.proofDurationMs.toFixed(2)),
          sweptCalls: startupDiagnostics.sweptCalls,
          projectedCalls: startupDiagnostics.projectedCalls,
          requestEntryCalls: startupDiagnostics.requestEntryCalls,
          normalCountsZero: exhaustiveProofRequested
            ? null
            : startupDiagnostics.sweptCalls === 0 &&
              startupDiagnostics.projectedCalls === 0 &&
              startupDiagnostics.requestEntryCalls === 0,
          sweptPoseBudget: 7835,
          projectedPoseBudget: 577,
          requestEntryPhaseBudget: 289,
          sweptValid: startupDiagnostics.sweptValid,
          sweptIssueCount: startupDiagnostics.sweptIssueCount,
          shutterClearanceMm: shutterClearance,
          projectedValid: startupDiagnostics.projectedValid,
          requestEntryValid: startupDiagnostics.requestEntryValid,
          requestEntrySamples: startupDiagnostics.requestEntrySamples,
          requestEntryFailedPhase: startupDiagnostics.requestEntryFailedPhase,
          requestEntryFailureStage: startupDiagnostics.requestEntryFailureStage,
          projectedMinimumClearancePx: projectedClearance
        })
      }),
      thresholds: Object.freeze({
        motionLoad: Object.freeze({
          p50Ms: PERF_MOTION_P50_MS,
          p95Ms: PERF_MOTION_P95_MS,
          windows: PERF_MOTION_POOR_WINDOWS
        }),
        settledHealth: Object.freeze({
          p50Ms: Number(perfSettledHealthyP50Ms.toFixed(2)),
          p95Ms: Number(perfSettledHealthyP95Ms.toFixed(2)),
          windows: PERF_SETTLED_HEALTHY_WINDOWS
        })
      }),
      hysteresis: Object.freeze({
        poorWindows: perfPoorWindows,
        healthyWindows: perfHealthyWindows,
        motionMs: Math.round(perfMotionElapsed * 1000),
        settledMs: Math.round(perfSettledElapsed * 1000),
        cooldownMs: Math.max(0, Math.round(perfCooldownUntil - now)),
        lastAdjustment: perfLastAdjustment
      }),
      renderLoop: Object.freeze({
        state: renderLoopSleeping ? "sleeping" : "active",
        nativeDprAtRest: !renderLoopSleeping || Math.abs(renderDpr - nativeRenderDpr) < 0.015,
        canvasFramesTotal: canvasFramesTotal,
        idleCanvasFramesTotal: idleCanvasFramesTotal,
        idleCanvasFramesPerMinute: idleCanvasFramesLastMinute(now),
        sleepDurationMs: renderLoopSleeping
          ? Math.max(0, Math.round(now - renderLoopSleepStartedAt))
          : 0,
        cpuGpuSubmitProxyMs: Object.freeze({
          last: Number(renderCostLast.toFixed(3)),
          p50: Number(renderCostStats.p50.toFixed(3)),
          p95: Number(renderCostStats.p95.toFixed(3)),
          samples: renderCostSampleCount,
          kind: "renderer.render CPU plus driver-submit proxy"
        }),
        wakeToFirstFrameMs: Object.freeze({
          last: Number(wakeLatencyLast.toFixed(2)),
          mean: Number((wakeLatencyCount ? wakeLatencyTotal / wakeLatencyCount : 0).toFixed(2)),
          max: Number(wakeLatencyMax.toFixed(2)),
          samples: wakeLatencyCount,
          reason: wakeReason
        })
      }),
      cycle: Object.freeze({
        active: cycleMetrics.active,
        state: state,
        request: activeRequest,
        started: cycleMetrics.started,
        completed: cycleMetrics.completed,
        failed: cycleMetrics.failed,
        fetchCompleted: cycleMetrics.fetchCompleted,
        lastFetchDurationMs: Math.round(cycleMetrics.lastFetchDurationMs),
        lastDurationMs: Math.round(cycleMetrics.lastDurationMs),
        activeStateDurationMs: isFinite(activeStateDuration)
          ? Math.round(activeStateDuration * 1000)
          : null,
        activeStateElapsedMs: isFinite(activeStateDuration)
          ? Math.max(0, Math.round((simulationClock - stateEntered) * 1000))
          : null,
        requestEgress: Object.freeze({
          startPhase: Number(requestEgressStartPhase.toFixed(3)),
          safePhase: Number(requestEgressEndPhase.toFixed(3)),
          durationMs: Math.round(requestEgressDuration * 1000),
          runtimeProofValid: requestEgressProofValid,
          runtimeProofDurationMs: Number(requestEgressProofDurationMs.toFixed(2))
        }),
        plannedFetchDurationMs: Math.round(plannedFetchDurationMs),
        plannedFetchBreakdown: plannedFetchBreakdown.slice(),
        lastValid: cycleMetrics.lastValid,
        liveInvariant: !safetyFault && heldInvariantProved,
        heldInvariant: heldInvariantProved,
        rackRestowed: rackCustodyProved(),
        lastFault: cycleMetrics.lastFault
      })
    });
    window.__crPerformance = telemetrySnapshot;
    if (fpsElement) {
      fpsElement.setAttribute("data-telemetry", JSON.stringify(telemetrySnapshot));
    }
  }

  function setAdaptiveDpr(nextDpr, reason, now) {
    // Quantize every request back to one of the two legal states. This removes
    // the repeated .10 stepping that could visibly pump backing resolution.
    var midpoint = (nativeRenderDpr + adaptiveMotionDpr) * 0.5;
    var bounded = nextDpr >= midpoint ? nativeRenderDpr : adaptiveMotionDpr;
    if (Math.abs(bounded - renderDpr) < 0.015) return false;
    renderDpr = bounded;
    renderer.setPixelRatio(renderDpr);
    renderer.setSize(width, height, false);
    renderDirty = true;
    perfLastAdjustment = reason;
    perfCooldownUntil = now + (reason === "settled restore" ? PERF_UP_COOLDOWN_MS : PERF_DOWN_COOLDOWN_MS);
    resetPerformanceWindow(false);
    return true;
  }

  function adaptQuality(frameMs, now) {
    var sampledFrameMs = recordFrameTime(frameMs);
    if (!sampledFrameMs) return;
    var frameSeconds = sampledFrameMs * 0.001;
    perfEvaluationElapsed += frameSeconds;
    var moving = adaptiveMotionActive();
    if (moving) {
      perfMotionElapsed += frameSeconds;
      perfSettledElapsed = 0;
    } else {
      perfSettledElapsed += frameSeconds;
      perfMotionElapsed = 0;
    }

    if (!perfBaseline.complete) {
      perfBaselineElapsed += frameSeconds;
      if (perfEvaluationElapsed >= PERF_EVALUATION_SECONDS) {
        perfEvaluationElapsed = 0;
        perfStats = frameTimePercentiles();
        publishPerformanceTelemetry(now, "baseline");
      }
      if (perfBaselineElapsed < PERF_BASELINE_SECONDS || perfSampleCount < 90) return;
      perfStats = frameTimePercentiles();
      perfBaseline.complete = true;
      perfBaseline.samples = perfSampleCount;
      perfBaseline.durationMs = perfBaselineElapsed * 1000;
      perfBaseline.p50 = perfStats.p50;
      perfBaseline.p95 = perfStats.p95;
      perfBaseline.dpr = nativeRenderDpr;
      // A browser/display cadence cap is not GPU pressure. Base HELD recovery
      // on the captured median cadence, while retaining the fixed 60fps load
      // target above. The p95 margin accepts stable cadence frames but rejects
      // the 50ms-class jank seen in the baseline tail.
      perfBaselineCadenceMs = Math.max(
        PERF_TARGET_FRAME_MS,
        Math.min(50, perfBaseline.p50)
      );
      perfSettledHealthyP50Ms = Math.max(
        PERF_SETTLED_BASE_P50_MS,
        perfBaselineCadenceMs * 1.06
      );
      perfSettledHealthyP95Ms = Math.max(
        PERF_SETTLED_BASE_P95_MS,
        perfBaselineCadenceMs * 1.2
      );
      perfLastAdjustment = "baseline captured";
      perfCooldownUntil = now + 1200;
      perfEvaluationElapsed = 0;
      publishPerformanceTelemetry(now, moving ? "active" : "settled");
      return;
    }

    if (perfEvaluationElapsed < PERF_EVALUATION_SECONDS) return;
    perfEvaluationElapsed = 0;
    perfStats = frameTimePercentiles();
    var poor = perfStats.p50 > PERF_MOTION_P50_MS || perfStats.p95 > PERF_MOTION_P95_MS;
    var healthy =
      perfStats.p50 < perfSettledHealthyP50Ms &&
      perfStats.p95 < perfSettledHealthyP95Ms;
    if (moving) {
      perfHealthyWindows = 0;
      perfPoorWindows = poor ? perfPoorWindows + 1 : Math.max(0, perfPoorWindows - 1);
      if (
        perfMotionElapsed >= PERF_MOTION_SECONDS &&
        perfPoorWindows >= PERF_MOTION_POOR_WINDOWS &&
        now >= perfCooldownUntil &&
        renderDpr > adaptiveMotionDpr + 0.015
      ) {
        setAdaptiveDpr(adaptiveMotionDpr, "sustained motion load", now);
      }
    } else {
      perfPoorWindows = 0;
      perfHealthyWindows = healthy ? perfHealthyWindows + 1 : 0;
      if (
        perfSettledElapsed >= PERF_SETTLED_SECONDS &&
        perfHealthyWindows >= PERF_SETTLED_HEALTHY_WINDOWS &&
        now >= perfCooldownUntil &&
        renderDpr < nativeRenderDpr - 0.015
      ) {
        setAdaptiveDpr(nativeRenderDpr, "settled restore", now);
      }
    }
    publishPerformanceTelemetry(now, moving ? "active" : "settled");
  }

  function animate(now) {
    framePending = false;
    frameRequestId = 0;
    frameExecuting = true;
    if (document.hidden) {
      renderLoopSleeping = true;
      renderLoopSleepStartedAt = now;
      frameExecuting = false;
      return;
    }
    recordWakeLatency(now);
    var frameMs = now - lastTime;
    // Kinematic paths are analytic and swept-volume validated, so retain real
    // wall-clock timing down to 10 fps instead of stretching every transfer on
    // a busy/high-DPR device. Visibility wakes reset lastTime above.
    var delta = Math.min(0.1, Math.max(0.001, frameMs * 0.001));
    lastTime = now;
    var animationWasActive = renderLoopMotionActive();

    if (!reducedMotion && animationWasActive) {
      if (Math.abs(cameraInspectionTarget - cameraInspection) > 0.0005) {
        cameraInspection = lerp(
          cameraInspection,
          cameraInspectionTarget,
          Math.min(1, delta * 5.5)
        );
        if (Math.abs(cameraInspectionTarget - cameraInspection) < 0.001) {
          cameraInspection = cameraInspectionTarget;
        }
        applyCameraPose();
      }
      simulationClock += delta;
      if (ambientDust) {
        ambientDust.rotation.y = Math.sin(simulationClock * 0.055) * 0.018;
        ambientDust.position.y = Math.sin(simulationClock * 0.12) * 0.018;
      }
      updateService(delta);
      adaptQuality(frameMs, now);
      renderDirty = true;
    } else if (reducedMotion) {
      if (state !== STATE.AUTO && state !== STATE.HELD) {
        applyPose(transitionTarget || servicePoseFor(state));
      } else if (state === STATE.AUTO) {
        applyPose(SAFE_POSE);
        machineRig.door.position.x = machineRig.doorTravel;
        if (workpiece) {
          workpiece.visible = true;
          setWorkpieceFinished(false);
          workpiece.position.copy(RAW_PICK);
          workpiece.quaternion.identity();
        }
      }
    }

    updateGuardGlare(simulationClock);
    updateHover(delta);
    var animationStillActive = renderLoopMotionActive();
    // Settled WebGL always leaves one full-resolution composited frame. The
    // two-state motion governor remains unchanged and resumes on the next wake.
    if (!animationStillActive && renderDpr < nativeRenderDpr - 0.015) {
      setAdaptiveDpr(nativeRenderDpr, "settled restore", now);
    }
    if (renderDirty) {
      renderSceneFrame(now, !animationStillActive);
      renderDirty = false;
    }
    if (animationStillActive) {
      renderLoopSleeping = false;
    } else {
      renderLoopSleeping = true;
      renderLoopSleepStartedAt = now;
    }
    frameExecuting = false;
    if (!reducedMotion && animationStillActive) {
      scheduleFrame();
    } else {
      publishPerformanceTelemetry(now, reducedMotion ? "reduced-motion" : "settled");
    }
  }

  function resize() {
    width = window.innerWidth || 1280;
    height = window.innerHeight || 720;
    renderer.setPixelRatio(renderDpr);
    renderer.setSize(width, height, false);
    frameCamera();
    resetPerformanceWindow(!perfBaseline.complete);
    perfMotionElapsed = 0;
    perfSettledElapsed = 0;
    perfCooldownUntil = performance.now() + 1500;
    pointerDirty = true;
    requestSceneRender("resize");
  }

  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (frameRequestId) window.cancelAnimationFrame(frameRequestId);
      frameRequestId = 0;
      framePending = false;
      wakePending = false;
      renderLoopSleeping = true;
      renderLoopSleepStartedAt = performance.now();
      return;
    }
    lastTime = performance.now();
    resetPerformanceWindow(!perfBaseline.complete);
    perfMotionElapsed = 0;
    perfSettledElapsed = 0;
    perfCooldownUntil = lastTime + 1500;
    requestSceneRender("visibility");
    scheduleReducedAdvance();
  });

  function onMotionChange(event) {
    reducedMotion = event.matches;
    lastTime = performance.now();
    if (reducedMotion) {
      setAdaptiveDpr(nativeRenderDpr, "settled restore", lastTime);
      if (state === STATE.AUTO) applyPose(SAFE_POSE);
      else applyPose(servicePoseFor(state));
      scheduleReducedAdvance();
    } else if (reducedTimer) {
      window.clearTimeout(reducedTimer);
      reducedTimer = 0;
    }
    resetPerformanceWindow(false);
    perfMotionElapsed = 0;
    perfSettledElapsed = 0;
    perfCooldownUntil = lastTime + 1500;
    publishPerformanceTelemetry(lastTime, reducedMotion ? "reduced-motion" : "active");
    requestSceneRender("motion-preference");
  }

  if (motionQuery) {
    if (motionQuery.addEventListener) motionQuery.addEventListener("change", onMotionChange);
    else if (motionQuery.addListener) motionQuery.addListener(onMotionChange);
  }

  var initialRenderNow = performance.now();
  var initialMotionActive = renderLoopMotionActive();
  renderSceneFrame(initialRenderNow, !initialMotionActive);
  scheduleExhaustiveSafetyProofs();
  renderDirty = false;
  hideBoot();
  if (initialMotionActive) {
    scheduleFrame();
  } else {
    renderLoopSleeping = true;
    renderLoopSleepStartedAt = initialRenderNow;
  }
  publishPerformanceTelemetry(
    initialRenderNow,
    reducedMotion ? "reduced-motion" : initialMotionActive ? "baseline" : "settled"
  );
})();
