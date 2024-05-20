import { Button } from "@/components/ui/button";
import { GetServerSidePropsContext } from "next";
import { FormEvent, useEffect, useState } from "react";

export default function Index(props: any) {
  const [menuOpen, setMenuOpen] = useState(false);

  function keyListener(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === " ") {
      setMenuOpen(!menuOpen);
      console.log("Pressed");
    }
  }

  useEffect(() => { 
    window.addEventListener("keydown", keyListener);

    return () => window.removeEventListener("keydown", keyListener);
  });

  return (
    <div className="flex justify-center">
      <div className="w-[800px] h-[500px] my-10 bg-red-400 flex rounded-lg overflow-hidden">
        <div
          className={`bg-green-500 h-full overflow-x-hidden ease-in-out transition-all ${menuOpen ? "w-[180px]" : "w-0"}`}
        >
          <div
            className={`flex flex-col h-full bg-purple-600 justify-between min-w-[100px] w-[80%] overflow-x-hidden transition-all ${menuOpen ? "p-4" : "p-1"}`}
          >
            <p>Menu</p>
            <p>Menu</p>
          </div>
        </div>
        <div className="bg-blue-500 flex flex-col gap-5 flex-1 p-4">
          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-fit px-5 py-3"
          >
            Menu
          </Button>
          <p>Content</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      data: "data",
    },
  };
}
