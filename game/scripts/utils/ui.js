export function createBtn(scene, x, y, width, height, text) {
  const buttonImage = scene.add.image(0, 0, 'btn_green');
  const buttonText = scene.add.text(0, 0, text, {
    font: '18px Arial',
    fill: '#ffffff',
    align: 'center',
    wordWrap: { width: width - 20 },
  }).setOrigin(0.5);

  buttonImage.setScale(width / buttonImage.width, height / buttonImage.height);

  return scene.add.container(x, y, [buttonImage, buttonText])
    .setSize(width, height)
    .setInteractive({ useHandCursor: true });
}

export function createBar(scene, x, y, width, height, text, value) {
  const padding = 5; // Отступы по краям
  const innerWidth = width - padding * 2; // Ширина с учётом отступов
  const startX = x - width / 2 + padding; // Начальная позиция X

  // Функция для создания графики полоски
  const createGraphics = (color, progress) => {
    const graphics = scene.add.graphics();
    graphics.fillStyle(color, 1);
    graphics.fillRect(
      startX,
      y - height / 4,
      progress * innerWidth, // Длина полоски (от 0 до 1)
      height / 2
    );
    return graphics;
  };

  // Создаём фон и зелёную полоску
  const progressBarBg = createGraphics(0x575d81, 1); // Полоска фона
  const progressBar = createGraphics(0x54f16e, value / 100); // Зелёная полоска

  // Создаём изображение фона полоски
  const barBackground = scene.add.image(x, y, 'bar').setOrigin(0.5, 0.5);

  // Масштабируем изображение до нужных размеров
  barBackground.setScale(
    width / barBackground.width,
    height / barBackground.height
  );

  // Добавляем текст в начале полоски
  const barText = scene.add.text(x - width / 2, y - height / 2 - 10, text, {
    font: '18px Arial',
    fill: '#fff',
  }).setOrigin(0, 0.5); // Устанавливаем начало текста (по X)

  // Группируем объекты для управления
  const barContainer = scene.add.container(0, 0, [progressBarBg, progressBar, barBackground, barText]);

  // Сохраняем progressBar для обновления
  barContainer.progressBar = progressBar;

  // Метод обновления значения
  barContainer.updateValue = (newValue) => {
    const progress = newValue / 100; // Прогресс в долях
    barContainer.progressBar.clear();
    barContainer.progressBar.fillStyle(0x54f16e, 1);
    barContainer.progressBar.fillRect(
      startX,
      y - height / 4,
      progress * innerWidth,
      height / 2
    );
  };

  return barContainer;
}
