export const listData = (state) => state.list.content.filter((item)=>{
  return item.user.name.includes(state.list.search)
})
export const removeData=(state)=>state.list.check