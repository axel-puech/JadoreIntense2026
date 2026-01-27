// met une aura lumineuse autour du logo
//@input SceneObject parent
//@input SceneObject lettersOPositions
//@input SceneObject AuraImage
//@input Asset.Material auraMaterial
//@input float fadeDuration = 2
//@input float initialAlpha = 0.5

// prend position des lettres 3D pour positionner l'aura
// prend aussi l'image
// prend aussi le material de l'aura

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var lettersPositionsTr = script.lettersOPositions.getTransform();
var auraPositionTr = script.AuraImage.getTransform();
var startAscentListener = script.api.subScene.CreateListener(
  "startAscentEvent",
  fadeOutAura,
);

//_________________________Director functions_____________________//

function Start() {
  script.auraMaterial.mainPass.baseColor = new vec4(
    1,
    1,
    1,
    script.initialAlpha,
  );
}
function OnLateStart() {
  // obtenir les positions initiales
  var letterOPos = lettersPositionsTr.getWorldPosition();
  var auraPos = auraPositionTr.getWorldPosition();
  var newAuraPos = new vec3(auraPos.x, letterOPos.y, auraPos.z);
  auraPositionTr.setWorldPosition(newAuraPos);
}
function Update() {
  var letterOPos = lettersPositionsTr.getWorldPosition();
  var auraPos = auraPositionTr.getWorldPosition();
  var newAuraPos = new vec3(auraPos.x, letterOPos.y, auraPos.z);
  auraPositionTr.setWorldPosition(newAuraPos);
}
function Stop() {
  print("Stop Aura Subscene");
  script.auraMaterial.mainPass.baseColor = new vec4(
    1,
    1,
    1,
    script.initialAlpha,
  );
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
  script.auraMaterial.mainPass.baseColor = new vec4(
    1,
    1,
    1,
    script.initialAlpha * (1 - ratio),
  );
}

//___________________________Functions__________________________//

function fadeOutAura() {
  fadeAnim.Start();
}
