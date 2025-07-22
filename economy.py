class EconomySystem:
    def __init__(self):
        self.funds = 0
        self.history = []

    def set_funds(self, amount: int):
        self.funds = amount
        self.history.append(('init', amount))

    def spend(self, amount: int, description: str = ''):
        self.funds -= amount
        self.history.append(('spend', amount, description))

    def earn(self, amount: int, description: str = ''):
        self.funds += amount
        self.history.append(('earn', amount, description))
