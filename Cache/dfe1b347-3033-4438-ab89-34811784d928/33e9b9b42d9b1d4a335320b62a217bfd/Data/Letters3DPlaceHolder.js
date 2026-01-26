//@input SceneObject parent
//@input Component.RenderMeshVisual letter3D
//@input SceneObject letterParent

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
// script.subScene.OnStart = Start;
// script.subScene.OnLateStart = OnLateStart;
// script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//
var parentTr = script.letterParent.getTransform();
var parentPos = parentTr.getWorldPosition();
var letter3DTr = script.letter3D.getSceneObject().getTransform();
var letter3DPos = letter3DTr.getWorldPosition();


print("Letters3DPlaceHolder:"+parentPos);
print("letter3DPos:"+letter3DPos);


//_________________________Director functions_____________________//
function Start() {}
function OnLateStart() {
}
function Update() {}
function Stop() {}
//___________________________Functions__________________________//



// Recuperer l'element 3D des lettres
// Recupere la position du parent
// deplace la position des lettres 3D en fonction de la position du parent*






script.letter3D.getSceneObject().getTransform().setWorldPosition(parentPos);

var updateEvent = script.createEvent("UpdateEvent");



