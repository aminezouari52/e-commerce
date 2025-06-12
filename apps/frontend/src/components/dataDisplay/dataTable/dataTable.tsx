"use client";

import React from "react";
import DataTable from "react-data-table-component";

function DataTableDisplay({ data, columns }) {
  const columnsUser = [
    {
      name: "Utilisateur",
      selector: (row) => (
        <div>
          <img
            src={row?.avatar}
            className="rounded-circle me-2"
            width="35"
            height="35"
            alt=""
          />
          {row?.name?.length > 15
            ? `${row?.name?.substring(0, 15)}...`
            : row?.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email != null && row?.email,

      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row?.role != null && row?.role,
      hide: "sm",
      center: true,
      sortable: true,
    },
    {
      name: "Actions",
      center: true,
      cell: (row) => (
        <div className="d-flex w-100 justify-content-center">
          <button
            data-bs-toggle="modal"
            data-bs-target="#createUserModal"
            type="button"
          ></button>
          <label className="mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-edit"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#545252"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </label>
          <label className="mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-checkbox"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#545252"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 11l3 3l8 -8" />
              <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
            </svg>
          </label>
          <label className="mx-1 form-check form-check-single form-switch">
            <input
              className="form-check-input"
              data-placement="top"
              type="checkbox"
              // onChange={() => {
              //   enableDisable(row?.id, row?.isEnabled);
              // }}
              checked={row?.status === "enable"}
            />
          </label>
        </div>
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#fafafa",
      },
    },
  };
  return (
    <div>
      <DataTable
        className="dataTableClass"
        columns={columns ?? columnsUser}
        data={data ?? []}
        pagination
        customStyles={customStyles}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
        // expandableRowsComponent={ExpandedComponent}
        // expandableRows
      />
    </div>
  );
}

export default DataTableDisplay;
