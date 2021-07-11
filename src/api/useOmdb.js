import axios from "axios";
import { useCallback, useState } from "react";


export default function useOmdb() {

    //DISCLAIMER: API Keys should NEVER be soted in the frontend code. They should be kept securely 
    //on the server side. I am storing it here as a server implementation is out of scope.
    const API_KEY = "157f34ed";
    const BASE_API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);

    const handleError = (errorMsg) => {

        setError(errorMsg);
        setTotalResults(0);
        setMovies([]);
    };

    const searchMovies = useCallback(async (title, year = "", page = 1, sortBy = "") => {

        //call the movies search api:
        setIsLoading(true);
        setError(null);
        setMovies([]);

        try {

            const res = await axios.get(`${BASE_API_URL}&type=movie&s=${title}&y=${year}&page=${page}`);
            console.log(res);
            if(res.data.Response !== "True"){
                handleError(res.data.Error);
            }
            else {

                //remove duplicates:
                const uniqueMovies = [];
                res.data.Search.forEach(movie => {
                    if(uniqueMovies.findIndex(m => m.imdbID === movie.imdbID) === -1) {
                        uniqueMovies.push(movie);
                    }
                });
                
                //sort the movies if needed.
                //TODO: add support for descending/ascending
                const sortedMovies = uniqueMovies;

                if(uniqueMovies.length > 0 && uniqueMovies[0].hasOwnProperty(sortBy.trim())) {
                    
                    sortedMovies.sort((m1, m2) => {
                        return m1[sortBy].localeCompare(m2[sortBy]);
                    });
                }
                
                setMovies(sortedMovies);

                setTotalResults(res.data.totalResults);
            }
        }
        catch(err) {
            console.error(err);

            handleError("Oops...Error searching movies...");
        }
        finally {
            setIsLoading(false);
        }
    },[BASE_API_URL]);

    return {
        movies,
        totalResults,
        isLoading,
        error,
        searchMovies
    };
}