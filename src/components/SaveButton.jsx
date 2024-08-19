import React from 'react'

const SaveButton = (props) => {
    return (
        <div onClick={props.handleSubmit} className='bg-green-600 hover:bg-green-700 hover:cursor-pointer transition-all duration-200 flex justify-center py-2 rounded-md'>
            <p className='text-slate-100 font-medium'>Simpan</p>
        </div>
    )
}

export default SaveButton