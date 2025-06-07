import { addDays, endOfDay, getDay, isWeekend, startOfDay } from "date-fns";
import {
  eachDayOfInterval,
  eachHourOfInterval,
} from "../../app/components/helpers/timezonehelper";
import { ProductService } from "../products/service";

export class TimeslotService {
  private productService;

  constructor() {
    this.productService = new ProductService();
  }

  async getCartTimeslots(ids: string[]) {
    const cartItems = await this.productService.getProductsByIds(ids);
    const now = startOfDay(new Date());
    const nowPlus14Days = addDays(now, 14);

    const currentTime = new Date().getHours(); //my timezone
    //we get the days within the 14-day allowed interval minus the weekends
    const current14DayInterval = eachDayOfInterval({
      start: now,
      end: nowPlus14Days,
    }).filter((date) => !isWeekend(date));

    //start delivery logic
    const greenHours = [10, 13, 14, 21, 22];

    const hasExternal = cartItems.find((item) => item.type === "external");
    const hasFresh = cartItems.find((item) => item.type === "fresh");
    const hasInStock = cartItems.find((item) => item.type === "in-stock");

    let delayDays = 0;
    if (hasExternal) {
      delayDays = Math.max(delayDays, 3);
    }
    if (hasFresh && currentTime >= 12) {
      // Fresh after 12 --> tomorrow
      delayDays = Math.max(delayDays, 1);
    }
    if (hasInStock && currentTime >= 18) {
      // In-stock after 18 --> tomorrow
      delayDays = Math.max(delayDays, 1);
    }

    let newInterval = current14DayInterval.slice(delayDays);

    if (hasExternal) {
      newInterval = newInterval.filter((day) => getDay(day) !== 1);
    }

    return newInterval.map((day, index) => {
      const availableTimeslots = eachHourOfInterval({
        start: startOfDay(day),
        end: endOfDay(day),
      }) // this comes back with no time zone offset (correct)
        .filter((hour) => {
          const time = hour.getUTCHours(); //if I do just hour.getHours() the offset comes back and time starts at 5 A.M and ends at 7 P.M
          return time >= 8 && time <= 22;
        })
        .map((timeslot) => {
          const time = timeslot.getHours(); //this is fine again;
          return {
            timeslot,
            green: greenHours
              .slice(0, Math.floor(Math.random() * index - 2)) // slice won't let this overflow so it's fine;
              .includes(time),
          };
        })
        .sort((a, b) => {
          return +b.green - +a.green;
        });

      return {
        day,
        availableTimeslots,
      };
    });
  }
}
