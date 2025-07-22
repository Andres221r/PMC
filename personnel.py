from dataclasses import dataclass, field
from typing import List

@dataclass
class Soldier:
    id: int
    name: str
    spec: str
    rank: str = 'Recluta'
    skill: int = 50

class PersonnelSystem:
    def __init__(self):
        self.soldiers: List[Soldier] = []
        self._next_id = 1

    def clear(self):
        self.soldiers.clear()
        self._next_id = 1

    def hire(self, name: str, spec: str) -> Soldier:
        soldier = Soldier(id=self._next_id, name=name, spec=spec)
        self._next_id += 1
        self.soldiers.append(soldier)
        return soldier
