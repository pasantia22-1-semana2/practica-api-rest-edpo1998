
import {Note,NoteModels} from '../models/note.models.js'

/** @object NoteModels contendra los modelos de Nota para nuestra base de datos */
const noteModel = new NoteModels();

/** NoteController clase que man */
export class NoteController{
    
    constructor(){}

    /**
     * Obtiene todas las notas existentes en la base 
     * de datos
     * @param {*} req 
     * @param {*} res 
     */
    getAllNotes(req,res){
        let allNotes = noteModel.all()
        res.json(allNotes)
    }

    /**
     * Crea un numero usuario con los datos especificados
     * en el json pasado como argumento en la peticion
     * @param {*} req 
     * @param {*} res 
     * @returns {JSON} message
     */
    async createNewNote(req,res){
        let {title,content,status} = req.body
        const newNote = new Note(title,content,status)
        let result =  await noteModel.save(newNote)
        if(result > 0 ){
            return res.json({message:'Created one note'})
        }
        return res.json({message:'Error'})
    }


    /**
     * Obtiene el elemento con el indice pasado como parametro
     * en la peticion
     * @param {*} req 
     * @param {*} res 
     */
     getOneNote(req,res){
        let allNotes = noteModel.all()
        let oneNote = allNotes.find(note => note._id == req.params.id)
        oneNote ? res.json(oneNote): res.json({message:'User Not Found'});
    }


    /**
     * Actualiza el elemento parado como parametro en la peticion
     * en caso de que exista
     * @param {*} req 
     * @param {*} res 
     * @returns {JSON} message
     */
    async updateNote(req,res){

        // Obtener Modificaciones
        let allNotes = noteModel.all()
        
        // Obtenemos el Indice en caso de que existe
        const noteIndex = allNotes.findIndex((obj => obj._id == req.params.id));

        // Si el elemento existe se actualiza
        if(noteIndex>=0){
            let {title,content,status} = req.body
            allNotes[noteIndex]._title = title;
            allNotes[noteIndex]._content = content
            allNotes[noteIndex]._status = status;
            
            // Actualizamos el elemento y capturamos si no hubo algun error 
            let result = await noteModel.update(allNotes)
            if(result){
                return res.json({message:'Delete one note'})
            }
            return res.json({message:'Error'})
        }
        return res.json({message:'User not Found'}) 
    }


    /**
     * Funcion que elmina un usuario pasado como parametro en la peticion
     * en caso de que exista
     * @param {*} req 
     * @param {*} res 
     * @returns {JSON} 
     */
    async deleteNote(req,res){
        let allNotes = noteModel.all()
        let updateNotes = allNotes.filter(note => note._id != req.params.id)
        if ( allNotes.length === updateNotes.length){
            return res.json({message:'Not found Note'})
        }else{
            let result = await noteModel.update(updateNotes)
            if(result){
                return res.json({message:'Delete one note'})
            }
            return res.json({message:'Error'})
        }
    }

    

}
