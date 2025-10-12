# Static Methods : Method That Belong To Class Rather Than Any Object From That Class (instance)
#                  Usually Used For General Utility Functions That Don't Need Access To Class Data


class Employee:
    def __init__(self, name, position):
        self.name = name
        self.position = position

    def get_info(self):
        print(self.name, self.position)

    # Here is_valid_position Function Not Have 'self' Attribute Which Is Not Access Class Data
    @staticmethod
    def is_valid_position(position):
        positions = ["Front_End" , "Back_End" , "Fullstack"]
        return position in positions

# Here We Don't Need Instance From The Class (But Can Access Using) We Access Static Method Using Class Name Only
print(Employee.is_valid_position("Front_End"))

emp =  Employee("John", 123)


