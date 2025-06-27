export type Timeslot = {
  day: Date;
  dayTimeSlots: {
    time: Date;
    green: boolean;
  }[];
};
