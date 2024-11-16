export function blink(scene, pet) {
  pet.setTexture('pet_eye-close');
  scene.time.delayedCall(200, () => pet.setTexture('pet'));
}
