//@input SceneObject parent
//@input Component.InteractionComponent tapButton
// @input Asset.Material unlitMaterial

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
// script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
// script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {}
function Update() {}
function Stop() {}

//___________________________Functions__________________________//
script.tapButton.onTap.add(onTap);

function onTap() {
  // Handle tap event
  print("Tap detected in TapManagement subscene, phase: " + global.phase);
  global.phase += 1;
  setOpacity(0.5);
}

function setOpacity(val) {
  var col = script.unlitMaterial.mainPass.baseColor; // RGBA, 0–1
  col.a = val;
  script.unlitMaterial.mainPass.baseColor = col;
}
