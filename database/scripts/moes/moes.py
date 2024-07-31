import json
import os
from dash import dcc, html
import dash_bootstrap_components as dbc
import plotly.express as px
import pandas as pd

moes_html = 'moes.html'

# Create required moes_html file if it doesn't exist
if os.path.isfile(moes_html):
    os.remove(moes_html)

# Create moes.html file as empty file
f = open(moes_html, 'w', encoding='utf-8')
f.write('''<!DOCTYPE html>
<html>
</html>
''')
f.close()

moes = json.load(open("database/JSON_Data/MOEs.json"))

UID, Run_ID, MOE1, MOE2, MOE3 = []
for i in moes:
    UID.append(i["UID"])
    Run_ID.append(i["Run ID"])
    MOE1.append(i["MOE 1"])
    MOE2.append(i["MOE 2"])
    MOE3.append(i["MOE 3"])
moesDf = pd.DataFrame(data={"UID":UID, "Run ID":Run_ID, "MOE 1":MOE1, "MOE 2":MOE2, "MOE 3": MOE3})

moe_definitions = ['Probability of unloading [100%/80%/60%/40%/20%] troops/assets with no loss',
                    'Probability of individual LCs arriving at beach undetected. If 4 LCs are launched, and 3 are detected, then MOE 2 = 25%',
                    'Probability of survival of LC for a user-defined number of hours after Phase 1, in specified areas near unloading location',
                    'Average time troops spent at sea before landing to inform on troop condition at landing']


div_batch_run_main = html.Div([
    dbc.Row([
        dbc.Col([
            dcc.Graph(id='bar-chart-1',
                figure=px.bar(moesDf, x='Run ID', y='MOE 1'),
            ),
        ], width=5),
        dbc.Col([
            dcc.Graph(id='bar-chart-2',
                figure=px.bar(moesDf, x='Run ID', y='MOE 2')
            ),
        ], width=5),
    ]),
    dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H5(id = 'MOE1-title', children = "MOE 1", className="card-title"),
                ])
            ], color="secondary", inverse=True),
        ], width=5),
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H5(id = 'MOE2-title', children = "MOE 2", className="card-title"),
                ])
            ], color="secondary", inverse=True),
        ], width=5),
    ]),
    dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H5("Successful deployment of people/assets", className="card-text"),
                    html.P(moe_definitions[0], className="card-text"),
                ])
            ], color="secondary", inverse=True),
        ], width=5),
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H5("Deploy undetected", className="card-text"),
                    html.P(moe_definitions[1], className="card-text"),
                ])
            ], color="secondary", inverse=True),
        ], width=5),
    ]),
    dbc.Row([
        dbc.Col([
            dcc.Graph(id='bar-chart-3',
                figure=px.bar(moesDf, x='Run ID', y='MOE 3')
            ),
        ], width=5),
        dbc.Col([
            dcc.Graph(id='bar-chart-4',
                figure=px.bar(moesDf, x='Run ID', y='MOE 4')
            ),
        ], width=5),
    ]),
    dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H5(id = 'MOE3-title', children  = "MOE 3", className="card-title"),  
                ])
            ], color="secondary", inverse=True),
        ], width=5),
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H5(id = 'MOE4-title', children  = "MOE 4", className="card-title"),
                ])
            ], color="secondary", inverse=True),
        ], width=5),
    ]),
    dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H5("Landing craft survival post-deployment", className="card-text"),
                    html.P(moe_definitions[2], className="card-text"),
                ])
            ], color="secondary", inverse=True),
        ], width=5),
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H5("Average time at sea", className="card-text"),
                    html.P(moe_definitions[3], className="card-text"),
                ])
            ], color="secondary", inverse=True),
        ], width=5),
    ]),
])

with open("moes.html", "w") as file:
    file.write(div_batch_run_main)