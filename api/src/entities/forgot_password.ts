import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";


@Entity("forgot_password" ,{schema:"ts-boilerplate" } )
@Index("forgot-user-id_idx",["user",])
export class forgot_password {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:96,
        name:"token"
        })
    token:string;
        

   
    @ManyToOne(()=>user, (user: user)=>user.forgotPasswords,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'userId'})
    user:user | null;


    @Column("datetime",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"createdAt"
        })
    createdAt:Date | null;
        

    @Column("datetime",{ 
        nullable:false,
        name:"expiresAt"
        })
    expiresAt:Date;
        
}
