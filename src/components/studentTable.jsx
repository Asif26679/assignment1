import { useState } from "react";
import * as XLSX from "xlsx";

function StudentTable({ students, setStudents, setEditStudent }) {

  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = () => {

    const filteredStudents = students.filter(
      (student) => student.id !== deleteId
    );

    setStudents(filteredStudents);
    setDeleteId(null);

  };

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    XLSX.writeFile(workbook, "students.xlsx");

  };

  return (

    <div className="mt-6">

      {/* Excel Button */}

      {students.length > 0 && (
        <div className="flex justify-end mb-4">

          <button
            onClick={downloadExcel}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Export Excel
          </button>

        </div>
      )}

      {/* Empty State */}

      {students.length === 0 && (

        <div className="text-center py-16 border rounded-xl bg-gray-50">

          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            No Students Added
          </h2>

          <p className="text-gray-500">
            Start by adding your first student above
          </p>

        </div>

      )}

      {/* Table */}

      {students.length > 0 && (

        <div className="overflow-hidden rounded-xl border shadow-sm">

          <table className="w-full">

            <thead className="bg-gray-100 text-gray-600 text-sm">

              <tr>

                <th className="text-left px-5 py-3">
                  Student
                </th>

                <th className="text-left px-5 py-3">
                  Email
                </th>

                <th className="text-center px-5 py-3">
                  Age
                </th>

                <th className="text-center px-5 py-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-3 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">

                      {student.name.charAt(0).toUpperCase()}

                    </div>

                    <span className="font-medium text-gray-700">
                      {student.name}
                    </span>

                  </td>

                  <td className="px-5 py-3 text-gray-600">
                    {student.email}
                  </td>

                  <td className="px-5 py-3 text-center">

                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">

                      {student.age} yrs

                    </span>

                  </td>

                  <td className="px-5 py-3 text-center">

                    <button
                      onClick={() => setEditStudent(student)}
                      className="text-blue-500 mr-4 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(student.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* Delete Confirmation Dialog */}

      {deleteId && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/30">

          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">

            <p className="mb-4 text-gray-700">
              Are you sure you want to delete this student?
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setDeleteId(null)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default StudentTable;