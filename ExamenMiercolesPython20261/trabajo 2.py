usuarios_servicio = []


def crear_usuarios():
    for i in range(10):
        print("\nUsuario", i + 1)

        id_usuario = int(input("ID: "))
        nombre = input("Nombre: ")
        documento = int(input("Documento: "))
        estrato = int(input("Estrato (1-6): "))


        consumoEnergetico = []
        print("Ingrese 30 consumos en KWH:")
        for j in range(30):
            consumo = float(input(f"Consumo día {j+1}: "))
            consumoEnergetico.append(consumo)

        estado = input("Estado (ACTIVO o SUSPENDIDO): ")

        usuario = {
            "id": id_usuario,
            "nombre": nombre,
            "documento": documento,
            "estrato": estrato,
            "consumoEnergetico": consumoEnergetico,
            "estado": estado
        }

        usuarios_servicio.append(usuario)


def mostrar_usuarios():
    for usuario in usuarios_servicio:
        print("\nID:", usuario["id"])
        print("Nombre:", usuario["nombre"])
        print("Documento:", usuario["documento"])
        print("Estrato:", usuario["estrato"])
        print("Estado:", usuario["estado"])
        print("Consumo total:", sum(usuario["consumoEnergetico"]), "KWH")


def ordenar_por_consumo():
    usuarios_servicio.sort(key=lambda u: sum(u["consumoEnergetico"]))

    print("\nUsuarios ordenados de menor a mayor consumo:")
    for usuario in usuarios_servicio:
        print(usuario["nombre"], "- Total:", sum(usuario["consumoEnergetico"]), "KWH")


def menu():
    while True:
        print("\n===== MENU =====")
        print("1. Crear usuarios")
        print("2. Mostrar usuarios")
        print("3. Ordenar usuarios por consumo (menor a mayor)")
        print("4. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            crear_usuarios()
        elif opcion == "2":
            mostrar_usuarios()
        elif opcion == "3":
            ordenar_por_consumo()
        elif opcion == "4":
            print("Saliendo del sistema...")
            break
        else:
            print("Opción inválida")


menu()