import React from 'react'
import { FaTrash } from "react-icons/fa";

const ListTodos = ({data, handleDeleteTodo, index}) => {

    return (
        <div className='w-full flex gap-5 items-end'>

            {/* judul todos */}
            <div className='w-9/12 flex flex-col gap-2'>
                <p className='text-zinc-900 font-normal text-lg'>Judul To Do</p>
                <input
                    type="text"
                    name='description'
                    value={data.description}
                    className='w-full border border-slate-300 px-3 py-2 rounded-md'
                    placeholder='Contoh: Perbaikan API Master'
                    disabled
                />
            </div>

            {/* kategori to do list */}
            <div className='w-2/12 flex flex-col gap-2'>
                <p className='text-zinc-900 font-normal text-lg'>Kategori</p>

                <input
                    type="text"
                    name='description'
                    value={data.category_name}
                    className='w-full border border-slate-300 px-3 py-2 rounded-md'
                    placeholder='Contoh: Perbaikan API Master'
                    disabled
                />
            </div>

            {/* tombol hapus */}
            <div onClick={() => handleDeleteTodo(index)} className=' flex justify-center bg-rose-500 hover:bg-rose-600 hover:cursor-pointer transition-all duration-200 p-3 rounded-md'>
                <FaTrash size={20} className='text-white' />
            </div>
        </div>
    )
}

export default ListTodos