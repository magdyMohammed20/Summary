# dictionary : Collection Of {key : value} Pairs Ordered And Changeable . No Duplicates

capitals = {
    "Egypt" : "Cairo",
    "Ksa" : "Riyad",
    "Russia" : "Moscow"
}

print(dir(capitals))
help(capitals)
print(capitals.get('Russia'))


# Update / Insert New Value
capitals.update({"India" : "New Delhi" , "Ksa" :"Mecca"})
print(capitals) # {'Egypt': 'Cairo', 'Ksa': 'Mecca', 'Russia': 'Moscow', 'India': 'New Delhi'}

# Remove Specific Item
capitals.pop("India")
print(capitals) # {'Egypt': 'Cairo', 'Ksa': 'Mecca', 'Russia': 'Moscow'}

# Remove Item From End Of Dictionary
capitals.popitem()
print(capitals) # {'Egypt': 'Cairo', 'Ksa': 'Mecca'}

# Get Keys Of Dictionary
print(capitals.keys()) # dict_keys(['Egypt', 'Ksa'])

# Get Values Of Dictionary
print(capitals.values()) # dict_values(['Cairo', 'Mecca'])

# Loop Through Items Of Dictionary
for key , value in capitals.items():
    print(key, value)

# Clear Dictionary
capitals.clear()
print(capitals)  # {}


