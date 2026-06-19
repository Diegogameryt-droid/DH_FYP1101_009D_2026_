import turtle
import time
import random

posponer = 0.1

# Marcador
score = 0
high_score = 0

# Configuración de la ventana
wn = turtle.Screen()
wn.title("Juego de la Serpiente en VS Code")
wn.bgcolor("black")
wn.setup(width=600, height=600)
wn.tracer(0) # Torna las animaciones más fluidas

# Cabeza de la serpiente
cabeza = turtle.Turtle()
cabeza.speed(0)
cabeza.shape("square")
cabeza.color("green")
cabeza.penup()
cabeza.goto(0,0)
cabeza.direction = "stop"

# Comida
comida = turtle.Turtle()
comida.speed(0)
comida.shape("circle")
comida.color("red")
comida.penup()
comida.goto(0,100)

# Cuerpo de la serpiente (Lista de segmentos)
segmentos = []

# Texto para el marcador
texto = turtle.Turtle()
texto.speed(0)
texto.color("white")
texto.penup()
texto.hideturtle()
texto.goto(0, 260)
texto.write("Score: 0   High Score: 0", align="center", font=("Courier", 24, "normal"))

# Funciones de movimiento
def arriba():
    if cabeza.direction != "down":
        cabeza.direction = "up"

def abajo():
    if cabeza.direction != "up":
        cabeza.direction = "down"

def izquierda():
    if cabeza.direction != "right":
        cabeza.direction = "left"

def derecha():
    if cabeza.direction != "left":
        cabeza.direction = "right"

def mov():
    if cabeza.direction == "up":
        y = cabeza.ycor()
        cabeza.sety(y + 20)

    if cabeza.direction == "down":
        y = cabeza.ycor()
        cabeza.sety(y - 20)

    if cabeza.direction == "left":
        x = cabeza.xcor()
        cabeza.setx(x - 20)

    if cabeza.direction == "right":
        x = cabeza.xcor()
        cabeza.setx(x + 20)

# Teclado
wn.listen()
wn.onkeypress(arriba, "Up")
wn.onkeypress(abajo, "Down")
wn.onkeypress(izquierda, "Left")
wn.onkeypress(derecha, "Right")

# Bucle principal del juego
while True:
    wn.update()

    # Colisiones con los bordes
    if cabeza.xcor() > 280 or cabeza.xcor() < -280 or cabeza.ycor() > 280 or cabeza.ycor() < -280:
        time.sleep(1)
        cabeza.goto(0,0)
        cabeza.direction = "stop"

        # Esconder los segmentos (reiniciar cuerpo)
        for segmento in segmentos:
            segmento.goto(1000, 1000)
        segmentos.clear()

        # Resetear marcador
        score = 0
        texto.clear()
        texto.write(f"Score: {score}   High Score: {high_score}", align="center", font=("Courier", 24, "normal"))

    # Colisión con la comida
    if cabeza.distance(comida) < 20:
        # Mover la comida a un lugar aleatorio
        x = random.randint(-280, 280)
        y = random.randint(-280, 280)
        comida.goto(x, y)

        # Añadir un nuevo segmento al cuerpo
        nuevo_segmento = turtle.Turtle()
        nuevo_segmento.speed(0)
        nuevo_segmento.shape("square")
        nuevo_segmento.color("lightgreen")
        nuevo_segmento.penup()
        segmentos.append(nuevo_segmento)

        # Aumentar marcador
        score += 10
        if score > high_score:
            high_score = score
        
        texto.clear()
        texto.write(f"Score: {score}   High Score: {high_score}", align="center", font=("Courier", 24, "normal"))

    # Mover el cuerpo de la serpiente (en orden inverso)
    totSeg = len(segmentos)
    for index in range(totSeg -1, 0, -1):
        x = segmentos[index - 1].xcor()
        y = segmentos[index - 1].ycor()
        segmentos[index].goto(x, y)

    # Mover el segmento 0 a la posición de la cabeza
    if totSeg > 0:
        x = cabeza.xcor()
        y = cabeza.ycor()
        segmentos[0].goto(x, y)

    mov()

    # Colisiones con el propio cuerpo
    for segmento in segmentos:
        if segmento.distance(cabeza) < 20:
            time.sleep(1)
            cabeza.goto(0,0)
            cabeza.direction = "stop"

            # Esconder segmentos
            for seg in segmentos:
                seg.goto(1000, 1000)
            segmentos.clear()

            # Resetear marcador
            score = 0
            texto.clear()
            texto.write(f"Score: {score}   High Score: {high_score}", align="center", font=("Courier", 24, "normal"))

    time.sleep(posponer)