# Polymorphism : Greek Word Means Have Many Forms Of Faces

# Ways of Polymorphism :
#                            1- Inheritance
#                            2- Duck Typing

###################### 1- Inheritance #######################
from abc import ABC, abstractmethod

class Shape:
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2


class Square(Shape):

    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return self.base * self.height * .5

# Here Circle Not Inherit 'Shape' It Inherits 'Circle'
class Pizza(Circle):
    def __init__(self,topping, radius):
        super().__init__(radius)
        self.topping = topping

shapes = [Circle(10) , Square(20) , Triangle(10 , 20) , Pizza("Chicken" , 23)]

for shape in shapes:
    print(shape.area())

###########################################################################################

###################### 2- Duck Typying #######################
# Another Way To Achieve Polymorphism Beside Inheritance Object Must Have Minimum Necessary Attributes/Methods


class Animal:
    alive = True

class Dog(Animal):
    def speak(self):
        print("WOOF!")

class Cat(Animal):
    def speak(self):
        print("MEOW!")

# Car Here Have Minimum Necessary Attributes/Methods To Be Considered As Animal
# Here Car Must Not Speak But We Named It 'speak' To Be Like 'Dog' And 'Cat'
class Car:
    # We Add alive Here As In The Loop I Print 'alive' WHich Is Contained In 'Car' Class
    alive = False
    def speak(self):
        print("HONK!")

an = [Dog() , Cat() , Car()]

for a in an:
    a.speak()
    print(a.alive)