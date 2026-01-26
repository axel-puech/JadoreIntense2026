//@input SceneObject parent
//@input Component.RenderMeshVisual letter3D
//@input SceneObject letterParent

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
// script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
// script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var parentTr = script.letterParent.getTransform();
var parentPos = parentTr.getWorldPosition();
print("Letters3DPlaceHolder:" + parentPos);
var letter3DTr = script.letter3D.getSceneObject().getTransform();
var letter3DPos = letter3DTr.getWorldPosition();

print("letter3DPos:" + letter3DPos);
//_________________________Director functions_____________________//

function Start() {
  var parentTr = script.letterParent.getTransform();
  var parentPos = parentTr.getWorldPosition();
  var letter3DTr = script.letter3D.getSceneObject().getTransform();
  var letter3DPos = letter3DTr.getWorldPosition();

  print("Letters3DPlaceHolder:" + parentPos);
  print("letter3DPos:" + letter3DPos);
}
function OnLateStart() {}
function Update() {
  script.letter3D.getSceneObject().getTransform().setWorldPosition(parentPos);
}
function Stop() {}

//___________________________Functions__________________________//

// Recuperer l'element 3D des lettres
// Recupere la position du parent
// deplace la position des lettres 3D en fonction de la position du parent*
