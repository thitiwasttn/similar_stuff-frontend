import qs from "qs";
import axios from "axios";
import {ResponseAmazonProduct} from "../model/ResponseAmazonProduct";
import {AmazonProductM} from "../model/AmazonProductM";

export function getList(size: number, page: number) {
    const query = qs.stringify({
        size: size,
        page: page
    }, {
        encodeValuesOnly: true, // prettify URL
    });
    return axios.get<ResponseAmazonProduct>(`${process.env.REACT_APP_API_ENDPOINT}/api/amazon-product/v1/list?${query}`);
}

export function getProduct(id: string) {
    return axios.get<AmazonProductM>(`${process.env.REACT_APP_API_ENDPOINT}/api/amazon-product/v1/${id}`);
}


export function getSimilar(id: string) {
    return axios.get<any>(`${process.env.REACT_APP_API_SIMILAR_ENDPOINT}/amazon/similar/${id}`);
}