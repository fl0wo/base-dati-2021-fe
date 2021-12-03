export class Lesson{

  constructor( public id : string,
               public date : Date,
               public time : Date,
               public max_participants: number,
               public current_reservations: number,
               public course :string,
               public course_description: string) {
  }

  get info(): string {
    return `#${this.id} - ${this.time.getTime()} - ${this.max_participants }`
  }

}
