import throttle from 'throttleit';

const EventName = 'bpupdate';
const ThrottleTime = 250;

let breakpoint = {};

const breakpoints = ['base','xxs','xs','sm','md','lg','xl','xxl'];

// reads the value of hidden mq property in the 'content' of ':before' of body (see 'stylesheets/generic/_generic.base.scss)
breakpoint.refreshValue = function() {
  this.value = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/\"/g, '');
  breakpoint.detail = {
    previous: null,
    current: breakpoint.value,
    gtBase: breakpoints.indexOf('base') < breakpoints.indexOf(breakpoint.value),
    gtXxs: breakpoints.indexOf('xxs') < breakpoints.indexOf(breakpoint.value),
    gtXs: breakpoints.indexOf('xs') < breakpoints.indexOf(breakpoint.value),
    gtSm: breakpoints.indexOf('sm') < breakpoints.indexOf(breakpoint.value),
    gtMd: breakpoints.indexOf('md') < breakpoints.indexOf(breakpoint.value),
    gtLg: breakpoints.indexOf('lg') < breakpoints.indexOf(breakpoint.value),
    gtXl: breakpoints.indexOf('xl') < breakpoints.indexOf(breakpoint.value)
  };

  window.jwAtomic.modules.Breakpoint.details = breakpoint.detail;
};

breakpoint.checkForChange = function () {
  let prev = breakpoint.value;             // store current value
  breakpoint.refreshValue();               // refresh current value (to compare)
  if (prev !== breakpoint.value) {        // if values differ, bp has changed
    breakpoint.dispatchChangeEvent(prev);  // dispatch custom 'bp' event
  }
};

breakpoint.dispatchChangeEvent = function(previous) {
  breakpoint.detail.previous = previous;

  let myEvent = new CustomEvent(
    EventName,
    {
      detail: breakpoint.detail, // include details of the previous and current breakpoint
      bubble: true,
      cancelable: true
    }
  );
  document.dispatchEvent(myEvent);
};

// logs breakpoint updates to the console (can be disabled through init function)
breakpoint.logUpdate = function (e) {
  let msg = `Breakpoint updated to ${e.detail.current}`;
  let prev = e.detail.previous;
  if (prev !== undefined) {
    msg += ` from ${prev}`;
  }
  console.log(msg, e.detail);
};

breakpoint.init = function (log = true) {

  window.jwAtomic.modules.Breakpoint = {type: 'sync', details: {} };

  breakpoint.refreshValue();

  if (breakpoint.value === "") {
    console.warn('Breakpoint can not initialise as the necessary css is not available');
    return;
  }

  window.addEventListener( // when the window resizes, check for change
    'resize',
    throttle(
      breakpoint.checkForChange,
      ThrottleTime
    )
  );
  if (log) {
    document.addEventListener(EventName, breakpoint.logUpdate, false); // listen to the event and log changes
  }
  breakpoint.checkForChange();

  console.log('Breakpoint has initialised');
};

export default breakpoint;
