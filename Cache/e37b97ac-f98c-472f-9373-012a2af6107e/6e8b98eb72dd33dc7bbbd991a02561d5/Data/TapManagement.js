//@input SceneObject parent
//@input Component.InteractionComponent tapButton
// @input Asset.Material unlitMaterial
//@input SceneObject letterPositions
//@input float moveDuration = 1
//@input vec2 startPosition = vec2.zero
//@input vec2 endPosition = vec2.zero

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
// script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
// script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var rotateCaller = script.api.subScene.CreateCaller("rotateCaller", null);
var endRotateCaller = script.api.subScene.CreateCaller("endRotateCaller", null);
// obtenir les positions du groupe de lettres 3D
var letter3DGroupTr = script.letterPositions.getTransform();
var letter3DGroupPos = letter3DGroupTr.getWorldPosition();

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
  if (global.phase === 0) {
    // tap phase 0 actions
    global.phase += 1;
    setOpacity(0);
    rotateCaller.Call();
    return;
  }
  if (global.phase === 1) {
    global.phase += 1;
  }
  // setOpacity(0.5);
}

function setOpacity(val) {
  var col = script.unlitMaterial.mainPass.baseColor;
  col.a = val;
  script.unlitMaterial.mainPass.baseColor = col;
}

// MOVE ANIMATION
var moveAnim = new global.Animation(
  script.parent,
  script.moveDuration,
  MoveAnimUpdate,
);

moveAnim.Easing = QuadraticInOut;
function MoveAnimUpdate(ratio) {
  parentPos = parentTr.getWorldPosition();
  var currentPos = letter3DGroupTr.getWorldPosition();
  var newPos = vec3.lerp(currentPos, parentPos, ratio);
  script.letter3DGroup.getTransform().setWorldPosition(newPos);
}

// function MoveAnimUpdate(progress) {

// }
