import Github from "./component/Github";


function App() {


 
  return (
 

<div>
  <Github/>
</div>
  );
}
// function App() {
//   console.log('rerender')



//   const [counters, setCounters] = useState({
//     c1:10,
//     c2:10
//   })


//   return (
//     <div>
//    <div>
//       <div>Иван Иванович</div>
//       <div>{counters.c1}</div>
//       <button onClick={()=>{
//         setCounters((actual) =>{
//          return {...actual, c1: actual.c1 +1}
//         })
//       }}>+</button>
//    </div>
//    <hr/>
//    <div>
//       <div>Пётр Петрович</div>
//       <div>{counters.c2}</div>
//       <button onClick={()=>{
//         setCounters((actual) =>{
//           return {...actual, c2: actual.c2 +1}
//         })
//       }}>+</button>
//    </div>
//    <hr/>

//    <button onClick={()=>{
//         setCounters((actual) =>{
//         return{
//           ...actual,
//           c1:actual.c1 -1,
//           c2:actual.c2 -1
//         }
//         })
//       }
//   }>-</button>
// <button onClick={()=>{
//         setCounters((actual) =>{
//           return{
//             ...actual,
//             c1:10,
//             c2:10
//           }
//         })}  }  >reset</button>


//     </div>
//   );
// }


export default App;
