n = int(input())

sum_i = 0
sum_j = 0
sum_k = 0

for _ in range(n):
  i, j, k = map(int, input().split())
  sum_i += i
  sum_j += j
  sum_k += k

if all([sum_i == 0, sum_j == 0, sum_k == 0]):
  print('YES')
else:
  print('NO')
