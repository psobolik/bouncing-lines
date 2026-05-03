import Line from "./line.ts";
import * as RandomUtil from "./random_util.ts";

export default class StatefulLine {
    width: number;
    height: number;
    shift: number;
    line: Line;

    leftShift: number;
    topShift: number;
    rightShift: number;
    bottomShift: number;

    constructor(width: number, height: number, shift: number, color: string) {
        this.line = Line.random(width, height, shift, color);
        this.width = width;
        this.height = height;
        this.shift = shift;
        this.leftShift = shift * RandomUtil.random_choice(1, -1);
        this.topShift = shift * RandomUtil.random_choice(1, -1);
        this.rightShift = shift * RandomUtil.random_choice(1, -1);
        this.bottomShift = shift * RandomUtil.random_choice(1, -1);
    }
    bounceShift = (shift: number) => {
        // When the end of a line hits the wall, it always changes direction,
        // but sometimes the velocity is slightly changed as well.
        const fraction = 10;
        const fractions = this.shift / fraction;
        const velocity = RandomUtil.random_choice_3(this.shift, fractions * (fraction + 1), fractions * (fraction - 1), 6);
        return shift > 0 ? -velocity : velocity;
    }
    shiftLine = () => {
        let left = this.line.left + this.leftShift;
        let top = this.line.top + this.topShift;
        let right = this.line.right + this.rightShift;
        let bottom = this.line.bottom + this.bottomShift;

        if (left <= 0) {
            left = 0;
            this.leftShift = this.bounceShift(this.leftShift);
        } else if (left >= this.width) {
            left = this.width;
            this.leftShift = this.bounceShift(this.leftShift);
        }
        if (top <= 0) {
            top = 0;
            this.topShift = this.bounceShift(this.topShift);
        } else if (top >= this.height) {
            top = this.height;
            this.topShift = this.bounceShift(this.topShift);
        }
        if (right <= 0) {
            right = 0;
            this.rightShift = this.bounceShift(this.rightShift);
        } else if (right >= this.width) {
            right = this.width;
            this.rightShift = this.bounceShift(this.rightShift);
        }
        if (bottom <= 0) {
            bottom = 0;
            this.bottomShift = this.bounceShift(this.bottomShift);
        } else if (bottom >= this.height) {
            bottom = this.height;
            this.bottomShift = this.bounceShift(this.bottomShift);
        }
        this.line = new Line(left, top, right, bottom, this.line.color);
    }
}