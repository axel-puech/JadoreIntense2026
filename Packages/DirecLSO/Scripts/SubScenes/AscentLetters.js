//@input SceneObject parent
//@input SceneObject letterPos
//@input vec3 startPosition=vec3.zero()
//@input vec3 endPosition=vec3.zero()
//@input float moveDuration = 1

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var startAscentListener = script.api.subScene.CreateListener(
  "startAscentEvent",
  AscentLetters,
);

var endAscentCaller = script.api.subScene.CreateCaller("endAscentEvent", null);

//_________________________Director functions_____________________//

function Start() {
  script.letterPos.getTransform().setWorldPosition(script.startPosition);
}

function OnLateStart() {}
function Update() {}

function Stop() {
  script.letterPos.getTransform().setWorldPosition(script.startPosition);
  moveAnim.Reset();
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
  var newPos = vec3.lerp(script.startPosition, script.endPosition, ratio);
  script.letterPos.getTransform().setWorldPosition(newPos);
}

moveAnim.AddTimeCodeEvent(1, function () {
  endAscentCaller.Call();
});

//___________________________Functions__________________________//

function AscentLetters() {
  moveAnim.Start();
}
