# Object : Bundle Of Related Attributes And Methods

# Class : Blueprint Used To Design The Structure And Layout Of Object

###### Class #######
class Car:

    ##### Instructor #####
    def __init__(self , model , year , color , for_sale):
        self.model = model
        self.year = year
        self.color = color
        self.for_sale = for_sale

    ##### Method #####
    def drive(self):
        print(f"Hello You Will Start Drive {self.model} Now")

car = Car("Bmw" , 2010 , "white" , True)

print(car) # Will Get The Memory Address For 'car' Object

print(car.model)
print(car.year)
print(car.color)
print(car.for_sale)

car.drive()