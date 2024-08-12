import { useEffect, useRef, useState } from "react"
import useClickOutside from "../../hooks/useClickOutside"
import { ResultType } from "../../types"
import ResultsList from "../ResultsList/ResultsList"


const App = () => {
  const [q, setQ] = useState("")
  const [showSuggest, setShowSuggest] = useState(false)

  const [visitedQueries, setVisitedQueries] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<ResultType[]>([])

  const searchInputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef(null)

  useClickOutside(wrapperRef, () => setShowSuggest(false));

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])


  const handleSuggestClick = (sug: string) => {
    setQ(sug)
    handleSubmit(sug)
  }

  const suggestArr = [
    "React", "React JS", "React JavaScript", "React Router", "React Hooks", "React 1", "React 2", "React 3", "React 4", "React 5", "React 6", "React 7",
    "Test", "Test2"
  ]

  const visitedItems = visitedQueries.filter(item => {
    if (item.toLocaleLowerCase().startsWith(q.toLocaleLowerCase()) && item.toLocaleLowerCase() !== q.toLocaleLowerCase()) {
      return item
    }
  })

  const suggestItems = q !== "" ? suggestArr.filter(item => {
    if (item.toLocaleLowerCase().startsWith(q.toLocaleLowerCase()) && item.toLocaleLowerCase() !== q.toLocaleLowerCase() &&
      !visitedItems.includes(item.toLocaleLowerCase())) {
      return item
    }
  }) : []

  const displayItems = [...visitedItems.map(el => ({ value: el, isHistory: true })), ...suggestItems.map(el => ({ value: el, isHistory: false }))]

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && q !== "") {
      handleSubmit(q)
    }
  };


  const handleSubmit = (query: string) => {
    const fQuery = query.toLocaleLowerCase()

    /* Save to history */
    setVisitedQueries(vh => {
      if (!visitedItems.includes(fQuery)) {
        return [...vh, fQuery]
      } else {
        return [...vh]
      }
    }
    )

    searchInputRef.current?.blur()
    setShowSuggest(false)

    console.log("Enter key pressed, make API call with ", fQuery);
    const resultsArr = {
      "react": [
        {
          id: "result1",
          title: "React result 1",
          url: "https://www.google.com/search?q=react",
          description: "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }, {
          id: "result2",
          title: "React result 2",
          url: "https://www.google.com/search?q=react",
          description: "Update 2 React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }, {
          id: "result3",
          title: "React result 3",
          url: "https://www.google.com/search?q=react",
          description: "Update 3 React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }
      ],
      "react js": [
        {
          id: "result1",
          title: "React JS result 1",
          url: "https://www.google.com/search?q=react+js",
          description: "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }, {
          id: "result2",
          title: "React JS result 2",
          url: "https://www.google.com/search?q=react+js",
          description: "Update 2 React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }, {
          id: "result3",
          title: "React JS result 3",
          url: "https://www.google.com/search?q=react+js",
          description: "Update 3 React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }
      ],
      "react javascript": [
        {
          id: "result1",
          title: "React JavaScript result 1",
          url: "https://www.google.com/search?q=react+javascript",
          description: "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }
      ],
      "react router": [
        {
          id: "result1",
          title: "React Router result 1",
          url: "https://www.google.com/search?q=react+router",
          description: "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }
      ],
      "react hooks": [
        {
          id: "result1",
          title: "React Hooks result 1",
          url: "https://www.google.com/search?q=react+hooks",
          description: "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript."
        }
      ],
      "test": [
        {
          id: "result1",
          title: "Test result 1",
          url: "https://www.google.com/search?q=test",
          description: "Test."
        }
      ],
      "test2": [
        {
          id: "result1",
          title: "Test 2 result 1",
          url: "https://www.google.com/search?q=test2",
          description: "Test 2."
        }
      ]
    }

    /* Save results from API call */
    setTimeout(() => {
      setSearchResults(fQuery in resultsArr ? resultsArr[fQuery] : [])
    }, 500);
  }

  const showSuggestFlag = showSuggest && q !== "" && (suggestItems.length > 0 || visitedItems.length > 0)

  return (
    <div>
      <div style={{ margin: "2rem 0" }}>
        <h1>SearchX</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div ref={wrapperRef} onKeyUp={handleKeyUp} style={{ position: "relative", width: "fit-content" }}>
          <input onFocus={() => setShowSuggest(true)}
            onChange={(e) => setQ(e.target.value)}
            ref={searchInputRef} type="search" value={q}
            className={`searchBar ${showSuggestFlag && "withSuggest"}`}
          />

          {showSuggestFlag && <div style={{
            display: "flex", flexDirection: "column", position: "absolute", padding: "0.4rem 0 1.2rem 0",
            backgroundColor: "white",
            border: "1px solid #d7d7d7",
            borderTop: "none",
            width: "24rem",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 4px 2px -2px rgba(64, 60, 67, .16)"
          }}>
            {displayItems.slice(0, 10).map(({ value, isHistory }) => <div key={value}
              style={{ display: "flex", justifyContent: "space-between" }}
              className="suggestRow">
              <button
                className="suggestButton"
                style={{ color: isHistory ? "purple" : "black", width: "100%" }}
                onClick={() => handleSuggestClick(value)}>
                {value}
              </button>
              {isHistory && <button
                className="suggestRemoveButton"
                onClick={() => setVisitedQueries(cv => [...cv.filter(v => v !== value)])}>
                Remove
              </button>}
            </div>
            )}
          </div>}
        </div>
        
        <ResultsList searchResults={searchResults} />

      </div>
    </div>
  )
}

export default App