import { useState } from "react";
import * as XLSX from "xlsx";

function StudentTable({ students, setStudents, setEditStudent }) {

  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = () => {

    const filtered = students.filter(
      (student) => student.id !== deleteId
    );

    setStudents(filtered);
    alert("Student deleted successfully");

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

    <div>

      {students.length > 0 && (

        <button
          onClick={downloadExcel}
          className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
        >
          Download Excel
        </button>

      )}

      {students.length === 0 && (

        <div className="text-center py-10 border rounded bg-gray-50">

          <h2 className="text-lg font-semibold">
            No Students Added
          </h2>

          <p className="text-gray-500">
            Add your first student above
          </p>

        </div>

      )}

      

      <div className="hidden md:block">

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2 text-left">Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student.id} className="border-t">

                <td className="p-2">{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>

                <td>

                  <button
                    onClick={()=>setEditStudent(student)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>setDeleteId(student.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      <div className="md:hidden space-y-4">

        {students.map((student) => (

          <div
            key={student.id}
            className="border rounded-lg p-4 shadow-sm"
          >

            <p className="font-semibold text-lg">
              {student.name}
            </p>

            <p className="text-gray-600">
              {student.email}
            </p>

            <p className="text-sm text-gray-500 mb-3">
              Age: {student.age}
            </p>

            <button
              onClick={()=>setEditStudent(student)}
              className="text-blue-500 mr-3"
            >
              Edit
            </button>

            <button
              onClick={()=>setDeleteId(student.id)}
              className="text-red-500"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      

      {deleteId && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/30">

          <div className="bg-white p-6 rounded">

            <p className="mb-4">
              Are you sure you want to delete?
            </p>

            <button
              onClick={()=>setDeleteId(null)}
              className="mr-3 border px-3 py-1"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>

          </div>

        </div>

      )}

    </div>

  );
}

export default StudentTable;