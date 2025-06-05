import Line from "./line.ts";
import Util from "./util.ts";

export default class StatefulLine {
    width: number;
    height: number;
    shift: number;
    line: Line;

    leftShift: number;
    topShift: number;
    rightShift: number;
    bottomShift: number;

    constructor(width: number, height: number, shift: number) {
        this.line = this.randomLine(width, height);
        this.width = width;
        this.height = height;
        this.shift = shift;
        this.leftShift = shift * Util.random_choice(1, -1);
        this.topShift = shift * Util.random_choice(1, -1);
        this.rightShift = shift * Util.random_choice(1, -1);
        this.bottomShift = shift * Util.random_choice(1, -1);
    }
    randomLine = (width: number, height: number): Line => {
        let left = Util.random_range(10.0, width - 10);
        let top = Util.random_range(10.0, height - 10);
        let right = Util.random_range(10, width - 10);
        let bottom = Util.random_range(10, height - 10);

        return new Line(left, top, right, bottom);
    }
    bounceShift = (shift: number) => {
        // When the end of a line hits the wall, it always changes the direction,
        // but sometimes the velocity is slightly reduced as well.
        let velo = Util.random_choice(this.shift, (this.shift / 9) * 8, 4);
        return shift > 0 ? velo * -1 : velo;
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
        this.line = new Line(left, top, right, bottom);
    }
}