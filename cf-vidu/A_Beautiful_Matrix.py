pos = (0, 0)

for i in range(5):
  array = input().split()
  if '1' in array:
    j = array.index('1')
    pos = (i+1, j+1)

i, j = pos
print(abs(i-3) + abs(j-3))
