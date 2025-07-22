from dataclasses import dataclass
from typing import List
import random

@dataclass
class Mission:
    id: int
    name: str
    risk: int
    reward: int
    days: int

class MissionSystem:
    def __init__(self):
        self.available: List[Mission] = []
        self.active: List[Mission] = []
        self._next_id = 1

    def clear(self):
        self.available.clear()
        self.active.clear()
        self._next_id = 1

    def generate(self) -> Mission:
        m = Mission(
            id=self._next_id,
            name=f"Mision {self._next_id}",
            risk=random.randint(10, 90),
            reward=1000,
            days=random.randint(1, 3),
        )
        self._next_id += 1
        self.available.append(m)
        return m

    def accept(self, mission_id: int):
        mission = next((m for m in self.available if m.id == mission_id), None)
        if not mission:
            return {'error': 'not found'}
        self.available.remove(mission)
        self.active.append(mission)
        return {'accepted': mission.id}

    def progress(self):
        finished = []
        for m in self.active:
            m.days -= 1
            if m.days <= 0:
                finished.append(m)
        for m in finished:
            self.active.remove(m)
