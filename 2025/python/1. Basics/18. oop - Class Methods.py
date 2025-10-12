# Class Methods : Allow Operations  Related To The Class Itself
#                 Take (cls) As First Parameter , Which Represents The Class Itself


# Instance Methods : Best For Operations On Instances Of Class (Objects)
# Static Methods : Best For Utility Functions That Don't Need Access To Class Data
# Class Methods : Best For Class Level Data Or Require Access To The Class Itself

class Student:

    count = 0
    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa
        Student.count += 1

    def get_info(self):
        print(self.name, self.gpa)

    # Here get_count Function Have 'cls' Attribute Which Is Access Class Itself
    @classmethod
    def get_count(cls):
        return cls.count

Student("Magdy", 21)
Student("Magdy", 21)
Student("Magdy", 21)
print(Student.get_count()) # 3




