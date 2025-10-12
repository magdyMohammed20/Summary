####### Writing In File ############
userInput = input("Write something: ")

file = "output.txt"

# Mode Can Be "w" , "r" , "x" Or "a"
# x : Mean File Not Exist So Python Will Create It
# w : Write
# r : Read
# a : Append
with open(file , "w") as file:
    file.write(userInput)
    print("Written")


############## Handle File Exist Error ############
try:
    with open("Text1.txt" , "x") as file:
        file.write("Test Me")
        print("Written")
except FileExistsError:
    print("File Exists")


############## Append Content To File ############
try:
    with open("Text1.txt" , "a") as file:
        file.write("Test Me")
        print("Written")
except FileExistsError:
    print("File Exists")



############## Write On File ############
try:
    with open("Text1.txt" , "w") as file:
        file.write("Test Me1111111")
        print("Written")
except FileExistsError:
    print("File Exists")


############## Write JSON On File ############
import json
emps = {
    "name" : "magdy",
    "position" : "Front End Dev"
}

try:
    with open("emps.json", "w") as file:
        json.dump(emps, file , indent=4)
        print("Written")

except FileExistsError:
    print("File Exists")


############## Write CSV On File ############
import csv
emps1 = [
    ["name", "position"],
    ["Magdy", "Front"],
    ["Ahmed", "Back"]
]

try:
    with open("emps1.csv", "w" , newline="") as file:
        writer = csv.writer(file)

        for row in emps1:
            writer.writerow(row)

        print("Written CSV")
except FileExistsError:
    print("File Exists")