import express from "express"

import noteRoutes from './routes/notes/note.route.js'

export class Server{
    constructor(hostName,port,nameApp){
        this._hostName = hostName;
        this._port = port;
        this._nameApp = nameApp;
        this._api =  express();
        this.initMiddlewares();
        this.initRoutes();
    }

    initMiddlewares(){
        this._api.use(express.json);
        this._api.use(express.urlencoded({extended:true}));
    }

    initRoutes(){  
        this._api.use("/api/v1/note",noteRoutes)
        this._api.use("/api/v1/home",(req,res)=>{
            res.json({message: `Welcome to my app`})
        });
       
    }

    initServer(){
        try{
            this._api.set('trust proxy',this._hostName);
            this._api.listen(this._port,()=>{
                 console.log(`Server of ${this._nameApp} running at http://127.0.0.1:${this._port}`)
             });
        }catch(err){
            console.log("Error start server");
        }
    }


}


