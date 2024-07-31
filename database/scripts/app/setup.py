import folium
import json
import os

map_html = 'map.html'
map_deep_dive = 'map_deep_dive.html'
moes_html = 'moes/html'

# Create required map file if it doesn't exist
if os.path.isfile(map_html):
    os.remove(map_html)

# Create map.html file as empty file
f = open(map_html, 'w', encoding='utf-8')
f.write('''<!DOCTYPE html>
<html>
</html>
''')
f.close()

# Create required map_deep_dive file if it doesn't exist
if os.path.isfile(map_deep_dive):
    os.remove(map_deep_dive)

# Create map.html file as empty file
f = open(map_deep_dive, 'w', encoding='utf-8')
f.write('''<!DOCTYPE html>
<html>
</html>
''')
f.close()

markers = json.load(open("database/temp/markers.json"))
circles = json.load(open("database/temp/circles.json"))
polylines = json.load(open("database/temp/polylines.json"))
misc = json.load(open("database/temp/misc.json"))

m = folium.Map(location=[64.451589, 10.477454], zoom_start=10, control_scale=True)

for marker in markers:
    folium.Marker([marker['Latitude'], marker['Longitude']],
                    popup=marker['popup'],
                    icon=folium.features.CustomIcon(marker['icon'], icon_size=(30, 30))
                  ).add_to(m)

for circle in circles:
    folium.Circle(
        location = circle["location"],
        radius = circle["radius"],
        color = circle["colour"],
        fill = False,
        weight = 1.5,
        opacity = 1,
        popup = circle["popup"]
    ).add_to(m)

for polyline in polylines:
    folium.PolyLine(polyline['location'],
                    color = polyline['colour'],
                    weight=2.5,
                    opacity=1).add_to(m)
    
m.fit_bounds(misc['allWaypoints'])
m.save('map.html')

## Pass the map.html data to "OverviewMap.tsx"