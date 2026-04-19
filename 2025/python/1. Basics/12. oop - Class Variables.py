# Class Variables : Shared Among All Instances Of Class
#                   Defined Outside The Constructor
#                   Allow You To Share Data Among All Objects Created From That Class


###### Class Variables #######
class Student:

    class_year = 2025

    def __init__(self , name , age):
        self.name = name
        self.age = age

stud1 = Student("John" , 20)
print(stud1.class_year) # 2025


###### Another Sample : ripair_times Shared In All Instances #######
class Car:

    ripair_times = 0

    def __init__(self, model, year):
        self.model = model
        self.year = year

        Car.ripair_times += 1


car1 = Car("Ford", 2019)
print(car1.ripair_times) # 1


car2 = Car("Bwm", 2020)
print(car2.ripair_times) # 2