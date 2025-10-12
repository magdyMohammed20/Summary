
import os

file_path = "text.txt"

########## Check File Exist ##############
if os.path.exists(file_path):
    print("File exists")

else:
    print("File does not exist")
##########################################

########### Check Is File #########

if os.path.isfile(file_path):
    print("Yes File")

else:
    print("Is Directory")

####################################


########### Check Is Directory #########
directory = "Test"

if os.path.isdir(directory):
    print("Is Directory")
else:
    print("Is File")
########################################