"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameEntities {
    monkeys;
    bananas;
    update(deltaTime) {
        updateDynamicObjects(this.monkeys.count, this.monkeys.posn, this.monkeys.vel, this.monkeys.accel, deltaTime);
        updateDynamicObjects(this.bananas.count, this.bananas.posn, this.bananas.vel, this.bananas.accel, deltaTime);
    }
}
exports.default = GameEntities;
class EntityIDMap {
    object_indeces;
    next_unused_entry = -1;
    create_entity(index) {
        const unused_entry = this.next_unused_entry;
        if (unused_entry < 0) {
            return this.object_indeces.push(index) - 1;
        }
        this.next_unused_entry = -2 - this.object_indeces[unused_entry];
        this.object_indeces[unused_entry] = index;
        return unused_entry;
    }
    remove_entity(id) {
        this.object_indeces[id] = -2 - this.next_unused_entry;
        this.next_unused_entry = id;
    }
    move_entity(id, new_index) {
        this.object_indeces[id] = new_index;
    }
    get_entity_index(id) {
        return this.object_indeces[id];
    }
}
class Vec2Col {
    items;
    get(index) {
        return [this.items[index * 2], this.items[index * 2 + 1]];
    }
    set(index, [x, y]) {
        this.items[index * 2] = x;
        this.items[index * 2 + 1] = y;
    }
    verifyLen(len) {
        if (this.items.length < len * 2) {
            throw "buffer overrun";
        }
    }
}
class PrimaryIDCol {
}
class ForeignIDCol {
}
class Monkeys {
    count;
    id;
    posn;
    vel;
    accel;
}
class Bananas {
    count;
    posn;
    vel;
    accel;
    stamina;
    ownerID;
}
function updateDynamicObjects(len, posn, vel, accel, deltaTime) {
    posn.verifyLen(len);
    vel.verifyLen(len);
    accel.verifyLen(len);
    for (let i = 0; i < len; i++) {
        const [px, py] = posn.get(i);
        const [vx, vy] = vel.get(i);
        const [ax, ay] = accel.get(i);
        const vx2 = vx + ax * deltaTime;
        const vy2 = vy + ay * deltaTime;
        vel.set(i, [vx2, vy2]);
        const vxAvg = (vx + vx2) * 0.5;
        const vyAvg = (vy + vy2) * 0.5;
        const px2 = px + vxAvg * deltaTime;
        const py2 = py + vyAvg * deltaTime;
        posn.set(i, [px2, py2]);
    }
}
