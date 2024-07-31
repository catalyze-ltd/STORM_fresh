import pandas as pd
import dash
from dash import Dash, dcc, html, Input, Output, dash_table
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output, State
from dash.exceptions import PreventUpdate
import folium
import app
import math 
from pages.scenario_details import get_default_parameter_values
import dash_leaflet as dl

#############################################################################
m = folium.Map(location=[64.451589, 10.477454], zoom_start=10, control_scale=True)

#############################################################################









str_input_data_filename = 'src/data/STORM_input_data.xlsx'
str_scenarios_list_sheetname = 'Scenarios list'
str_scenario_entities_sheetname = 'Scenario entities'
str_detection_radius_colhdr = 'Detection radius (km)'


scenarios = pd.read_excel(str_input_data_filename, sheet_name=str_scenarios_list_sheetname)
scenario_entities = pd.read_excel(str_input_data_filename, sheet_name=str_scenario_entities_sheetname)
waypoints = pd.read_excel(str_input_data_filename, sheet_name='Entity waypoints')
platform_sensors = app.input_dfs['Platform Sensors']
sensors_list = app.input_dfs['Sensors list']

# Get waypoint 1 for each entity
first_waypoint = waypoints[waypoints['Waypoint ID'] == 1]

app.scenario_name = []

for index, row in scenario_entities.iterrows():
    # Look up Latitude and Longitude for each entity
    entity_waypoints = waypoints[waypoints['Scenario_Platform_UID'] == row['Scenario_Platform_UID']]
    # Drop all rows except first row of entity_waypoints
    entity_start_location = entity_waypoints.iloc[0]
    
    folium.Marker([entity_start_location['Latitude'], entity_start_location['Longitude']],
                    popup=row['Platform'],
                    # icon=folium.Icon(color=row['Colour'], icon=row['Icon'], prefix='fa')
                    icon=folium.features.CustomIcon('src/assets/' + row['Custom icon'] + '.png', icon_size=(30, 30))
                  ).add_to(m)

    # Get list of sensors fitted to this entity
    entity_sensors = platform_sensors[platform_sensors['Platform'] == row['Platform']]

    # Get detection radius for all this entity's sensors
    entity_sensors = pd.merge(entity_sensors, sensors_list, on='Sensor', how='left')

    # Filter entity_sensors to only the sensor with the maximum range
    if len(entity_sensors) > 0:
        entity_sensors = entity_sensors[entity_sensors[str_detection_radius_colhdr] == max(entity_sensors[str_detection_radius_colhdr])]

        # Get max detection radius for this entity
        max_sensor_range_m = max(entity_sensors[str_detection_radius_colhdr])*1000 # NOTE: Simplfy this line - should be able to use iloc but errored on last approach before freeze for presentation.
    
        # If sensor is a radar, calculate radar horizon
        if entity_sensors['Detection type'].iloc[0] == 'Radar':
            # Look up 'Height (m)' for each entity from Platform list:
            entity_height = app.input_dfs['Platform list'][app.input_dfs['Platform list']['Platform'] == row['Platform']]['Height (m)'].values[0]
            entity_altitude = entity_start_location['Altitude']
            
            earth_radius = 6371e3
            radar_horizon_m = math.sqrt(2*(entity_altitude + entity_height)*(4*earth_radius/3+entity_altitude**2)) # m, using effective earth radius of 4/3 earth radius (from https://en.wikipedia.org/wiki/Radar_horizon)
            max_sensor_range_m = min(radar_horizon_m, max_sensor_range_m)

        # Draw circle around each entity corresponding to sensor range
        folium.Circle(
            location=[entity_start_location['Latitude'], entity_start_location['Longitude']],
            radius=max_sensor_range_m,
            color=row['Colour'],
            fill=False,
            weight=1.5,
            opacity=1,
            popup=max_sensor_range_m/1000
            ).add_to(m)

    # Draw line between waypoints
    folium.PolyLine(entity_waypoints[['Latitude', 'Longitude']].values.tolist(),
                    color=row['Colour'],
                    weight=2.5,
                    opacity=1).add_to(m)

# Calculate map start position and zoom level to encompass all entity waypoints
all_waypoints = waypoints[['Latitude', 'Longitude']].values.tolist() # NOTE: Filter by scenario
m.fit_bounds(all_waypoints)
m.save('map.html')

###############################################################
##################### Create sidebar content
div_load_scenario_sidebar = html.Div([
    html.H3('Setup'),
    # Upload option for if/when we want to allow user to select upload file
    # html.Hr(),
    # html.H4('Input data'),
    # dcc.Upload(
    #     id='upload-data',
    #     children=html.Div([
    #         'Drag and Drop or ',
    #         html.A('Select Files')
    #     ])
    # ),
    html.Hr(),
    html.H4('Scenario list'),
    dcc.Dropdown(
        id='scenario-dropdown',
        options=[{'label': i, 'value': i} for i in scenarios['Scenario'].unique()],
        # value='1 CIC 1 LAP'
    ),
    dbc.Row([
        dbc.Col(html.Button('Load scenario', id='load-scenario-button'), width=4),
    ]),
    html.Hr(),
    html.H4('ORBAT'),
    # Load all rows from Scenario table
    html.Div(id = 'ORBAT-container',children=[
        dash_table.DataTable(
            columns=[{'name': 'Platform', 'id': 'Platform'},{'name': 'Colour', 'id': 'Colour'}],
            data=[{}],
            id='scenario-entities-table',
            )
            ]),
    
    html.Hr(),
    html.H4('Platform details'),
    dcc.Dropdown(
        id='platform-dropdown',
        # Load scenario entities from Scenario table
        # options=[{'label': i, 'value': i} for i in app.input_dfs[str_scenario_entities_sheetname]['Scenario_Platform_UID'].unique()],
        options=[{'label': i, 'value': i} for i in app.input_dfs[str_scenario_entities_sheetname]['Platform'].unique()],
    ),
    # Create a div containing a table to show platform details as the child of the div
    # NOTE: This is not working. The table does not update when the dropdown value is changed.
    html.Div(id='platform-details-table-container', children=[
        dash_table.DataTable(
            id='platform-details-table',
            style_header={'display': 'none'},
            ),
        ]),
])

###############################################################
##################### Create main content

div_load_scenario_map = html.Div([
    html.Iframe(id='map', srcDoc=open('map.html', 'r').read(), width='100%', height=800)
])

###############################################################
##################### Create callbacks

@dash.callback(
    Output('platform-details-table', 'data'),
    [Input('platform-dropdown', 'value')],
    [State('platforms-data-store', 'data')]
)
def update_platform_details_table(platform, platformDataStore):
    if platform == None:
        raise PreventUpdate
    else:
        platformTable = pd.DataFrame(platformDataStore)
        mask = platformTable['Platform'] == platform
        rowNames = platformTable.columns
        thisPlatform = platformTable[mask].values
        platformData = pd.DataFrame(zip(rowNames,thisPlatform[0]))
        # Remove first row (UID) for display (since it's by craft type, not by entity)
        return platformData.iloc[1:].to_dict('records')

# Populate entities dropdown and update current scenario
@dash.callback(
    [Output('scenario-entities-data','data'),
    Output('current-scenario-store','data')],
    Input('load-scenario-button', 'n_clicks'),
    State('scenario-dropdown', 'value'),
)
def updateEntityData(n_clicks, scenario_selection):
    if n_clicks is None:
        raise PreventUpdate
    else:
        entity_data = app.input_dfs[str_scenario_entities_sheetname][app.input_dfs[str_scenario_entities_sheetname]['Scenario']==scenario_selection]
        app.current_scenario = app.input_dfs[str_scenarios_list_sheetname][app.input_dfs[str_scenarios_list_sheetname]['Scenario']==scenario_selection]
        app.scenario_name = app.current_scenario['Scenario'].values[0] # Global variable
        app.TIMESTEP_MINUTES = app.current_scenario['Simulation timestep (minutes)'].values[0] # Global variable. To remove global we need to pass it in to destination()
        app.defaults = get_default_parameter_values() # Global variable
        return [entity_data.to_dict('records'),app.current_scenario.to_dict('records')]

@dash.callback(
    [Output('scenario-entities-table', 'data'),
    Output('scenario-entities-table', 'columns')],
    Input('scenario-entities-data', 'data'),
)
def update_scenario_entities_table(data_in):
    if data_in is None:
        raise PreventUpdate
    else:
        fromStore = pd.DataFrame(data_in)
        cols=[{"name": str(i), "id": str(i)} for i in fromStore.columns[1:3]]
        # Get the used column names and convert to dict
        usedNames = fromStore.columns[1:3]
        fromStoreFiltered = fromStore[usedNames].to_dict('records')
        return [fromStoreFiltered, cols]

# Populate platform dropdown
@dash.callback(
    Output('platform-dropdown', 'options'),
    Input('scenario-entities-data', 'data'),
    State('scenario-dropdown', 'value'),
)
def updatePlatformDropdown(data_in, current_scenario):
    if data_in is None:
        raise PreventUpdate
    else:
        fromStore = pd.DataFrame(data_in)
        fromStoreFiltered = fromStore[fromStore['Scenario']==current_scenario]
        # Add current scenario name to global variable
        app.current_scenario = current_scenario
        return [{'label': i, 'value': i} for i in fromStoreFiltered['Platform'].unique()]
