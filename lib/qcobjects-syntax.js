'use babel';

import QCObjectsSyntaxView from './qcobjects-syntax-view';
import { CompositeDisposable } from 'atom';

export default {

  QCObjectsSyntaxView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.QCObjectsSyntaxView = new QCObjectsSyntaxView(state.QCObjectsSyntaxViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.QCObjectsSyntaxView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'qcobjects-syntax:toggle': () => this.toggle()
    }));
  },


  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.QCObjectsSyntaxView.destroy();
  },

  serialize() {
    return {
      QCObjectsSyntaxViewState: this.QCObjectsSyntaxView.serialize()
    };
  },

  toggle() {
    console.log('QCObjectsSyntax was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  config: {
    "qcobjects_path": {
      "description": "Tell me the path url of QCObjects, if you want to use it local, tell me too",
      "type": "string",
      "default": "https://qcobjects.dev/QCObjects.js"
    },
    "qcobjects_relativeImportPath": {
      "description": "Where will you define the Imports Path?",
      "type": "string",
      "default": "js/packages/"
    },
    "qcobjects_asynchronousImportsLoad": {
      "description": "Will you load the Imports asyncronously?",
      "type": "boolean",
      "default": "true"
    },
    "qcobjects_componentsBasePath": {
      "description": "Where will you load the components?",
      "type": "string",
      "default": "templates/components/"
    },
    "qcobjects_delayForReady": {
      "description": "The default delay in ms before to execute the Ready events",
      "type": "numeric",
      "default": "1"
    },
    "qcobjects_preserveComponentBodyTag": {
      "description": "Do you want to preserve ComponentBody tag when a component is loaded?",
      "type": "boolean",
      "default": "false"
    },
    "qcobjects_overrideComponentTag": {
      "description": "Do you want to override the Component Tag when a component is loaded (if you do so, you need to encapsulate every component into a div)?",
      "type": "boolean",
      "default": "false"
    },
    "qcobjects_basePath": {
      "description": "Tell me where do you want to extract everything from?",
      "type": "string",
      "default": "/"
    }

  }
};
