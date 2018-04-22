import json
bookList = ["Bossypants", "Paddle Your Own Canoe", "Yes Please"]
data = {}
data['user1'] = bookList

json_data = json.dumps(data)
print(json_data)
with open('./recommendations.json', 'w') as outfile:
    outfile.write('recommendations = ')
    json.dump(json_data, outfile)
