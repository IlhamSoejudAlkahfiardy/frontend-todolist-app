import React from 'react'
import { FaPlus } from "react-icons/fa";

const AddToDo = (props) => {
    return (
        <div onClick={props.addToDo} className='bg-red-200 flex items-center gap-5 px-5 py-2 rounded-lg hover:bg-red-300 hover:cursor-pointer transition-all duration-200 group'>
            <FaPlus size={15} className='text-red-500' />
            <p className='text-red-500 font-medium tracking-wide'>Tambah To Do</p>
        </div>
    )
}

export default AddToDo