export function playRandomTrack(scene, tracks) {
  const randomTrackKey = Phaser.Utils.Array.GetRandom(tracks);
  const track = scene.sound.add(randomTrackKey, { volume: 0.2 });

  track.play();
  track.once('complete', () => playRandomTrack(scene, tracks));
}
