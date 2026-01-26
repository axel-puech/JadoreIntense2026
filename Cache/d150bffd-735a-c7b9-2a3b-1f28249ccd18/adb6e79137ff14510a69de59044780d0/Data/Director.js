//@input SceneObject subSceneParent
//@input bool useFrontBack = true;

var director = null;

global.phase = 0;
script.createEvent("OnStartEvent").bind(OnStart);

function OnStart() {
  director = new global.Director(
    script,
    script.subSceneParent,
    script.useFrontBack,
    OnSceneEnded,
  );
}

function OnSceneEnded(sceneName, params) {
  if (sceneName === "FrontIntroUIScene") {
    director.GoToScene("SecondScene", false, false);
  } else if (sceneName === "SecondScene") {
    director.GoToScene("FrontIntroUIScene", false, false);
  }
}
