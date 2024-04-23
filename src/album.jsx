import React, { useEffect, useState } from "react";
import "./album.css"
import Image from './components/image'
import Title from "./components/Title";

export function Album() {
  //   const data = [
  //     {
  //       id: 1,
  //       title: "Hi",
  //     },
  //     { id: 2, title: "Hello" },
  //   ];

  const [data, setData] = useState([]);

  useEffect(() => {
    // setData([
    //   {
    //     id: 1,
    //     title: "Hi",
    //   },
    //   { id: 2, title: "Hello" },
    // ]);

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((resp) => resp.json())
      .then((albums) => setData(albums))
      .catch((err) => console.log(err));
  }, []);
 const[u,SetU]=useState(false);
  return (
    <div>
      <button onClick={()=>{SetU(!u)}}>{u?"lower":"upper"}</button>
      {data.map((item) => {
        return (
          <>
            <Title title={item.title} u={u}/>
           <Image path={item.url} size={100}/>
          </>
        );
      })}
    </div>
  );
}
