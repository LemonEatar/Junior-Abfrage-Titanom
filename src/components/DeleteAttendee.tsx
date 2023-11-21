"use client";
import { deleteAttendee } from "@/resources/actions";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

const initialState = {
  message: null,
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  );
}
export default function DeleteAttendee({ id }: { id: number }) {
  //@ts-expect-error
  const [state, formAction] = useFormState(deleteAttendee, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
}
