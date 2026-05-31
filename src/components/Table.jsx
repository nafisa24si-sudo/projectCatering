export default function Table({ columns, data, renderActions, className = "" }) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm ${className}`}>
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            {columns.map((column) => (
              <th key={column.header} className="px-5 py-4 font-semibold uppercase tracking-[0.18em]">
                {column.header}
              </th>
            ))}
            {renderActions ? <th className="px-5 py-4 font-semibold uppercase tracking-[0.18em]">Aksi</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id ?? index} className="border-t border-gray-100 transition hover:bg-green-50/20">
              {columns.map((column) => {
                const value = typeof column.accessor === "function" ? column.accessor(row) : row[column.accessor];
                return (
                  <td key={`${row.id ?? index}-${column.accessor}`} className="px-5 py-4 text-gray-700">
                    {value}
                  </td>
                );
              })}
              {renderActions ? (
                <td className="px-5 py-4 text-gray-700">{renderActions(row)}</td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
