export type breadcrumbType = {
    title?: String,
    route?: String,
    isHome?: Boolean,
    isCurrent?: Boolean
    hidden?: Boolean
}

export type TabMenuType = {
    name?: string;
    label?: string;
    default?: boolean;
    fetchCode?: string;
    count?: number
}