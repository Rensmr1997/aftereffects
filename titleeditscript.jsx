var mainComp = app.project.activeItem;
var mainLayer = mainComp.layer(1);

var mainWindow = new Window("palette", "Voeg een Titel toe en snij je video", undefined);

var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "column";

groupOne.add("statictext", undefined, "Dit script geeft je de mogelijkheid om een titel toe te voegen en te plaatsen.");
var titleName = groupOne.add("edittext", undefined, "Titel van de video");
var titleDuration = groupOne.add("edittext", undefined, "Duur van de titel");

var cutOne = groupOne.add("edittext", undefined, "Snijpunt 1");
var cutTwo = groupOne.add("edittext", undefined, "Snijpunt 2");

var groupTwo = mainWindow.add("group", undefined, "Buttons");
groupTwo.orientation = "row";

var startButton = groupTwo.add("button", undefined, "Start");
var cancelButton = groupTwo.add("button", undefined, "Cancel");

startButton.onClick = function(){
    app.beginUndoGroup("Test");
    doThings();
}

cancelButton.onClick = function(){
    mainWindow.close();
}

function doThings(){
    
    var compDuration = mainComp.duration;
    var titleSeconds = parseInt(titleDuration.text);
    var cutOneSeconds = parseInt(cutOne.text);
    var cutTwoSeconds = parseInt(cutTwo.text);
    
    var titleText = mainComp.layers.addText(titleName.text);
    titleText.outPoint = titleSeconds;
    
    var middleLayer = mainLayer.duplicate();
    var topLayer = middleLayer.duplicate();
    
    mainLayer.outPoint = cutOneSeconds;
    middleLayer.inPoint = cutOneSeconds;
    middleLayer.outPoint = cutTwoSeconds;
    topLayer.inPoint = cutTwoSeconds;
    topLayer.outPoint = compDuration;
    mainWindow.close();
    app.endUndoGroup("Test");
}

mainWindow.show();
mainWindow.center();