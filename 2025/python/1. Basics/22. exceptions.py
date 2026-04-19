# Exceptions : Events That Interrupts The Flow Of The Program
#              (ZeroDivisionError , TypeError , ValueError)
#              1.try 2.except 3.finally


######## ZeroDivisionError ############
#1/0

######## TypeError ############
#1 + ""

######## ValueError ############
#int("Pizza")

################ EX1 ################

try:
    num = int(input ("Enter a number: "))
    print(1 / num)

except ZeroDivisionError:
    print("You can't divide by zero")

except ValueError:
    print("You didn't enter a number")

finally:
    print("You finally did something")
################################################



