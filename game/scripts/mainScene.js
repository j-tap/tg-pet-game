import { createBtn, createBar } from './utils/ui.js';
import { playRandomTrack } from './utils/audio.js';
import { blink } from './utils/pet.js';
import { feedPet, startHungerTimer, hunger } from './hunger.js';

export let pet;

let background;
let feedBar;
let previousHunger = hunger;

export function preload() {
  this.load.image('pet', './assets/images/cat.png');
  this.load.image('btn_green', './assets/images/ui/btn_green.png');
  this.load.image('bar', './assets/images/ui/bar.png');
  this.load.image('pet_eye-close', './assets/images/cat_eye-close.png');
  this.load.image('room-1', './assets/images/room-1.png');
  this.load.image('food', './assets/images/fish.png');

  this.load.audio('track1', './assets/musics/track1.mp3');
  this.load.audio('track2', './assets/musics/track2.mp3');
  this.load.audio('eatSound', './assets/sounds/eat.mp3');
  this.load.audio('meowSound', './assets/sounds/meow.mp3');
}

export function create() {
  const { width, height } = this.scale;

  playRandomTrack(this, ['track1', 'track2']);
  startHungerTimer(this);

  background = this.add.image(0, height, 'room-1')
    .setOrigin(0, 1)
    .setDisplaySize(width, height);

  pet = this.add.image(width / 2, height / 1.5, 'pet').setScale(0.5);

  this.time.addEvent({
    delay: 3000,
    loop: true,
    callback: () => blink(this, pet),
  });

  feedBar = createBar(this, 150, 50, 200, 30, 'Сытость', 100 - (100 / 10) * hunger);

  const feedButton = createBtn(this, 150, 100, 200, 50, 'Покормить');
  feedButton.on('pointerdown', () => feedPet(this, pet));

  this.scale.on('resize', () => resizeGame(this));
}

export function update() {
  if (hunger !== previousHunger) {
    previousHunger = hunger;
    feedBar.updateValue(100 - (100 / 10) * hunger);
  }
}

function resizeGame(scene) {
  const { width, height } = scene.scale;
  background.setDisplaySize(width, height).setPosition(0, height);
  pet.setPosition(width / 2, height / 1.5);
}
