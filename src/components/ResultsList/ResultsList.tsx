import { ResultType } from '../../types'

type ResultsListProps = { searchResults: ResultType[] }

const ResultsList = ({ searchResults }: ResultsListProps) => {
    const searchResultsLength = searchResults.length

    if(searchResultsLength === 0) {
        return null
    }

    return <div style={{ borderTop: "1px solid #d7d7d7", padding: "0.5rem 0" }}>
        <p style={{ color: "#818181", marginBottom: "1.5rem" }}>{`Found ${searchResultsLength} results, query took ${0.5} seconds.`}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {searchResults.map((result: ResultType) => <div key={result.id}
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                <a href={result.url}>{result.title}</a>
                <p>{result.description}</p>
            </div>)}
        </div>
    </div>

}

export default ResultsList