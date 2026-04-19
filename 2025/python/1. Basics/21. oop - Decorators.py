# Decorator : Function That Extends The Behavior Of Another Function

##### Define Decorator ##########
def add_choclate(func):
    def wrapper(*args, **kwargs):
        print("You Add Choclate")
        func(*args, **kwargs)

    return wrapper

##### Define Decorator ##########
def add_sprinkles(func):
    def wrapper(*args, **kwargs):
        print("You Add Sprinkles")
        func(*args, **kwargs)
    return wrapper

##### Usage Of Decorator ##########
@add_choclate
@add_sprinkles
def get_ice_cream(flavor):
    print(f'You Got {flavor} Ice Cream')

get_ice_cream('Vanilla') # You Add Choclate
                         # You Add Sprinkles
                         # You Got Vanilla Ice Cream