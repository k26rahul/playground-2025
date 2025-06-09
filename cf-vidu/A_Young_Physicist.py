T = int(input())

sum_i = 0
sum_j = 0
sum_k = 0

for _ in range(T):
  i, j, k = map(int, input().split())
  sum_i += i
  sum_j += j
  sum_k += k

if sum_i == 0 and sum_j == 0 and sum_k == 0:
  print('YES')
else:
  print('NO')
