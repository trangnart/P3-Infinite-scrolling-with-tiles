"use strict";
let snowColor = "#f1f2f6";
let iceColor = "#cce5ec";
/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 43;
}
function p3_tileHeight() {
  return 43;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

function drawFlower(i, j) {
  fill("#FFF200");

  circle(i-7, j-11, 15);
  circle(i+7, j-11, 15);
  circle(i-7, j+2, 15);
  circle(i+7, j+2, 15);

  noStroke();
  fill(255, 198, 72);
  circle(i, j-5, 10);
}

function p3_drawTile(i, j) {
  noStroke();
  fill(noise(i,j));
  fill(snowColor);

  push();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  if(noise(i,j) > 0.7){
    grassTile(th/2, tw/2);
  }
  if(noise(i,j) < 0.4){
    snowTile(th/2, tw/2);
  }

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    drawFlower(th/2, tw/2);
  }
  pop();
}

function grassTile(i, j){
  push();

  fill("#85573d");
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  fill("#7ec850");
  triangle(i, j, i-5, j+20, i+5, j+20);
  triangle(i, j+20, i+10, j+20, i+15, j);
  triangle(i, j+20, i-10, j+20, i-15, j);
  fill("#567d46");
  triangle(i, j+20, i-5, j+20, i-15, j);
  triangle(i, j+20, i+5, j+20, i+15, j);
  pop();
}

function snowTile(i, j){
  push();

  fill(iceColor);
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  fill(snowColor);
  circle(i+10, j+10, 3);
  circle(i+3, j+16, 7);
  ellipse(i-6, j+10, 20, 10);
  ellipse(i, j-1, 14, 8);
  ellipse(i-7, j-15, 20, 10);
  ellipse(i+15, j+19, 5, 2);
  ellipse(i-15, j-7, 3, 6);
  ellipse(i+13, j-14, 12, 6);
  ellipse(i+10, j-10, 4, 6);
  ellipse(i-15, j+15, 10, 5);
  ellipse(i+17, j+5, 3, 6);
  ellipse(i-4, j-7, 6, 8);
  ellipse(i-15, j+2, 6, 3);

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke("#2494ae");

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
}

function p3_drawAfter() {}