const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.getElementById('scoreEL')

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position, image }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    /*c.fillStyle = 'blue'
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height)
  */

    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "Yellow";
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Pellet {
  constructor({ position }) {
    this.position = position;
    this.radius = 3;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "Yellow";
    c.fill();
    c.closePath();
  }
}

const pellets = [];
const boundaries = [];

const player = new Player({
  position: {
    x: Boundary.height + 20,
    y: Boundary.height + 20,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey = "";
let score = 0;

function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}
const block = createImage("./images/block.png");
const topLeftCorner = createImage("./images/pipeCorner1.png");
const topRightCorner = createImage("./images/pipeCorner2.png");
const bottomRightCorner = createImage("./images/pipeCorner3.png");
const bottomLeftCorner = createImage("./images/pipeCorner4.png");
const horizontalPipe = createImage("./images/pipeHorizontal.png");
const verticalPipe = createImage("./images/pipeVertical.png");
const pipeCross = createImage("./images/pipeCross.png");
const capRight = createImage("./images/capRight.png");
const capLeft = createImage("./images/capLeft.png");
const capTop = createImage("./images/capTop.png");
const capBottom = createImage("./images/capBottom.png");
const pipeConnectorBottom = createImage("./images/pipeConnectorBottom.png");
const pipeConnectorTop = createImage("./images/pipeConnectorTop.png");

const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", " ", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "6", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

map.forEach((row, j) => {
  row.forEach((symbol, i) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: horizontalPipe,
          })
        );
        break;
      case "|":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: verticalPipe,
          })
        );
        break;
      case "1":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: topLeftCorner,
          })
        );
        break;
      case "2":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: topRightCorner,
          })
        );
        break;
      case "3":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: bottomRightCorner,
          })
        );
        break;
      case "4":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: bottomLeftCorner,
          })
        );
        break;
      case "b":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: block,
          })
        );
        break;
      case "^":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: capTop,
          })
        );
        break;
      case "+":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: pipeCross,
          })
        );
        break;
      case "]":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: capRight,
          })
        );
        break;
      case "[":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: capLeft,
          })
        );
        break;
      case "_":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: capBottom,
          })
        );
        break;
      case "6":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: pipeConnectorTop,
          })
        );
        break;
      case "^":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: pipeConnectorTop,
          })
        );
        break;

      case "7":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * i,
              y: Boundary.height * j,
            },
            image: pipeConnectorBottom,
          })
        );
        break;
      case ".":
        pellets.push(
          new Pellet({
            position: {
              x: Boundary.width * i + Boundary.width / 2,
              y: Boundary.height * j + Boundary.height / 2,
            },
          })
        );
        break;
    }
  });
});

function circleCollidesWithRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  const boundaryLength = boundaries.length

  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < boundaryLength; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 0,
              y: -5,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    }
  } else if (keys.a.pressed && lastKey === "a") {
    for (let i = 0; i < boundaryLength; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: -5,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = -5;
      }
    }
  } else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < boundaryLength; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 0,
              y: 5,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    }
  } else if (keys.d.pressed && lastKey === "d") {
    for (let i = 0; i < boundaryLength; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 5,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = 5;
      }
    }
  }

  //Touch pellets here
  for (let i = pellets.length - 1; 0 < i; i--) {
    const pellet = pellets[i];
    pellet.draw();
    if (
      Math.hypot(
        pellet.position.x - player.position.x,
        pellet.position.y - player.position.y
      ) <
      pellet.radius + player.radius
    ) {
      pellets.splice(i, 1);
      score += 10
      scoreEl.innerHTML = score
    }
  }

  boundaries.forEach((boundary) => {
    boundary.draw();
    if (
      circleCollidesWithRectangle({
        circle: player,
        rectangle: boundary,
      })
    ) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  player.update();
  //player.velocity.y = 0;
  //player.velocity.x = 0;
}

animate();
addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
