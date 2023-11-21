import Link from "next/link";

type EventProps = {
  name: string;
  date: string;
  id: number;
};

export default function EventCard({ name, date, id }: EventProps) {
  return (
    <div className="px-2">
      <Link href={`/events/${id}`}>
        <div>{name}</div>
        <div>Date: {date}</div>
      </Link>
    </div>
  );
}
