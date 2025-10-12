# Match Case Statement : Alternative Way To Using many 'elif' statements
from unittest import case

######### EX #########
def day_of_weeks(day):
    match day:
        case 1:
            return "Sat"
        case 2:
            return "Sun"
        case 3:
            return "Mon"
        case 4:
            return "Tue"
        case 5:
            return "Wed"
        case 6:
            return "Thu"
        case 7:
            return "Fri"
        case _:
            return "Invalid Day"

print(day_of_weeks(5))
print(day_of_weeks(''))


########### Multiple Case Value ###########

def is_weekend(day):
    match day:
        case "Sat" | "Fri":
            return True
        case "Sun" | "Mon" | "Tue" | "Wed" | "Thu":
            return False
        case _:
            return "Invalid Day"

print(is_weekend('Sat'))
print(is_weekend('Wed'))
print(is_weekend(''))