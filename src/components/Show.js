import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteList } from "./actions/Action";
import { editList } from "./actions/Action";
import { checkList } from "./actions/Action";
import { removeCheckList } from "./actions/Action";

function Show(props) {
  const today = new Date().toISOString().slice(0, 10);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const data = props.item;
  const [user, setUser] = useState(data.user);
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
        user,
      })
    );
  };
  const handleCheck = (e) => {
    if (e.target.checked) {
      dispatch(checkList(data.id));
    } else {
      dispatch(removeCheckList(data.id));
    }
  };
  return (
    <div style={{ border: "1px solid black", padding: "20px 10px 0px 10px" }}>
      <div className="row" key={data.id}>
        <div className="col-2">
          <div className="form-group">
            <input type="checkbox" onChange={handleCheck} />
          </div>
        </div>
        <div className="col-6">{data.user.name} </div>
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
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" style={{ fontWeight: "bold" }}>
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={5}
              value={user.des}
              onChange={(e) => setUser({ ...user, des: e.target.value })}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="due" style={{ fontWeight: "bold" }}>
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="due"
                  min={today}
                  value={user.due}
                  onChange={(e) => setUser({ ...user, due: e.target.value })}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="prio" style={{ fontWeight: "bold" }}>
                  Priority
                </label>
                <select
                  className="form-control"
                  id="prio"
                  value={user.prio}
                  onChange={(e) => setUser({ ...user, prio: e.target.value })}
                >
                  <option>Normal</option>
                  <option>Low</option>
                  <option>Height</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              style={{ marginLeft: "12px", marginRight: "12px", marginBottom:'20px' }}
              className="btn btn-success btn-block"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Show;
