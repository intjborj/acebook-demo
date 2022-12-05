export enum FrontPath {
    TICKET_WORK_FORM = '/tickets/works/form/create',
    TICKET_WORK_UPDATE = '/tickets/works/form/update',
    TICKET_WORK_VIEW = '/tickets/works/view',
    TICKET_VIEW = '/tickets/view',
    TICKET_UPDATE = '/tickets/form/update',
    TICKETS = '/tickets',
    DEPARTMENT_POST = '/departments/post',
    DEPARTMENT_POST_TAGS = '/departments/post/tags',
    DEPARTMENT_UPDATE = '/departments/form/update',
    ASSET_MANUFACTURER_FORM = '/configurations/asset/manufacturer/form',
    ASSET_MANUFACTURERS = '/configurations/asset/manufacturer',
    ASSET_LIST = '/configurations/asset/list',
    ASSET_FORM = '/configurations/asset/form',
    ASSET_CONFIGS = '/configurations/asset',
    ASSET_VARIATIONS_VIEW = '/configurations/asset/variation',
    ASSET_VARIATIONS_CREATE = '/configurations/asset/variation/form/create',
    ASSET_VARIATIONS_UPDATE = '/configurations/asset/variation/form/update',
    CONFIGS = '/configurations',
    SUPPLIER_LIST = '/configurations/asset/supplier',
    SUPPLIER_FORM = '/configurations/asset/supplier/form',
    PROFILE_SETTING= '/profile/update',
    MY_POSTS= '/profile/post',
    MY_POSTS_ARCHIVE= '/profile/post/archive',
    ALL_DEPT_POST= '/departments/post/all_depts',
}


export enum TicketStatus {
   SUCCESS = 'success',
   CLOSED = 'closed',
   FAILED = 'failed',
}

export enum FilePath {
   LOGO = 'static/acebook-logo.png',
   DEFAULT_IMAGE = 'static/default-image.jpg',
   COMPANY_LOGO = 'static/ace-logo.png',
}