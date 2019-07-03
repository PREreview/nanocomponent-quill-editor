var Nanocomponent = require('nanocomponent')
var html = require('nanohtml')
var css = require('sheetify')

var Quill = require('quill')
var MarkdownShortcuts = require('./editor/extensions/md')

css('quill/dist/quill.core.css')
css('quill/dist/quill.snow.css')

var defaultStyle = css`

.ql-editor {
  height: 500px !important;
  width: 100%;
}

`

// lifecycle events can optionally be imported
// and registered in Component.beforerender()
// var on = require('./on')

class Component extends Nanocomponent {
  /**
   * @description Represents a QuillEditor
   * @contructor Create a new QuillEditor.
   *
   * @param {String} id (Choo) Unique DOM ID to reference the element
   * @param {Object} state (Choo) State object
   * @param {Function} emit (Choo) Event emitter
   * @param {Object} opts Options object
   * @param {String} opts.class Class names for container element
   * @param {String} opts.style Inline style for container element
   * @param {String} opts.placeholder Editor placeholder text
   * @param {Object} opts.template Template object
   * 
   */
  constructor (id, state, emit, opts) {
    super()
    this.opts = opts
  }

  // _Must be implemented._ Component specific render function.
  // Optionally cache argument values here. Run anything here that needs
  // to run alongside node rendering. Must return a DOMNode. Use beforerender
  // to run code after createElement when the component is unmounted.
  // Previously named _render. Arguments passed to render are passed to
  // createElement. Elements returned from createElement must always return
  // the same root node type.
  createElement () {
    var opts = this.opts
    return html`<div class="${opts.class || defaultStyle}"></div>`
  }

  // _Must be implemented._ Return a boolean to determine if
  // prototype.createElement() should be called. The update method is
  // analogous to React's shouldComponentUpdate. Called only when the
  // component is mounted in the DOM tree. Arguments passed to render
  // are passed to update.
  update () {
    return false
  }

  // A function called right after createElement returns with el, but before
  // the fully rendered element is returned to the render caller. Run any first
  // render hooks here. The load and unload hooks are added at this stage. Do
  // not attempt to rerender in beforerender as the component may not be in the
  // DOM yet.
  beforerender (el) {
    Quill.register('modules/markdownShortcuts', MarkdownShortcuts)

    var opts = this.opts

    this.quill = new Quill(editorinner, {
      theme: 'snow',
      bounds: editorel,
      toolbar: editorel,
      placeholder: opts.placeholder,
      modules: {
        markdownShortcuts: {}
      }
    })

    // set contents to markdown template
    if (opts.template) quill.updateContents(opts.template)

    // this is where you can register other lifecycle events:
    // on.resize()
    // on.ready()
    // on.intersect()
    // on.idle()
  }

  // Called when the component is mounted on the DOM.
  // Uses on-load under the hood.
  load (el) {
    setTimeout(() => this.quill.focus(), 20)
  }

  // Called when the component is removed from the DOM. 
  unload (text) {
    // noop
  }

  // Called after a mounted component updates (e.g. update returns true).
  // You can use this hook to call element.scrollIntoView or other
  // dom methods on the mounted component.
  afterupdate (el) {
    // noop
  }

  // Called after a component is re-ordered. This method is rarely needed,
  // but is handy when you have a component that is sensitive to temorary
  // removals from the DOM, such as externally controlled iframes or embeds
  // (e.g. embedded tweets)
  afterreorder (el) {
    // noop
  }
}


