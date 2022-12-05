export const getFirstLastPageItem = ()=>{

}

export const calculateSkip = (page: number, perPage:number)=>{
  return  ((page -1) *  perPage)
}
