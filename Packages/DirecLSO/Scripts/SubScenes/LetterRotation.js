//@input SceneObject parent
//@input SceneObject[] letters
//@input float letterRotationAngle = 70

// prend toutes les lettres 3D
// Ecoute event de rotation -> Applique d'un coup une rotation au parent
// Ecoute un event de fin de rotation -> Applique une rotation inverse au parent

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
// script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
// script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//
var startAscentListener = script.api.subScene.CreateListener(
  "startAscentEvent",
  ApplyRotation,
);

var endAscentListener = script.api.subScene.CreateListener(
  "endAscentEvent",
  ResetRotation,
);

var initialRotations = [];

var axeX = new vec3(1, 0, 0);
var axeY = new vec3(0, 1, 0);
var axeZ = new vec3(0, 0, 1);

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {}
function Update() {}
function Stop() {}

//___________________________Functions__________________________//
function ApplyRotation(rotation) {
  for (const letter of script.letters) {
    var letterTr = letter.getTransform();

    var currentRot = letterTr.getWorldRotation();
    initialRotations.push(currentRot);
    var { deltaRotX, deltaRotY, deltaRotZ } = ApplyRandomRotation();

    // Combine les trois rotations delta
    var deltaRot = deltaRotX.multiply(deltaRotY).multiply(deltaRotZ);
    var newRot = deltaRot.multiply(currentRot);
    letterTr.setWorldRotation(newRot);
  }
}

function ApplyRandomRotation() {
  var angleX =
    ((Math.random() * script.letterRotationAngle -
      script.letterRotationAngle / 2) *
      Math.PI) /
    180;
  var deltaRotX = quat.angleAxis(angleX, axeX);
  var angleY =
    ((Math.random() * script.letterRotationAngle -
      script.letterRotationAngle / 2) *
      Math.PI) /
    180;
  var deltaRotY = quat.angleAxis(angleY, axeY);
  var angleZ =
    ((Math.random() * script.letterRotationAngle -
      script.letterRotationAngle / 2) *
      Math.PI) /
    180;
  var deltaRotZ = quat.angleAxis(angleZ, axeZ);
  return { deltaRotX, deltaRotY, deltaRotZ };
}

function ResetRotation() {
  global.lerpSpeedRotation = 0.05;
  for (const [i, letter] of script.letters.entries()) {
    var letterTr = letter.getTransform();
    letterTr.setWorldRotation(initialRotations[i]);
  }
}
