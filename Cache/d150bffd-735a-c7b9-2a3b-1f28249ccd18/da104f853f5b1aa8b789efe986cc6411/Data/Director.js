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
  if (sceneName === "FrontIntroUIScene") {
    director.GoToScene("FrontIntroUIScene", false, false);
    print("in the first scene");
  } else if (sceneName === "SecondScene") {
    director.GoToScene("SecondScene", false, false);
  }
}
