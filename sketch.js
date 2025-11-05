let flowerData;
let flowerList = [];
let flowImgs = {};
let table;

// First flowers to be displayed (modular)
const iDs = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];

function preload() {
  table = loadImage("table.jpg"); // background
  flowerData = loadJSON("flowers.json"); // JSON data
}

function setup() {
  createCanvas(612, 444);

  // Load the images and store name + price from JSON
  for (let id of iDs) {
    let flower = flowerData.flowerlist.find(f => f.productId === id);

    flowImgs[id] = loadImage("images/" + flower.photo);

    flowerList.push({
      id: flower.productId,
      name: flower.name,
      price: flower.price
    });
  }

  textSize(18);
}

function draw() {
  image(table, 0, 0, width, height);

  // Bottom Text
  textAlign(CENTER);
  textSize(17);
  fill("white");
  text("List of flowers available for sale :3", width / 2, height - 20);

  // List
  textAlign(CENTER, CENTER);
  textSize(25);
  fill(245, 255, 156);

  let listHeight = 28;
  let totalHeight = flowerList.length * listHeight;
  let startY = (height - totalHeight) / 2;

  let hovFlowID = null;

  for (let i = 0; i < flowerList.length; i++) {
    let y = startY + i * listHeight;
    let f = flowerList[i];

    text(`${f.name} — $${f.price}`, width / 2, y);

    // Hover function
    if (
      mouseX > width / 2 - 150 &&
      mouseX < width / 2 + 150 &&
      mouseY > y - listHeight / 2 &&
      mouseY < y + listHeight / 2
    ) {
      hovFlowID = f.id;
    }
  }

  // Draw image when hovered
  if (hovFlowID !== null && flowImgs[hovFlowID]) {
    image(flowImgs[hovFlowID], mouseX + 12, mouseY + 12, 100, 90);
  }
}
