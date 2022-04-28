import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid') //v4
    id: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column({ type: 'varchar', length: 300 })
    createdBy: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateDateTime: Date;

    @Column({ type: 'varchar', length: 300 })
    updatedBy: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    internalComment: string | null;
}