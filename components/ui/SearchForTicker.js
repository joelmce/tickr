// import { supportedTickers } from "@/utils/supportedTickers"
// import { CircularProgress } from "@mui/joy"
// import { useEffect, useState } from "react"

// export function SearchForTicker({ addToDashboard }) {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [searchResults, setSearchResults] = useState([])
//   const [selectedTickers, updateSelectedTickers] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const filteredTickers = supportedTickers.filter(ticker =>
//       ticker.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(filteredTickers);
//   }, [searchTerm])

//   const handleAddTicker = (ticker) => {
//     updateSelectedTickers(ticker)
//     console.log(selectedTickers)
//     setSearchTerm('')
//   }

//   const handleRemoveSelectedTicker = (id) => {
//     const updatedTickers = selectedTickers.filter((ticker) => ticker.id !== id);
//     updateSelectedTickers(updatedTickers);
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Enter ticker symbol"
//       />
//       <ul>
//         {loading ? <CircularProgress/> : searchResults.map((result, i) => (
//           <li key={i}>
//             {result.name} ({result.symbol})
//             <button onClick={() => handleAddTicker(result)}>Add</button>
//           </li>
//         ))}
//       </ul>
//       {selectedTickers &&
//          <ul>
//             {selectedTickers.map((ticker) => {
//             return (<li className="bg-green-800 p-2 rounded" id={ticker.id}>
//               {ticker.name}
//               <span onClick={() => handleRemoveSelectedTicker(ticker.id)}>x</span>
//             </li> )
//             })}
//         </ul>}
//     </div>
//   )
// }