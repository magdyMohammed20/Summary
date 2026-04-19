# magic Methods : Dunder Methods (Double Underscore) __init__ , __str__ , __eq__
#                 They Are Automatically Called By Many Of Python Built In Operations
#                 They Allow Developers To Define Or Customize The Behavior Of Objects


class Book:

    def __init__(self, title , author , num_of_pages):
        self.title = title
        self.author = author
        self.num_of_pages = num_of_pages

    # Return String Representation For The Object
    def __str__(self):
        return f"Book Is {self.title} by {self.author} With {self.num_of_pages} Pages"

    # Used In Comparing Objects (Equal)
    def __eq__(self, other):
        return self.title == other.title and self.author == other.author

    # Used In Comparing Objects (Less Than)
    def __lt__(self, other):
        return self.num_of_pages < other.num_of_pages

    # Used In Comparing Objects (Greater Than)
    def __gt__(self, other):
        return self.num_of_pages > other.num_of_pages

    # Used In Add Objects
    def __add__(self, other):
        return self.num_of_pages + other.num_of_pages

    # Used In Search In Objects
    def __contains__(self, keyword):
        return keyword in self.title or keyword in self.author

    # Used In Allow Access Object Properties
    def __getitem__(self, key):
        if key == 'title':
            return self.title
        elif key == 'author':
            return self.author
        elif key == 'num_of_pages':
            return self.num_of_pages

############ Usage Of __str__ ############
book1 = Book("Harry Booter" , "John" , 10)
# As We Define __str__ In The Class It Produce The Sentence Here Instead If Produce The Address Of Object In The Memory
print(book1) # Book Is Harry Booter by John With 10 Pages

############# Usage Of __eq__ #############
book2 = Book("Harry Booter" , "John" , 20)
book3 = Book("Harry Booter" , "John" , 20)
book4 = Book("Harry Booter2" , "John" , 20)
print(book2 == book3) # True
print(book3 == book4) # False


############# Usage Of __lt__ #############
book5 = Book("Harry Booter" , "John" , 20)
book6 = Book("Harry Booter" , "John" , 22)
book7 = Book("Harry Booter" , "John" , 24)
print(book5 < book6) # True
print(book7 < book6) # False


############# Usage Of __gt__ #############
book8 = Book("Harry Booter" , "John" , 20)
book9 = Book("Harry Booter" , "John" , 22)
book10 = Book("Harry Booter" , "John" , 24)
print(book9 > book8) # True
print(book8 > book10) # False


############# Usage Of __add__ #############
book10 = Book("Harry Booter" , "John" , 20)
book11 = Book("Harry Booter" , "John" , 22)
print(book10 + book11) # 42


############# Usage Of __contains__ #############
book12 = Book("Harry Booter" , "John" , 20)
print("Lion" in book12) # False
print("Harry" in book12) # True


############# Usage Of __getitem__ #############
book13 = Book("Harry Booter1" , "John1" , 20)
print(book13['title']) # Harry Booter1
print(book13['title1']) # None
print(book13['author']) # John1