import db from "@/db/connection";
import { event } from "@/db/schema";
import EventCard from "@/components/EventCard";
import AddEventForm from "@/components/AddEventForm";
import DeleteEvent from "@/components/DeleteEvent";

export default async function Page() {
  const events = await db.select().from(event);
  return (
    <div className="px-2 py-2">
      <div className="w-1/3">
        <AddEventForm />
      </div>
      <div className="py-2">
        <div className="px-2 py-5 border-2 border-black grid grid-cols-5">
          {events.map((item) => (
            <div key={item.id} className="flex py-2 px-2">
              <div key={item.id} className="flex items-center border py-3">
                <EventCard id={item.id} name={item.name} date={item.date} />
                <DeleteEvent id={item.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
