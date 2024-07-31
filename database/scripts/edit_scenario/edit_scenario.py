import folium
import json
import dash_leaflet as dl
from dash import html

markers = json.load(open("database/temp/editScenarioMarkers.json"))
polylines = json.load(open("database/temp/editScenarioPolylines.json"))

for i in polylines:
    polyline = dl.Polyline(positions=i["positions"], colour=i["colour"], weight=i["weight"], opacity=i["opacity"])

for i in markers:
    marker = dl.Marker(position=i["position"], colour=i["colour"], children=dl.Tooltip(i["platform_uid"]), icon=i["icon"])

div_edit_scenario_map = html.Div([
    dl.Map([dl.TileLayer(),
            dl.LayerGroup(id="layer")],
            id="dl-map", 
            style={'width': '100%', 'height': '85vh', 'margin': "auto", "display": "block"},
    ),
])