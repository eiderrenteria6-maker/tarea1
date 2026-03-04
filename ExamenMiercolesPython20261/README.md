# Taller evaluativo #1 🤖

## Contexto
Una empresa de servicios públicos quiere un prototipo en Python para gestionar lecturas numéricas y datos básicos de usuarios.  
El objetivo del taller es practicar **listas**, **diccionarios**, **métodos de listas** y **funciones (`def`)**, junto con un flujo simple de **registro/login con intentos limitados**.

---

## Objetivo de aprendizaje
Al finalizar, el estudiante será capaz de:
- Construir soluciones con **funciones** y flujo de control.
- Gestionar **listas** con métodos: `append`, `insert`, `remove`, `pop`, `sort`.
- Trabajar con **lista de diccionarios** (mínimo 10 registros).
- Implementar un **login/registro** con control de intentos e información al usuario.
- Generar y procesar un volumen de datos (500 registros numéricos).

---

## Requisitos del ejercicio

### 1) Registro y Login (con 3 intentos)
Implementa un sistema que permita:

**Registro**
- Permitir crear un usuario con:
  - `correo`
  - `password`
- Guardar el usuario registrado en una estructura simple (diccionario o lista de diccionarios).

**Login**
- Pedir correo y contraseña.
- Permitir **máximo 3 intentos**.
- En cada intento fallido debe mostrar:
  - `"Credenciales incorrectas. Intentos restantes: X"`
- Si inicia sesión correctamente, mostrar:
  - `"Login exitoso"` y permitir continuar con el menú.
- Si se agotan los intentos:
  - `"Cuenta bloqueada temporalmente"` y finalizar el programa.
---

### 2) Registro de N diccionarios (lista de diccionarios)
Crear una lista llamada `usuarios_servicio` que contenga **10 diccionarios**, cada uno con esta estructura mínima:

- `id` (int)
- `nombre` (str)
- `documento` (str o int)
- `estrato` (int 1 a 6)
- `consumoEnergetico` (crear un listado nuemrico de 30 consumos al mes) en KWH
- `estado` (str: "ACTIVO" o "SUSPENDIDO")

Debe existir un menú para:
- Ordenar usuarios por `consumo` de menor a mayor

---

## Funciones obligatorias
Tu solución debe estar organizada usando funciones `def`.  

---

## Menú sugerido (después del login)
1. Gestionar usuarios del servicio (lista de diccionarios)
2. Salir

---

## Criterios de evaluación (guía)
- (30%)Incluir Diseño de los modulos a programar
- (30%) Implementación de las funciones
- (10%) Unificación de todo en un menú
- (30%) correcto uso de git y GitHub

---

Éxitos. La idea es que sea sencillo, completo y bien organizado.

