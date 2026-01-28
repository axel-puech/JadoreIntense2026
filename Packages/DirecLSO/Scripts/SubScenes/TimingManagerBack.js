//@input SceneObject parent
//@input float ascentDelay   = 2

//_________________________Director Setup_________________________//
script.api.subScene = new global.SubScene(script, script.parent);
script.api.subScene.OnStart = Start;
script.api.subScene.OnLateStart = OnLateStart;
script.api.subScene.OnStop = Stop;
// script.api.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//
var startAscentCaller = script.api.subScene.CreateCaller(
  "startAscentEvent",
  null,
);

var delayedEvent = script.api.subScene.CreateEvent(
  "DelayedCallbackEvent",
  DelayedFadeInSwapText,
);

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {
  delayedEvent.event.reset(script.ascentDelay);
}
function Update() {}
function Stop() {}

//___________________________Animations___________________________//

//___________________________Functions__________________________//

function DelayedFadeInSwapText() {
  startAscentCaller.Call();
}
