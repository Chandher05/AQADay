import { createSignal, type Component, onMount } from "solid-js";

import StickyNote from "../components/StickyNote";
import { AddNote } from "../components/AddNote";
import { supabase } from "../utils/supabase";

const App: Component = () => {
  const [question, _] = createSignal("What’s your spirit animal and why?");
  const [answers, setAnswers] = createSignal<string[]>([]);

  const refresh = async () => {
    // Get the current date and time in IST
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const nowIST = new Date(now.getTime() + istOffset);

    // Calculate the start and end of the IST day in GMT
    const startOfDayIST = new Date(nowIST);
    startOfDayIST.setUTCHours(0, 0, 0, 0);
    const startOfDayGMT = new Date(startOfDayIST.getTime() - istOffset);

    const endOfDayIST = new Date(nowIST);
    endOfDayIST.setUTCHours(23, 59, 59, 999);
    const endOfDayGMT = new Date(endOfDayIST.getTime() - istOffset);

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .gte("created_at", startOfDayGMT.toISOString())
      .lt("created_at", endOfDayGMT.toISOString());

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
          <h4>
            A question a day <sup>beta</sup>
          </h4>

          <br />
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
