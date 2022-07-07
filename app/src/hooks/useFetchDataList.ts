import { useEffect, useState } from "react";
import axios from "axios";
import { formatName } from "../logic";

type dataList = {
    title: string,
    fileName: string
}[]

function useFetchDataList() {
    const [dataList, setDataList] = useState<dataList>([]);

    useEffect(() => {
        axios.get("https://api.github.com/repos/AasinR/random-data/contents/data")
            .then((response: any) => {
                const result: dataList = response.data.filter((item: any) => {
                    if (item.name.split(".").pop() !== "json") return false;
                    return true;
                }).map((item: any) => {
                    return {
                        title: formatName(item.name.split(".")[0], "title"),
                        fileName: item.name
                    };
                });
                setDataList(result);
            });
    }, []);

    return { dataList };
}

export default useFetchDataList;