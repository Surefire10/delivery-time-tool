export type Timeslot = {
  day: Date;
  availableTimeslots: {
    timeslot: Date;
    green: boolean;
    greenType: string | null;
  };
};

export type AvailableTimeslot = {
  timeslot: Date;
  green: boolean;
  greenType: string | null;
};
