import React, { useState } from "react";
import { addList, removeAll } from "./actions/Action";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Show from "./Show";
import { searchList } from "./actions/Action";
import { listData } from "./selectors/Selectors";
import { removeData } from "./selectors/Selectors";

function App() {
  const today = new Date().toISOString().slice(0, 10);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(listData);
  const data2 = data.sort(function (a, b) {
    return new Date(a.user.due) - new Date(b.user.due);
  });
  const remove = useSelector(removeData);
  const [user, setUser] = useState({
    name: "",
    des: "",
    due: today,
    prio: "Normal",
  });
  const [info, setInfo] = useState(()=>{
    return JSON.parse(localStorage.getItem("infoData")) ?? []
  });
  const [search, setSearch] = useState();
  const handleAdd = () => {
    user.name &&
      dispatch(
        addList({
          id: uuidv4(),
          user,
        })
      );
    user.name && setInfo((prev) => {
      const newInfo = [...prev, { id: uuidv4(), user }];
      localStorage.setItem("infoData", JSON.stringify(newInfo));
      return newInfo;
    });
    setShow(user.name === "" ? true : false);
    setUser({
      name: "",
      des: "",
      due: today,
      prio: "Normal",
    });
  };
  const handleSearch = (e) => {
    dispatch(searchList(e.target.value.trim()));
  };
  const handleRemoveAll = () => {
    dispatch(removeAll(remove));
  };
  return (
    <div>
      <div className="container">
        <div className="row" style={{ border: "1px solid black" }}>
          <div
            className="col-5"
            style={{
              paddingTop: "30px",
              paddingBottom: "10px",
              borderRight: "1px solid black",
            }}
          >
            <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
              New Task
            </h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="name"
                placeholder="Add new task..."
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              {show && user.name === "" && (
                <small id="name" style={{ color: "red" }}>
                  Please enter the name field
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description" style={{ fontWeight: "bold" }}>
                Description
              </label>
              <textarea
                className="form-control"
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
                    value={user.prio}
                    onChange={(e) => setUser({ ...user, prio: e.target.value })}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                    <option value="Height">Height</option>
                  </select>
                </div>
              </div>
              <button
                style={{
                  marginLeft: "12px",
                  marginRight: "12px",
                  marginBottom: "15px",
                }}
                type="submit"
                className="btn btn-success btn-block"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
          <div
            className="col-7"
            style={{ paddingTop: "30px", paddingBottom: "10px" }}
          >
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              To Do List
            </h2>
            <div className="form-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            {data2?.map((item) => {
              return (
                <div key={item.id}>
                  <Show item={item} />
                  <br />
                </div>
              );
            })}
            <br /> <br />
            <br />
            {remove?.length > 0 && (
              <div
                className="row"
                style={{
                  position: "absolute",
                  bottom: "0px",
                  right: "15px",
                  width: "100%",
                  background: "rgb(152, 152, 152)",
                  height: "80px",
                  paddingTop: "20px",
                  marginTop: "20px",
                }}
              >
                <div className="col-4">Bulk Action:</div>
                <div className="col-4" />
                <div className="col-2">
                  <button type="button" className="btn btn-primary btn-block">
                    Done
                  </button>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={handleRemoveAll}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
