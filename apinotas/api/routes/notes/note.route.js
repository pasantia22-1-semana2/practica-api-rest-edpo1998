import express from 'express';

const routerNote = express.Router();

/**
 * ruta para obtener todas las notas
 */
routerNote.get("/",(req,res)=>{
    res.json({message:"I am route notes GET"})
});

/**
 * ruta para obtener una sola nota
 */
routerNote.get("/:id",(req,res)=>{
    res.json({message:"I am route one note GET"})
});

routerNote.put("/",(req,res)=>{
    res.json({message:"I am route one note PUT"})
});

routerNote.post("/",(req,res)=>{
    res.json({message:"I am route one note POST"})
});

routerNote.delete("/",(req,res)=>{
    res.json({message:"I am route one note DELETE"})
});

export default routerNote