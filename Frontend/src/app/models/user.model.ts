import { AddressModel } from './address.model';
export class UserModel{
    public firstName:string;
    public lastName:string;
    public username:string;
    public password:string;
    public address= new AddressModel();
    public isAdmin:Number;
    public userId:string;
    public token: string;
}