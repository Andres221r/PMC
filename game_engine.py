from personnel import PersonnelSystem
from missions import MissionSystem
from economy import EconomySystem
from reputation import ReputationSystem
from regions import RegionSystem

class GameEngine:
    def __init__(self):
        self.day = 0
        self.personnel = PersonnelSystem()
        self.missions = MissionSystem()
        self.economy = EconomySystem()
        self.reputation = ReputationSystem()
        self.regions = RegionSystem()

    def new_game(self):
        self.day = 0
        self.economy.set_funds(500000)
        self.reputation.value = 50
        self.personnel.clear()
        self.missions.clear()

    def advance_day(self):
        self.day += 1
        self.missions.progress()

