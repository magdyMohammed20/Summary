# Membership Operators (in / not in) : Used To Test Whether A Value Or Variable Founded In a Sequence (string - list - tuple - set - dictionary)

######## in ########
word = "Apple"
letter = input("Enter a letter: ")

if letter.lower() in word.lower():
    print("Founded")
else:
    print("Not found")

######## not in ########

word2 = "Banana"
letter = input("Enter a letter: ")

if letter.lower() not in word2.lower():
    print("Not found")
else:
    print("Founded")