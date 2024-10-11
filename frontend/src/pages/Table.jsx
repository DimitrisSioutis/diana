const Table = ({ teams }) => {

  return (
    <table>
      <tbody>
        <tr className='text-slate-50'><th></th><th>Ομάδα</th><th>Βαθμοί</th><th>Αγώνες</th><th>Νίκες</th><th>Ισοπαλίες</th><th>Ήττες</th><th>Υπέρ</th><th>Κατά</th></tr>
        {teams.map((team, index) =>
          <tr key={index}>
            {team.map((td, index) =>
              <td key={index} className='text-slate-50'>{td}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table