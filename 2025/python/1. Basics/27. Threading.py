# Multithreading : Used To Perform Multiple Tasks Concurrently (multitasking)
#                  Good For I/O Bound Tasks Like Reading Files Or Fetching Data From APIs
#                  threading.Thread(target=my_function)

import time
import threading

def walking_dog():
    time.sleep(8)
    print("You Walking Dog")
    
def take_out_trash():
    time.sleep(2)
    print("You Take Out The Trash")
    
def get_email():
    time.sleep(4)
    print("You Get Email")

# Last One In Execute
th1 = threading.Thread(target=walking_dog)
th1.start()

# First One In Execute
th2 = threading.Thread(target=take_out_trash)
th2.start()

# Second One In Execute
th3 = threading.Thread(target=get_email)
th3.start()


########### Joing #################
th1.join()
th2.join()
th3.join()

# This Print Will Wait All Joins To Executed Then Will Printed
print("Wait The Previous")
########################################################################


############## Sending Args To The Function In Thread ##################
def walking_cat(name):
    time.sleep(15)
    print(f"You Walking {name}")
    
    
th4 = threading.Thread(target=walking_cat , args=("Caty",))
th4.start()

########################################################################
