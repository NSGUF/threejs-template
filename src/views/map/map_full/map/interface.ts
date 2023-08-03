/**
 * @file 地圖json类型注解
 */

export interface ChinaMapJSON {
    type: string;
    features: FeaturesItem[];
}

interface FeaturesItem {
    type: string;
    properties: Properties;
    geometry: IGeometry;
}


interface IGeometry {
    type: string;
    coordinates: number[][][][];
}


interface Properties {
    adcode: number;
    name: string;
    center: number[];
    centroid: number[];
    childrenNum: number;
    level: string;
    subFeatureIndex: number;
    acroutes: number[];
    parent: IParent;
}


interface IParent {
    adcode: number;
}