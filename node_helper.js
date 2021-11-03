/* Magic Mirror
 * MMM-SmartMirror.js
 *
 * Built off of SmartBuilds.io - Pratik and Eben
 * https://smartbuilds.io
 * MIT Licensed.
 */
const NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function () {
    this.started = false;
    this.config = {};
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'CONFIG') {
      if (!this.started) {
        this.config = payload;
        this.started = true;
        console.log("Smart Mirror module has started")
        this.sendSocketNotification("SHUTIT", payload);
      }
    }

    if (notification === "SHUTDOWN") {
      console.log("Shutting down Rpi...")
      require('child_process').exec('shutdown -h now', console.log)
    }

    if (notification === "RESTART") {
      console.log("Restarting Rpi...")
      require('child_process').exec('sudo reboot', console.log)
    }

    if (notification === "BIRD") {
      Module.register("MMM-HTMLBox",{
        defaults: {
          width: "100%",
          height: "inherit",
          refresh_interval_sec: 0,
          file: "public/birds.html",
        },
      
        start: function() {
          this.timer = null
      
        },
      
        notificationReceived: function(noti, payload, sender) {
          if (noti == "DOM_OBJECTS_CREATED") {
            this.refresh()
          }
        },
      
        refresh: function() {
          if (this.config.file !== "") {
            this.readFileTrick("/modules/MMM-HTMLBox/" + this.config.file)
          }
          this.updateDom()
          if (this.config.refresh_interval_sec > 0) {
            var self = this
            this.timer = setTimeout(function(){
              self.refresh()
            }, this.config.refresh_interval_sec * 1000)
          }
        },
      
        getDom: function() {
          var wrapper = document.createElement("div")
          wrapper.innerHTML = this.config.content
          wrapper.className = "HTMLBX"
          wrapper.style.width = this.config.width
          wrapper.style.height = this.config.height
          return wrapper
        },
      
        readFileTrick: function (url, callback) {
          var xmlHttp = new XMLHttpRequest()
          var self = this
          xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
              console.log("EEE!")
              self.config.content = xmlHttp.responseText
              self.updateDom()
            }
          }
          xmlHttp.open("GET", url, true)
          xmlHttp.send(null)
        }
      })
    }

  },
});
