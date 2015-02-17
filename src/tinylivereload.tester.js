(function() {
  var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  module.exports = function(testers) {
    var MyTester;
    return MyTester = (function(_super) {
      __extends(MyTester, _super);

      function MyTester() {
        return MyTester.__super__.constructor.apply(this, arguments);
      }

      MyTester.prototype.config = {
        pluginName: 'docpad-plugin-tinylivereload'
      };

      MyTester.prototype.testCustom = function(next) {
        var tester;
        tester = this;
        return this;
      };

      return MyTester;

    })(testers.ServerTester);
  };

}).call(this);
