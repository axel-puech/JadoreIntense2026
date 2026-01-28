//@input SceneObject parent
//@input SceneObject[] letter3D // Contien la lettre 3D
//@input SceneObject[] letterPos // Gere la position cible
//@input float[] lerpSpeedMovement

//This script updates positions and rotations of the 3D letters.

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

//_________________________Director functions_____________________//

function Start() {
  for (var i = 0; i < script.letterPos.length; i++) {
    var parentPos = script.letterPos[i].getTransform().getWorldPosition();
    // obtenir rotations initiales
    var parentRot = script.letterPos[i].getTransform().getWorldRotation();
    // faire coller les lettres 3D au parent au début
    script.letter3D[i].getTransform().setWorldPosition(parentPos);
    script.letter3D[i].getTransform().setWorldRotation(parentRot);
  }
}
function OnLateStart() {}

function Update() {
  for (var i = 0; i < script.letterPos.length; i++) {
    // UPDATE THE POSITION
    var parentPos = script.letterPos[i].getTransform().getWorldPosition();
    var currentPos = script.letter3D[i].getTransform().getWorldPosition();

    var newPos = vec3.lerp(currentPos, parentPos, script.lerpSpeedMovement[i]);
    script.letter3D[i].getTransform().setWorldPosition(newPos);

    // UPDATE THE ROTATION
    var parentRot = script.letterPos[i].getTransform().getWorldRotation();
    var currentRot = script.letter3D[i].getTransform().getWorldRotation();

    var newRot = quat.slerp(currentRot, parentRot, global.lerpSpeedRotation);
    script.letter3D[i].getTransform().setWorldRotation(newRot);

    // UPDATE THE SCALE
    var parentScale = script.letterPos[i].getTransform().getWorldScale();
    script.letter3D[i].getTransform().setWorldScale(parentScale);
  }
}

function Stop() {
  for (var i = 0; i < script.letter3D.length; i++) {
    script.letter3D[i].getTransform().setWorldRotation(new quat(0, 0, 0, 1));
  }
}

//___________________________Functions__________________________//
