var BindableObject = require("bindable-object");

/**
 */

function Message (name, data, options, mediator, parent) {

  BindableObject.call(this, this);

  this.name     = name;
  this.data     = data;
  this.options  = options || {};
  this.mediator = mediator;
  this.parent   = parent;
  this.args     = [];
  this.root     = parent ? parent.root : this;

  var self = this;

  ["success", "result", "data", "error"].forEach(function (prop) {
    self.bind(prop, function () {
      self.emit.apply(self, [prop].concat(Array.prototype.slice.call(arguments, 0)));
    });
  });
}

/**
 */

BindableObject.extend(Message, {

  /**
   */

  __isCommand: true,

  /**
   */

  child: function (name, options) {
    return new Message(name, this.data, options, this.mediator, this);
  }
});

/**
 */

module.exports = Message;
