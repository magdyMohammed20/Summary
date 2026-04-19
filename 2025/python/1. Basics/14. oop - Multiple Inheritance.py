# Multiple Inheritance : Inherit From More Than One Parent Class

###### Multiple Inheritance #######

class GermanyCar:
    def start_engine(self):
        print("I am a Germany Car")

class ChineeseCar:
    def manual(self):
        print("I am a Chineese Car")

# Car Class Here Inherit Multiple Classes
class Car(GermanyCar, ChineeseCar):
    def isCar(self):
        print("Is car")


my_new_car = Car()

my_new_car.manual()
my_new_car.start_engine()