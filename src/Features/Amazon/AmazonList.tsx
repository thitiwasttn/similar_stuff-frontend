import React, {useEffect, useState} from "react";
import {AmazonProductM} from "./model/AmazonProductM";
import {getList} from "./service/AmazonService";
import {Pagination} from "./model/pagination";

export function AmazonList() {
    const [products, setProducts] = useState<AmazonProductM[]>([])
    const [page, setPage] = useState<Pagination>({
        page: 0, pageCount: 0, pageSize: 0, total: 0
    })
    useEffect(() => {
        getList(10, 0).then(value => {
            setProducts(value.data.products)
            setPage(value.data.pagination)
        })
    }, [])
    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 text-center"}>
                        <h1>Amazon Products</h1>
                    </div>
                </div>
                <hr/>
            </div>
        </>
    )
}