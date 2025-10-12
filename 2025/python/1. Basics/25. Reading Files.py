############## Read From Text File ############
try:
    with open("text.txt" , "r") as file:
        txt = file.read()
        print(txt)
except FileNotFoundError:
    print("File Not Exists")

except PermissionError:
    print("You don't have permission")

############## Read From JSON File ############
import json

try:
    with open("emps.json" , "r") as file:
        content = json.load(file)
        print(content)
except FileNotFoundError:
    print("File Not Exists")

except PermissionError:
    print("You don't have permission")


############## Read From CSV File ############
import csv

try:
    with open("emps1.csv" , "r") as file:
        content = csv.reader(file)

        for row in content:
            print(row)
except FileNotFoundError:
    print("File Not Exists")

except PermissionError:
    print("You don't have permission")