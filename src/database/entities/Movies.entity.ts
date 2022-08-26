import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'movies',
})
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    length: 250,
    type: 'varchar',
  })
  title: string;

  @Column({
    length: 500,
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  coverURI: string | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  releaseDate: Date | null;
}
