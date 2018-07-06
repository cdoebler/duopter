# DuOpter (Alter)

Provides handling of opt in and opt out of styles and javascript by using local browser storage to store status of opted features.


## Install

Download the latest version, add it to your assets and include in your code.
```html
<script src="duopter.min.js"></script>
```

## How to use

### Load styles and scripts and define callbacks and script to be executed
```html
document.addEventListener("DOMContentLoaded", function (event) {
    if (!DuOpter.isOptedOut("duopterdemo")) {
        DuOpter
            .loadStyle("https://yourdomain.com/path/to/stylesheet.css") // Load styles (optionally)
            .loadScript( // Load script (optionally)
                "https://yourdomain.com/path/to/javascript.js",
                function () { // optional callback
                    // Put callback code here
                    // alert("Javascript has been loaded.");
                }
            );

        // Put Javascript here that should be executed, when status == opted in
        // console.log("Loaded");
    }
});
```

`DuOpter.isOptedOut("duopterdemo")` checks whether the visitor has already opted out your feature.

`duopterdemo` is a unique key that identifies your optin config,


### Create link to opt in 
```html
<a href="javascript:DuOpter.optIn('duopterdemo', {alert:'Opted in'})">Opt in</a><br>
```

`duopterdemo` is a unique key that identifies your optin config,

`{alert:'Opted in'}` defines optional actions (see below).


### Create link to opt out
```html
<a href="javascript:DuOpter.optOut('duopterdemo', {killcookies: ['duopterdemo_status'], alert:'Opted out'})">Opt out</a><br>
```

`duopterdemo` is a unique key that identifies your optin config,

`{killcookies: ['duopterdemo_status'], alert:'Opted out'}` defines optional actions (see below).


## Optional actions
`killcookies`: An array of cookie names that should be deleted.

`alert`: An alert message that should be displayed.
