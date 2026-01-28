//@input SceneObject parent
//@input Component.InteractionComponent tapButton

// TODO:
// créer encore un element enfant dans les lettres 3D pour gérer l'idle.
// Faire le fade Unlit -> PBR dans le shader.
// Gerer le deplacement des lettres 3D dans un autre subscene.

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//
var fadeLetterCaller = script.api.subScene.CreateCaller(
  "startFadeLetterEvent",
  null,
);
var startAscentCaller = script.api.subScene.CreateCaller(
  "startAscentEvent",
  null,
);

//_________________________Director functions_____________________//

function Start() {}

function OnLateStart() {}
function Update() {}
function Stop() {
  global.phase = 0;
}

//___________________________Animations___________________________//

//___________________________Functions__________________________//

script.tapButton.onTap.add(onTap);

function onTap() {
  // Handle tap event
  if (global.phase === 0) {
    // tap phase 0: Unlit to PBR
    global.phase += 1;
    fadeLetterCaller.Call();
  } else if (global.phase === 1) {
    // tap phase 1: Move letters
    startAscentCaller.Call();
    global.phase += 1;
    // moveAnim.Start();
  }
}
