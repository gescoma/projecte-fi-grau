import tkinter as tk

def adios():
    text["text"] = "Adiós"

window = tk.Tk()
window.title("Programa")
window.geometry("300x300")
text=tk.Label(window,text="Hola mundo")
text.pack()
button = tk.Button(window,text="Me voy!",
                    bg="green",
                    fg="white",
                    command=adios)

button.pack()
window.mainloop()
