import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getList, getProduct, getSimilar} from "./service/AmazonService";
import {AmazonProductM} from "./model/AmazonProductM";

export function AmazonProductPage() {
    let {id} = useParams();
    const navigateFunction = useNavigate();
    const [product, setProduct] = useState<AmazonProductM>({
        aboutProduct: [],
        brandName: "",
        categories: [],
        id: "",
        image: "",
        productName: "",
        productSpecification: [],
        productUrl: "",
        sellingPrice: "",
        technicalDetails: []
    })

    const [similarProducts, setSimilarProducts] = useState<AmazonProductM[]>([])

    useEffect(() => {
        loadData()
    }, [id])

    async function loadData() {
        let idStr = id + "";
        getProduct(idStr).then(value => {
            setProduct(value.data)
            getSimilar(idStr).then(async x => {
                let data = x.data;
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                let products: AmazonProductM[] = [];
                for (let datumKey of data['similar']) {
                    // @ts-ignore
                    let similarId = datumKey["Uniq Id"];
                    await getProduct(similarId).then(y => {
                        products.push(y.data)
                    })
                }
                setSimilarProducts(products)
            })
        })
    }

    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 text-start"}>
                        <h4 className={"mt-3"} onClick={function () {
                            navigateFunction("/")
                        }}>{"<-- Back"}</h4>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 text-center"}>
                        <h1 className={"mt-3"}><a target="_blank" href={product.productUrl}>{product.productName}</a>
                        </h1>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 text-center"}>
                        <img src={product.image} style={{height: 400, width: 400, maxHeight: 'auto', maxWidth: 'auto'}}
                             alt=""/>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <h6>price : {product.sellingPrice}</h6>
                    </div>
                </div>

                <div className={"row mt-3"}>
                    <div className={"col-sm-12 col-md-3"}>
                        <span>About Product</span>
                    </div>
                    <div className={"col"}>
                        <ul className="list-group">
                            {product.aboutProduct.map((value, index) => {
                                return <li className="list-group-item">{value}</li>
                            })}
                        </ul>
                    </div>
                </div>

                <div className={"row mt-3"}>
                    <div className={"col-sm-12 col-md-3"}>
                        <span>Categories</span>
                    </div>
                    <div className={"col"}>
                        <ul className="list-group">
                            {product.categories.map((value, index) => {
                                return <li className="list-group-item">{value}</li>
                            })}
                        </ul>
                    </div>
                </div>

                <div className={"row mt-3"}>
                    <div className={"col-sm-12 col-md-3"}>
                        <span>Product Specification</span>
                    </div>
                    <div className={"col"}>
                        <ul className="list-group">
                            {product.productSpecification.map((value, index) => {
                                return <li className="list-group-item">{value}</li>
                            })}
                        </ul>
                    </div>
                </div>

                <div className={"row mt-3"}>
                    <div className={"col-sm-12 col-md-3"}>
                        <span>Technical Details</span>
                    </div>
                    <div className={"col"}>
                        <ul className="list-group">
                            {product.technicalDetails.map((value, index) => {
                                return <li className="list-group-item">{value}</li>
                            })}
                        </ul>
                    </div>
                </div>

                <hr/>
                <div className={"mt-3 row"}>
                    <div className={"col-12"}>
                        <span>Similar Products</span>
                    </div>
                </div>
                <div className={"mt-3 row"}>
                    {
                        similarProducts.map((value, index) => {
                            return (
                                <div className={"col"}>
                                    <div className="card mt-3 ms-3" style={{width: "18rem"}}>
                                        <img src={value.image}
                                             style={{width: 250, height: 250, maxWidth: 'auto', maxHeight: 'auto'}}
                                             className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title">{value.productName}</h5>
                                            <a href="#" onClick={function () {
                                                navigateFunction('/amazon/product/' + value.id)
                                            }} className="btn btn-primary">go to page</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}