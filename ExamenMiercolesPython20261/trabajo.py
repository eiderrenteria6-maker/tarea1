usuario = {}


print("=== REGISTRO ===")
correo = input("Ingrese su correo: ")
password = input("Ingrese su contraseña: ")


usuario["correo"] = correo
usuario["password"] = password

print("Usuario registrado correctamente.\n")


print("=== LOGIN ===")

intentos = 3

while intentos > 0:
    correo_login = input("Ingrese su correo: ")
    password_login = input("Ingrese su contraseña: ")

    if correo_login == usuario["correo"] and password_login == usuario["password"]:
        print("Login exitoso")
        print("Bienvenido al sistema")
        break
    else:
        intentos -= 1
        if intentos > 0:
            print("Credenciales incorrectas. Intentos restantes:", intentos)
        else:
            print("Cuenta bloqueada temporalmente")