import Price from "@/components/Currency/Price";
import Link from "next/link";

// 5lessons: 109USD,
// 10 lessons: 209USD,
// 20 Lessons: 380USD

export default function About() {
  return (
    <>
      <header>
        <h1>Invest in Yourself</h1>
        <p>Regular lessons are 50 minutes</p>
        <p> Personalised homeworks and study material are always included</p>
      </header>
      <main>
        <button>
          Trial lesson <Price USD={5} />{" "}
        </button>
        <button>
          5 lessons <Price USD={109} />{" "}
        </button>
        <button>
          10 lessons <Price USD={209} />{" "}
        </button>
        <button>
          20 lessons <Price USD={380} />{" "}
        </button>
      </main>
    </>
  );
}
