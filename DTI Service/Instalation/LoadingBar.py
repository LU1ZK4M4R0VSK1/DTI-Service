import tkinter as tk
import itertools
import socket
import threading

class LoadingAnimation:
    def __init__(self, root):
        self.root = root
        self.root.title("Loading Animation")
        self.root.geometry("300x200")
        self.root.configure(bg="#121212")

        self.progress = 0

        self.loading_label = tk.Label(
            root,
            text="Loading",
            font=("Arial", 14, "bold"),
            fg="white",
            bg="#121212",
        )
        self.loading_label.pack(pady=20)

        self.dots = tk.Label(
            root,
            text="",
            font=("Arial", 14, "bold"),
            fg="white",
            bg="#121212",
        )
        self.dots.pack()
        self.dot_cycle = itertools.cycle(["", ".", "..", "..."])
        self.animate_dots()

        self.canvas = tk.Canvas(root, width=200, height=30, bg="#212121", highlightthickness=0)
        self.canvas.pack(pady=20)
        self.canvas.create_rectangle(5, 5, 195, 25, fill="", outline="black")

        self.loading_bar = self.canvas.create_rectangle(5, 5, 5, 25, fill="#00FF00", outline="")
        self.update_bar()

        self.start_socket_server()

    def animate_dots(self):
        self.dots.config(text=next(self.dot_cycle))
        self.root.after(300, self.animate_dots)

    def update_bar(self):
        self.canvas.coords(self.loading_bar, 5, 5, 5 + self.progress * 1.9, 25)
        self.root.after(100, self.update_bar)

    def start_socket_server(self):
        def handle_client(conn):
            while True:
                data = conn.recv(1024).decode()
                if not data:
                    break
                try:
                    self.progress = int(data)
                except ValueError:
                    print("Invalid progress value received")
            conn.close()

        def start_server():
            server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            server.bind(("localhost", 12345))
            server.listen(1)
            print("Socket server started, waiting for connections...")
            conn, addr = server.accept()
            print(f"Connected by {addr}")
            handle_client(conn)

        threading.Thread(target=start_server, daemon=True).start()

if __name__ == "__main__":
    root = tk.Tk()
    app = LoadingAnimation(root)
    root.mainloop()