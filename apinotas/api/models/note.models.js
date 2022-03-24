import fs from 'fs';

/** Note Modelo para almacenar los valores de las notas */
export class Note{


    /**
     * Crea el Objeto Note con id inicial 0
     * @param {string} title 
     * @param {string} content 
     * @param {Boolean} status 
     */
    constructor(title,content,status){
        /** @private */
        this._id = 0;
        /** @private */
        this._title = title;
        /** @private */
        this._content = content;
        /** @private */
        this._status = status;
    }

    /** Return id */
    get id(){
        return this._id
    }

    /** Return title */
    get title(){
        return this._title;
    }

    /** Return content */
    get content(){
        return this._content
    }

    /** Return id */
    get status(){
         this._status;
    }

    /** Set val id */
    set id(id){
        this._id = id
    }

    
     /** Set val title */
    set title(title){
        this._title = title
    }


     /** Set val content */
    set content(content){
        this._content = content
    }


    /** Set val status */
    set status(status){
        this._status = status
    }

}

/** NoteModels Classe que simulara el modelo de nuestra base de datos */
export class NoteModels{


    /**
     *  Constructor que contentra las configuraciones
     *  por defecto de nuestro archivo en la simulacion de 
     *  la base de datos 
     */
    constructor(){
        this._name = 'db';
        this._dataDir = 'db';
        this._dataPath = 'db/db.json';
    }


    /**
     * Lee el archivo de simulacion de base de datos
     * y devuelve un arreglo con los valores leidos
     * @returns {[]}
     */
    readJsonFile(){
        let contentFile = fs.readFileSync(this._dataPath,'utf-8');
        if(contentFile){
            return JSON.parse(contentFile);
        }else{
            return [];
        }
    }


    /**
     * Actualiza el archivo de simulacion de base de datos
     * @param {Note[]} data 
     */
    writeJsonFile(data){
        let jsonData = JSON.stringify(data,null,'');
        fs.writeFileSync(this._dataPath,jsonData);
        
    }


    /**
     * Genera los indices de los valores almacenados
     * devuelve 1 al ser el primero, de lo contrario 
     * continua de 1 en 1
     * @returns {Number}
     */
    generatePK(){
        let items = this.readJsonFile();
        let lastItem = items.pop()
        if(lastItem){
            return ++lastItem._id
        }
        return 1
    }


    /**
     * Almacena la nueva nota ingresada y 
     * retorna el id de la nota almacenada en caso
     * contrario devuelve 0.
     * @param {Note} note 
     * @returns {Number} 
     */
    async save(note){
        try{
            let notes = this.readJsonFile();
            note.id = this.generatePK()
            notes.push(note);
            this.writeJsonFile(notes);    
            return note.id
        }catch(err){
            console.log(err)
            return 0;
        }
    }


    /**
     * Retorna todos los elementos 
     * @return {Note[]}  
     */
    all(){
        return this.readJsonFile()
    }


    /**
    * Retorna un elemento con determinado id
    * @param {Number} id de la nota a buscar
    * @return {Note}
    */
    findByID(id){
        
        let items = this.readJsonFile();
        return items.find(item => item.ide === id)
    }


    /**
     * Actualiza el archivo de notas y retorna un valor de verdad en caso
     * de que la actualizacion se cumpla o no.
     * @param {Note[]} newarray 
     * @returns {Boolean} 
     */
     async update(newarray){
        try{
            this.writeJsonFile(newarray);    
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }


}