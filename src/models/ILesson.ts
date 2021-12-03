export interface ILesson {
  id : string,
  date : Date,
  time : Date,
  max_participants: number,
  current_reservations: number,
  course :string,
  course_description: string
}
