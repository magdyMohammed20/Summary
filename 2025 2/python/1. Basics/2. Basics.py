#############  Logical Operators (or - and - not) ############
car_type = 'Volvo'
max_speed = 221

if car_type == 'bmw' and max_speed >= 250:
    print('Looks Massive Car')
elif car_type == 'Mercesdes' and max_speed <= 200:
    print('Looks Massive Car And Luxry Car')
elif car_type == 'Saheen' or car_type == 'Mazda':
    print('Looks Boor Car')
elif car_type == 'Volvo' and not max_speed < 220:
    print('Looks German Good Car')
else:
    print('Median Car')


############ Conditional Expression ############
num = -10
is_cond = 'Positive' if num > 0 else 'Negative' # Return 'Positive' If Num Greater Than 0 Else Return 'Negative'
print(is_cond)


########## String Methods #############
str = 'hellow world'

print(len(str)) # 12
print(str.find('o')) # 4
print(str.rfind('o')) # 8
print(str.capitalize()) # Hellow world
print(str.upper()) # HELLOW WORLD
print(str.isdigit()) # False # Check If String Is Numbers Only
print(str.isalpha()) # True # Check If String Is Characters Only

phone_num = '1-345-245-245'
print(phone_num.count('-')) # 3
print(phone_num.replace('-' , ''))


########## Indexing #############
textIndex = "Hellow World"
print(textIndex[0]) # H
print(textIndex[1]) # e
print(textIndex[0:4]) # Hell
print(textIndex[7:]) # World
print(textIndex[-1]) # d
print(textIndex[ -4 : -1]) # orl
print(textIndex[ -4 :]) # orld
print(textIndex[ ::3]) # Hl r    # 3 Here Is Steps



############ Format Specifiers ###############
price1 = 11.2345623
price2 = 12.34
price3 = 10.2

# Fractional
print(f"Price 1: {price1:.2f}") # 11.23
print(f"Price 2: {price2:.2f}") # 12.34
print(f"Price 3: {price3:.2f}") # 10.20

# For Spaces (Complete Number To Be 10 Digits With Spaces)
print(f"Price 1: {price1:10}") # 11.2345623
print(f"Price 2: {price2:10}") #      12.34
print(f"Price 3: {price3:10}") #        10.2


# Instead Of Add Spaces Add Replacement Number Instead
print(f"Price 1: {price1:010}") # 11.2345623
print(f"Price 2: {price2:010}") # 0000012.34
print(f"Price 3: {price3:010}") # 00000010.2

# Add Sign At Front Of Number
x = -10
y = 20

print(f"x : {x:+}") # x : -10
print(f"y : {y:+}") # y : +20


############ While Loop ###############

food = input('What is your favourite food? (q to quit): )')

while not food == 'q':
    print(f'You Like {food}')
    food = input('What is your favourite food?')

print('Bye')


############ For Loop ###############
for x in range(1 , 11):
    print(x) # Print From 1 To 10

# For Loop With Step
for x in range(1 , 11 , 2):
    print(x) # 1 3 5 7 9

############ Continue ############
for x in range(1 , 6):
    if x == 5:
        continue
    else:
        print(x) # 1 2 3 4


# For Loop With Separator
for x in range(1 , 6):
    print(x , end=' ')

print('---------------')

# Nested Loop
for x in range(3):
    print(f'{x} : \n')
    for y in range(1,10):
        print(y, end=' ')