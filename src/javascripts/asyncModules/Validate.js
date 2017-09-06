import Module from '../modules/Module'

export default class Validate extends Module {
  constructor (el, name, options) {
    const defaults = {
      // messages that are tied to values on the validity object - *value* is for string replacement
      messages: {
        'valueMissing': 'Please fill out this field',
        'typeMismatch': 'Please use the correct input type',
        'tooShort': 'Please lengthen this text to *value* characters or more',
        'tooLong': 'Please shorten this text to *value* or less',
        'badInput': 'Please enter a number',
        'stepMismatch': 'Please enter a valid value',
        'rangeOverflow': 'Please select a value that is no more than *value*',
        'rangeUnderflow': 'Please select a value that is no less than *value*',
        'patternMismatch': 'Please match the requested format'
      },
      // other custom messages
      customMessages: {
        'email': 'Please enter a valid email address',
        'url': 'Please enter a valid URL',
        'generic': 'The value you entered for this field is invalid'
      },
      errorClasses: {
        'field': 'Form-input--danger',
        'message': 'Panel Panel--error'
      }
    }

    super(el, name, options, defaults)

    this.blurHandler = this.blurHandler.bind(this)
  }

  // param: f = field element
  // returns: error message: string || undefined
  hasError (f) {
    // type of field not for validation
    if (f.disabled || f.type === 'file' || f.type === 'reset' || f.type === 'button' || f.type === 'submit') return

    const v = f.validity // get validity object of field
    const msg = this.settings.messages
    const custom = this.settings.customMessages

    if (v.valid) return // field is valid: return nothing

    // loop through key of the msg object (these relate directly to the validity object
    for (let key in msg) {
      if  (v[key]) { // if the error type is true
        if (f.hasAttribute('title')) return f.getAttribute('title')
        if (key === 'typeMismatch') {
          if (f.type === 'email') return custom[f.type] // email message
          if (f.type === 'url') return custom[f.type] // url message
        }
        // messages that need string replacement
        if (key === 'tooShort') return msg[key].replace('*value*', f.getAttribute('minLength'))
        if (key === 'tooLong') return msg[key].replace('*value*', f.getAttribute('maxLength'))
        if (key === 'rangeOverflow') return msg[key].replace('*value*', f.getAttribute('max'))
        if (key === 'rangeUnderflow') return msg[key].replace('*value*', f.getAttribute('min'))
        if (msg[key]) return msg[key] // return error message
        return custom['generic'] // if all else fails use custom generic message
      }
    }

  }

  showError (f, err) {
    f.classList.add(this.settings.errorClasses['field'])

    if (f.type === 'radio' && f.name) {
      let group = document.getElementsByName(f.name)
      if (group.length > 0) {
        for (let i = 0; i < group.length; i++) {
          f = group[group.length - 1]
        }
      }
    }

    const id = f.id || f.name
    if (!id) return
    const msgId = 'error-for-' + id

    let msg = this.el.querySelector('#' + msgId)
    if (!msg) {
      msg = document.createElement('div')
      msg.className = this.settings.errorClasses['message']
      msg.id = msgId

      let label
      if (f.type === 'radio' || f.type === 'checkbox') {
        label = this.el.querySelector(`label[for="${id}"]`) || f.parentNode
        if (label) {
          label.parentNode.insertBefore(msg, label.nextSibling)
        }
      }

      if (!label) {
        f.parentNode.insertBefore(msg, f.nextSibling)
      }

    }

    f.setAttribute('aria-describedby', msgId)

    msg.innerHTML = err

    msg.style.display = 'block'
    msg.style.visibility = 'visible'

  }

  removeError (f) {
    f.classList.remove(this.settings.errorClasses['field'])
    f.removeAttribute('aria-describedby')

    if (f.type === 'radio' && f.name) {
      let group = document.getElementsByName(f.name)
      if (group.length > 0) {
        f = group[group.length - 1];
      }
    }

    const id = f.id || f.name
    if (!id) return
    const msgId = 'error-for-' + id

    var msg = this.el.querySelector('#' + msgId)
    if (!msg) return

    msg.innerHTML = ''
    msg.style.display = 'none'
    msg.style.visibility = 'hidden'
  }

  setNoValidate (remove = false) {
    (remove) ? this.el.removeAttribute('novalidate') : this.el.setAttribute('novalidate', true)
  }

  blurHandler (e) {
    const error = this.hasError(e.target) // pass field to hasError
    if (error) {
      this.showError(e.target, error)
      return
    } // if error, pass error and field to showError
    this.removeError(e.target) // field is valid - remove error
  }

  submitHandler (e) {
    let error, hasErrors
    const fields = this.el.elements;

    for (let i = 0; i < fields.length; i++) {
      error = this.hasError(fields[i])
      if (error) {
        this.showError(fields[i], error)
        if (!hasErrors) hasErrors = fields[i]
      }
    }

    if (hasErrors) {
      e.preventDefault()
      hasErrors.focus()
    }
  }

  init () {
    this.setNoValidate() // turn off in browser validation

    // delegate blur event on the form - pass event to blurHandler
    this.el.addEventListener('blur', (e) => { this.blurHandler(e) }, true)

    this.el.addEventListener('submit', (e) => { this.submitHandler(e)}, false)

    console.log(`${this.name} has initialised`)
  }

}
