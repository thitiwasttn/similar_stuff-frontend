import React, {useEffect, useState} from "react";
import {AmazonProductM} from "./model/AmazonProductM";
import {getList} from "./service/AmazonService";
import {Pagination} from "./model/pagination";
import DataTable, {TableColumn} from "react-data-table-component";
import {useNavigate} from "react-router-dom";

export function AmazonList() {
    const navigateFunction = useNavigate();
    const [products, setProducts] = useState<AmazonProductM[]>([])
    const [page, setPage] = useState<Pagination>({
        page: 0, pageCount: 0, pageSize: 10, total: 0
    })
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getList(page.pageSize, page.page).then(value => {
            setProducts(value.data.products)
        })
    }, [page])
    useEffect(() => {
        getList(page.pageSize, page.page).then(value => {
            setProducts(value.data.products)
            setPage(value.data.pagination)
        })
    }, [])
    const columns: TableColumn<AmazonProductM>[] = [
        {
            name: 'Id',
            cell: row => <span>{row.id}</span>,
            sortable: true,
            selector: row => row.id
        },
        {
            name: 'productName',
            cell: row => <>
                <span className={"ms-1"} style={{maxWidth: '400px'}}>{row.productName}</span>
            </>,
            selector: row => row.productName
        },
        {
            name: 'image',
            cell: row => <>
                <div className={"d-flex align-items-center justify-content-start"}>
                    <div className={"d-flex align-items-center justify-content-center"}
                         style={{
                             width: '250px',
                             height: '200px',
                             backgroundColor: 'rgba(217,217,217,0.43)',
                             position: 'relative',
                             margin: '3px'
                         }}>
                        {
                            <img src={row.image}
                                 className=""
                                 alt="..." style={{maxWidth: '100%', maxHeight: '100%'}}/>
                        }
                    </div>
                </div>
            </>,
            selector: row => row.image
        }
    ];

    const handlePageChange = (page: number) => {
        page = page - 1;
        setPage(prevState => {
            return {
                ...prevState,
                page: page
            }
        })
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        page = page - 1;
        // console.log('newPerPage', newPerPage);
        // console.log('page', page);
        setPage(prevState => {
            return {
                ...prevState,
                page: page,
                pageSize: newPerPage
            }
        })
    };


    function table() {
        return (
            <DataTable
                columns={columns}
                data={products}
                pagination={true}
                progressPending={loading}
                paginationServer={true}
                paginationTotalRows={page.total}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onRowClicked={function (row, e) {
                    let row1 = row;
                    console.log('row1', row1);
                    navigateFunction('./amazon/product/' + row1.id)
                }}
                customStyles={{
                    rows: {
                        style: {
                            cursor: 'pointer',
                        }
                    }
                }}
            />
        )
    }


    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 text-center"}>
                        <h1>Amazon Products</h1>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <div className={"col-12"}>
                        {table()}
                    </div>
                </div>
            </div>
        </>
    )
}