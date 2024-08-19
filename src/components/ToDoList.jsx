import React from 'react'
import { FaTrash } from "react-icons/fa";

import dataCategories from '../assets/data/category'

const ToDoList = (props) => {
    // console.log(props.todo);
    
    return (
        <div className='w-full flex gap-5 items-end'>

            {/* judul to do list */}
            <div className='w-9/12 flex flex-col gap-2'>
                <p className='text-zinc-900 font-normal text-lg'>Judul To Do</p>

                <input
                    type="text"
                    name='description'
                    value={props.todo.description}
                    className='w-full border border-slate-300 px-3 py-2 rounded-md'
                    placeholder='Contoh: Perbaikan API Master'
                    onChange={event => props.handleInputChange(props.index, event)}
                />

            </div>

            {/* kategori to do list */}
            <div className='w-2/12 flex flex-col gap-2'>
                <p className='text-zinc-900 font-normal text-lg'>Kategori</p>

                <select
                    name="category_id"
                    value={props.todo.category_id}
                    id="category"
                    className='border border-slate-300 px-3 py-2 rounded-md'
                    onChange={event => props.handleInputChange(props.index, event)}
                >

                    {dataCategories.map((cat, index) => (
                        <option key={index} value={cat.id}>{cat.name}</option>
                    ))}

                </select>
            </div>

            {/* tombol hapus */}
            <div onClick={() => props.removeToDo(props.index)} className=' flex justify-center bg-rose-500 hover:bg-rose-600 hover:cursor-pointer transition-all duration-200 p-3 rounded-md'>
                <FaTrash size={20} className='text-white' />
            </div>

        </div>
    )
}

export default ToDoList