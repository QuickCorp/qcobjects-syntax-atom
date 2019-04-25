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
  }

};
