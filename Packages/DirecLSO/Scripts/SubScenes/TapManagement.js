//@input SceneObject parent
//@input Component.InteractionComponent tapButton
//@input Asset.Material unlitMaterial
//@input SceneObject letterPositions
//@input float moveDuration = 1
//@input float fadeDuration = 1
//@input vec3 startPosition = vec3.zero
//@input vec3 endPosition = vec3.zero

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var startAscentCaller = script.api.subScene.CreateCaller(
  "startAscentEvent",
  null,
);
var endAscentCaller = script.api.subScene.CreateCaller("endAscentEvent", null);
// obtenir les positions du groupe de lettres 3D
var letter3DGroupTr = script.letterPositions.getTransform();
var letter3DGroupPos = letter3DGroupTr.getWorldPosition();

//_________________________Director functions_____________________//

function Start() {
  // script.letterPositions.getTransform().setWorldPosition(letter3DGroupPos);
  script.letterPositions.getTransform().setWorldPosition(script.startPosition);
}

function OnLateStart() {}
function Update() {}
function Stop() {
  fadeAnim.JumpTo(0);
  moveAnim.JumpTo(0);
  // script.letterPositions.getTransform().setWorldPosition(letter3DGroupPos);
  global.phase = 0;
}

//___________________________Animations___________________________//

// MOVE ANIMATION
var moveAnim = new global.Animation(
  script.parent,
  script.moveDuration,
  MoveAnimUpdate,
);

// moveAnim.Easing = QuadraticInOut;
function MoveAnimUpdate(ratio) {
  // var newPos = vec3.lerp(script.startPosition, script.endPosition, ratio);
  var newPos = vec3.lerp(letter3DGroupPos, script.endPosition, ratio);

  script.letterPositions.getTransform().setWorldPosition(newPos);
}

moveAnim.AddTimeCodeEvent(1, function () {
  endAscentCaller.Call();
});

// FADE ANIMATION
var fadeAnim = new global.Animation(
  script.parent,
  script.fadeDuration,
  FadeAnimUpdate,
);
fadeAnim.Easing = QuadraticInOut;
function FadeAnimUpdate(ratio) {
  script.unlitMaterial.mainPass.baseColor = new vec4(1, 1, 1, 1 - ratio);
}

//___________________________Functions__________________________//

script.tapButton.onTap.add(onTap);

function onTap() {
  // Handle tap event
  if (global.phase === 0) {
    // tap phase 0: Unlit to PBR
    global.phase += 1;
    // setOpacity(0);
    fadeAnim.Start();

    return;
  }
  if (global.phase === 1) {
    // tap phase 1: Move letters
    startAscentCaller.Call();
    global.phase += 1;
    moveAnim.Start();
  }
}

// function setOpacity(val) {
//   var col = script.unlitMaterial.mainPass.baseColor;
//   col.a = val;
//   script.unlitMaterial.mainPass.baseColor = col;
// }
