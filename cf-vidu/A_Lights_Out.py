grid = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
]

presses = []
for i in range(3):
  presses.append(list(map(int, input().split())))


def toggle(i, j):
  if 0 <= i < 3 and 0 <= j < 3:
    grid[i][j] = 1 if grid[i][j] == 0 else 0


for i in range(3):
  for j in range(3):
    if presses[i][j] % 2 == 1:
      toggle(i, j)
      toggle(i, j-1)
      toggle(i, j+1)
      toggle(i-1, j)
      toggle(i+1, j)

for row in grid:
  print(''.join(map(str, row)))
