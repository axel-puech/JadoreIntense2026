//@input SceneObject parent
//@input Asset.Material swapTextMaterial
//@input float delay = 0.5
//@input float fadeDuration = 1

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var endAscentListener = script.api.subScene.CreateListener(
  "endAscentEvent",
  FadeInSwapText,
);

// var delayEvent = script.createEvent("DelayedCallbackEvent");
var delayedEvent = script.api.subScene.CreateEvent(
  "DelayedCallbackEvent",
  DelayedFadeInSwapText,
);

//_________________________Director functions_____________________//

function Start() {
  // initialement le texte est invisible
  script.swapTextMaterial.mainPass.baseColor = new vec4(1, 1, 1, 0);
}

function OnLateStart() {}
function Update() {}
function Stop() {
  // remettre opacité initiale
  fadeAnim.Reset();
}

//___________________________Animations__________________________//

// FADE ANIMATION
var fadeAnim = new global.Animation(
  script.parent,
  script.fadeDuration,
  FadeAnimUpdate,
);
fadeAnim.Easing = QuadraticInOut;
function FadeAnimUpdate(ratio) {
  script.swapTextMaterial.mainPass.baseColor = new vec4(1, 1, 1, ratio);
}

//___________________________Functions__________________________//

function DelayedFadeInSwapText() {
  fadeAnim.Start();
}

function FadeInSwapText() {
  delayedEvent.event.reset(script.delay);
}
