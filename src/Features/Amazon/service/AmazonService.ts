import qs from "qs";
import axios from "axios";
import {ResponseAmazonProduct} from "../model/ResponseAmazonProduct";

export function getList(size: number, page: number) {
    const query = qs.stringify({
        size: size,
        page: page
    }, {
        encodeValuesOnly: true, // prettify URL
    });
    return axios.get<ResponseAmazonProduct>(`${process.env.REACT_APP_API_ENDPOINT}/api/amazon-product/v1/list?${query}`);
}