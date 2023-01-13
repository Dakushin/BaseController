import mongoose from "mongoose";
import {Request, Response} from 'express'
import { Increment } from "mongoose-auto-increment-ts";


class BaseController {

    currentmodel: mongoose.Model<any>;
    
    constructor(model: mongoose.Model<any>){
        this.currentmodel = model
    }

    getAll = async (req: Request, res: Response) => {
        await this.currentmodel.find()
        .then((ret) => res.status(200).json(ret))
        .catch((error) => res.status(500).json({ error }));
    }

    getbyId = async (req: Request, res: Response) => {
        await this.currentmodel.findOne({id: Number(req.params.id)})
        .then((ret) => res.status(200).json(ret))
        .catch((error) => res.status(500).json({ error }));
    }

    getbyAttribute = (ForcedFilter? : { [key: string]: any }) => async (req: Request, res: Response) => {
        
        const params : { [key: string]: any } = {}
        const reqtab = Object.keys(req.query)
        const schematab = Object.keys(this.currentmodel.schema.paths)

        


        const isMatching = schematab.filter(val => reqtab.includes(val))
        
        

        if(isMatching.length == 0)
        {
            await res.status(500).json("No matching keys")
            return
        }
        
        isMatching.every(key => {
            params[key] = req.query[key]   
        })

        if(ForcedFilter)
        {
            Object.keys(ForcedFilter).every(key => {
                params[key] = ForcedFilter[key]
            })
        }

    
        await this.currentmodel.find(params)
        .then((ret) => res.status(200).json(ret))
        .catch((error) => res.status(500).json({ error }));
    }

    create = async (req: Request, res: Response) => {
        
        const creation : { [key: string]: any } = {}
        const reqtab = Object.keys(req.body)
        console.log(reqtab)
        const schematab = Object.keys(this.currentmodel.schema.paths)
        console.log(schematab)
        const isMatching = schematab.filter(val => reqtab.includes(val))

        if(isMatching.length == 0)
        {
            await res.status(500).json("No matching keys")
            return
            
        } 
        

            if(schematab.includes("id"))
            {
                const index = isMatching.indexOf("id", 0);
                if (index > -1) {
                    isMatching.splice(index, 1);
                }
                creation['id'] = await Increment(String(this.currentmodel.baseModelName))
            }
        


        console.log(isMatching)
            isMatching.every(async key => {
                console.log(key)
                creation[key] = req.body[key]
                
            })

            
            console.log(creation)
            await this.currentmodel.create(creation)
            .then((ret) => res.status(200).json(ret))
            .catch((error) => res.status(500).json({ error }));
        
    }

    compare = (FindingField : [string], FieldsToCompare : [string]) => async (req: Request, res: Response) =>{
        
        const reqtab = Object.keys(req.query)
        const schematab = Object.keys(this.currentmodel.schema.paths)

        const isMatching = schematab.filter(val => reqtab.includes(val))

            if(isMatching.length == 0)
            {
                await res.status(500).json("No matching keys")
                return
            } 

            const haveFindingKey = isMatching.filter(val => FindingField.includes(val))
            if(haveFindingKey.length == 0)
            {
                await res.status(500).json("no Finding key corresponding")
                return
            }
            const haveFieldToCompare = isMatching.filter(val => FieldsToCompare.includes(val))
            if(haveFieldToCompare.length == 0)
            {
                await res.status(500).json("no Field to compare corresponding")
                return
            }

            
            const findingparams : { [key: string]: any } = {}
            
            haveFindingKey.every(key => {
                findingparams[key] = req.query[key]
            })
            let find = await this.currentmodel.findOne(findingparams)
            console.log(find)
            let good : boolean = false
            if(find)
            {
                isMatching.every(async key => {
                        if(FieldsToCompare.includes(key))
                        {
                            good = req.query[key] == find[key]
                        }
                })
            }
            if(good)
            {
                res.status(200).json(find)
            } else
            {
                res.status(500).json('no good')
            }
                
        

    }

    deletebyId = async (req: Request, res: Response) =>{
        await this.currentmodel.deleteOne({id: Number(req.params.id)})
        .then((ret) => res.status(200).json({ ret }))
        .catch((error) => res.status(500).json({ error }));
    }

    deleteAllbyParam = async (req: Request, res: Response) => {

        const params : { [key: string]: any } = {}
        const reqtab = Object.keys(req.query)
        const schematab = Object.keys(this.currentmodel.schema.paths)
        const isMatching = schematab.filter(val => reqtab.includes(val))

            if(isMatching.length == 0)
            {
                await res.status(500).json("No matching keys")
                return
            } 

            isMatching.every(async key => {

                params[key] = req.query[key]   
            })
            await this.currentmodel.deleteMany(params)
            .then((ret) => res.status(200).json(ret))
            .catch((error) => res.status(500).json({ error }));
        
    }

    modify = async (req: Request, res: Response) => {
        const params : { [key: string]: any } = {}
        const id = req.params
        const reqtab = Object.keys(req.body)
        const schematab = Object.keys(this.currentmodel.schema.paths)
        const isMatching = schematab.filter(val => reqtab.includes(val))

            if(isMatching.length == 0)
            {
                await res.status(500).json("No matching keys")
                return
            } 

            isMatching.every(async key => {

                params[key] = req.query[key]   
            })

        
        await this.currentmodel.findOneAndUpdate(id, params)
        .then((ret) => res.status(200).json(ret))
        .catch((error) => res.status(500).json({ error }));
        
    }
   
}

export default BaseController