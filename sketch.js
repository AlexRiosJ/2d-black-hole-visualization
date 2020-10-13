const c = 30;
const G = 3.54;
const dt = 0.1;

let m87;

const particles = [];
let start, end;

let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(0, 255, 127);
  slider.position(10, 10);
  slider.style("width", "80px");

  const diffParam = parseFloat(document.location.search.split("sp=")[1]);
  const diff = isNaN(diffParam) ? 10 : diffParam;
  const massParam = parseFloat(document.location.search.split("m=")[1]);
  const mass = isNaN(massParam) ? 6500 : massParam;

  m87 = new Blackhole(width / 8, height / 2, mass);

  start = height / 2;
  end = height / 2 - m87.rs * 2.6;

  for (let y = 0; y < windowHeight; y += diff) {
    particles.push(new Photon(width - 20, y));
  }
}

function draw() {
  background(slider.value(), 100);
  stroke(0);
  strokeWeight(1);
  line(0, start, width, start);
  line(0, end, width, end);
  line(0, windowHeight - end, width, windowHeight - end);
  for (let p of particles) {
    m87.pull(p);
    p.update();
    p.show(end);
  }
  m87.show();
}
