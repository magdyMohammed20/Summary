# Inheritance : Allow Class To Inherit Attributes And Methods From Another Class

###### Inheritance #######

class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating..." )

    def sleep(self):
        print(f"{self.name} is sleeping..." )

# Dog Class Inherit "Animal" Class
class Dog(Animal):
    pass

# Cat Class Inherit "Animal" Class
class Cat(Animal):
    pass

cat = Cat("Sherazi")
dog = Dog("BetBall")

print(cat.name)
print(dog.name)

cat.eat()
dog.eat()

cat.sleep()
dog.sleep()
