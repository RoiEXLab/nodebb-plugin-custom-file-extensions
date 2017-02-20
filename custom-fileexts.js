'use strict';

var plugin = {};
var mime = module.parent.require("mime");
var db = module.parent.require("./database");
var controllers = require("./controllers");
var winston = module.parent.require("winston");
var meta = module.parent.require("./meta");
var async = module.parent.require("async");
var Settings = module.parent.require('./settings');
var SocketAdmin = module.parent.require("./socket.io/admin");


plugin.init = function(params, callback){
  var router = params.router;
  var hostMiddleware = params.middleware;
  var hostControllers = params.controllers;
  router.get('/admin/plugins/custom-fileexts', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
  router.get('/api/admin/plugins/custom-fileexts', controllers.renderAdminPage);
  var mimeSettings = new Settings("custom-fileexts", "0.1.0", plugin.getMimeFormObject(), function(){});
  SocketAdmin.settings.syncMimeTypes = function(){
    mimeSettings.sync();
    plugin.updateMime(mimeSettings.get().input);
  };
  plugin.addMimeTypes(params);
  callback();
}

plugin.updateMime = function(input){
    var mimeArray = [];
    input.forEach(function(args){
      if(args.length > 1){
        mimeArray.push({
          mime: args[0],
          extensionArray: args.shift()
        });
      }
    });
    db.setAdd("nodebb-plugin-custom-file-extensions:extension-list", mimeArray);
    plugin.addMimeTypes();
}

plugin.getMimeFormObject = function(){
  var array = [];
  db.getSetMembers("nodebb-plugin-custom-file-extensions:extension-list", function(err, array){
    array.forEach(function(object){
      array.push([object.mime, object.extensionArray]);
    });
  });
  return {input: array};
}

plugin.addMimeTypes = function(params){
  db.getSetMembers("nodebb-plugin-custom-file-extensions:extension-list", function(err, array){
    var customMimeTypes = {};
    array.forEach(function(object){
      customMimeTypes[object.mime] = object.extensionArray;
    });
    mime.define(customMimeTypes);
  });
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
