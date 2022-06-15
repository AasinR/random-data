import React, { useEffect, useState } from "react";
import axios from 'axios';

function DataPage() {
    const [dataFiles, setDataFiles] = useState<any[]>([]);
    
    useEffect(() => {
        axios.get("https://api.github.com/repos/AasinR/random-data/contents/data")
        .then(res => {
            setDataFiles(res.data);
            console.log(res.data);
        });
    }, []);

    const items: any[] = [];
    dataFiles.forEach(data => {
        items.push(
            <p className="test"><a href={data.download_url}>{data.name}</a></p>
        )
    });

    return (
        <div>
            {items}
        </div>
    );
}

export default DataPage;