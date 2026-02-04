import random
import math

# Random Between 2 Numbers
num = random.randint(1,6)
print(num)


# Generate Random Number
rand = random.random()
print(math.ceil(rand * 10))


# Random Choice
options = ("Apple" , "Banana" , "Orange" , "Pineapple")
print(random.choice(options))

# Random Shuffle
options2 = ["Apple" , "Banana" , "Orange" , "Pineapple"]
random.shuffle(options2)
print(options2)