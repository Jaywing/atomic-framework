import Module from '../modules/Module'
import Layzr from 'layzr.js'

export default class ResImg extends Module {

  constructor(el, name, options) {

    const defaults = {
      "threshold": 0,
      "normal": '_data-resimg-normal',
      "retina": '_data-resimg-retina',
      "srcset": '_data-resimg-srcset',
    }

    super(el, name, options, defaults)
  }

  init() {

    const resimg = this

    const instance = Layzr({
      normal: resimg.settings.normal,
      retina: resimg.settings.retina,
      srcset: resimg.settings.srcset,
      threshold: resimg.settings.threshold
    })

    instance.update().check().handlers(true)

    console.log(`${this.name} has initialised`)

  }


}