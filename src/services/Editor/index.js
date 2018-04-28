export default {
  _elementBackgroundStyle: 'background-color: rgba(0, 0, 0, 0.025);',

  /**
   * Parse editor content and create
   *   matching elements if possible
   *
   * @param {String} content
   * @return {Array}
   */
  getElements (content) {
    // Split content into array by row
    content = content.split('\n')

    let divs = []
    for (let line of content) {
      // If the line is empty its necessary to put a line feed
      if (line === '') {
        line = '\n'
      }

      // TODO: Optimize regex

      if (/^# /.test(line)) { // #
        divs.push(this.heading(line, 'h1'))
        continue
      } else if (/^## /.test(line)) { // ##
        divs.push(this.heading(line, 'h2'))
        continue
      } else if (/^### /.test(line)) { // ###
        divs.push(this.heading(line, 'h3'))
        continue
      } else if (/^#### /.test(line)) { // ####
        divs.push(this.heading(line, 'h4'))
        continue
      } else if (/^##### /.test(line)) { // #####
        divs.push(this.heading(line, 'h5'))
        continue
      } else if (/^###### /.test(line)) { // ######
        divs.push(this.heading(line, 'h6'))
        continue
      } else if (/!\[[^\]]+\]\([^\\]+\)/.test(line)) { // image
        divs.push(this.img(line))
        continue
      }

      // Nothing before matched sp just display the line as text
      let element = document.createElement('div')

      // Append text to div
      element.appendChild(document.createTextNode(line))
      divs.push(element)
    }

    return divs
  },

  /**
   * Turn line with image code to image preview and code
   *
   * @param {String} line
   * @return {Element}
   */
  img (line) {
    // Base div containing image and corresponding text
    let element = document.createElement('div')

    // create image element and set attributes
    let image = document.createElement('img')
    image.style.cssText = 'display: block;'
    image.src = line.match(/http[^)]+/)[0]

    // Append img to base div
    element.appendChild(image)

    // Append text to base div
    element.appendChild(document.createTextNode(line))

    element.style.cssText += this._elementBackgroundStyle

    return element
  },

  /**
   * Convert markdown heading to HTML heading
   *
   * @param {String} line
   * @param {String} type = 'h1'
   */
  heading (line, type = 'h1') {
    let element = document.createElement(type)

    element.appendChild(document.createTextNode(line))
    element.style.cssText += this._elementBackgroundStyle

    return element
  }
}