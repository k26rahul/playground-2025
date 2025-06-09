year = input()

y = int(year)+1

while True:
  y = str(y)
  if len(y) == len(set(y)):
    print(y)
    break

  y = int(y)+1
