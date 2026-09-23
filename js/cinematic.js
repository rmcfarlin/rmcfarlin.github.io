(function () {
  'use strict';
  var button = document.getElementById('portfolio-scene-toggle');
  if (!button) return;
  function updateSceneControl() {
    button.disabled = document.body.classList.contains('cr-requested');
  }
  new MutationObserver(updateSceneControl).observe(document.body, {attributes:true, attributeFilter:['class']});
  updateSceneControl();
  function toggleScene() {
    if (button.disabled) return;
    var enabled = document.body.classList.toggle('portfolio-scene-only');
    button.setAttribute('aria-pressed', String(enabled));
    button.innerHTML = enabled ? 'Back to portfolio <kbd>F</kbd>' : 'Scene only <kbd>F</kbd>';
  }
  button.addEventListener('click', toggleScene);
  var chapter = document.getElementById('cr-plate');
  var chapterWasOpen = false;
  if (chapter) {
    new MutationObserver(function () {
      var open = chapter.classList.contains('is-open');
      if (open && !chapterWasOpen) {
        // The original sheet has a visibility transition; focus after it is
        // displayed, without interrupting someone who has already moved focus.
        window.setTimeout(function () {
          var close = document.getElementById('cr-close');
          if (close && chapter.classList.contains('is-open') && document.activeElement.id === 'viewport') {
            close.focus({preventScroll:true});
          }
        }, 450);
      }
      chapterWasOpen = open;
    }).observe(chapter, {attributes:true, attributeFilter:['class']});
  }
  var cycleStatus = document.getElementById('cr-cell-status');
  var cycleCaption = document.getElementById('portfolio-cycle-status');
  if (cycleStatus && cycleCaption) {
    function updateCycleCaption() {
      var value = cycleStatus.querySelector('[data-status-value]');
      var text = value ? value.textContent.trim() : 'Preparing the cell';
      if (/LADLE FULL/i.test(text)) text = 'Ready to cast';
      else if (/POURING/i.test(text)) text = 'Pouring aluminum';
      else if (/HELD FOR REVIEW/i.test(text)) text = 'Your chapter is ready';
      else if (/RETURNING REVIEWED/i.test(text)) text = 'Returning the casting';
      else if (/ACCEPTED/i.test(text)) text = 'Preparing your chapter';
      else if (/LADLE CHARGING/i.test(text)) text = 'Charging the ladle';
      else if (/LOWERING.*COOLING BATH/i.test(text)) text = 'Lowering into the cooling bath';
      else if (/POSITIONING.*COOLING BATH/i.test(text)) text = 'Positioning above the cooling bath';
      else if (/QUENCH/i.test(text)) text = 'Quenching the casting';
      else if (/DRAINING/i.test(text)) text = 'Lifting from the cooling bath';
      else if (/SOLID|COOL/i.test(text)) text = 'Cooling the casting';
      else if (/INTENSIF|INJECT|SHOT STROKE/i.test(text)) text = 'Casting under pressure';
      else if (/RESET|RETRACTING/i.test(text)) text = 'Resetting the cell';
      else if (/RETURN/i.test(text)) text = 'Returning the casting';
      else if (/GRIP|ROBOT|TOOL|PLATEN|JAWS|CLEAR|APPROACH|ALIGN|EJECT/i.test(text)) text = 'Extracting your chapter';
      else if (/CLAMP|DIE CLOSE/i.test(text)) text = 'Closing the die';
      else if (text.length > 48) text = 'Casting your chapter';
      else text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      cycleCaption.textContent = text;
    }
    new MutationObserver(updateCycleCaption).observe(cycleStatus, {childList: true, subtree: true, characterData: true});
    updateCycleCaption();
  }
  document.addEventListener('keydown', function (event) {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (document.querySelector('dialog[open]') || document.body.classList.contains('cr-requested')) return;
    if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleScene(); }
    if (event.key === 'Escape' && document.body.classList.contains('portfolio-scene-only')) toggleScene();
  });
}());
