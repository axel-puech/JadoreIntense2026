//@input SceneObject parent
//@input Component.RenderMeshVisual letter3D
//@input SceneObject letterParent


script.api.subScene = new global.SubScene(script, script.parent);

// Recuperer l'element 3D des lettres
// Recupere la position du parent
// deplace la position des lettres 3D en fonction de la position du parent*

var parentTr = script.letterParent.getTransform();
var parentPos = parentTr.getWorldPosition();


print("Letters3DPlaceHolder:"+parentPos);

