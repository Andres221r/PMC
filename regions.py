class RegionSystem:
    def __init__(self):
        self.regions = ['América', 'Europa', 'África', 'Asia', 'Oceanía']
        self.presence = {r: 0 for r in self.regions}
