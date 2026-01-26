//@input SceneObject subSceneParent
//@input bool useFrontBack = true;

var director = null;

script.createEvent("OnStartEvent").bind(OnStart);

function OnStart() {
  director = new global.Director(
    script,
    script.subSceneParent,
    script.useFrontBack,
    OnSceneEnded
  );
}

function OnSceneEnded(sceneName, params) {
  if (sceneName === "FrontIntroScene") {
    director.GoToScene("FrontIntroScene", false, false);
  } else if (sceneName === "SecondScene") {
    director.GoToScene("SecondScene", false, false);
  }
}
