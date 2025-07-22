from game_engine import GameEngine

def main():
    engine = GameEngine()
    engine.new_game()
    print('Nueva partida creada. Fondos iniciales:', engine.economy.funds)
    while True:
        cmd = input('(n)ueva mision, (h)ire, (a)vanzar dia, (q)uit: ')
        if cmd == 'q':
            break
        elif cmd == 'h':
            name = input('Nombre del soldado: ')
            spec = input('Especialidad: ')
            s = engine.personnel.hire(name, spec)
            print('Contratado', s.name)
        elif cmd == 'n':
            m = engine.missions.generate()
            print('Mision generada', m.name, 'riesgo', m.risk)
        elif cmd == 'a':
            engine.advance_day()
            print('Dia actual', engine.day)

if __name__ == '__main__':
    main()
