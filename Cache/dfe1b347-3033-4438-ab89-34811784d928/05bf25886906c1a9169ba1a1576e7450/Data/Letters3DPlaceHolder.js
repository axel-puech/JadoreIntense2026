//@input SceneObject parent
//@input Component.RenderMeshVisual letter3D
//@input SceneObject letterParent

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
// script.api.subScene.OnStart = Start;
// script.api.subScene.OnLateStart = OnLateStart;
// script.api.subScene.OnStop = Stop;
script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var parentTr = script.letterParent.getTransform();
var parentPos = parentTr.getWorldPosition();
var letter3DTr = script.letter3D.getSceneObject().getTransform();
var letter3DPos = letter3DTr.getWorldPosition();

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {}
function Update() {
  parentPos = parentTr.getWorldPosition();
  script.letter3D.getSceneObject().getTransform().setWorldPosition(parentPos);
}
function Stop() {}

//___________________________Functions__________________________//
