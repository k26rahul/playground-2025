T = int(input())

i_sum = 0
j_sum = 0
k_sum = 0

for t in range(T):
  i, j, k = map(int, input().split())

  i_sum += i
  j_sum += j
  k_sum += k

if i_sum == 0 and j_sum == 0 and k_sum == 0:
  print("YES")
else:
  print("NO")
