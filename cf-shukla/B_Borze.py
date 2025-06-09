code = input()

decoded = ''

mapping = {
    "-.": '1',
    "--": '2',
}

i = 0
while i < len(code):
  if code[i] == '.':
    decoded += '0'
    i += 1
    continue

  decoded += mapping[code[i:i+2]]
  i += 2

print(decoded)
