"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicData = void 0;
class BasicData {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
    }
}
exports.BasicData = BasicData;
