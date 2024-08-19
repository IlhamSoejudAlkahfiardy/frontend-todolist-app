import React from 'react'

const CheckMyTodos = (props) => {
    return (
        <div onClick={props.handleCheckMyTodos} className='bg-amber-400 hover:bg-amber-500 hover:cursor-pointer transition-all duration-200 flex justify-center py-2 rounded-md'>
            <p className='text-slate-100 font-medium'>
                Check my Todos
            </p>
        </div>
    )
}

export default CheckMyTodos