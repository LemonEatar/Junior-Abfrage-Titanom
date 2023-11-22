"use client";
import { useFormStatus, useFormState } from "react-dom";
import { addAttendee } from "@/resources/actions";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="p-2">
      <button
        type="submit"
        className="bg-gray-200 hover:bg-blue-200 p-2 rounded-lg"
        aria-disabled={pending}
      >
        Add Attendee
      </button>
    </div>
  );
}

export default function AddAttendeeForm({ event_id }: { event_id: number }) {
  //@ts-expect-error
  const [state, formAction] = useFormState(addAttendee, initialState);
  return (
    <form action={formAction} className="border-black border">
      <fieldset>
        <legend>Add Attendee: </legend>
        <div className="py-2 flex">
          <label htmlFor="name">Attendee Name:</label>
          <div className="px-8">
            <input
              name="name"
              required
              type="text"
              className="border bg-gray-200"
            />
          </div>
        </div>
        <div className="py-2">
          <label htmlFor="contact_info">Telephone Number: </label>
          <input
            name="contact_info"
            required
            type="tel"
            className="border bg-gray-200"
          />
        </div>
        <input name="event_id" required type="hidden" value={event_id} />
      </fieldset>
      <SubmitButton />
    </form>
  );
}
