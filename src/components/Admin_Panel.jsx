import React from "react";
import Dropdown from "./Dropdown";
import "./admin-panel.css";

function Admin_Panel() {
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="h-full flex flex-col item-center w-[70%] justify-evenly">
        <div className={"flex flex-row justify-around w-full bg-gray-500"}>
          <div
            className={
              "px-9 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
            }
          >
            <div className="start">
              <label for="Start">Start (date and time) : </label>
              <input
                className="text-black"
                type="datetime-local"
                id="Start"
                name="Start"
              ></input>
            </div>
          </div>
          <div
            className="px-9 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
          >
            <div className="end">
              <label for="End">End (date and time) : </label>
              <input
                className="text-black"
                type="datetime-local"
                id="End"
                name="End"
              ></input>
            </div>
          </div>
        </div>
        <Dropdown/>
        <div className="px-6 py-4 mx-20 h-[100px] flex self-start flex-wrap text-center whitespace-nowrap font-size: 0.75rem overflow-auto">
          <div className="mx-2 px-2 my-2 h-[20px] inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Devarshi
          </div>
          <div className="mx-2 px-2 my-2 h-[20px] inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Devarshi
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-700 self-center text-white w-[200px] font-bold py-2 px-4 rounded-[8px]">
          Schedule
        </button>
      </div>
    </div>
  );
}

export default Admin_Panel;
