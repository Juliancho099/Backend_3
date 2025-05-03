
export const isAdmin = (req, res, next) => {
  console.log("Validando rol de administrador");
  console.log("req.user:", req.user);
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado: Solo el administrador puede realizar esta acción" });
    }
    next();
  };


  export const isUser = (req, res, next) => {
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Acceso denegado: Solo los usuarios pueden agregar productos al carrito" });
    }
    next();
  }; 