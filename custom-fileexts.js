'use strict';

var plugin = {};
var mime = module.parent.require("mime");
var controllers = require("./controllers");
var winston = module.parent.require("winston");
var Settings = module.parent.require('./settings');
var SocketAdmin = module.parent.require("./socket.io/admin");
var mimeSettings = new Settings("custom-fileexts", "0.2.0", {input: []}, function(){});


plugin.init = function(params, callback){
  var router = params.router;
  var hostMiddleware = params.middleware;
  var hostControllers = params.controllers;
  router.get('/admin/plugins/custom-fileexts', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
  router.get('/api/admin/plugins/custom-fileexts', controllers.renderAdminPage);
  SocketAdmin.settings.syncMimeTypes = function(){
    mimeSettings.sync();
    plugin.updateMime();
  };
  plugin.updateMime();
  callback();
}

plugin.updateMime = function(){
    var mimeArray = [];
    mimeSettings.get().input.forEach(function(args){
      if(args.length > 1){
        mimeArray.push({
          mime: args.shift(),
          extensionArray: args
        });
      }
    });
    plugin.addMimeTypes(mimeArray);
}

plugin.addMimeTypes = function(mimeArray){
    var customMimeTypes = {};
    mimeArray.forEach(function(object){
      customMimeTypes[object.mime] = object.extensionArray;
    });
    mime.define(customMimeTypes);
}

plugin.addAdminNav = function(header, callback){
  header.plugins.push({
    route: '/plugins/custom-fileexts',
    icon: 'fa-picture',
    name: 'Custom File Extensions'
  });
  callback(null, header);
}

module.exports = plugin;
