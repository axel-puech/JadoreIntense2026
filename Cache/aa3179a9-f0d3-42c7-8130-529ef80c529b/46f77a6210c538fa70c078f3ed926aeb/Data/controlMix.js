//@input Component.PostEffectVisual myLUT

function OnChangeLUT(newValue){
	script.myLUT.mainPass.ratioMix = newValue;
}