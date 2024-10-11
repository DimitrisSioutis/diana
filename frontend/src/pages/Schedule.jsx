const Schedule = ({ matches }) => {

    return (
        <table className='m-auto'>
            <tbody>
                <tr className='text-slate-50'><th>Αγωνιστική</th><th>Αγώνας</th><th>Γήπεδο</th><th>Ημέρα</th><th>Ημερομηνία</th><th>Ώρα</th><th>Αποτέλεσμα</th></tr>
                {matches.map((match, index) =>
                    <tr key={index} className={(index % 2 != 0) ? 'bg-slate-100' : 'bg-slate-200'}>
                        <td className="text-xs p-2 text-center">{index+1}.</td>
                        {match.map((td, index) =>
                            <td key={index} className={(index==0 || index==5)?'text-slate-750  py-2 px-4 text-sm':'text-slate-750 py-2 px-4 font-medium text-xs'} >
                                {(index==1)?
                                   <a className="underline" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${td.trim('')}`}>{td}</a>
                                   :
                                   <>{td}</>
                                }
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Schedule