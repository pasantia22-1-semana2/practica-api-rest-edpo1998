import express from 'express';
import {NoteController} from '../controller/note.ctl.js'
const routerNote = express.Router();

/** @object NoteController Variable que contendra los controladores de nuestras rutas */
const noteController = new NoteController()


/**
 * ruta para obtener todas las notas
 */
routerNote.get("/",noteController.getAllNotes);


/**
 * ruta para obtener una sola nota con determinado id
 */
routerNote.get("/:id",noteController.getOneNote);


/** Ruta para actualizar una nota con determinado id */
routerNote.put("/:id",noteController.updateNote);


/** Ruta para agregar una nota */
routerNote.post("/",noteController.createNewNote);


/**
 * Ruta para eliminar una nota con determinado id
 */
routerNote.delete("/:id",noteController.deleteNote);

export default routerNote