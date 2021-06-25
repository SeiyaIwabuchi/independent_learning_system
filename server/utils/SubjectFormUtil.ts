export class SubjectFormUtil{
    static create(id? : number,hash? : string,name? : string,description? : string){
        return Object.assign({},{
            id : id!,
            hash : hash!,
            name : name!,
            description : name!
        });
    }
}