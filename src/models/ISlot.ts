export interface ISlot {
   id : string,
   date : Date,
   time_from : Date,
   time_to : Date,
   max_capacity: number,
   current_reservations: number,
   title :string,
   description : string
}
