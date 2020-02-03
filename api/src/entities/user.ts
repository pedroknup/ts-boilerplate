import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user_status} from "./user_status";
import {role} from "./role";
import {forgot_password} from "./forgot_password";
import {todo} from "./todo";
import {user_external_login} from "./user_external_login";


@Entity("user" ,{schema:"ts-boilerplate" } )
@Index("status-id_idx",["status",])
@Index("user-role-id_idx",["role",])
export class user {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"firstName"
        })
    firstName:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:96,
        name:"lastName"
        })
    lastName:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:96,
        name:"email"
        })
    email:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:196,
        name:"password"
        })
    password:string | null;
        

    @Column("datetime",{ 
        nullable:false,
        default: () => "CURRENT_TIMESTAMP",
        name:"createdAt"
        })
    createdAt:Date;
        

    @Column("varchar",{ 
        nullable:true,
        length:96,
        name:"profilePic"
        })
    profilePic:string | null;
        

   
    @ManyToOne(()=>user_status, (user_status: user_status)=>user_status.users,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'statusId'})
    status:user_status | null;


   
    @ManyToOne(()=>role, (role: role)=>role.users,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'roleId'})
    role:role | null;


   
    @OneToMany(()=>forgot_password, (forgot_password: forgot_password)=>forgot_password.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    forgotPasswords:forgot_password[];
    

   
    @OneToMany(()=>todo, (todo: todo)=>todo.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    todos:todo[];
    

   
    @OneToMany(()=>user_external_login, (user_external_login: user_external_login)=>user_external_login.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    userExternalLogins:user_external_login[];
    
}
