import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";
import {login_provider} from "./login_provider";


@Entity("user_external_login" ,{schema:"ts-boilerplate" } )
@Index("user-external-login-id_idx",["user",])
@Index("login-provider-id_idx",["loginProvider",])
export class user_external_login {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:96,
        name:"userAccountId"
        })
    userAccountId:string | null;
        

   
    @ManyToOne(()=>user, (user: user)=>user.userExternalLogins,{ onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'userId'})
    user:user | null;


    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"firstName"
        })
    firstName:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"lastName"
        })
    lastName:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:96,
        name:"email"
        })
    email:string | null;
        

   
    @ManyToOne(()=>login_provider, (login_provider: login_provider)=>login_provider.userExternalLogins,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'loginProviderId'})
    loginProvider:login_provider | null;


    @Column("datetime",{ 
        nullable:false,
        default: () => "CURRENT_TIMESTAMP",
        name:"createdAt"
        })
    createdAt:Date;
        
}
