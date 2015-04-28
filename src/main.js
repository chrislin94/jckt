deviceURL = "";
Handler.bind("/discover", Behavior ({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		if (deviceURL != null && deviceURL != "") {
			handler.invoke(new Message(deviceURL + "allData"), Message.JSON);
		};
	},
	onComplete: function(handler, message, json){
		// clientVariable = json.serverVariable
		handler.invoke(new Message(deviceURL + "allData"), Message.JSON);
    },
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("JCKTserver.app");
	},
	onQuit: function(application) {
		application.forget("JCKTserver.app");
	},
})

application.behavior = new ApplicationBehavior();

/////////////////////////////////////////////////////////////////////////////

var backgroundSkin = new Skin( { fill: "#fff" } );
var navigationSkin = new Skin( { fill: "#eee" } );
var iconSkin = new Skin( { fill: "#ddd" } );
var selectedIconSkin = new Skin( { fill: "#fff" } );
var navigationTextStyle = new Style( { font:"15px Arial", color: "#000" } );


// BEGIN HOME SCREEN

var jacketConnected = true;

if (jacketConnected) {
	homeScreen = new Line({
	    left: 28, right: 20, top: 80,
	    contents: [
	        new Text({ height: 150, left: 10, right: 10, top: 100, string: "connected screen", style: navigationTextStyle })
	    ]
	});
} else {
	homeScreen = new Line({
	    left: 28, right: 20, top: 80,
	    contents: [
	        new Text({ height: 150, left: 10, right: 10, top: 100, string: "not connected screen", style: navigationTextStyle })
	    ]
	});
};

// END HOME SCREEN

// BEGIN TEMPERATURE SCREEN

tempScreen = new Line({
    left: 28, right: 20, top: 80,
    contents: [
        new Text({ height: 150, left: 10, right: 10, top: 100, string: "temperature screen", style: navigationTextStyle })
    ]
});

// END TEMPERATURE SCREEN

// BEGIN SETTINGS SCREEN

settingsScreen = new Line({
    left: 28, right: 20, top: 80,
    contents: [
        new Text({ height: 150, left: 10, right: 10, top: 100, string: "settings screen", style: navigationTextStyle })
    ]
});

// END SETTINGS SCREEN

// MAIN LAYOUT DO NOT TOUCH

contents =  new Container({
    name: "contents", left: 0, right: 0, top: 0,
    contents: [
    	homeScreen
    ]
});

navigation = new Container({
    left: 0, right: 0, top: 0, height: 60, skin: navigationSkin,
    contents: [
        new Label({ top: 0, bottom: 0, left: 10, string: "JCKT", style: navigationTextStyle }),
        new Container({
            name: "home", width: 45, height: 30, right: 150, skin: selectedIconSkin, active: true,
            contents: [
            	new Label({ height: 40, string: "HOME", style: navigationTextStyle })
            ],
            behavior: Behavior({
                onTouchEnded: function(container) {
                    // container.skin = selectedIconSkin;
                    // container.container.battery.skin = iconSkin;
                    contents.empty(0);
                    contents.add(homeScreen);
                }	
            })
        }),
        new Container({
            name: "temperature", width: 50, height: 30, right:80, skin: iconSkin, active: true,
            contents: [
                new Label({ height: 40, string: "TEMP", style: navigationTextStyle })
            ],
            behavior: Behavior({
                onTouchEnded: function(container) {
                    // container.skin = selectedIconSkin;
                    // container.container.control.skin = iconSkin;
                    contents.empty(0);
                    contents.add(tempScreen);
                }	
            })
        }),
        new Container({
            name: "settings", width: 60, height: 30, right:10, skin: iconSkin, active: true,
            contents: [
                new Label({ height: 40, string: "SETTINGS", style: navigationTextStyle })
            ],
            behavior: Behavior({
                onTouchEnded: function(container) {
                    // container.skin = selectedIconSkin;
                    // container.container.control.skin = iconSkin;
                    contents.empty(0);
                    contents.add(settingsScreen);
                }	
            })
        }),
    ]
});

var layout = new Container({
	left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
	contents: [
        navigation,
		contents
	]
});

application.add(layout);