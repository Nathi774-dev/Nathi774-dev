import {useEffect, useState} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortConst = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortConst.signal })
            .then(res => {
                if (!res.ok){
                    throw Error("Sorry, could not fetch the data for the resource");
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);  
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    console.log("fetch aborted");
                }
                setIsPending(false);
                setError(err?.message || "Sorry, could not fetch the data for the resource");
            });
        }, 2000);
        return () => {
            abortConst.abort();
        }
    }, [url]);

    return {data, isPending, error};
}

export default useFetch;