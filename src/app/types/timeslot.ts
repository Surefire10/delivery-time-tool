export type Timeslot = {
  day: Date;
  availableTimeslots: {
    timeslot: Date;
    green: boolean;
  };
};
