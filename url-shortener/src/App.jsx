import { useEffect, useState } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    async function shorten() {
      const res = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          longUrl: "https://example.com/docs",
          customCode: "docs"
        }),
      });
    
      const data = await res.json();
      console.log(data);
    }

    shorten();
  });
  
  return (
    <>
    </>
  )
}

export default App
