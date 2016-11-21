import Module from '../modules/Module'
import Layzr from 'layzr.js'

export default class ResImg extends Module {

  constructor(el, name, options) {

    const defaults = {
      "threshold": 0,
      "normal": 'data-resimg-normal',
      "retina": 'data-resimg-retina',
      "srcset": 'data-resimg-srcset',
    }

    super(el, name, options, defaults)
  }

  init() {

    const resimg = this

    const layzrInstance = Layzr({
      normal: resimg.settings.normal,
      retina: resimg.settings.retina,
      srcset: resimg.settings.srcset,
      threshold: resimg.settings.threshold
    })

    layzrInstance.update().check().handlers(true)

    console.log(layzrInstance);

    console.log(`${this.name} has initialised`)

  }


}