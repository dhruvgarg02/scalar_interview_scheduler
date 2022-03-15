import React from "react";
import "./interview-schedules.css";

function Interview_Schedules() {
  return (
    <div className="interview-schedules w-full">
      <h1>Interview Schedules</h1>
      <div className="tableContainer w-screen flex justify-center items-center">
        <table className="divide-y divide-white mt-4 w-4/6">
          <thead className={"bg-gray-500"}>
            <tr>
              <th
                scope={"col"}
                className={
                  "px-9 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                }
              >
                Start
              </th>
              <th
                scope={"col"}
                className="px-9 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                End
              </th>
              <th
                scope={"col"}
                className="px-9 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Participants
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-left">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      15 March 1:00 AM
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      15 March 1:00 AM
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 flex flex-wrap text-center whitespace-nowrap">
                <span className="mx-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Devarshi
                </span>
                <span className="mx-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Devarshi
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-left">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      15 March 1:00 AM
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      15 March 1:00 AM
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 flex flex-wrap text-center whitespace-nowrap">
                <span className="mx-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Devarshi
                </span>
                <span className="mx-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Devarshi
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Interview_Schedules;
