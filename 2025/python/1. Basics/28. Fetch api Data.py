
# Install requests lib By Run : pip install requests
import requests

base_url = "https://pokeapi.co/api/v2"

def get_poke_info(name):
    url = f"{base_url}/pokemon/{name}"

    response = requests.get(url)

    if response.status_code == 200:
        return response.json()

    else:
        return f"Error In Fetching {response.status_code}"


poke = get_poke_info("ditto")

if poke:
    print(poke["id"])
    print(poke["name"])
    print(poke["height"])
    print(poke["weight"])