const HUNGER_MAX = 10;
const HUNGER_DELAY = 60 * 1000;

export let hunger = getHunger();

export function addFood(scene, pet) {
  const foodX = Phaser.Math.Between(pet.x - 50, pet.x + 50);
  const foodY = Phaser.Math.Between(pet.y + pet.height / 5, pet.y + pet.height / 5 + 50);

  // Создаём еду
  const food = scene.add.image(foodX, foodY, 'food').setScale(0.2);
  scene.sound.play('eatSound');

  // Анимация еды к питомцу
  scene.tweens.add({
    targets: food,
    x: pet.x,
    y: pet.y,
    duration: 500,
    ease: 'Power2',
    onComplete: () => {
      food.destroy(); // Удаляем еду
      scene.sound.play('meowSound');
    },
  });
}

export function feedPet(scene, pet) {
  if (hunger > 0) {
    updateHunger(hunger - 1); // Уменьшаем голод
    addFood(scene, pet);
  }
}

export function startHungerTimer(scene) {
  scene.time.addEvent({
    delay: HUNGER_DELAY,
    callback: () => {
      if (hunger < HUNGER_MAX) {
        updateHunger(hunger + 1); // Увеличиваем голод
      }
    },
    loop: true,
  });
}

export function getHunger() {
  const defaultHunger = 1;
  const lastUpdate = parseInt(localStorage.getItem('lastHungerUpdate'), 10) || Date.now();
  const elapsedTime = Date.now() - lastUpdate;

  let storedHunger = parseInt(localStorage.getItem('hunger'), 10) || defaultHunger;
  const missedIncrements = Math.floor(elapsedTime / HUNGER_DELAY);

  storedHunger = Math.min(HUNGER_MAX, storedHunger + missedIncrements);

  // Обновляем данные в localStorage
  updateLocalStorage(storedHunger);

  return storedHunger;
}

function updateHunger(newHunger) {
  hunger = Math.max(0, Math.min(HUNGER_MAX, newHunger)); // Убедимся, что голод в пределах [0, HUNGER_MAX]
  updateLocalStorage(hunger);
}

function updateLocalStorage(hungerValue) {
  localStorage.setItem('hunger', hungerValue);
  localStorage.setItem('lastHungerUpdate', Date.now());
}
