import jwt from "jsonwebtoken"

const AuthMiddleware = (req, res, next )=>{
  const authHeader = req.headers.authorization;
  if(authHeader === null || authHeader === undefined){
    return res.status(401).json({ message: "UnAuthorized"})
  }

  const token = authHeader.split(" ")[1]

  // * Verify Token
  jwt.verify(token, process.env.JWT_SECRET, (err , payload)=>{
    if(err) return res.status(401).json({ status: "401", message: "UnAuthorized"})

    req.user = payload;
    next();
  })
}

export default AuthMiddleware