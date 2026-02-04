# Function : Block Of Reusable Code

def sayHellow():
    print("Hello")

sayHellow()

##### Parameters #####
def sayHellowWithName(name):
    print(f"Hellow {name}")

sayHellowWithName('Magdy')


#####  Return Statement #####
def sum(a , b):
    return a + b

print(sum(3, 4))


##### Default Arguments #####
def net_price(price , discount = 0 , tax = 0.01):
    return price * (1 - discount ) * (1+ tax)

print(net_price(100))


##### Keyword Arguments #####
def greeting(greeting , title , first , last):
    return f"{greeting} {title}{first} {last}"

# Here Params Passed With It's Name
makeGreeting = greeting(greeting = 'Hi' , title = 'Mr.' , first = 'Magdy' , last = 'Mohammed')

print(makeGreeting)


######### *args #########
# Allow To Pass Multiple Non Key Arguments
def sumArgs(*nums):
    sum = 0
    for arg in nums:
        sum+= arg
    return sum

print(sumArgs(1,2,3,4,5,6)) # 21

######### **kwargs #########
# Allow To Pass Multiple Key Arguments
def listData(**kwargs):
    for key , value in kwargs.items():
        print(f"{key} : {value}")


listData(city = 'Qalubia' , street="Saada 11" )