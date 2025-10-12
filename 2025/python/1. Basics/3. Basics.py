# Collection
"""
    # list = [] : Ordered & Changeable. Duplicates OK
    # Set = {} : UnOrdered & immutable. But Add/Remove OK, No Duplicates
    # Tuple = () : Ordered & UnChangeable. Duplicates OK. FASTER

"""

############### list ###############

list = ["Banana" , 'Apple' , 'Coconut']


# Methods That Can Apply On The List
print(dir(list))

# To Give The Something Like Document For Methods That Can Used With The List
print(help(list))

# Length Of List
print(len(list)) # 3

# Find
print ('Apple' in list) # True

# Override Specific Value
list[0] = 'Pinnable'
print(list)

# Append / Push
list.append('Banana')
print(list)

# Remove / Pop
list.remove('Pinnable')
print(list)

# Push In Specific Index
list.insert(2 , 'Pinnable')
print(list)

# sort
list.sort()
print(list)

# reverse
list.reverse()
print(list)

# Get Index
print(list.index('Pinnable'))

# count : For Count Number Of Occurences Of Specific Element
print(list.count('Pinnable'))


# clear
list.clear()
print(list)



################ Set ###################

set = {"Banana" , 'Apple' , 'Coconut' , 'Coconut'}

print(dir(set))

# Length Of set
print(len(set)) # 3

# Find
print ('Apple' in set) # True

# Push
set.add('Rice')
print(set)

# Remove
set.remove('Coconut')
print(set)

# Pop
set.pop()
print(set)

# clear
set.clear()
print(set)




################ Tuple ###################
tuple = ("Apple" , 'Coconut' , 'Banana' , 'Coconut')

# Methods That Can Apply On The tuple
print(dir(tuple))

# Length Of tuple
print(len(tuple)) # 3

# Find
print ('Apple1' in tuple) # False

# Count
print (tuple.count('Coconut')) # 2

# Index
print (tuple.index('Coconut')) # 1