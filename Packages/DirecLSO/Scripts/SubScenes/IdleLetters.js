//@input SceneObject parent
//@input SceneObject[] subContainerLetters
//@input float amplitudeMovement=0,002
//@input float shiftMovement=1.5
//@input float speedIdleMovement=1

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var endAscentListener = script.api.subScene.CreateListener(
  "endAscentEvent",
  IdleMovement,
);

var activateIdle = false;

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {}

function Update() {
  if (activateIdle) {
    for (const [i, letter] of script.subContainerLetters.entries()) {
      var letterTr = letter.getTransform();
      var currentPos = letterTr.getWorldPosition();
      var targetPos = new vec3(
        currentPos.x,
        currentPos.y +
          Math.sin(
            Date.now() * 0.001 * script.speedIdleMovement +
              i * script.shiftMovement,
          ) *
            script.amplitudeMovement,
        currentPos.z,
      );

      letterTr.setWorldPosition(targetPos);
    }
  }
}
function Stop() {
  activateIdle = false;
  for (const letterSubContainer of script.subContainerLetters) {
    var letterTr = letterSubContainer.getTransform();
    // remettre a jour la position locale initiale qui est 000
    letterTr.setLocalPosition(new vec3(0, 0, 0));
  }
}

//___________________________Functions__________________________//
function IdleMovement() {
  activateIdle = true;
}
