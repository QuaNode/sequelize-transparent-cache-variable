var LRU = require('lru-cache');

class VariableAdaptor {
  constructor (options) {
    this.store = LRU(options);
  }

  _ensureModel (model) {
    if (!this.store.get(model)) {
      this.store.set(model, {})
    }
  }

  set ([model, id], value) {
    this._ensureModel(model)

    this.store.get(model)[id] = value
    return Promise.resolve()
  }

  get ([model, id]) {
    this._ensureModel(model)

    return Promise.resolve(this.store.get(model)[id])
  }

  del ([model, id]) {
    this._ensureModel(model)

    delete this.store.get(model)[id]
    Promise.resolve()
  }
}

module.exports = VariableAdaptor
