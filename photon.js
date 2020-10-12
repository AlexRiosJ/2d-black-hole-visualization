class Photon {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.startPos = createVector(x, y);
    this.vel = createVector(-c, 0);
    this.history = [];
    this.stopped = false;
    this.theta = PI;
  }

  stop() {
    this.stopped = true;
  }

  update() {
    if (!this.stopped) {
      //if (frameCount % 5 == 0) {
      this.history.push(this.pos.copy());
      //}
      const deltaV = this.vel.copy();
      deltaV.mult(dt);
      this.pos.add(deltaV);
    }

    if (this.history.length > 1000) {
      this.history.splice(0, 1);
    }

    if (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    ) {
      this.stop();
    }
  }

  show(end) {
    strokeWeight(4);
    if (this.startPos.y > end && this.startPos.y < windowHeight - end) {
      stroke(0);
    } else {
      stroke(255, 255, 128);
    }
    point(this.pos.x, this.pos.y);

    strokeWeight(2);
    noFill();
    beginShape();
    for (let v of this.history) {
      vertex(v.x, v.y);
    }

    endShape();
  }
}
