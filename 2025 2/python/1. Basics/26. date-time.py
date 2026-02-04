import datetime

# Set Date
date = datetime.date(2021, 12, 31)
print(date) # 2021-12-31

# Get Current Date
current = datetime.date.today()
print(current) # 2025-10-07

# Set Time
time = datetime.time(23, 59, 59)
print(time) # 23:59:59

# Get Current Date And Time
currentDateTime = datetime.datetime.now()
print(currentDateTime) # 2025-10-07 12:31:46.256335

# Get Current Time
currentTime = datetime.datetime.now().time()
print(currentTime) # 12:30:53.948752


# Format Date
currentDateTime2 = datetime.datetime.now()
print(currentDateTime2.strftime("%H:%M:%S %m/%d/%Y")) # 12:35:52 10/07/2025