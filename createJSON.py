import json

data = {}
data['ladyStoneHeart'] = ["Bossypants", "Is Everyone Hanging Out Without Me", "Yes Please"]
data['blackfish'] = ["Ready Player One", "Armada", "Artemis"]
data['queenOfThorns'] = ["I Am America", "Born A Crime", "The Last Black Unicorn"]
data['kingSlayer'] = ["To Siri With Love", "The Lost City Of The Monkey God", "World Without Mind"]

json_data = json.dumps(data)
print(json_data)
with open('./recommendations.json', 'w') as outfile:
    outfile.write('recommendations = ')
    json.dump(json_data, outfile)
