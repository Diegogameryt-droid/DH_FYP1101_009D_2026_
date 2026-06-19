listado_tareas = []  # ----> lista vacia

def validar_numero_entero_positivo(mensaje:str) -> int:
    "Valida que un numero sea entero y positivo."
    while True:
        try:
            valor = int(input(mensaje))
            if valor == 0:
                print("El valor no puede ser cero.")
            elif valor < 0:
                print("No se puede ingresar numeros negativos")
            else:
                return valor
        except Exception:
            print("Solo se pueden ingresar numeros. ")


def validar_string(mensaje:str): 
    while True:
        valor = input(mensaje)
        if len(valor) == 0:
            print("El valor no puede estar vacio.")
        elif len(valor) < 3:
            print("El valor no debe contener menos de 3 caracteres.")
        else:
            return valor


def agregar_tarea(idTarea:int, nombreTarea:str, responsableTarea:str,):
    diccionario = {
        "id_tarea":idTarea,
        "nombre_tarea":nombreTarea,
        "responsable_tarea":responsableTarea,
        "estado_tarea":"Pendiente"
    }
    listado_tareas.append(diccionario)
    print("Tarea agregada correctamente")


#                       1
def actualizar_tarea(posicion:int, estado_tarea:str):
    if estado_tarea.capitalize() == "Pendiente" or estado_tarea.capitalize() == "En proceso" or estado_tarea.capitalize() == "Completada":
        listado_tareas[posicion]["estado_tarea"] = estado_tarea
        print("Tarea se actualizo correctamente.")
    else:
        print("No existe el estado de la tarea que se acaba de ingresar.")



def eliminar_tarea(posicion:int):
    listado_tareas.pop(posicion)
    print("Tarea eliminada.")
    


def mostrar_tareas():
    if len(listado_tareas) == 0:
        print("No hay tareas registradas.")
    else:
        for i in listado_tareas:
            print(f" [ID TAREA]: {i.get("id_tarea")} - [NOMBRE TAREA]: {i["nombre_tarea"]} - [RESPONSABLE]: {i["responsable_tarea"]} - [ESTADO]: {i["estado_tarea"]}")



def buscar_tarea_por_id(id_tarea:int) -> int | None:
    posicion = 0
    for i in listado_tareas:
        if i["id_tarea"] == id_tarea:
            return posicion
        posicion += 1
        
def buscar_tarea_por_nombre(nombre_tarea:str):
    posicion = 0
    for i in listado_tareas:
        if i["nombre_tarea"] == nombre_tarea:
            return posicion
        posicion += 1




def menu():
    while True:
        print("[1] - Agregar tarea")
        print("[2] - Buscar tarea")
        print("[3] - Eliminar tarea")
        print("[4] - Actualizar estado tarea")
        print("[5] - Mostrar tareas")
        print("[6] - Salir")

        opcion = validar_numero_entero_positivo("Ingrese una opcion: [1-2-3-4-5-6] ")

        if opcion == 1:
            id_tarea = validar_numero_entero_positivo("Ingrese el id de la tarea: ")
            if buscar_tarea_por_id(id_tarea) == None:
                nombre_tarea = validar_string("Ingrese el nombre de la tarea: ")
                responsable_tarea = validar_string("Ingrese el nombre del responsable de la tarea: ")
                agregar_tarea(id_tarea,nombre_tarea,responsable_tarea)
            else:
                print("El id de la tarea ya se encuentra registrado.")

        if opcion == 2:
            print("Ingrese una opcion para poder buscar una tarea: ")
            como_buscar = validar_numero_entero_positivo("[1] - id tarea     -  [2] - Nombre tarea: ")

            if como_buscar == 1:
                id_tarea = validar_numero_entero_positivo("Ingrese el id de la tarea que desea buscar: ")
                tarea_encontrada = buscar_tarea_por_id(id_tarea)
                if tarea_encontrada != None:
                    print(listado_tareas[tarea_encontrada])
                else:
                    print("No se encontro la tarea buscada.")
            elif como_buscar == 2:

                nombre_tarea = validar_string("Ingrese el nombre de la tarea que desea buscar: ")
                tarea_encontrada = buscar_tarea_por_nombre(nombre_tarea)
                if tarea_encontrada != None:
                    print(listado_tareas[tarea_encontrada])
                else:
                    print("No se encontro la tarea buscada.")
                    

        elif  opcion == 3:
            id_tarea = validar_numero_entero_positivo("Ingrese el id de la tarea a eliminar: ")

            tarea_encontrada = buscar_tarea_por_id(id_tarea)

            if tarea_encontrada == None:
                print("Tarea no encontrada.")
            else:
                eliminar_tarea(tarea_encontrada)



        elif opcion == 4:
            id_tarea = validar_numero_entero_positivo("Ingrese el id de la tarea a modificar: ")
            tarea_encontrada = buscar_tarea_por_id(id_tarea)

            if tarea_encontrada == None:
                print("No se encontró la tarea.")
            else:
                estado_tarea = validar_string("Ingrese nuevo estado de la tarea: ")
                actualizar_tarea(tarea_encontrada,estado_tarea)


        elif opcion == 5:
            mostrar_tareas()



        elif opcion == 6:
            break

        else:
            print("Opcion no valida!")  

menu()





    