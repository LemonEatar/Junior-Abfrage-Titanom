"use server";
import db from "@/db/connection";
import {
  insertEventScheme,
  insertAttendeeSchema,
  event,
  attendee,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createEvent(prevState: any, formData: FormData) {
  const data = insertEventScheme.parse({
    name: formData.get("name"),
    date: formData.get("date"),
    description: formData.get("description"),
  });
  try {
    await db.insert(event).values({
      name: data.name,
      description: data.description,
      date: data.date,
    });
    revalidatePath("/events");
    return { message: "Event added Succesfully" };
  } catch (e) {
    return { message: "Error adding Event" };
  }
}

export async function addAttendee(prevState: any, formData: FormData) {
  const data = insertAttendeeSchema.parse({
    name: formData.get("name"),
    contact_info: formData.get("contact_info"),
    event_id: Number(formData.get("event_id")),
  });

  try {
    await db.insert(attendee).values({
      name: data.name,
      contact_info: data.contact_info,
      event_id: data.event_id,
    });
    revalidatePath("/events");
    return { message: "Attendee added Succesfully" };
  } catch (e) {
    return { message: "Error adding attendee" };
  }
}
async function dbDeleteEvent(id: number) {
  try {
    await db.delete(attendee).where(eq(attendee.event_id, id));
    await db.delete(event).where(eq(event.id, id));
    revalidatePath("/events");
    return { message: "Deleted Succesfully" };
  } catch (e) {
    return { message: "Delete Unsuccesfull" };
  }
}

export async function deleteEvent(prevState: any, formData: FormData) {
  const event_id = Number(formData.get("id"));
  if (event_id === null) {
    throw new Error("Id is null");
  }
  await dbDeleteEvent(event_id);
}
async function dbDeleteAttendee(id: number) {
  try {
    await db.delete(attendee).where(eq(attendee.id, id));
    revalidatePath("/events");
    return { message: "Deleted Succesfully" };
  } catch (e) {
    return { message: "Delete Unsuccesfull" };
  }
}

export async function deleteAttendee(prevState: any, formData: FormData) {
  const id = Number(formData.get("id"));
  if (id === null) {
    throw new Error("Id is null");
  }
  await dbDeleteAttendee(id);
}

export async function updateEvent(prevState: any, formData: FormData) {
  const data = insertEventScheme.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    date: formData.get("date"),
  });

  console.info(data.name);

  try {
    await db
      .update(event)
      .set({ name: data.name, date: data.date, description: data.description });
    revalidatePath("/events");
    return { message: "Update Succesfull" };
  } catch (e) {
    return { message: "Update not Succesfull" };
  }
}
