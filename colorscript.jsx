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

var redText = comp.layers.addText();
var redSourceText = redText.property("Source Text");
redSourceText.expression = 'targetLayer = thisComp.layer(thisLayer.index+1); samplePoint = targetLayer.effect("Point Control")("Point"); sampleRadius = [1, 1]; sampledColor_8bpc = 255 * targetLayer.sampleImage(samplePoint, sampleRadius); R = Math.round(sampledColour_8bpc[0]); outputString = R';

var blueText = comp.layers.addText();
var blueSourceText = blueText.property("Source Text");
blueSourceText.expression = 'targetLayer = thisComp.layer(thisLayer.index+2); samplePoint = targetLayer.effect("Point Control")("Point"); sampleRadius = [1, 1]; sampledColor_8bpc = 255 * targetLayer.sampleImage(samplePoint, sampleRadius); G = Math.round(sampledColour_8bpc[1]); outputString = G';

var greenText = comp.layers.addText();
var greenSourceText = greenText.property("Source Text");
greenSourceText.expression = 'targetLayer = thisComp.layer(thisLayer.index+3); samplePoint = targetLayer.effect("Point Control")("Point"); sampleRadius = [1, 1]; sampledColor_8bpc = 255 * targetLayer.sampleImage(samplePoint, sampleRadius); B = Math.round(sampledColour_8bpc[2]); outputString = B';

for(var i = 1; i <= width; i += 50){
    for(var e = 1; e <= height; e += 50){
        point.setValue([i, e]);
        rValues.push(parseInt(redSourceText.value));
        gValues.push(parseInt(greenSourceText.value));
        bValues.push(parseInt(blueSourceText.value));
        }
    }

redText.remove();
blueText.remove();
greenText.remove();
pointControl.remove();

var colourOne = new Array();
var colourTwo = new Array();
var colourThree = new Array();
var colourFour = new Array();
var colourFive = new Array();
var lows = new Array();
var mids = new Array();
var highs = new Array();

var totalColourValue;
var items = new Array();

    for(var j = 0; j <= rValues; j++){
    items.push([rValues[j], gValues[j], bValues[j]]);
    }
    
    for(var q = 0; q <items.length; q++){
        totalColourValue = items[q][0] + items[q][1] + items[q][2];
        if(totalColourValue <= 255){
                lows.push(items[q]);
            }
        if(totalColourValue <= 255 && totalColourValue <= 510){
                mids.push(items[q]);
            }    
          if(totalColourValue >= 510){
                highs.push(item[q]);
            }  
        }
    
    if(lows.length < 1 && mids.length > 0){
            colourOne.push(mids[0]);
            colourTwo.push(mids[Math.round(mids.length / 2)]);
        }
    if(lows.length < 1 && mids.length < 1){
            colourOne.push(highs[0]);
            colourTwo.push(highs[Math.round(lows.length / 2)]);
        }
    if(lows.length > 0){
            colourOne.push(lows[0]);
            colourTwo.push(lows[Math.round(lows.length / 2)]);
        }
    if(mids.length < 1 && lows.length > 0){
            colourThree.push(lows[Math.round(lows.length / 2)]);
        }
    if(mids.length < 1 && lows.length < 1){
            colourThree.push(highs[Math.round(highs.length / 2)]);
        }
    if(mids.length > 0){
            colourThree.push(mids[Math.round(lows.length / 2)]);
        }
    if(highs.length < 1 && mids.length > 0){
            colourFour.push(mids[0]);
            colourFive.push(mids[Math.round(lows.length / 2)]);
        }
    if(highs.length < 1 && mids.length < 1){
            colourFour.push(lows[0]);
            colourFive.push(lows[Math.round(lows.length / 2)]);
        }
    if(highs.length > 0){
            colourFour.push(highs[0]);
            colourFive.push(highs[Math.round(lows.length / 2)]);
        }

    var solidOne = comp.layers.addSolid([colourOne[0][0] / 255, colourOne[0][1] / 255, colourOne[0][2] / 255], "Colour One", comp.width, comp.height, 1, comp.duration);
    var solidTwo = comp.layers.addSolid([colourTwo[0][0] / 255, colourTwo[0][1]  / 255, colourTwo[0][2]  / 255], "Colour Two", comp.width, comp.height, 1, comp.duration);
    var solidThree = comp.layers.addSolid([colourThree[0][0] / 255, colourThree[0][1]  / 255, colourThree[0][2]  / 255], "Colour Three", comp.width, comp.height, 1, comp.duration);
    var solidFour = comp.layers.addSolid([colourFour[0][0] / 255, colourFour[0][1]  / 255, colourFour[0][2]  / 255], "Colour Four", comp.width, comp.height, 1, comp.duration);
    var solidFive = comp.layers.addSolid([colourFive[0][0] / 255, colourFive[0][1]  / 255, colourFive[0][2]  / 255], "Colour Five", comp.width, comp.height, 1, comp.duration);

app.endUndoGroup();