import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

from models import db, GameState, Soldier, Mission
from game_engine import GameEngine

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pmc.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
engine = GameEngine()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/game/new', methods=['POST'])
def api_new_game():
    engine.new_game()
    return jsonify({'status': 'ok'})

@app.route('/api/personnel/hire', methods=['POST'])
def api_hire():
    data = request.json
    name = data.get('name')
    spec = data.get('spec')
    soldier = engine.personnel.hire(name, spec)
    return jsonify({'id': soldier.id, 'name': soldier.name})

@app.route('/api/missions/accept', methods=['POST'])
def api_accept_mission():
    data = request.json
    mission_id = data.get('mission_id')
    result = engine.missions.accept(mission_id)
    return jsonify(result)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
