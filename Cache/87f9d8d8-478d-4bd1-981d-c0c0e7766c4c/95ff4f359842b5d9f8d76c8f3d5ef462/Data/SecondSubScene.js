//@input SceneObject parent
//@input Component.InteractionComponent secondButton

script.api.subScene = new global.SubScene(script, script.parent);

script.secondButton.onTap.add(OnTap);

// Appel à la fin de la scène. Le CallEnd va faire que la scène en cours se termine.
function OnTap() {
  // script.api.subScene.CallEnd(null);
  print("second scene");
}
