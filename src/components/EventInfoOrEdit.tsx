"use client";
import { useFormStatus, useFormState } from "react-dom";
import { updateEvent } from "@/resources/actions";
import { useState } from "react";
import Link from "next/link";

const initialState = {
  message: null,
};

type ChangeEventProps = {
  prevName: string;
  prevDate: string;
  id: number;
  prevDescription: string;
};
export default function EventInfoOrEdit({
  prevName,
  prevDate,
  prevDescription,
  id,
}: ChangeEventProps) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState<string>(prevName);
  const [date, setDate] = useState(prevDate);
  const [description, setDescription] = useState(prevDescription);

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <div className="p-2">
        <button
          type="submit"
          aria-disabled={pending}
          className="hover:bg-blue-200 bg-gray-200 p-2 rounded-lg"
        >
          Save
        </button>
      </div>
    );
  }
  //@ts-expect-error
  const [state, formAction] = useFormState(updateEvent, initialState);
  return (
    <div>
      {edit ? (
        <form action={formAction} className="border-black border w-1/4">
          <fieldset>
            <legend className="text-xl">Update Event</legend>
            <div className="py-2">
              <label htmlFor="name">Event Name:</label>
              <input
                name="name"
                required
                type="text"
                className="border"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div className="py-2 flex">
              <label htmlFor="date">Date: </label>
              <div className="pl-14">
                <input
                  name="date"
                  required
                  type="text"
                  className="border bg-gray-200"
                  value={date}
                  onChange={(e) => setDate(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="py-2">
              <label htmlFor="description">Description: </label>
              <input
                name="description"
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                className="border"
              />
            </div>
            <input type="hidden" name="id" value={id} />
          </fieldset>
          <div className="flex">
            <SubmitButton />
            <div className="p-2">
              <button
                className="bg-gray-200 hover:bg-blue-200 rounded-lg p-2"
                onClick={() => setEdit(false)}
              >
                Finish
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="border-2 border-black w-1/5 px-2 py-2">
          <div className="text-2xl">{prevName}</div>
          <div className="text-xl">{prevDate}</div>
          <div className="text-xl">{prevDescription}</div>
          <div>
            <button
              onClick={() => setEdit(true)}
              className="bg-gray-200 hover:bg-blue-200 p-2 rounded-lg"
            >
              Edit
            </button>
          </div>
        </div>
      )}
      <Link href="/events/">Back to Homepage</Link>
    </div>
  );
}
