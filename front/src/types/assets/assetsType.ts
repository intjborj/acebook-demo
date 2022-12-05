export type ManufacturerType = {
    _id?: string | undefined | null;
    name?: string;
    mobile?: string;
}

export type AssetType = {
    _id?: string | undefined | null;
    model?: string;
    name?: string;
    description?: string;
    count?: number;
    prefix?: string;
    handlingDepartment?: any;
}
// Variations

type AssetVariationCommon = {
    serialNo?: string | undefined | null;
    _id?: string | undefined | null;
    propertyCode?: string;
    model?: string;
    cost?: number | null;
    condition?: string;
    ipms?: string;
    description?: string;
    deployedDate?: string;
}

type AssetVariationObj = {
    asset?: AssetType;
    manufacturer?: ManufacturerType;
    supplier?: SupplierType;
}

type AssetVariationObjString = {
    asset?: string;
    manufacturer?: string;
    supplier?: string;
}

export type AssetVariationFormType = AssetVariationCommon & AssetVariationObjString
export type AssetVariationViewType = AssetVariationCommon & AssetVariationObj


export type SupplierType = {
    _id?: string | undefined | null;
    name?: string;
    migrationId?: string;
    mobile?: string;
    email?: string;
    url?: string;
    information?: string;
    address?: string;
    contactPerson?: string;
    contactTelephone?: string;
    contactEmail?: string;
}