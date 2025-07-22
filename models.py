from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class GameState(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.Integer, default=0)
    funds = db.Column(db.Integer, default=500000)
    reputation = db.Column(db.Integer, default=50)

class Soldier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    rank = db.Column(db.String(50))
    spec = db.Column(db.String(50))
    skill = db.Column(db.Integer, default=50)

class Mission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    risk = db.Column(db.Integer)
    reward = db.Column(db.Integer)

class Economy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    funds = db.Column(db.Integer)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    description = db.Column(db.String(200))

class GameEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))

class Reputation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer)

class Region(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    stability = db.Column(db.Integer)
