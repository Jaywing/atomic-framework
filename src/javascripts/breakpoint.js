import throttle from 'throttleit'

const EventName = 'bpupdate'
const ThrottleTime = 250

let breakpoint = {}

// reads the value of hidden mq property in the 'content' of ':before' of body (see 'stylesheets/generic/_generic.base.scss)
breakpoint.refreshValue = function() {
  this.value = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/\"/g, '')
}

breakpoint.checkForChange = function () {
  let prev = breakpoint.value             // store current value
  breakpoint.refreshValue()               // refresh current value (to compare)
  if (prev !== breakpoint.value) {        // if values differ, bp has changed
    breakpoint.dispatchChangeEvent(prev)  // dispatch custom 'bp' event
  }
}

breakpoint.dispatchChangeEvent = function(previous) {
  let myEvent = new CustomEvent(
    EventName,
    {
      detail: { prev: previous }, // include details of the previous breakpoint
      bubble: true,
      cancelable: true
    }
  )
  document.dispatchEvent(myEvent)
}

// logs to breakpoint updates to the console (can be disabled through init function)
breakpoint.logUpdate = function (e) {
  let msg = `Breakpoint updated to ${breakpoint.value}`
  let prev = e.detail.prev
  if (prev !== undefined) {
    msg += ` from ${prev}`
  }
  console.log(msg)
}

breakpoint.init = function (log = true) {
  window.addEventListener( // when the window resizes, check for change
    'resize',
    throttle(
      breakpoint.checkForChange,
      ThrottleTime
    )
  )
  if (log) {
    document.addEventListener(EventName, breakpoint.logUpdate, false) // listen to the event and log changes
  }
  breakpoint.checkForChange()
}

export default breakpoint
