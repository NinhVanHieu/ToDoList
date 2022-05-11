import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteList } from "./actions/Action";
import { editList } from "./actions/Action";
import { checkList } from "./actions/Action";
import { removeCheckList } from "./actions/Action";
// import { searchData } from "./selectors/Selectors";

function Show(props) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState([]);
  const [show, setShow] = useState(false);
  //  const dataSearch=useSelector(searchData)
  //  console.log(dataSearch);
  // const data = useSelector((state) => state.list.content);
  const data = props.item;
  console.log(data);
  const [info, setInfo] = useState(data);
  console.log(info);
  const handleRemove = () => {
    dispatch(deleteList(data.id));
  };
  const handleDetail = () => {
    setShow(true);
  };
  const handleUpdate = () => {
    setShow(false);
    dispatch(
      editList({
        id: data.id,
        name: info.name,
        des: info.des,
        due: info.due,
        prio: info.prio,
      })
    );
  };
  const handleCheck = (e) => {
    console.log(e.target.checked);
    if(e.target.checked){
      dispatch(checkList(e.target.checked,data.id))
    }
    else{
      dispatch(removeCheckList(data.id))
    }
   
  };
  console.log(check);
  return (
    <>
      <div className="row" key={data.id}>
        <div className="col-2">
          <div className="form-group">
            <input type="checkbox" onChange={handleCheck} />
          </div>
        </div>
        <div className="col-6">{data.name} </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-info btn-block"
            onClick={handleDetail}
          >
            Detail
          </button>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>

      <br />
      {show && (
        <div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows={5}
              value={info.des}
              onChange={(e) => setInfo({ ...info, des: e.target.value })}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="due">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="due"
                  value={info.due}
                  onChange={(e) => setInfo({ ...info, due: e.target.value })}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="prio">Priority</label>
                <select
                  className="form-control"
                  id="prio"
                  value={info.prio}
                  onChange={(e) => setInfo({ ...info, prio: e.target.value })}
                >
                  <option>Normal</option>
                  <option>Low</option>
                  <option>Height</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              name
              id
              className="btn btn-success btn-block"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}

export default Show;
