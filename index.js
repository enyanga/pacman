const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
  static width = 40;
  static height = 40;
  constructor({position}){
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw(){
    c.fillStyle = 'blue'
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}


class Player {
  constructor({position,velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.radius  = 15;
  }

  draw(){
    c.beginPath();
    c.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0, Math.PI * 2
    )
    c.fillStyle = 'Yellow';
    c.fill();
    c.closePath();
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

const map = [
  ['-','-','-','-','-','-'],
  ['-',' ',' ',' ',' ','-'],
  ['-',' ','-','-',' ','-'],
  ['-',' ',' ',' ',' ','-'],
  ['-','-','-','-','-','-']
]

const boundaries = [];

const player = new Player({
  position:{
    x:Boundary.height + 20,
    y:Boundary.height + 20
  },
  velocity:{
    x:0,
    y:0,
  }
});

map.forEach((row,j) => {
  row.forEach((symbol,i) => {
    switch(symbol){
      case '-':
        boundaries.push(
          new Boundary({
            position:{
              x: Boundary.width * i,
              y: Boundary.height * j,
            }
          })
        )
       break
    }
  })
})

function animate() {
  requestAnimationFrame(animate);
  boundaries.forEach((boundary) => {
    boundary.draw()
  })
  player.update();
}

animate()





addEventListener('keydown',({key}) => {
  console.log(key)
  switch(key){
    case 'w':
      player.velocity.y = - 5;
    break
    case 'a':
      player.velocity.x = - 5;
    break
    case 's':
      player.velocity.y = 5;
    break
    case 'd':
      player.velocity.x =  5
    break
  }
 }
)

