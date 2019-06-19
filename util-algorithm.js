/**
 * Shuffle Array with Fisher-Yates algorithm
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {Array} a
 * @param {Function|undefined} exchange
 * @return  {Array}
 */
function shuffleArray (a, exchange) {
  if (!a || !a.length) return a;
  if (typeof exchange !== 'function') {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  } else {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      exchange(i, j, a);
    }
  }
  return a;
}

/**
 * Pick an element from given array randomly
 * @param {Array} array
 * @param {any|Array<any>} excluded
 * @return  {any}
 */
function randPick (array, excluded) {
  let picked;
  let len = array.length;
  if (!excluded) {
    return array[rand(len)];
  } else if (Array.isArray(excluded)) {
    if (excluded.length === 1) {
      return randPick(array, excluded[0]);
    }
    do {
      picked = array[rand(len)];
    } while (excluded.indexOf(picked) >= 0);
  } else {
    do {
      picked = array[rand(len)];
    } while (excluded === picked);
  }
  return picked;
}

/**
 * Return an integer greater than min and smaller than max
 * @param   {Number}  max
 * @param   {Number}  min
 * @return  {Number}
 */
function rand(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Return an random Vec2 inside [{0,0}, {width,height}];
 * @param   {Number}  width
 * @param   {Number}  height
 * @return  {cc.Vec2}
 */
function randPoint(width, height) {
  const x = rand(width), y = rand(height);
  return cc.v2(x, y);
}

/**
 * Scatter nodes inside confinement node
 * @param   {Array<cc.Node>}  nodes
 * @param   {cc.Node}  confinement
 *
 * @return  {Array<cc.Node>}
 */
function scatterNodes(nodes, confinement) {
  if (!confinement || !confinement.width || !confinement.height) return nodes;
  nodes.forEach(n => {
    const p = randPoint(confinement.width, confiment.height);
    n.x = p.x;
    n.y = p.y;
  });
  return nodes;
}

export {
  shuffleArray,
  randPick,
  rand,
  scatterNodes
}