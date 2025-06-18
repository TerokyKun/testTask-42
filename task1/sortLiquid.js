let n = [
  ['B', 'R', 'B', 'G', 'F', 'F'],
  ['D', 'F', 'Y', 'Y', 'B', 'B'],
  ['G', 'Y', 'F', 'F', 'D', 'D'],
  ['G', 'R', 'D', 'E', 'Y', 'Y'],
  ['E', 'D', 'E', 'B', 'E', 'E'],
  ['Y', 'E', 'R', 'D', 'R', 'R'],
  ['F', 'B', 'G', 'G', 'R', 'G'],
  [],
];

function numColors(arr) {
  let colors = new Set();
  for (let tube of arr) {
    for (let drop of tube) {
      colors.add(drop);
    }
  }
  console.log("Цветов обнаружено:", colors.size);
  return colors.size;
}

function countEmptyTubes(arr) {
  const count = arr.filter(tube => tube.length === 0).length;
  console.log("Пустых колб:", count);
  return count;
}


let sortLquid = (arr) => {
  const colorCount = numColors(arr);
  if (colorCount >= arr.length) {
    return "Нет решения: цветов больше, чем колб";
  }

  countEmptyTubes(arr);
  const state = JSON.parse(JSON.stringify(arr));
  const V = Math.max(...arr.map(tube => tube.length)); 


};



let al =  [['A','A','A','A'], ['B','B','B','B'], []]

console.log(sortLquid(n))
console.log(sortLquid(al))
