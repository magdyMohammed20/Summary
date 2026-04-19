# Modules : File Containing Code You Want To Include It In Your Program
#           use 'import' To Include A Module (Built In Or Your Own)
#           useful To Break Up Large Program

# Built In Module
from math import pi
from math import e
from math import tan

print(pi) # 3.141592653589793
print(e)  # 2.718281828459045
print(tan(1))


####### Your Own ##########

# example.py
def sum(a,b):
    return a+b

def sub(a,b):
    return a-b

def mul(a,b):
    return a*b


# Another File
import example

print(example.mul(10 , 20)) # 200
print(example.sum(10 , 20)) # 30
print(example.sub(10 , 20)) # -10

