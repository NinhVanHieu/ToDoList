export const listData = (state) => {
  const data = state.list.content.filter((item) => {
    console.log(item.name);
    return item.name.includes(state.list.search);
  });
  return data;
};

// {
//    const itemData= state.list.content.filter((item)=>{
//        return item.content.name.includes(state.list.search)
//    })
//    return itemData
// }
// export const searchData=(state)=>state.list.search
export const removeData=(state)=>state.list.check