from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests, if your frontend is served on a different port

# Sample in-memory "database" for medications (can be replaced with actual DB like SQLite, MongoDB, etc.)
medications_db = []

# Route to add a medication
@app.route('/add_medication', methods=['POST'])
def add_medication():
    # Parse the incoming JSON request
    try:
        data = request.get_json()
        name = data.get('name')
        dosage = data.get('dosage')
        time = data.get('time')

        if not name or not dosage or not time:
            return jsonify({"status": "error", "message": "All fields (name, dosage, time) are required"}), 400

        # Add the medication to our "database"
        medication = {"name": name, "dosage": dosage, "time": time, "taken": False}
        medications_db.append(medication)

        # Return a success response
        return jsonify({"status": "success", "message": "Medication added successfully", "medication": medication}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# Route to get all medications
@app.route('/get_medications', methods=['GET'])
def get_medications():
    return jsonify({"status": "success", "medications": medications_db}), 200


# Route to toggle medication as taken
def toggle_medication():
    try:
        data = request.get_json()
        index = data.get('index')

        if index is None or index < 0 or index >= len(medications_db):
            return jsonify({"status": "error", "message": "Invalid medication index"}), 400

        medication = medications_db[index]
        
        # Toggle the 'taken' status and log the time it was taken
        medication["taken"] = not medication["taken"]
        
        if medication["taken"]:
            medication["taken_dates"].append(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        
        return jsonify({
            "status": "success",
            "message": "Medication status updated",
            "medication": medication
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# Route to remove a medication
@app.route('/remove_medication', methods=['POST'])
def remove_medication():
    try:
        data = request.get_json()
        index = data.get('index')

        if index is None or index < 0 or index >= len(medications_db):
            return jsonify({"status": "error", "message": "Invalid medication index"}), 400

        # Remove the medication
        medication = medications_db.pop(index)
        return jsonify({"status": "success", "message": "Medication removed", "medication": medication}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
