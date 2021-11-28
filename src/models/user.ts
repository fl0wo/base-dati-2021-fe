export class User {
    id: string = "";
    name: string = "";
    surname: string = "";
    birth_date!: Date; // !
    fiscal_code: string = "";
    phone: string = "";
    role: Role = Role.CUSTOMER;
    email: string = "";
    password: string = "";



  toRestModel(){
    return {
      "name" : this.name,
      "surname" : this.surname,
      "email" : this.email,
      "password" : this.password
    }
  }

}

export enum Role {
  ADMIN = "admin",
  MANAGER = "manager",
  CUSTOMER = "customer",
  MACHINE = "machine",
  TRAINER = "trainer"
}
