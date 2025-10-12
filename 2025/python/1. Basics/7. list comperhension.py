# List Comperhension : Concise Way To Create Lists In Python

######## EX ########
doubles = [x * 2 for x in range(1,11)] # Will Return x multiplied By 2
print(doubles) # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]


######## EX ########
fruits = ["apple", "banana", "cherry"]
fruits = [fruit.upper() for fruit in fruits] # Will Return fruit.upper()
print(fruits) # ['APPLE', 'BANANA', 'CHERRY']


######## EX ########
positive = [-1,0,2,-2,10,-4]
positive = [num for num in positive if num > 0] # Will Return num
print(positive) # [2, 10]
