import {AmazonProductM} from "./AmazonProductM";
import {Pagination} from "./pagination";

export interface ResponseAmazonProduct {
    products: AmazonProductM[]
    pagination: Pagination
}