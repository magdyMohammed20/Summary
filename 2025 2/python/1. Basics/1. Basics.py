########## This Is First Log Statement ##########
print("Hellow World")

########## Variables & Format ##########
first_name = "Magdy"
print(f"Hello {first_name}") # Hello Magdy

########## Multi Line Comment ##########
"""
    Hellow World Man
    Second Line Comment
"""

########## Type Of Variable ##########
print(type("Text")) # <class 'str'>
print(type(10)) # <class 'int'>
print(type(3.14)) # <class 'float'>
print(type(True)) # <class 'bool'>


########## Type casting ##########
num = 10
gpa = 3.4
text_str = "Text"
is_student = True

print(float(num)) # 10.0
print(int(gpa)) # 3
print(bool(text_str)) # True
print(str(is_student)) # "True"


########## Accept User Input ##########
name = input('Enter your name: ')
age = input('Enter your age: ')
job = input('Enter your job: cm')

print(f"Your name is {name} , your age is {age} , your job is {job}")


########## Conditional ##########
person = 'Student' # Boolean Is Capitalized Here

if person == 'Student':
    print("Student")

elif person == 'Teacher':
    print("Teacher")
else:
    print("Person")


