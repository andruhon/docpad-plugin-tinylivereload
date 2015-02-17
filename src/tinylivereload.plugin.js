(function() {
  var tinylr,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  tinylr = require('tiny-lr');

  module.exports = function(BasePlugin) {
    var TinyLiveReload;
    return TinyLiveReload = (function(_super) {
      __extends(TinyLiveReload, _super);

      function TinyLiveReload() {
        return TinyLiveReload.__super__.constructor.apply(this, arguments);
      }

      TinyLiveReload.prototype.name = 'tinylivereload';

      TinyLiveReload.prototype.lrServer = null;

      TinyLiveReload.prototype.lastGenerateTime = null;

      TinyLiveReload.prototype.config = {
        port: 35729
      };

      TinyLiveReload.prototype.serverAfter = function(opts) {
        var config, docpad, port;
        config = this.config;
        docpad = this.docpad;
        port = config.port;
        docpad.log('info', 'Starting TinyLiveReload');
        this.lrServer = tinylr();
        this.lrServer.removeAllListeners('error');
        this.lrServer.on('error', (function(err) {
          return docpad.log('error', 'TinyLiveReload error:', err);
        }));
        this.lrServer.listen(port, (function(err) {
          if (err) {
            console.error(err);
          }
          return docpad.log('info', 'TinyLiveReload is listerning on port ' + port);
        }));
        this.lrServer.changed({
          body: {
            files: ['']
          }
        });
        this.lastGenerateTime = new Date();
        return this;
      };

      TinyLiveReload.prototype.generateAfter = function(opts) {
        var collection, docpad, files, model, _fn, _i, _len, _ref;
        if (!this.lrServer) {
          return this;
        }
        docpad = this.docpad;
        files = [];
        collection = docpad.getDatabase().findAll({
          mtime: {
            $gte: this.lastGenerateTime
          }
        });
        if (collection.models.length > 0) {
          _ref = collection.models;
          _fn = function(model) {
            return files.push(model.attributes.url);
          };
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            model = _ref[_i];
            _fn(model);
          }
        }
        this.lastGenerateTime = new Date();
        if (files.length === 0) {
          files = [''];
        }
        this.lrServer.changed({
          body: {
            files: files
          }
        });
        docpad.log('info', 'changed files are sent');
        return this;
      };

      return TinyLiveReload;

    })(BasePlugin);
  };

}).call(this);
