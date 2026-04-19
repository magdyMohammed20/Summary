# @property : Decorator Used To Define A Method As Property
#             Benefits : Add Additional Logic When Read,Write, Or Delete Attributes
#             Gives You Getter , Setter And Deleter Method

class Rectangle:
    def __init__(self, width, height):
        # Usage Of _ Here To Make Properties Private
        self._width = width
        self._height = height

    ########## Define Getters ################
    ######### Define Property Here To Enable Access The Private Properties Outside The Class
    @property
    def width(self):
        return self._width

    @property
    def height(self):
        return self._height

    #####################################################

    ###### Define Setters ############
    @width.setter
    def width(self , new_width):
        if(new_width > 0):
            self._width = new_width
        else:
            print("width too small")

    @height.setter
    def height(self , new_height):
        if(new_height > 0):
            self._height = new_height
        else:
            print("height too small")
    ########################################################



    ###### Define Deleter ############
    @width.deleter
    def width(self):
        del self._width

    @height.deleter
    def height(self):
        del self._height

rect = Rectangle(150, 100)

#### Access @property #########
print(rect.width) # 150
print(rect.height) # 100

#### Setters ###########
rect.width = 200
rect.height = 110
print(rect.width) # 200
print(rect.height) # 110

##### Delete Property ###########
del rect.width
del rect.height
print(rect.width) # 'Rectangle' object has no attribute '_width'. Did you mean: 'width'?
print(rect.height) # 'Rectangle' object has no attribute '_height'. Did you mean: 'height'?