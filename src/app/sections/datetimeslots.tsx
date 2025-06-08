"use client";
import { ButtonLeft } from "@/components/ui/button-left";
import { ButtonRight } from "@/components/ui/button-right";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { Clock, Leaf } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetTimeslots } from "../../queries/timeslots/useGetTimeslots";
import { SkeletonCase } from "@/components/ui/skeletoncase";
import { militaryToRegularTime } from "../components/helpers/militarytimehelper";
import { formatInTimeZone } from "date-fns-tz";
import { AvailableTimeslot } from "@/types/timeslot";

interface TimeSlotsProps {
  submittedProductIds: number[];
}

export function TimeSlots({ submittedProductIds }: TimeSlotsProps) {
  const dayContainer = useRef<HTMLDivElement>(null);
  const timeContainer = useRef<HTMLDivElement>(null);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    new Date(new Date().setUTCHours(9, 0, 0)).toISOString()
  );
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toISOString()
  );

  const [isGreen, setIsGreen] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetTimeslots(submittedProductIds);

  useEffect(() => {
    if (data) {
      setSelectedDay(new Date(data[0].day).toISOString());
    }
  }, [data]);

  if (isLoading) {
    return <SkeletonCase />;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-900">
        Could not load timeslots now, please try again later.
      </p>
    );
  }
  if (!data) {
    return;
  }

  const availableDays = data.map((outerObject) => outerObject.day);
  const availableHours = data
    .filter(
      (outerObject) => new Date(outerObject.day).toISOString() === selectedDay
    )
    .flatMap((timeslot) => timeslot.availableTimeslots);

  const lengthOfAvailableDays = data.length;

  function dayScrollHandler(value: number) {
    dayContainer.current?.scrollBy({
      left: value,
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div>
      <div className="flex flex-col gap-1 mb-5">
        <h2 className="text-xl font-bold">Which delivery day works best? </h2>
        <p className="text-neutral-600">Select whichever day you want.</p>
      </div>
      <div className="flex flex-col gap-5 mb-52 rounded-md">
        <div className="flex flex-col gap-10 mt-5">
          <div
            className="flex gap-5 md:justify-center max-w-[400px] md:max-w-7xl overflow-x-scroll no-scrollbar"
            ref={dayContainer}
          >
            {availableDays &&
              availableDays.map((day, index) => {
                return (
                  <button
                    onClick={() => {
                      setSelectedDay(new Date(day).toISOString());
                    }}
                    className={cn(
                      "relative flex px-2 pt-4 h-[100px] min-w-[100px] overflow-y-hidden  opacity-80 hover:opacity-100 overflow-x-hidden border border-neutral-500 rounded-lg hover:cursor-pointer duration-100",
                      isSameDay(day, selectedDay) &&
                        "border border-blue-500 opacity-100"
                    )}
                    key={index}
                  >
                    <div className="flex flex-col items-center min-h-[100px] w-full">
                      <div className="">{format(day, "EE")}</div>
                      <div className="">{format(day, "d")}</div>
                      <div className="">{format(day, "MMMM")}</div>
                    </div>
                  </button>
                );
              })}
          </div>
          <div
            style={{
              display: lengthOfAvailableDays >= 10 ? "flex" : "none",
            }}
            className="w-full justify-center flex gap-2"
          >
            <ButtonLeft
              onClick={() => {
                dayScrollHandler(-300);
              }}
              width={30}
            />
            <ButtonRight
              onClick={() => {
                dayScrollHandler(300);
              }}
              width={30}
            />
          </div>

          <div className="mt-5 md:mt-10">
            <div className="hidden md:flex flex-col">
              <h2 className="text-xl font-bold">Which time works best?</h2>
              <div className="flex  justify-between gap-1 text-sm items-center">
                <p className="text-neutral-600">
                  Select whichever timeslot you want.
                </p>
                <p className="text-neutral-500 flex gap-2 mt-4 items-center">
                  <Clock size={18} />1 hour delivery slots.
                </p>
              </div>
            </div>
            <div
              ref={timeContainer}
              className="grid grid-cols-3 md:grid-cols-4 px-0   gap-2 md:gap-5  md:max-w-7xl md:mt-10"
            >
              {availableHours &&
                availableHours.map((hour: AvailableTimeslot) => {
                  return (
                    <button
                      key={hour.timeslot + ""}
                      className={cn(
                        "relative px-3 rounded-xl text-sm md:text-base min-h-20 min-w-[125px] max-w-[130px] md:min-w-[250px] md:max-w-[250px] hover:cursor-pointer opacity-90 hover:opacity-100 duration-100 border",
                        selectedTimeSlot === hour.timeslot + ""
                          ? " border-white"
                          : "border-neutral-600",
                        hour.green ? "bg-[#26ff2251]" : "bg-[#fc111162]"
                      )}
                      onClick={() => {
                        setSelectedTimeSlot(hour.timeslot + "");
                        setIsGreen(hour.green);
                      }}
                    >
                      <p>{militaryToRegularTime(hour.timeslot + "")}</p>
                      {hour.green ? (
                        <div className="relative flex flex-col justify-center w-full mt-2 md:mt-0">
                          <div className="flex justify-center gap-2">
                            <Leaf stroke="white" />
                            <p className="hidden md:block">Green Delivery.</p>
                          </div>

                          <p className="text-[10px] md:text-xs">
                            {hour.greenType}.
                          </p>
                        </div>
                      ) : (
                        <div className="relative flex justify-center gap-2 w-full ">
                          <Clock stroke="white" />
                          <p className="hidden md:block">
                            Peak-hour Delivery.{" "}
                          </p>
                        </div>
                      )}
                    </button>
                  );
                })}
            </div>
            <div className="mt-10 mx-0">
              <p>
                Delivery scheduled for{" "}
                {formatInTimeZone(selectedDay, "UTC", "MMMM, dd ")} at{" "}
                {militaryToRegularTime(selectedTimeSlot)}
                .
                <br />
                {isGreen ? (
                  <span className="text-[#1f8f0e]">Environment friendly.</span>
                ) : (
                  <span className="text-[#a52121]">Carbon-intensive.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
