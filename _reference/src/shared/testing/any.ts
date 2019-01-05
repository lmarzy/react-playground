export class Any {
  static randomString = (): string =>
    Math.random()
      .toString(36)
      .replace('0.', '');

  static randomNumber = (min: number = 0, max: number = 100): number =>
    Math.floor(min + Math.random() * (max + 1 - min));
}
