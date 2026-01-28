//@input SceneObject parent
//@input Asset.Material goldMaterial
//@input float fadeDuration = 1

// TODO:
// prend un material en input pour faire le fade
// quand recoit l'event -> fade

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var startAscentListener = script.api.subScene.CreateListener(
  "startFadeLetterEvent",
  FadeLetters,
);

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {}
function Update() {}

function Stop() {
  fadeAnim.Reset();
}

//___________________________Animations___________________________//

// FADE ANIMATION
var fadeAnim = new global.Animation(
  script.parent,
  script.fadeDuration,
  FadeAnimUpdate,
);
// fadeAnim.Easing = QuadraticInOut;
function FadeAnimUpdate(ratio) {
  script.goldMaterial.mainPass.alphaGold = ratio;
}

//___________________________Functions__________________________//

function FadeLetters() {
  fadeAnim.Start();
}
