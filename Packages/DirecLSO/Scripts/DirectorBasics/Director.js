//@input SceneObject subSceneParent
//@input bool useFrontBack = true;

var director = null;

global.phase = 0;
global.lerpSpeedRotation = 0.01;

script.createEvent("OnStartEvent").bind(OnStart);

function OnStart() {
  director = new global.Director(
    script,
    script.subSceneParent,
    script.useFrontBack,
    OnSceneEnded,
  );
}

function OnSceneEnded(sceneName, params) {}
