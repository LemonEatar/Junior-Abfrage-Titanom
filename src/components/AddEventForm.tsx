"use client";
import { useFormStatus, useFormState } from "react-dom";
import { createEvent } from "@/resources/actions";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="p-2">
      <button
        type="submit"
        className="bg-gray-200 rounded-lg px-2 hover:bg-blue-300"
        aria-disabled={pending}
      >
        Add Event
      </button>
    </div>
  );
}

export default function AddEventForm() {
  //@ts-expect-error
  const [state, formAction] = useFormState(createEvent, initialState);
  return (
    <form action={formAction} className="border-black border-2 border-rounded">
      <fieldset>
        <legend>Create Event</legend>
        <div className="py-2">
          <label htmlFor="name">Event Name:</label>
          <input
            name="name"
            required
            type="text"
            className="border bg-gray-200 border-rounded-l"
          />
        </div>
        <div className="py-2 flex">
          <label htmlFor="date">Date: </label>
          <div className="px-14">
            <input
              name="date"
              required
              type="text"
              className="border bg-gray-200 "
            />
          </div>
        </div>
        <div className="py-2">
          <label htmlFor="description">Description: </label>
          <input
            name="description"
            required
            type="text"
            className="border bg-gray-200"
          />
        </div>
      </fieldset>
      <SubmitButton />
    </form>
  );
}
