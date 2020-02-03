import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user_external_login} from "./user_external_login";


@Entity("login_provider" ,{schema:"ts-boilerplate" } )
export class login_provider {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:156,
        name:"appId"
        })
    appId:string;
        

   
    @OneToMany(()=>user_external_login, (user_external_login: user_external_login)=>user_external_login.loginProvider,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    userExternalLogins:user_external_login[];
    
}
