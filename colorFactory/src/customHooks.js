// import React, { useState, useEffect } from "react";

// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     let value = JSON.parse(window.localStorage.getItem(key || defaultValue));
//     return value;
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, state);
//   }, [state, setState]);

//   return [state, setState];
// };

// export default useLocalStorage;
