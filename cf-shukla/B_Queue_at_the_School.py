n, t = map(int, input().split())

queue = list(input())

for s in range(t):
  i = 0
  while i < n-1:
    if queue[i] == 'B' and queue[i+1] == 'G':
      queue[i] = 'G'
      queue[i+1] = 'B'
      i += 1

    i += 1

print(''.join(queue))
