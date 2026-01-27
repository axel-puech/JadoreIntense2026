//@input SceneObject parent
//@input SceneObject letter3DGroup // Groupe avec Letter 3D Unlit + PBR
//@input SceneObject letterParent // Empty element qui indique la position des lettres 2D
//@input float lerpSpeedMovement = 0.1

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

// obtenir les positions initiales
var parentTr = script.letterParent.getTransform();

// obtenir les positions du groupe de lettres 3D
var letter3DGroupTr = script.letter3DGroup.getTransform();
var letter3DGroupPos = letter3DGroupTr.getWorldPosition();

//_________________________Director functions_____________________//

function Start() {
  global.lerpSpeedRotation = 0.05;
  global.lerpSpeedMovement = 0.1;
  var parentPos = parentTr.getWorldPosition();
  // obtenir rotations initiales
  var parentRot = parentTr.getWorldRotation();
  // faire coller les lettres 3D au parent au début
  script.letter3DGroup.getTransform().setWorldPosition(parentPos);
  script.letter3DGroup.getTransform().setWorldRotation(parentRot);
}
function OnLateStart() {}

function Update() {
  // UPDATE THE POSITION
  var parentPos = parentTr.getWorldPosition();
  var currentPos = letter3DGroupTr.getWorldPosition();
  var newPos = vec3.lerp(currentPos, parentPos, global.lerpSpeedMovement);
  script.letter3DGroup.getTransform().setWorldPosition(newPos);

  // UPDATE THE ROTATION
  var parentRot = parentTr.getWorldRotation();
  var currentRot = letter3DGroupTr.getWorldRotation();
  var newRot = quat.slerp(currentRot, parentRot, global.lerpSpeedRotation);
  script.letter3DGroup.getTransform().setWorldRotation(newRot);
}

function Stop() {
  // if (script.letterParent.name === "PosO") {
  //   print("parentPos" + parentPos);
  //   print("parentRot" + parentRot);
  // }

  // global.lerpSpeedRotation = 1;
  // global.lerpSpeedMovement = 1;
  // remettre les positions initiales
  script.letter3DGroup.getTransform().setWorldRotation(new quat(0, 0, 0, 1));
}

//___________________________Functions__________________________//
