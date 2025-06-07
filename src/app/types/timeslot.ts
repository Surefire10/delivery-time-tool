export type Timeslot = {
  day: Date;
  availableTimeslots: {
    timeslot: Date;
    green: boolean;
  };
};

export type AvailableTimeslot = {
  timeslot: Date;
  green: boolean;
};
