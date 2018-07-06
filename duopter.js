/**
 * DuOpter (Alter)
 *
 * Author: Christian Doebler <info@christian-doebler.net>
 *
 * License: MIT
 */
var DuOpter = {
    storageKey: "DuOpter",

    getStatusStorageKey: function (key) {
        return this.storageKey + ".status." + key;
    },

    processActions: function (actions) {
        if (typeof actions !== "undefined") {
            if (typeof actions.alert !== "undefined") {
                alert(actions.alert);
            }

            if (typeof actions.killcookies === "object") {
                actions.killcookies.forEach(function (name) {
                        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    }
                );
            }
        }
    },

    update: function (key, value) {
        localStorage.setItem(this.getStatusStorageKey(key), value);
    },

    optIn: function (key, actions) {
        this.update(key, 1);
        this.processActions(actions);
    },

    optOut: function (key, actions) {
        this.update(key, 0);
        this.processActions(actions);
    },

    getStatus: function (key) {
        return localStorage.getItem(this.getStatusStorageKey(key));
    },

    isSet: function (key) {
        return (this.getStatus(key) === null) ? false : true;
    },

    isOptedIn: function (key) {
        if (!this.isSet(key)) {
            return false;
        }
        return this.getStatus(key) == 1;
    },

    isOptedOut: function (key) {
        if (!this.isSet(key)) {
            return false;
        }
        return this.getStatus(key) == 0;
    },

    getHead: function () {
        return document.getElementsByTagName("head")[0];
    },

    executeCallback: function (callback) {
        try {
            callback();
        } catch (e) {}
    },

    loadAsync: function (node, callback) {
        if (node.readyState) {
            // Internet Explorer
            node.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    DuOpter.executeCallback(callback);
                }
            };
        } else {
            // Other browsers
            node.onload = function () {
                DuOpter.executeCallback(callback);
            };
        }

        this.getHead().appendChild(node);
    },

    loadStyle: function (url) {
        var node = document.createElement("link");
        node.rel = "stylesheet";
        node.type = "text/css";
        node.href = url;
        this.loadAsync(node);
        return this;
    },

    loadScript: function (url, callback) {
        var node = document.createElement("script");
        node.type = "text/javascript";
        node.src = url;
        this.loadAsync(node, callback);
        return this;
    }
};
