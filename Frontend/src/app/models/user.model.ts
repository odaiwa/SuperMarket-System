import { AddressModel } from './address.model';
export class UserModel{
    public _id:string;
    public firstName:string;
    public lastName:string;
    public email:string;
    public password:string;
    public address= new AddressModel();
    public isAdmin:Number;
    public token: string;
}