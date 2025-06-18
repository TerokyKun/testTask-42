function printState(state) {
  console.log("Текущее состояние колб:");
  state.forEach((tube, i) => {
    console.log(`Колба ${i}: [${tube.join(', ')}]`);
  });
  console.log('-----------------------------');
}

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

function isSolved(state, V) {
  const solved = state.every(tube =>
    tube.length === 0 ||
    (tube.length === V && tube.every(c => c === tube[0]))
  );
  if (solved) console.log("Решено!");
  return solved;
}

function getKey(state) {
  return state.map(tube => tube.join('')).join('|');
}

function getMoves(state, V) {
  const moves = [];
  const N = state.length;
  for (let i = 0; i < N; i++) {
    const from = state[i];
    if (from.length === 0) continue;

    const color = from[from.length - 1];
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      const to = state[j];
      if (to.length === V) continue;
      if (to.length === 0 || to[to.length - 1] === color) {
        moves.push({ from: i, to: j });
      }
    }
  }
  console.log("Возможные ходы:", moves.map(m => `${m.from} → ${m.to}`));
  return moves;
}

function solveBFS(initialState, V) {
  const queue = [[initialState, []]];
  const visited = new Set();
  let steps = 0;

  while (queue.length > 0) {
    const [state, path] = queue.shift();
    const key = getKey(state);
    if (visited.has(key)) continue;
    visited.add(key);

    steps++;
    console.log(`\n=== Шаг ${steps} ===`);
    console.log("Путь:", path.map(([f, t]) => `${f}→${t}`).join(', ') || 'начало');
    printState(state);

    if (isSolved(state, V)) return path;

    for (const { from, to } of getMoves(state, V)) {
      const newState = state.map(tube => [...tube]);
      const color = newState[from][newState[from].length - 1];

      let count = 1;
      for (let k = newState[from].length - 2; k >= 0; k--) {
        if (newState[from][k] === color) count++;
        else break;
      }

      const space = V - newState[to].length;
      const pourAmount = Math.min(count, space);

      for (let i = 0; i < pourAmount; i++) {
        newState[to].push(newState[from].pop());
      }

      console.log(`Перелили ${pourAmount} капель цвета ${color} из колбы ${from} в колбу ${to}`);
      queue.push([newState, [...path, [from, to]]]);
    }
  }

  console.log("Решение не найдено");
  return null;
}

let main = (arr) => {
  const colorCount = numColors(arr);
  if (colorCount >= arr.length) {
    return "Нет решения: цветов больше, чем колб";
  }

  const state = JSON.parse(JSON.stringify(arr));
  const V = Math.max(...arr.map(tube => tube.length));

  console.log("Объём колбы (V):", V);
  const result = solveBFS(state, V);
  return result ? result : "Нет решения";
};


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

let al = [['A', 'A', 'A', 'A'], ['B', 'B', 'B', 'B'], []]

console.log(main(n))
console.log(main(al))
