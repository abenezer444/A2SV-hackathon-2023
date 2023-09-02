import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";




export default function Home() {
  const [query, setquery] = useState("");
  const [result, setResult] = useState("your answer will appear here");





  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setquery("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>PDFY</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>ask me about the document</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="ask me about the document"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          <button>GO</button>
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
