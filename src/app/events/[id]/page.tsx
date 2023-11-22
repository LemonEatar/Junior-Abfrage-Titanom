import db from "@/db/connection";
import { event, attendee } from "@/db/schema";
import { eq } from "drizzle-orm";
import AddAttendeeForm from "@/components/AddAttendeeForm";
import DeleteAttendee from "@/components/DeleteAttendee";
import EventInfoOrEdit from "@/components/EventInfoOrEdit";

export default async function Page({ params }: { params: { id: number } }) {
  const selectedEvent = await db
    .select()
    .from(event)
    .where(eq(event.id, params.id));
  const attendees = await db
    .select()
    .from(attendee)
    .where(eq(attendee.event_id, params.id));
  return (
    <div className="px-2 py-2">
      <div>
        <EventInfoOrEdit
          prevDescription={selectedEvent[0].description}
          prevDate={selectedEvent[0].date}
          prevName={selectedEvent[0].name}
          id={params.id}
        />
      </div>
      <div className="w-1/3 py-2">
        <AddAttendeeForm event_id={selectedEvent[0].id} />
      </div>
      <div className="w-1/5 ">
        <ol>
          {attendees.map((attendee) => (
            <li key={attendee.id}>
              <div className="flex">
                -<div className="px-2">{attendee.name}</div>
                <div className="pr-2">{attendee.contact_info}</div>
                <DeleteAttendee id={attendee.id} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
