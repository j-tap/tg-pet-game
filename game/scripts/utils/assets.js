export function blink(scene, pet) {
  pet.setTexture('pet_eye-close');
  scene.time.delayedCall(200, () => pet.setTexture('pet'));
}

export function setBgSize(scene, bg) {
  const { width, height } = scene.scale;
  const bgTexture = bg.texture;
  const bgWidth = bgTexture.source[0].width; // Оригинальная ширина фона
  const bgHeight = bgTexture.source[0].height; // Оригинальная высота фона

  // Вычисляем масштаб с сохранением пропорций
  const scale = Math.max(width / bgWidth, height / bgHeight);

  // Применяем масштаб
  bg.setScale(scale).setOrigin(0.5, 0.5);

  // Центрируем фон
  bg.setPosition(width / 2, height / 2);
}
