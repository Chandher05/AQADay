import { createSignal, type Component, onMount } from "solid-js";

import StickyNote from "../components/StickyNote";
import { AddNote } from "../components/AddNote";
import { supabase } from "../utils/supabase";

const App: Component = () => {
  const [question, _] = createSignal("What makes you truly free?");
  const [answers, setAnswers] = createSignal<string[]>([]);

  const refresh = async () => {
    const { data, error } = await supabase.from("notes").select(" * ");

    if (error) {
      console.error(error);
    } else {
      setAnswers(data.map((x) => x.note));
    }
  };

  onMount(async () => {
    refresh();
  });

  return (
    <div class=" min-h-screen bg-gradient-to-bl from-blue-600 to-blue-950 font-mono">
      <div class=" flex justify-center bg-blue-950 p-10 shadow-md rounded-b-xl">
        <header class=" h-full items-center text-white text-center flex flex-col gap-3">
          {/* <h4>The question of the day!</h4> */}
          <h1 class="text-3xl font-bold">{question()}</h1>
          <AddNote refresh={refresh} />
        </header>
      </div>
      <div class="text-white flex p-10 gap-4 flex-wrap place-items-center gap-y-10 px-50 m-auto justify-center">
        {answers().map((answer, index) => (
          <StickyNote id={index} note={answer} />
        ))}
      </div>
    </div>
  );
};

export default App;
