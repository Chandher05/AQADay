import { createSignal } from "solid-js";
import { supabase } from "../utils/supabase";

export function AddNote({ addNote }: { addNote: (ans: string) => void }) {
  const [currentAnswer, setCurrentAnswer] = createSignal<string>("");

  const onSubmit = async (text: string) => {
    if (!text) return;
    const { data, error } = await supabase
      .from("notes")
      .insert([{ note: text }]);
    if (error) {
      console.error(error);
    } else {
      console.log("Note added:", data);
      setCurrentAnswer(""); // Clear the input field after adding
      addNote(text);
    }
  };

  return (
    <div class="flex w-full gap-2 ">
      <input
        value={currentAnswer()}
        onChange={(e) => setCurrentAnswer(e.currentTarget.value)}
        type="text"
        class="bg-blue-100 size-11 w-full text-black p-2 rounded w-100"
        placeholder="Type your answer here"
      ></input>
      <button
        disabled={currentAnswer() === ""}
        class="rounded-2xl bg-blue-100 p-2 text-black px-5 cursor-auto"
        onClick={() => onSubmit(currentAnswer())}
      >
        Submit
      </button>
    </div>
  );
}
