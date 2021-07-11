import axios from "axios";
import { useCallback, useState } from "react";


export default function useModb() {

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

    const searchMovies = useCallback(async (title, year = "", page = 1) => {

        //call the movies search api:
        setIsLoading(true);
        setError(null);
        setMovies([]);

        try {
            const res = await axios.get(`${BASE_API_URL}&type=movie&s=${title}&y=${year}&page=${page}`);
           
            if(res.data.Response !== "True"){
                handleError(res.data.Error);
            }
            else {
                
                setMovies(res.data.Search);

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
    });

    return {
        movies,
        totalResults,
        isLoading,
        error,
        searchMovies
    };
}