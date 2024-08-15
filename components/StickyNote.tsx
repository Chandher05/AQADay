import { createMemo } from "solid-js";

function StickyNote({ note, id }: { note: string; id: any }) {
  // Generate a random rotation between -5 and 5 degrees
  const rotation = createMemo(() => Math.floor(Math.random() * 11) - 5);
  return (
    <div
      id={id}
      class=" bg-blue-200 text-blue-800 p-4 rounded-lg shadow-lg w-[200px] h-auto break-words whitespace-normal"
      style={{ transform: `rotate(${rotation()}deg)`, "max-width": "10" }}
    >
      {note}
    </div>
  );
}

export default StickyNote;
