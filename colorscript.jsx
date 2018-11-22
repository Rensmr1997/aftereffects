var project = app.project;
var comp = project.activeItem;
var width = comp.width;
var height = comp.height;
var pixelArray = new Array();
var rValues = new Array();
var gValues = new Array();
var bValues = new Array();
var pixels = width * height;
var x =1;
var y =1;
var orginalScale;
var scaleFactor;

app.beginUndoGroup("Kleuren pallet generator");

var layer = comp.layer(1);
orginalScale = layer.property("Scale").value;

var pointControl = layer.Effects.addProperty("ADBE Point Control");
var point = layer("Effects")("Point Control")("Point");

var redTex = comp.layers.addText();
var redsourceText = redText.property("Source Text");