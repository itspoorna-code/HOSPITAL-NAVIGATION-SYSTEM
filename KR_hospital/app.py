import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import folium
from folium import plugins
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for communication with Angular frontend

BASE_PATH = "krgeo_resourses"

def get_paths(department, point):
    geojson_path = os.path.join(BASE_PATH, f"{department}.geojson")
    testGeoJson = os.path.join(BASE_PATH, f"path_from_point{point}", f"from_point{point}_{department}.geojson")
    return geojson_path, testGeoJson

def switchPosition(coordinate):
    temp = coordinate[0]
    coordinate[0] = coordinate[1]
    coordinate[1] = temp
    return coordinate

def calculate_centroid(coordinates):
    lat = sum(coord[1] for coord in coordinates) / len(coordinates)
    lon = sum(coord[0] for coord in coordinates) / len(coordinates)
    return [lat, lon]

@app.route('/')
def index():
    # Dynamically fetch available departments
    excluded_files = {"moni.geojson", "Entry_point1_irwinroad.geojson", "Entry_point2_sayagiroad.geojson"}
    geojson_files = [
        file.replace('.geojson', '')
        for file in os.listdir(BASE_PATH)
        if file.endswith('.geojson') and file not in excluded_files
    ]
    return jsonify(geojson_files)  # Ensure this returns a JSON array

@app.route('/generate_map', methods=['POST'])
def generate_map():
    """Generate a map based on the selected department and entry point."""
    data = request.json
    point = data.get('point')
    department = data.get('department')

    if not point or not department:
        return jsonify({"status": "error", "message": "Missing point or department."}), 400

    geojson_path, testGeoJson = get_paths(department, point)

    if not os.path.exists(geojson_path):
        return jsonify({"status": "error", "message": f"Department file '{geojson_path}' not found."}), 404

    if not os.path.exists(testGeoJson):
        return jsonify({"status": "error", "message": f"Path file '{testGeoJson}' not found."}), 404

    # Initialize the map
    map_UMM = folium.Map(location=[12.313092, 76.649574], width="100%", height="100%", zoom_start=18)

    # Add GeoJSON polygon to the map
    with open(geojson_path) as f:
        geojson_data = json.load(f)

    for feature in geojson_data['features']:
        folium.GeoJson(feature, name="Department Area").add_to(map_UMM)

        # Calculate centroid and add marker
        coordinates = feature['geometry']['coordinates'][0]
        centroid = calculate_centroid(coordinates)

        folium.Marker(
            location=centroid,
            popup=f"<b>{department.capitalize()} Department</b>",
            icon=folium.Icon(color="blue", icon="info-sign")
        ).add_to(map_UMM)

    # Process the path GeoJSON
    with open(testGeoJson) as f:
        testWay = json.load(f)

    finalPath = [
        switchPosition(coord)
        for feature in testWay['features']
        for coord in feature['geometry']['coordinates']
    ]

    # Add the path to the map
    plugins.AntPath(finalPath).add_to(map_UMM)

    # Save map to HTML
    map_file = 'templates/map.html'
    map_UMM.save(map_file)

    return jsonify({"status": "success", "map_url": "/map"})

@app.route('/map')
def map_view():
    """Serve the generated map."""
    with open('templates/map.html') as f:
        return f.read()

if __name__ == '__main__':
    app.run(debug=True)
