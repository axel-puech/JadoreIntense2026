//@input SceneObject parent
//@input SceneObject letter3DGroup
//@input SceneObject letterParent
//@input float lerpSpeed = 0.01

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
// script.api.subScene.OnStop = Stop;
script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

// obtenir les positions initiales
var parentTr = script.letterParent.getTransform();
var parentPos = parentTr.getWorldPosition();

// obtenir rotations initiales
var parentRot = parentTr.getWorldRotation();

// obtenir les positions du groupe de lettres 3D
var letter3DGroupTr = script.letter3DGroup.getTransform();
var letter3DGroupPos = letter3DGroupTr.getWorldPosition();

//_________________________Director functions_____________________//

function Start() {
  // faire coller les lettres 3D au parent au début
  script.letter3DGroup.getTransform().setWorldPosition(parentPos);
  script.letter3DGroup.getTransform().setWorldRotation(parentRot);
}
function OnLateStart() {}
function Update() {
  // UPDATE THE POSITION
  parentPos = parentTr.getWorldPosition();
  var currentPos = letter3DGroupTr.getWorldPosition();
  var newPos = vec3.lerp(currentPos, parentPos, script.lerpSpeed);
  script.letter3DGroup.getTransform().setWorldPosition(newPos);

  // UPDATE THE ROTATION
}
function Stop() {}

//___________________________Functions__________________________//
