export default class Util {
    static random_range = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    };
    static random_bool = (weight?: number) => {
        return Util.random_range(0, weight ? weight : 2) < 1.0;
    };
    static random_choice = <T>(optionA: T, option2: T, weight?: number): T => {
        return Util.random_bool(weight) ? optionA : option2;
    };
}