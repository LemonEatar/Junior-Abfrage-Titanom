"use client";
import { deleteEvent } from "@/resources/actions";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

const initialState = {
  message: null,
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Delete Event
    </button>
  );
}
export default function DeleteEvent({ id }: { id: number }) {
  //@ts-expect-error
  const [state, formAction] = useFormState(deleteEvent, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
}
