// generate particles arround the logo
//@input SceneObject parent
//@input Component.VFXComponent Particles

script.api.subScene = new global.SubScene(script, script.parent);

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
script.api.subScene.SetUpdate(Update);

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {
  script.Particles.asset.properties["killParticles"] = 0;
}

function Update() {}
function Stop() {
  script.Particles.asset.properties["killParticles"] = 1;
}
