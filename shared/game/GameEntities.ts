export default class GameEntities {
  monkeys: Monkeys
  bananas: Bananas
  
  update(deltaTime: number) {
    updateDynamicObjects(
      this.monkeys.count,
      this.monkeys.posn,
      this.monkeys.vel,
      this.monkeys.accel,
      deltaTime
    );
    updateDynamicObjects(
      this.bananas.count,
      this.bananas.posn,
      this.bananas.vel,
      this.bananas.accel,
      deltaTime
    );
  }
}


class EntityIDMap {
  // contains an embedded linked list of all the unused IDs.
  // each unused id maps to (-2 - id_unused_next), to distinguish
  // them from positive values, which are used for IDs which are in use.
  object_indeces: number[]

  // the head of the unused id linked list.
  // -1 means all entries are full.
  next_unused_entry = -1
  
  create_entity(index: number): number {
    const unused_entry = this.next_unused_entry;
    if (unused_entry < 0) {
      // all entries are full
      return this.object_indeces.push(index) - 1;
    }
    this.next_unused_entry = -2 - this.object_indeces[unused_entry];
    this.object_indeces[unused_entry] = index;
    return unused_entry; 
  }

  remove_entity(id: number) {
    this.object_indeces[id] = -2 - this.next_unused_entry;
    this.next_unused_entry = id;
  }

  move_entity(id: number, new_index: number) {
    this.object_indeces[id] = new_index;
  }

  get_entity_index(id: number): number {
    return this.object_indeces[id];
  }
}

class Vec2Col {
  items: number[]

  get(index: number): [x: number, y: number] {
    return [this.items[index * 2], this.items[index * 2 + 1]];
  }

  set(index: number, [x, y]: [number, number]) {
    this.items[index * 2] = x;
    this.items[index * 2 + 1] = y;
  }

  verifyLen(len: number) {
    if (this.items.length < len * 2) {
      throw "buffer overrun";
    }
  }
}


class PrimaryIDCol {}

class ForeignIDCol {}

class Monkeys {
  count: number
  // Bananas need to reference their corresponding monkeys, so we use stable ids.
  id: number[]
  posn: Vec2Col
  vel: Vec2Col
  accel: Vec2Col
}

class Bananas {
  count: number
  posn: Vec2Col
  vel: Vec2Col
  accel: Vec2Col
  stamina: [number] 
  ownerID: [number]
}

// Dynamic objects have positions, velocities, and accelerations.
function updateDynamicObjects(len: number, posn: Vec2Col, vel: Vec2Col, accel: Vec2Col, deltaTime: number) {
  // By doing these first, hopefully the JIT can avoid doing bounds checks within the loop (pretty please)
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
