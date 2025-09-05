const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      grid: Array.from({ length: 9 }, () => Array(9).fill('.')),
    };
  },
}).mount('#app');

const superposition = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => new Set(Array.from({ length: 9 }, (_, i) => i + 1)))
);

function collapseCell(row, col) {}
