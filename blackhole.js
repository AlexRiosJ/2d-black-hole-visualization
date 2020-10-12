class Blackhole {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.rs = (2 * G * this.mass) / (c * c);
  }

  pull(photon) {
    const force = p5.Vector.sub(this.pos, photon.pos);
    const theta = force.heading();
    const r = force.mag();
    const fg = (G * this.mass) / (r * r);
    let deltaTheta = -fg * (dt / c) * sin(photon.theta - theta);
    deltaTheta /= abs(1.0 - (2.0 * G * this.mass) / (r * c * c));
    photon.theta += deltaTheta;
    photon.vel = p5.Vector.fromAngle(photon.theta);
    photon.vel.setMag(c);

    if (r <= this.rs + 0.5) {
      photon.stop();
    }
  }

  show() {
    // Event horizon radius
    fill(0);
    stroke(0);
    ellipseMode(RADIUS);
    ellipse(this.pos.x, this.pos.y, this.rs);

    // Accretion disk radius
    noFill();
    stroke(255, 32, 0, 32);
    strokeWeight(64);
    ellipse(this.pos.x, this.pos.y, this.rs * 3 + 32);

    // Photon sphere radius
    stroke(255, 255, 0, 100);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.rs * 1.5);

    // Black hole shadow radius
    stroke(255, 100);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.rs * 2.6);
  }
}
