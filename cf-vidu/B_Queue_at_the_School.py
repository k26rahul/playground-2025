n, t = map(int, input().split())

queue = list(input())

for _ in range(t):
  swapped = False

  for i in range(len(queue)-1):
    if swapped:
      swapped = False
      continue

    if queue[i] == 'B' and queue[i+1] == 'G':
      queue[i] = 'G'
      queue[i+1] = 'B'
      swapped = True

print(''.join(queue))
