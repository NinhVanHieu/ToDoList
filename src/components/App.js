import React, { useState } from "react";
import { addList, removeAll } from "./actions/Action";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Show from "./Show";
import { searchList } from "./actions/Action";
import { listData } from "./selectors/Selectors";
import { removeData } from "./selectors/Selectors";

function App() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(listData);
  const remove = useSelector(removeData);
  console.log(remove);
  const [prio, setPrio] = useState("Low");
  const [due, setDue] = useState();
  const [name, setName] = useState();
  const [des, setDes] = useState();
  const [search, setSearch] = useState();

  const handleAdd = () => {
    name &&
      des &&
      dispatch(
        addList({
          id: uuidv4(),
          name: name,
          des: des,
          due: due,
          prio: prio,
        })
      );

    setName("");
    setDes("");
    setPrio("Low");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    dispatch(searchList(e.target.value));
  };
  console.log(search);
  const handleRemoveAll = () => {
    dispatch(removeAll(remove));
  };
  return (
    <div>
      <div className="container">
        <div className="row" style={{ paddingTop: "30px" }}>
          <div className="col-5">
            <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
              New Task
            </h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Add new task..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" style={{ fontWeight: "bold" }}>
                Description
              </label>
              <textarea
                className="form-control"
                rows={5}
                value={des}
                onChange={(e) => setDes(e.target.value)}
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
                    onChange={(e) => setDue(e.target.value)}
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
                    value={prio}
                    onChange={(e) => setPrio(e.target.value)}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                    <option value="Height">Height</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success btn-block"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
          {/* End Add */}

          <div className="col-7">
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
            {data?.map((item) => {
              return (
                <>
                  <Show item={item} />
                </>
              );
            })}

            {/* End Show */}

            <br />
            {remove?.length > 0 && (
              <div className="row">
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
                    className="btn btn-primary btn-block"
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
