# Super: Method Used In Child Class To Call Methods From Parent Class (SuperClass)
#        Allow To Extend Functionality Of The Inherited Methods
import math
from math import pi

# Super Class
class Shape:
    def __init__(self , color , is_filled):
        self.color = color
        self.is_filled = is_filled

    def describe(self):
        print(f"{self.color} {f"{"filled" if self.is_filled else "Not Filled"}"}")


class Circle(Shape):
    def __init__(self,color , is_filled, radius):
        # Calling The Instructor Of 'Shape' Class
        super().__init__(color, is_filled)
        self.radius = radius

    # Here We Can Override Or Add On The Original describe Method
    def describe(self):
        print(f"Area Is { pi * (self.radius ** 2) } cm^2")

        super().describe() # Also We Can Call The Original Describe Logic


class Triangle(Shape):
    def __init__(self,color , is_filled, width , height):
        # Calling The Instructor Of 'Shape' Class
        super().__init__(color, is_filled)
        self.width = width
        self.height = height




cir = Circle('red' , True , 13)

print(cir.is_filled)
print(cir.color)
print(cir.radius)
cir.describe()